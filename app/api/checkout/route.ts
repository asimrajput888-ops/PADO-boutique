// app/api/checkout/route.ts

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Data ko saaf (Sanitize) karein
    const email = body.customer_email?.trim();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid customer email is required" }, { status: 400 });
    }

    const modelName = body.model_name?.trim() || "PADO Premium Suit";
    
    // Price ko number mein convert karein (agar string mein $ laga hai toh hata dein)
    const priceString = String(body.total_price).replace(/[^0-9.]/g, '');
    const price = parseFloat(priceString);
    
    if (isNaN(price) || price <= 0) {
      return NextResponse.json({ error: `Invalid total price: ${body.total_price}` }, { status: 400 });
    }

    // 2. Stripe Session banayein
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: modelName,
              description: `Size: ${body.standard_size || "Standard"} | Type: ${body.fit_type || "Standard"}`,
            },
            unit_amount: Math.round(price * 100), // Cents mein
          },
          quantity: 1,
        },
      ],
      metadata: {
        customer_name: String(body.customer_name || "Unknown").substring(0, 100),
        customer_email: email,
        customer_phone: String(body.customer_phone || "").substring(0, 50),
        customer_country: String(body.customer_country || "CA").substring(0, 50),
        shipping_address: JSON.stringify(body.shipping_address || {}),
        fit_type: String(body.fit_type || "standard"),
        standard_size: String(body.standard_size || "").substring(0, 100),
        model_id: String(body.model_id || ""),
        model_name: modelName,
        category: String(body.category || "men"),
        product_type: String(body.product_type || "suit"),
        total_price: String(price),
        currency: "USD",
        notes: String(body.notes || "").substring(0, 200),
        cj_vid: String(body.cj_vid || ""), // 🔥 CJ ka Variant ID
      },
      success_url: `https://www.padoshop.com/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://www.padoshop.com/shop`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe 400 Error Details:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
