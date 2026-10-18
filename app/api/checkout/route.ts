// app/api/checkout/route.ts

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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
            unit_amount: Math.round(body.total_price * 100),
          },
          quantity: 1,
        },
      ],
      // 🔥 FIX: Order data ko alag-alag fields mein baant dein
      metadata: {
        customer_name: body.customer_name,
        customer_email: body.customer_email,
        customer_phone: body.customer_phone || "",
        customer_country: body.customer_country,
        shipping_address: JSON.stringify(body.shipping_address), // Ye aam taur par 500 se kam hota hai
        fit_type: body.fit_type,
        standard_size: body.standard_size || "",
        model_id: String(body.model_id),
        model_name: body.model_name,
        category: body.category || "men",
        product_type: body.product_type || "suit",
        total_price: String(body.total_price),
        currency: body.currency || "USD",
        notes: body.notes || "",
        // Custom orders ke liye (agar zaroorat ho, inhe bhi chhote hisson mein baant sakte hain)
        // measurements: JSON.stringify(body.measurements || {}), 
        // fabric_id: String(body.fabric_id || ""),
        // fabric_name: body.fabric_name || "",
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
