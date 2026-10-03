// app/api/orders/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Generate order number
    const orderNumber = `PADO-${Date.now().toString().slice(-6)}`;
    
    // Insert into Supabase
    const { data, error } = await supabase
      .from("orders")
      .insert({ ...body, order_number: orderNumber })
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    
    // Send emails
    await resend.emails.send({
      from: "PADO Boutique <orders@padoshop.com>",
      to: body.customer_email,
      subject: `Order Received — ${orderNumber}`,
      html: customerEmailHtml(body, orderNumber),
    });
    
    await resend.emails.send({
      from: "PADO Orders <orders@padoshop.com>",
      to: "orders@padoshop.com", // admin email
      subject: `New Order — ${orderNumber}`,
      html: adminEmailHtml(body, orderNumber),
    });
    
    return NextResponse.json({ success: true, order: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
