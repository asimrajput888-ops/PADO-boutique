// app/api/orders/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "padoboutique@gmail.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderNumber = `PADO-${Date.now().toString().slice(-6)}`;

    // 1. Save order to Supabase
    const { data, error } = await supabase
      .from("orders")
      .insert({ ...body, order_number: orderNumber })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. Send emails (silent fail — order already saved)
    try {
      // Customer confirmation
      await resend.emails.send({
        from: "PADO Boutique <onboarding@resend.dev>",
        to: body.customer_email,
        subject: `Order Received — ${orderNumber}`,
        html: customerHtml(body, orderNumber),
      });

      // Admin notification
      await resend.emails.send({
        from: "PADO Orders <onboarding@resend.dev>",
        to: ADMIN_EMAIL,
        subject: `New Order ${orderNumber} — ${body.customer_name}`,
        html: adminHtml(body, orderNumber),
      });
    } catch (emailErr) {
      console.error("Email error (order still saved):", emailErr);
    }

    return NextResponse.json({
      success: true,
      order: data,
      order_number: orderNumber,
    });
  } catch (err: any) {
    console.error("Order API error:", err);
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

// ============================================
// CUSTOMER EMAIL
// ============================================
function customerHtml(data: any, orderNumber: string) {
  const fitDisplay =
    data.fit_type === "custom"
      ? "Custom Measurements"
      : `Standard Size ${data.standard_size || ""}`;

  const timeline =
    data.fit_type === "custom" ? "3 weeks" : "7–10 days";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin:0; padding:0; background:#f5f5f5; font-family: Georgia, 'Times New Roman', serif;">
      <div style="max-width:600px; margin:0 auto; background:#ffffff; padding:48px 32px;">
        
        <h1 style="font-size:22px; letter-spacing:6px; text-align:center; color:#1a1a1a; margin:0 0 8px; font-weight:normal;">
          PADO BOUTIQUE
        </h1>
        <p style="text-align:center; font-size:10px; letter-spacing:3px; color:#999; margin:0 0 40px; text-transform:uppercase; font-family:Arial, sans-serif;">
          Order Confirmation
        </p>

        <p style="font-size:14px; line-height:1.7; color:#1a1a1a; margin:0 0 16px;">
          Dear ${data.customer_name},
        </p>
        <p style="font-size:14px; line-height:1.7; color:#1a1a1a; margin:0 0 24px;">
          Thank you for your order. We have received your request and will review it within 24 hours. You will receive payment instructions by email shortly.
        </p>

        <div style="background:#fafafa; border:1px solid #e5e5e5; padding:20px; margin:24px 0; text-align:center;">
          <p style="font-size:10px; letter-spacing:2px; color:#999; margin:0 0 8px; text-transform:uppercase; font-family:Arial, sans-serif;">
            Order Number
          </p>
          <p style="font-size:18px; margin:0; font-family:'Courier New', monospace; color:#1a1a1a; letter-spacing:2px;">
            ${orderNumber}
          </p>
        </div>

        <table style="width:100%; border-collapse:collapse; margin:24px 0;">
          <tr>
            <td style="padding:10px 0; font-size:13px; color:#666; font-family:Arial, sans-serif;">Item</td>
            <td style="padding:10px 0; font-size:13px; color:#1a1a1a; text-align:right; font-family:Arial, sans-serif;">${data.model_name}</td>
          </tr>
          <tr>
            <td style="padding:10px 0; font-size:13px; color:#666; border-top:1px solid #e5e5e5; font-family:Arial, sans-serif;">Fit</td>
            <td style="padding:10px 0; font-size:13px; color:#1a1a1a; text-align:right; border-top:1px solid #e5e5e5; font-family:Arial, sans-serif;">${fitDisplay}</td>
          </tr>
          <tr>
            <td style="padding:10px 0; font-size:13px; color:#666; border-top:1px solid #e5e5e5; font-family:Arial, sans-serif;">Fabric</td>
            <td style="padding:10px 0; font-size:13px; color:#1a1a1a; text-align:right; border-top:1px solid #e5e5e5; font-family:Arial, sans-serif;">${data.fabric_name || data.fabric || "—"}</td>
          </tr>
          <tr>
            <td style="padding:14px 0 0; font-size:13px; color:#666; border-top:2px solid #1a1a1a; font-family:Arial, sans-serif; font-weight:bold;">Total</td>
            <td style="padding:14px 0 0; font-size:16px; color:#1a1a1a; text-align:right; border-top:2px solid #1a1a1a; font-family:Arial, sans-serif; font-weight:bold;">$${data.total_price} ${data.currency || "USD"}</td>
          </tr>
        </table>

        <p style="font-size:13px; line-height:1.7; color:#666; margin:32px 0 0; font-family:Arial, sans-serif;">
          Estimated delivery: <strong style="color:#1a1a1a;">${timeline}</strong>
        </p>

        <div style="border-top:1px solid #e5e5e5; margin:40px 0 24px;"></div>

        <p style="font-size:12px; line-height:1.7; color:#999; margin:0 0 8px; font-family:Arial, sans-serif;">
          Questions? Reply to this email or WhatsApp us at <strong style="color:#1a1a1a;">+1 (639) 384-0265</strong>.
        </p>
        <p style="font-size:12px; color:#999; margin:0; font-family:Arial, sans-serif;">
          — PADO Boutique
        </p>

      </div>
    </body>
    </html>
  `;
}

// ============================================
// ADMIN EMAIL
// ============================================
function adminHtml(data: any, orderNumber: string) {
  const measurementsBlock = data.measurements
    ? `
      <h3 style="font-size:14px; color:#1a1a1a; margin:24px 0 12px; font-family:Arial, sans-serif;">Measurements</h3>
      <table style="width:100%; border-collapse:collapse; font-size:13px; font-family:Arial, sans-serif;">
        ${Object.entries(data.measurements)
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding:6px 0; color:#666; text-transform:capitalize;">${k}</td>
            <td style="padding:6px 0; color:#1a1a1a; text-align:right; font-weight:500;">${v || "—"}</td>
          </tr>
        `
          )
          .join("")}
      </table>
    `
    : "";

  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family:Arial, sans-serif; background:#f5f5f5; padding:20px; margin:0;">
      <div style="max-width:640px; margin:0 auto; background:#ffffff; padding:32px;">
        
        <h2 style="color:#1a1a1a; margin:0 0 4px; font-size:20px;">
          New Order — ${orderNumber}
        </h2>
        <p style="color:#666; font-size:13px; margin:0 0 24px;">
          ${new Date().toLocaleString("en-US", { timeZone: "UTC" })} UTC
        </p>

        <div style="background:#fafafa; border-left:3px solid #1a1a1a; padding:16px; margin:20px 0;">
          <p style="margin:0 0 8px; font-size:13px;"><strong>Customer:</strong> ${data.customer_name}</p>
          <p style="margin:0 0 8px; font-size:13px;"><strong>Email:</strong> <a href="mailto:${data.customer_email}" style="color:#1a1a1a;">${data.customer_email}</a></p>
          <p style="margin:0 0 8px; font-size:13px;"><strong>Phone:</strong> ${data.customer_phone || "—"}</p>
          <p style="margin:0; font-size:13px;"><strong>Country:</strong> ${data.customer_country || "—"}</p>
        </div>

        <h3 style="font-size:14px; color:#1a1a1a; margin:24px 0 12px;">Order Details</h3>
        <table style="width:100%; border-collapse:collapse; font-size:13px;">
          <tr><td style="padding:6px 0; color:#666;">Model</td><td style="padding:6px 0; text-align:right; font-weight:500;">${data.model_name}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Category</td><td style="padding:6px 0; text-align:right; text-transform:capitalize;">${data.category}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Type</td><td style="padding:6px 0; text-align:right; text-transform:capitalize;">${data.product_type}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Fit Type</td><td style="padding:6px 0; text-align:right; font-weight:500;">${data.fit_type === "custom" ? "Custom Measurements" : "Standard Size"}</td></tr>
          ${data.standard_size ? `<tr><td style="padding:6px 0; color:#666;">Size</td><td style="padding:6px 0; text-align:right;">${data.standard_size}</td></tr>` : ""}
          <tr><td style="padding:6px 0; color:#666;">Fabric</td><td style="padding:6px 0; text-align:right;">${data.fabric_name || data.fabric || "—"}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Lapel</td><td style="padding:6px 0; text-align:right;">${data.lapel || "—"}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Buttons</td><td style="padding:6px 0; text-align:right;">${data.buttons || "—"}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Pocket</td><td style="padding:6px 0; text-align:right;">${data.pocket || "—"}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Fit</td><td style="padding:6px 0; text-align:right;">${data.fit || "—"}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Vent</td><td style="padding:6px 0; text-align:right;">${data.vent || "—"}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Lining</td><td style="padding:6px 0; text-align:right;">${data.lining || "—"}</td></tr>
          <tr><td style="padding:6px 0; color:#666;">Vest</td><td style="padding:6px 0; text-align:right;">${data.vest || "—"}</td></tr>
          <tr><td style="padding:12px 0 0; color:#666; border-top:2px solid #1a1a1a; font-weight:bold;">Total</td><td style="padding:12px 0 0; text-align:right; border-top:2px solid #1a1a1a; font-weight:bold; font-size:15px;">$${data.total_price} ${data.currency || "USD"}</td></tr>
        </table>

        ${measurementsBlock}

        ${data.notes ? `
          <h3 style="font-size:14px; color:#1a1a1a; margin:24px 0 8px;">Customer Notes</h3>
          <p style="background:#fafafa; padding:12px; font-size:13px; color:#1a1a1a; margin:0; border-left:2px solid #999;">
            ${data.notes}
          </p>
        ` : ""}

        <div style="border-top:1px solid #e5e5e5; margin:32px 0 16px;"></div>

        <p style="font-size:12px; color:#999; margin:0;">
          Reply to this email to contact the customer directly.
        </p>

      </div>
    </body>
    </html>
  `;
}
