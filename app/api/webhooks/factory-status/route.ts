// app/api/webhooks/factory-status/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyWebhookSignature } from "@/lib/factory/webhook-verify";
import { FactoryWebhookPayload } from "@/lib/factory/types";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

async function handleInProduction(payload: FactoryWebhookPayload) {
  await supabase
    .from("orders")
    .update({
      factory_status: "IN_PRODUCTION",
      status: "In Production",
      updated_at: new Date().toISOString(),
    })
    .eq("supplier_order_id", payload.supplier_order_id);

  console.log(`Order ${payload.order_id} is now in production`);
}

async function handleDispatched(payload: FactoryWebhookPayload) {
  const { courier_name, tracking_number, estimated_delivery } = payload.data;

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("supplier_order_id", payload.supplier_order_id)
    .single();

  if (!order) {
    console.error(`Order not found: ${payload.supplier_order_id}`);
    return;
  }

  await supabase
    .from("orders")
    .update({
      factory_status: "DISPATCHED",
      status: "Shipped",
      courier_name: courier_name || "",
      tracking_number: tracking_number || "",
      estimated_delivery: estimated_delivery || null,
      shipped_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("supplier_order_id", payload.supplier_order_id);

  await resend.emails.send({
    from: "PADO Boutique <orders@padoshop.com>",
    to: order.customer_email,
    subject: `Your PADO order has been dispatched — ${tracking_number}`,
    html: `
      <h2>Your order is on its way</h2>
      <p>Hi ${order.customer_name.split(" ")[0]},</p>
      <p>Great news — your bespoke order has been dispatched from our atelier.</p>
      <p><strong>Courier:</strong> ${courier_name}</p>
      <p><strong>Tracking Number:</strong> ${tracking_number}</p>
      <p>You can track your order at: <a href="https://www.padoshop.com/track-order">Track Your Order</a></p>
      <p>Thank you for choosing PADO BOUTIQUE.</p>
    `,
  });
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();

    const signature = request.headers.get("x-factory-signature");

    if (!verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const payload: FactoryWebhookPayload = JSON.parse(rawBody);

    await supabase.from("factory_logs").insert({
      event_type: `WEBHOOK_${payload.event}`,
      payload: rawBody,
      status: "received",
    });

    switch (payload.event) {
      case "IN_PRODUCTION":
        await handleInProduction(payload);
        break;
      case "DISPATCHED":
        await handleDispatched(payload);
        break;
      default:
        console.log(`Unknown event: ${payload.event}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
