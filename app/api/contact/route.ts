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

    // Save to Supabase
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
    }

    // Send email to admin — use onboarding@resend.dev for now
    const adminEmail = process.env.ADMIN_EMAIL || "asim.rajput888@gmail.com";

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "PADO Contact <onboarding@resend.dev>",
      to: adminEmail,
      replyTo: email,
      subject: `[Contact] ${subject || "New Message"} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A0A0A; border-bottom: 1px solid #E5E0D8; padding-bottom: 16px;">
            New Contact Message
          </h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
          <div style="background: #F7F5F0; padding: 20px; border-left: 3px solid #8B7355; margin: 24px 0;">
            <p style="color: #3D3D3D; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    if (emailError) {
      console.error("Email send failed:", emailError);
      return NextResponse.json(
        { error: "Email failed: " + JSON.stringify(emailError) },
        { status: 500 }
      );
    }

    console.log("Email sent:", emailData);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      emailId: emailData?.id,
    });
  } catch (err: any) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to send" },
      { status: 500 }
    );
  }
}
