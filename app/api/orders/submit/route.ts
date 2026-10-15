// app/api/orders/submit/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { buildFactoryPayload } from "@/lib/factory/payload-builder";
import { submitOrderToFactory } from "@/lib/factory/client";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: "orderId required" }, { status: 400 });
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    let supplier = null;

    // 1. Try to get supplier from the model
    if (order.model_id) {
      const { data: model } = await supabase
        .from("models")
        .select("supplier_id, supplier_type")
        .eq("id", Number(order.model_id))
        .single();

      if (model?.supplier_id) {
        const { data: supplierData } = await supabase
          .from("suppliers")
          .select("*")
          .eq("id", model.supplier_id)
          .single();

        supplier = supplierData;
      }
    }

    // 2. Fallback: default manual supplier
    if (!supplier) {
      const { data: fallback } = await supabase
        .from("suppliers")
        .select("*")
        .eq("type", "manual")
        .eq("active", true)
        .order("priority", { ascending: true })
        .limit(1)
        .single();

      supplier = fallback;
    }

    if (!supplier) {
      return NextResponse.json(
        { error: "No supplier found" },
        { status: 500 }
      );
    }

    // 3. Update order with supplier info
    await supabase
      .from("orders")
      .update({
        supplier_id: supplier.id,
        supplier_type: supplier.type,
        supplier_status:
          supplier.type === "manual" ? "PENDING_MANUAL" : "PENDING_API",
      })
      .eq("id", orderId);

    // 4. Route based on supplier type
    if (supplier.type === "api" || supplier.type === "dropship") {
      // ===== API SUPPLIER =====
      try {
        const payload = buildFactoryPayload({
          id: order.id,
          customer_name: order.customer_name,
          customer_email: order.customer_email,
          customer_phone: order.customer_phone,
          customer_country: order.customer_country,
          shipping_address: order.shipping_address,
          measurements: order.measurements || {},
          customization: order.customization || {},
          fabric_code: order.fabric_code,
          customer_notes: order.notes,
        });

        const factoryResponse = await submitOrderToFactory(payload);

        await supabase
          .from("orders")
          .update({
            supplier_order_id: factoryResponse.supplier_order_id,
            supplier_status: factoryResponse.status,
          })
          .eq("id", orderId);

        return NextResponse.json({
          success: true,
          type: "api",
          supplier: supplier.name,
          supplier_order_id: factoryResponse.supplier_order_id,
        });
      } catch (apiError: any) {
        // API failed — mark as needing manual attention
        await supabase
          .from("orders")
          .update({
            supplier_status: "API_FAILED",
            supplier_notes: apiError.message,
          })
          .eq("id", orderId);

        return NextResponse.json({
          success: false,
          type: "api",
          supplier: supplier.name,
          error: apiError.message,
        });
      }
    } else {
      // ===== MANUAL SUPPLIER =====
      return NextResponse.json({
        success: true,
        type: "manual",
        supplier: supplier.name,
        message: "Order queued for manual WhatsApp forward",
      });
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Submission failed" },
      { status: 500 }
    );
  }
}
