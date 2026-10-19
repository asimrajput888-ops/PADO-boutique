// app/api/cj/sync/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const apiKey = process.env.CJ_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "CJ_API_KEY is missing" }, { status: 500 });

    // 1. Access Token
    const authRes = await fetch("https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ apiKey }),
    });
    const authData = await authRes.json();
    const token = authData.data.accessToken;

    // 2. CJ API Call
    const url = `https://developers.cjdropshipping.com/api2.0/v1/product/listV2?page=1&size=20&keyWord=suit`;
    const productsRes = await fetch(url, {
      method: "GET", headers: { "CJ-Access-Token": token, "Content-Type": "application/json" },
    });
    const productsData = await productsRes.json();

    let cjProducts: any[] = [];
    if (productsData.data && productsData.data.content) {
      productsData.data.content.forEach((page: any) => {
        if (page.productList) cjProducts = cjProducts.concat(page.productList);
      });
    }

    if (cjProducts.length === 0) return NextResponse.json({ success: false, message: "No products found" });

    let syncedCount = 0;
    let errors: any[] = [];

    // 3. Supabase mein save karein
    for (const p of cjProducts) {
      const productToSave = {
        name: p.nameEn || p.name || "CJ Suit",
        price: parseFloat(p.sellPrice) || 0,
        image_url: p.bigImage || "",
        description: p.description || "Premium Ready to Wear Suit",
        supplier: "cj", 
        category: "men", 
        product_type: "suit",
        cj_product_id: String(p.id || p.pid), // Ensure ID string format mein ho
      };

      const { error } = await supabase
        .from("models")
        .upsert(productToSave, { onConflict: "cj_product_id" });

      if (error) {
        // Agar error aaye toh usko list mein save karein
        errors.push({ 
          cj_product_id: p.id, 
          error_message: error.message, 
          error_details: error.details,
          error_hint: error.hint 
        });
      } else {
        syncedCount++;
      }
    }

    // 4. Result return karein (Errors ke sath)
    return NextResponse.json({
      success: true,
      message: `Synced ${syncedCount} products.`,
      totalFound: cjProducts.length,
      // Agar 0 synced hue hain toh yeh array exact error batayega
      errors: errors.length > 0 ? errors : "No errors found", 
      // Pehla product kaisa dikh raha hai wo bhi print kar rahe hain
      sample_payload: cjProducts[0] 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
