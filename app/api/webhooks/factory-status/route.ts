// app/api/webhooks/factory-status/route.ts

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const WEBHOOK_SECRET = process.env.FACTORY_WEBHOOK_SECRET || "default_secret";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-factory-signature") || "";

    // 1. Verify HMAC Signature (Security Check)
    const expectedSignature = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const body = JSON.parse(rawBody);
    const { event, supplier_order_id, data } = body;

    if (!supplier_order_id) {
      return NextResponse.json({ error: "Missing supplier_order_id" }, { status: 400 });
    }

    // 2. Update order status in Supabase
    const updateData: any = {
      factory_status: event,
    };

    // Agar dispatched hai, toh tracking info save karo
    if (event === "DISPATCHED" && data) {
      updateData.courier_name = data.courier_name;
      updateData.tracking_number = data.tracking_number;
      updateData.estimated_delivery = data.estimated_delivery;
      updateData.shipped_at = new Date().toISOString();
    }

    const { data: order, error } = await supabase
      .from("orders")
      .update(updateData)
      .eq("supplier_order_id", supplier_order_id)
      .select()
      .single();

    if (error || !order) {
      console.error("Webhook order update failed:", error);
      return NextResponse.json({ error: "Order not found or update failed" }, { status: 404 });
    }

    // 3. Send Email via Resend on DISPATCHED
    if (event === "DISPATCHED" && order.customer_email) {
      try {
        await resend.emails.send({
          from: "PADO Boutique <orders@padoshop.com>", // Must be a verified domain in Resend
          to: order.customer_email,
          subject: `Your PADO Order #${order.order_number} has been dispatched!`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Great news, ${order.customer_name}!</h2>
              <p>Your order <strong>#${order.order_number}</strong> is on its way.</p>
              
              <div style="background-color: #f8f8f8; padding: 20px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Courier:</strong> ${data.courier_name || "N/A"}</p>
                <p style="margin: 5px 0;"><strong>Tracking Number:</strong> ${data.tracking_number || "N/A"}</p>
                <p style="margin: 5px 0;"><strong>Estimated Delivery:</strong> ${data.estimated_delivery || "N/A"}</p>
              </div>

              <p>You can track your order on our website at any time.</p>
              <br />
              <p>Thank you for choosing PADO Boutique.</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Resend email failed:", emailErr);
        // Email fail hone par bhi webhook ko 200 return karenge taake factory retry na kare
      }
    }

    return NextResponse.json({ success: true, received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
