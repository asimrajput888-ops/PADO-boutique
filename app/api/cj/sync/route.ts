// app/api/cj/sync/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const apiKey = process.env.CJ_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "CJ_API_KEY is missing" }, { status: 500 });

    // 1. Access Token generate karein
    const authRes = await fetch("https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken", {
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ apiKey }),
    });
    const authData = await authRes.json();
    const token = authData.data.accessToken;

    // 2. CJ API Call (Suit search)
    const url = `https://developers.cjdropshipping.com/api2.0/v1/product/listV2?page=1&size=20&keyWord=suit`;
    const productsRes = await fetch(url, {
      method: "GET", 
      headers: { "CJ-Access-Token": token, "Content-Type": "application/json" },
    });
    const productsData = await productsRes.json();

    let cjProducts: any[] = [];
    if (productsData.data && productsData.data.content) {
      productsData.data.content.forEach((page: any) => {
        if (page.productList) cjProducts = cjProducts.concat(page.productList);
      });
    }

    if (cjProducts.length === 0) {
      return NextResponse.json({ success: false, message: "No products found" });
    }

    let syncedCount = 0;
    let errors: any[] = [];

    // 3. Supabase mein save karein
    for (const p of cjProducts) {
      const productToSave = {
        name: p.nameEn || p.name || "CJ Suit",
        // Price ko Number mein convert kar rahe hain taake decimal (43.12) sahi save ho
        price: Number(p.sellPrice) || 0, 
        image_url: p.bigImage || "",
        description: p.description || "Premium Ready to Wear Suit",
        supplier: "cj", 
        category: "men", 
        product_type: "suit",
        cj_product_id: String(p.id || p.pid), 
      };

      const { error } = await supabase
        .from("models")
        .upsert(productToSave, { onConflict: "cj_product_id" });

      if (error) {
        console.error("Supabase Error for Product ID", p.id, ":", error.message);
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

    // 4. Result return karein
    return NextResponse.json({
      success: true,
      message: `Synced ${syncedCount} products out of ${cjProducts.length}.`,
      errors: errors.length > 0 ? errors : "No errors found",
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
