// app/api/cj/sync/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const apiKey = process.env.CJ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "CJ_API_KEY is missing" }, { status: 500 });
    }

    // 1. Access Token
    const authRes = await fetch("https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey }),
    });
    const authData = await authRes.json();
    const token = authData.data.accessToken;

    // 2. DIRECT MARKETPLACE SEARCH (Suit Search)
    // Humne keyword "suit" dala hai taake marketplace se products aayen
    const productsRes = await fetch("https://developers.cjdropshipping.com/api2.0/v1/product/global/query", {
      method: "POST",
      headers: { 
        "CJ-Access-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        page: 1,
        size: 20,
        productName: "suit" // Yahan "suit" search kar rahe hain
      })
    });
    
    const productsData = await productsRes.json();
    
    // Agar API response mein list hai
    const cjProducts = productsData.data?.list || productsData.data?.content || [];

    if (!cjProducts || cjProducts.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: "No products found in marketplace for 'suit'",
        rawResponse: productsData // Debugging ke liye (agar aur error aaye)
      });
    }

    let syncedCount = 0;

    // 3. Supabase mein save karein
    for (const p of cjProducts) {
      const productToSave = {
        name: p.productNameEn || p.productName || "CJ Suit",
        price: parseFloat(p.sellPrice) || 0,
        image_url: p.productImage || "",
        description: p.description || "Premium Ready to Wear Suit",
        supplier: "cj", 
        category: "men", 
        product_type: "suit",
        cj_product_id: p.pid || p.productId, // Product ID
      };

      const { error } = await supabase
        .from("models")
        .upsert(productToSave, { onConflict: "cj_product_id" });

      if (!error) syncedCount++;
      else console.error("Error saving product:", error);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${syncedCount} products from CJ Marketplace!`,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
