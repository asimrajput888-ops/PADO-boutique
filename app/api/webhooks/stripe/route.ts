// app/api/webhooks/stripe/route.ts

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { routeOrder } from "@/lib/fulfillment/router";
import { Resend } from "resend";

// Stripe aur Resend initialize karein
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});
const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Jab payment successful ho jaye
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Metadata se details nikalein
    const meta = session.metadata || {};
    
    // Order Data banayein
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
    };

    // 1. Supabase mein order save karein
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
        measurements: null, // Filhaal custom ke liye null, baad mein metadata se add karenge
        total_price: orderData.total_price,
        currency: orderData.currency,
        notes: orderData.notes,
        status: orderData.status,
      })
      .select()
      .single();

    if (error || !order) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json({ error: "Failed to save order in DB" }, { status: 500 });
    }

    // 2. Factory ko route karein (CJ / Bespoke)
    try {
      const result = await routeOrder(order as any);

      await supabase
        .from("orders")
        .update({
          supplier_order_id: result.supplier_order_id || null,
          factory_status: result.success ? "submitted" : "failed",
          factory_submitted_at: new Date().toISOString(),
        })
        .eq("id", order.id);
    } catch (routeErr) {
      console.error("Factory Routing Error:", routeErr);
    }

    // 3. Customer ko Email bhejein
    try {
      if (orderData.customer_email) {
        await resend.emails.send({
          from: "PADO Boutique <orders@padoshop.com>",
          to: orderData.customer_email,
          subject: `Payment Confirmed - Order ${orderNumber}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
              <h2 style="font-family: serif; font-size: 24px;">Payment Successful!</h2>
              <p>Thank you, ${orderData.customer_name.split(" ")[0]}. We have received your payment.</p>
              
              <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border: 1px solid #eee;">
                <p style="margin: 5px 0;"><strong>Order Number:</strong> ${orderNumber}</p>
                <p style="margin: 5px 0;"><strong>Item:</strong> ${orderData.model_name}</p>
                <p style="margin: 5px 0;"><strong>Total Paid:</strong> $${orderData.total_price}</p>
              </div>
              <p>We will notify you with tracking details once your order is dispatched.</p>
              <br/>
              <p>Best regards,<br/>The PADO Boutique Team</p>
            </div>
          `,
        });
      }
    } catch (emailErr) {
      console.error("Resend Email Failed:", emailErr);
    }
  }

  return NextResponse.json({ received: true });
}
