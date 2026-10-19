// app/api/webhooks/stripe/route.ts

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { routeOrder } from "@/lib/fulfillment/router";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });
const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata || {};
    
    const orderData = {
      customer_name: meta.customer_name || "Unknown",
      customer_email: meta.customer_email || session.customer_email || "",
      customer_phone: meta.customer_phone || "",
      customer_country: meta.customer_country || "",
      shipping_address: JSON.parse(meta.shipping_address || "{}"),
      fit_type: meta.fit_type || "standard",
      standard_size: meta.standard_size || null,
      model_id: meta.model_id || "",
      model_name: meta.model_name || "Unknown Product",
      category: meta.category || "men",
      product_type: meta.product_type || "suit",
      total_price: Number(meta.total_price) || 0,
      currency: meta.currency || "USD",
      notes: meta.notes || "Stripe Order",
      status: "paid", 
      cj_vid: meta.cj_vid || null, // 🔥 IMPORTANT: CJ Variant ID
    };

    // 1. Save order in Supabase
    const orderNumber = `PADO-${Date.now().toString().slice(-6)}`;
    
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        customer_country: orderData.customer_country,
        shipping_address: orderData.shipping_address,
        fit_type: orderData.fit_type,
        standard_size: orderData.standard_size,
        model_id: orderData.model_id,
        model_name: orderData.model_name,
        category: orderData.category,
        product_type: orderData.product_type,
        measurements: null,
        total_price: orderData.total_price,
        currency: orderData.currency,
        notes: orderData.notes,
        status: orderData.status,
        cj_vid: orderData.cj_vid, // Save for future reference
      })
      .select()
      .single();

    if (error || !order) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
    }

    // 2. Route to Factory (CJ or Bespoke)
    // Hum order object mein cj_vid daal rahe hain taake adapter use kar sake
    const result = await routeOrder({ ...order, cj_vid: orderData.cj_vid } as any);

    await supabase
      .from("orders")
      .update({
        supplier_order_id: result.supplier_order_id || null,
        factory_status: result.success ? "submitted" : "failed",
        factory_submitted_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    // 3. Email
    try {
      if (orderData.customer_email) {
        await resend.emails.send({
          from: "PADO Boutique <orders@padoshop.com>",
          to: orderData.customer_email,
          subject: `Payment Confirmed - Order ${orderNumber}`,
          html: `<h2>Payment Successful!</h2><p>Thank you, ${orderData.customer_name}. Your Order ${orderNumber} is confirmed.</p>`,
        });
      }
    } catch (emailErr) {
      console.error("Email error:", emailErr);
    }
  }

  return NextResponse.json({ received: true });
}
