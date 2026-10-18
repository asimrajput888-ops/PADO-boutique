// app/api/orders/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { routeOrder } from "@/lib/fulfillment/router";
import type { OrderRecord } from "@/lib/fulfillment/types";
import { Resend } from "resend";

// Resend initialize karein (Make sure RESEND_API_KEY Vercel mein add hai)
const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Order Number Generate karein
    const orderNumber = `PADO-${Date.now().toString().slice(-6)}`;

    // 2. Supabase mein order save karo
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
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

    // 3. Customer ko Order Confirmation Email bhejein
    try {
      if (body.customer_email) {
        const isCustom = body.fit_type === "custom";
        
        await resend.emails.send({
          from: "PADO Boutique <orders@padoshop.com>", // Aapka verified domain
          to: body.customer_email,
          subject: `Order Confirmation - ${orderNumber}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
              <h2 style="font-family: serif; font-size: 24px;">Thank you for your order, ${body.customer_name.split(" ")[0]}!</h2>
              <p>We're pleased to confirm that we've received your order.</p>
              
              <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border: 1px solid #eee;">
                <p style="margin: 5px 0;"><strong>Order Number:</strong> ${orderNumber}</p>
                <p style="margin: 5px 0;"><strong>Item:</strong> ${body.model_name}</p>
                <p style="margin: 5px 0;"><strong>Fulfillment:</strong> ${isCustom ? "Made to Measure" : "Ready to Wear"}</p>
                ${isCustom ? `<p style="margin: 5px 0;"><strong>Fabric:</strong> ${body.fabric_name || 'Standard Selection'}</p>` : `<p style="margin: 5px 0;"><strong>Size:</strong> ${body.standard_size}</p>`}
                <p style="margin: 5px 0;"><strong>Total:</strong> $${body.total_price}</p>
              </div>

              <p>${isCustom ? "Our master tailors will begin crafting your bespoke garment. It will be dispatched within 3-4 weeks." : "Your order will be dispatched within 3-5 business days."}</p>
              
              <p>If you have any questions, just reply to this email or contact us on WhatsApp.</p>
              <br/>
              <p>Best regards,<br/>The PADO Boutique Team</p>
            </div>
          `,
        });
        console.log("Order confirmation email sent to:", body.customer_email);
      }
    } catch (emailErr) {
      console.error("Resend Email Failed:", emailErr);
      // Email fail ho jaye toh order fail na ho, isliye hum error throw nahi karenge
    }

    // 4. Order factory ko route karo (CJ ya Bespoke)
    const result = await routeOrder(order as OrderRecord);

    // 5. Update karo ke factory ko bhej diya gaya hai ya nahi
    await supabase
      .from("orders")
      .update({
        supplier_order_id: result.supplier_order_id || null,
        factory_status: result.success ? "submitted" : "failed",
        factory_submitted_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    // 6. Frontend ko response bhejo
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
