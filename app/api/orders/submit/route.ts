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

    // 1. Fetch order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // 2. Get supplier for this order's model
    let supplier = null;

    if (order.model_id) {
      const { data: model } = await supabase
        .from("models")
        .select("supplier_id, supplier_type, suppliers(*)")
        .eq("id", Number(order.model_id))
        .single();

      if (model?.supplier_id) {
        supplier = model.suppliers;
      }
    }

    // 3. Fallback: routing rules
    if (!supplier) {
      const { data: fallback } = await supabase
        .from("suppliers")
        .select("*")
        .eq("type", "manual")  // Default: manual (Karachi)
        .eq("active", true)
        .order("priority", { ascending: true })
        .limit(1)
        .single();

      supplier = fallback;
    }

    if (!supplier) {
      return NextResponse.json({ error: "No supplier found" }, { status: 500 });
    }

    // 4. Update order with supplier info
    await supabase
      .from("orders")
      .update({
        supplier_id: supplier.id,
        supplier_type: supplier.type,
        supplier_status: supplier.type === "manual" ? "PENDING_MANUAL" : "PENDING_API",
      })
      .eq("id", orderId);

    // 5. Route based on supplier type
    if (supplier.type === "api") {
      // ===== API SUPPLIER (Chinese) =====
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
    } else {
      // ===== MANUAL SUPPLIER (Karachi) =====
      // Bas flag lagao — admin panel se WhatsApp forward hoga
      return NextResponse.json({
        success: true,
        type: "manual",
        supplier: supplier.name,
        message: "Order queued for manual WhatsApp forward",
        whatsapp_link: buildWhatsAppLink(supplier, order),
      });
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Submission failed" },
      { status: 500 }
    );
  }
}

// ===== Helper: Generate WhatsApp message =====
function buildWhatsAppLink(supplier: any, order: any): string {
  const msg = `*NEW ORDER — ${order.order_number}*

*Customer:* ${order.customer_name}
*Country:* ${order.customer_country}

*Product:* ${order.model_name}
*Type:* ${order.product_type}
*Fit:* ${order.fit_type === "custom" ? "Custom Measurements" : order.standard_size}

${
  order.measurements
    ? `*MEASUREMENTS (inches):*
${Object.entries(order.measurements)
  .filter(([_, v]) => v)
  .map(([k, v]) => `• ${k}: ${v}`)
  .join("\n")}`
    : ""
}

${
  order.customization
    ? `*CUSTOMIZATION:*
${Object.entries(order.customization)
  .filter(([_, v]) => v)
  .map(([k, v]) => `• ${k}: ${v}`)
  .join("\n")}`
    : ""
}

*SHIPPING ADDRESS:*
${order.shipping_address?.address1 || ""}
${order.shipping_address?.address2 || ""}
${order.shipping_address?.city || ""} ${order.shipping_address?.postalCode || ""}
${order.shipping_address?.country || ""}

*Contact:* ${order.customer_email}
${order.customer_phone ? `*Phone:* ${order.customer_phone}` : ""}

${
  order.notes
    ? `*NOTES:* ${order.notes}`
    : ""
}`;

  const phone = supplier.contact_whatsapp?.replace(/[^0-9]/g, "") || "";
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}
