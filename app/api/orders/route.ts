// app/api/orders/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "orders@padoshop.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderNumber = `PADO-${Date.now().toString().slice(-6)}`;

    // Insert into Supabase
    const { data, error } = await supabase
      .from("orders")
      .insert({ ...body, order_number: orderNumber })
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Customer confirmation email
    try {
      await resend.emails.send({
        from: "PADO Boutique <onboarding@resend.dev>",
        to: body.customer_email,
        subject: `Order Received — ${orderNumber}`,
        html: customerHtml(body, orderNumber),
      });

      await resend.emails.send({
        from: "PADO Orders <onboarding@resend.dev>",
        to: ADMIN_EMAIL,
        subject: `New Order ${orderNumber} — ${body.customer_name}`,
        html: adminHtml(body, orderNumber),
      });
    } catch (emailErr) {
      console.error("Email error:", emailErr);
      // Order still saved — email failure doesn't stop the flow
    }

    return NextResponse.json({ success: true, order: data });
  } catch (err: any) {
    console.error("Order error:", err);
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

function customerHtml(data: any, orderNumber: string) {
  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
      <h1 style="font-size: 24px; letter-spacing: 4px; text-align: center; margin-bottom: 8px;">PADO BOUTIQUE</h1>
      <p style="text-align: center; font-size: 11px; letter-spacing: 3px; color: #666; margin-bottom: 40px;">ORDER CONFIRMATION</p>

      <p style="font-size: 14px; line-height: 1.6;">Dear ${data.customer_name},</p>
      <p style="font-size: 14px; line-height: 1.6;">Thank you for your order. We have received your request and will review it within 24 hours. You will receive payment instructions shortly.</p>

      <div style="background: #f5f5f5; padding: 20px; margin: 24px 0;">
        <p style="font-size: 11px; letter-spacing: 2px; color: #666; margin: 0 0 8px;">ORDER NUMBER</p>
        <p style="font-size: 18px; margin: 0; font-family: monospace;">${orderNumber}</p>
      </div>

      <p style="font-size: 14px;"><strong>Item:</strong> ${data.model_name}</p>
      <p style="font-size: 14px;"><strong>Fit:</strong> ${data.fit_type === "custom" ? "Custom Measurements" : `Standard Size (${data.standard_size})`}</p>
      <p style="font-size: 14px;"><strong>Total:</strong> $${data.total_price}</p>

      <p style="font-size: 14px; line-height: 1.6; margin-top: 32px;">Estimated delivery: ${data.fit_type === "custom" ? "3 weeks" : "7-10 days"}.</p>

      <p style="font-size: 12px; color: #666; margin-top: 40px;">Questions? Reply to this email or WhatsApp us at +1 (639) 384-0265.</p>
      <p style="font-size: 12px; color: #666;">— PADO Boutique</p>
    </div>
  `;
}

function adminHtml(data: any, orderNumber: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px;">
      <h2 style="color: #1a1a1a;">New Order — ${orderNumber}</h2>
      <p><strong>Customer:</strong> ${data.customer_name} (${data.customer_email})</p>
      <p><strong>Phone:</strong> ${data.customer_phone || "N/A"}</p>
      <p><strong>Country:</strong> ${data.customer_country || "N/A"}</p>
      <hr />
      <p><strong>Model:</strong> ${data.model_name}</p>
      <p><strong>Fit Type:</strong> ${data.fit_type}</p>
      ${data.standard_size ? `<p><strong>Size:</strong> ${data.standard_size}</p>` : ""}
      <p><strong>Fabric:</strong> ${data.fabric_name || data.fabric}</p>
      <p><strong>Lapel:</strong> ${data.lapel || "N/A"}</p>
      <p><strong>Buttons:</strong> ${data.buttons || "N/A"}</p>
      <p><strong>Pocket:</strong> ${data.pocket || "N/A"}</p>
      <p><strong>Fit:</strong> ${data.fit || "N/A"}</p>
      <p><strong>Lining:</strong> ${data.lining || "N/A"}</p>
      ${data.measurements ? `<hr /><p><strong>Measurements:</strong></p><pre style="background:#f5f5f5; padding:12px; font-size:12px;">${JSON.stringify(data.measurements, null, 2)}</pre>` : ""}
      <hr />
      <p><strong>Total:</strong> $${data.total_price} ${data.currency}</p>
      <p><strong>Notes:</strong> ${data.notes || "—"}</p>
    </div>
  `;
}
