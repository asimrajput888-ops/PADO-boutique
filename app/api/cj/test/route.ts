// app/api/cj/test/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.CJ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "CJ_API_KEY is missing in Vercel" }, { status: 500 });
    }

    // 1. CJ se Access Token generate karein
    const authRes = await fetch("https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey }),
    });
    
    const authData = await authRes.json();

    if (!authData.result) {
      return NextResponse.json({ error: "Authentication Failed", details: authData }, { status: 400 });
    }

    const token = authData.data.accessToken;

    // 2. Us token ka use karke Products fetch karein
    const productsRes = await fetch("https://developers.cjdropshipping.com/api2.0/v1/product/listV2?page=1&size=5", {
      method: "GET",
      headers: { 
        "CJ-Access-Token": token,
        "Content-Type": "application/json" 
      },
    });

    const productsData = await productsRes.json();

    // 3. Result return karein
    return NextResponse.json({
      success: true,
      message: "API Key is working perfectly!",
      token: token,
      products: productsData.data?.list || productsData
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
