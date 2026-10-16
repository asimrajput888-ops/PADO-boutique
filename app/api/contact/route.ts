// app/api/contact/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Save to Supabase (for records)
    const { error: dbError } = await supabase.from("contact_messages").insert({
      name,
      email,
      phone: phone || null,
      subject: subject || "General Inquiry",
      message,
      status: "new",
    });

    if (dbError) {
      console.error("DB save failed:", dbError);
      // Continue anyway — email is more important
    }

    // Send email to admin (from verified domain)
    const adminEmail = process.env.ADMIN_EMAIL || "orders@padoshop.com";

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "PADO Contact <orders@padoshop.com>",
      to: adminEmail,
      replyTo: email,
      subject: `[Contact] ${subject || "New Message"} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A0A0A; border-bottom: 1px solid #E5E0D8; padding-bottom: 16px;">
            New Contact Message
          </h2>
          
          <table style="width: 100%; margin: 24px 0;">
            <tr>
              <td style="padding: 8px 0; color: #6B6B6B; width: 100px;">Name:</td>
              <td style="padding: 8px 0; color: #0A0A0A;"><strong>${name}</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B6B6B;">Email:</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${email}" style="color: #8B7355;">${email}</a>
              </td>
            </tr>
            ${
              phone
                ? `
            <tr>
              <td style="padding: 8px 0; color: #6B6B6B;">Phone:</td>
              <td style="padding: 8px 0; color: #0A0A0A;">${phone}</td>
            </tr>`
                : ""
            }
            ${
              subject
                ? `
            <tr>
              <td style="padding: 8px 0; color: #6B6B6B;">Subject:</td>
              <td style="padding: 8px 0; color: #0A0A0A;">${subject}</td>
            </tr>`
                : ""
            }
          </table>

          <div style="background: #F7F5F0; padding: 20px; border-left: 3px solid #8B7355; margin: 24px 0;">
            <p style="color: #3D3D3D; line-height: 1.7; white-space: pre-wrap; margin: 0;">${message}</p>
          </div>

          <p style="color: #6B6B6B; font-size: 12px; margin-top: 32px;">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Admin email failed:", emailError);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    // Send auto-reply to customer
    const { error: replyError } = await resend.emails.send({
      from: "PADO Boutique <orders@padoshop.com>",
      to: email,
      subject: "We received your message — PADO Boutique",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A0A0A; font-family: Georgia, serif; font-size: 24px;">
            Thank you, ${name.split(" ")[0]}.
          </h2>
          
          <p style="color: #3D3D3D; line-height: 1.7;">
            We've received your message and our team will get back to you within 24 hours.
          </p>

          <div style="background: #F7F5F0; padding: 20px; margin: 24px 0;">
            <p style="color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">
              Your message
            </p>
            <p style="color: #3D3D3D; line-height: 1.7; white-space: pre-wrap; margin: 0;">${message}</p>
          </div>

          <p style="color: #3D3D3D; line-height: 1.7;">
            If you have any urgent questions, feel free to reach us on WhatsApp:
            <a href="https://wa.me/16393840265" style="color: #8B7355;">+1 (639) 384-0265</a>
          </p>

          <p style="color: #6B6B6B; font-size: 12px; margin-top: 32px; border-top: 1px solid #E5E0D8; padding-top: 16px;">
            PADO Boutique — Bespoke Tailoring<br>
            <a href="https://www.padoshop.com" style="color: #8B7355;">www.padoshop.com</a>
          </p>
        </div>
      `,
    });

    if (replyError) {
      console.error("Auto-reply failed:", replyError);
      // Don't fail the whole request — admin email went through
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      emailId: emailData?.id,
    });
  } catch (err: any) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to send message" },
      { status: 500 }
    );
  }
}
