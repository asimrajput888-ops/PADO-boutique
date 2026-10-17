// app/api/orders/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { routeOrder } from "@/lib/fulfillment/router";
import type { OrderRecord } from "@/lib/fulfillment/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Order Number Generate karein (e.g. PADO-17124598)
    const orderNumber = `PADO-${Date.now().toString().slice(-6)}`;

    // 2. Supabase mein order save karo
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber, // <--- Ye line sabse zaroori hai
        customer_name: body.customer_name,
        customer_email: body.customer_email,
        customer_phone: body.customer_phone,
        customer_country: body.customer_country,
        shipping_address: body.shipping_address,
        fit_type: body.fit_type,
        standard_size: body.standard_size,
        model_id: body.model_id,
        model_name: body.model_name,
        category: body.category,
        product_type: body.product_type,
        measurements: body.measurements,
        total_price: body.total_price,
        currency: body.currency,
        notes: body.notes,
        status: "pending",
      })
      .select()
      .single();

    if (error || !order) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error?.message || "Failed to save order" }, { status: 500 });
    }

    // 3. Order aate hi factory ko route karo (CJ ya Bespoke)
    const result = await routeOrder(order as OrderRecord);

    // 4. Update karo ke factory ko bhej diya gaya hai ya nahi
    await supabase
      .from("orders")
      .update({
        supplier_order_id: result.supplier_order_id || null,
        factory_status: result.success ? "submitted" : "failed",
        factory_submitted_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    // 5. Frontend ko response bhejo
    return NextResponse.json({
      success: result.success,
      order: { ...order, supplier_order_id: result.supplier_order_id },
      error: result.error || null,
    });

  } catch (err: any) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
