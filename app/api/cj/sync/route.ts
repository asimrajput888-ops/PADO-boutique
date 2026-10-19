// app/api/cj/sync/route.ts (DEBUG CODE)

import { NextResponse } from "next/server";

const PRODUCT_IDS = ["2084517420358029314"]; // <-- Apni ID yahan rakhein

export async function GET() {
  try {
    const apiKey = process.env.CJ_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "CJ_API_KEY is missing" }, { status: 500 });

    const authRes = await fetch("https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ apiKey }),
    });
    const authData = await authRes.json();
    const token = authData.data.accessToken;

    const detailRes = await fetch(`https://developers.cjdropshipping.com/api2.0/v1/product/query?pid=${PRODUCT_IDS[0]}`, {
      method: "GET", headers: { "CJ-Access-Token": token, "Content-Type": "application/json" },
    });
    const detailData = await detailRes.json();
    const productDetail = detailData.data;

    // Hum sirf pehla variant dekhna chahte hain
    const firstVariant = productDetail?.variants?.[0];

    return NextResponse.json({ 
      message: "Debug Data",
      debug_first_variant: firstVariant 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
