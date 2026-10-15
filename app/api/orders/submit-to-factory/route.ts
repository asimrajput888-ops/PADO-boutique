// app/api/orders/submit-to-factory/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { buildFactoryPayload } from "@/lib/factory/payload-builder";
import { submitOrderToFactory } from "@/lib/factory/client";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "orderId is required" },
        { status: 400 }
      );
    }

    const { data: order, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (fetchError || !order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

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
      fabric_name: order.fabric_name,
      customer_notes: order.notes,
      // Customization flat fields
      lapel: order.lapel,
      buttons: order.buttons,
      vent: order.vent,
      lining: order.lining,
      collar: order.collar,
      pocket: order.pocket,
      fit: order.fit,
      trouser: order.trouser,
      vest: order.vest,
      sleeve: order.sleeve,
    });

    const maxRetries = 3;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const factoryResponse = await submitOrderToFactory(payload);

        await supabase
          .from("orders")
          .update({
            supplier_order_id: factoryResponse.supplier_order_id,
            factory_status: factoryResponse.status,
            factory_submitted_at: new Date().toISOString(),
          })
          .eq("id", order.id);

        await supabase.from("factory_logs").insert({
          order_id: order.id,
          event_type: "ORDER_SUBMITTED",
          payload: JSON.stringify(payload),
          response: JSON.stringify(factoryResponse),
          status: "success",
        });

        return NextResponse.json({
          success: true,
          supplier_order_id: factoryResponse.supplier_order_id,
        });
      } catch (err: any) {
        lastError = err;

        await supabase.from("factory_logs").insert({
          order_id: order.id,
          event_type: "ORDER_SUBMISSION_FAILED",
          payload: JSON.stringify(payload),
          error: err.message,
          attempt,
          status: "failed",
        });

        if (attempt < maxRetries) {
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, attempt) * 1000)
          );
        }
      }
    }

    return NextResponse.json(
      { error: lastError?.message || "Failed after retries" },
      { status: 500 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
