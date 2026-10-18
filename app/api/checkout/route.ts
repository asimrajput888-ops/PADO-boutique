// app/api/checkout/route.ts

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Stripe ko initialize karein
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Stripe Checkout Session create karein
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: body.customer_email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: body.model_name,
              description: `Size: ${body.standard_size || "Custom"} | Fabric: ${body.fabric_name || "N/A"}`,
            },
            unit_amount: Math.round(body.total_price * 100), // Amount cents mein hota hai
          },
          quantity: 1,
        },
      ],
      // Order ki details metadata mein save kar rahe hain taake payment ke baad webhook use database mein save kar sake
      metadata: {
        orderData: JSON.stringify(body),
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.padoshop.com"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.padoshop.com"}/shop`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
