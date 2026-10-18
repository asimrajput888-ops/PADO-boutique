// app/api/cj/sync/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const apiKey = process.env.CJ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "CJ_API_KEY is missing" }, { status: 500 });
    }

    // 1. Access Token generate karein
    const authRes = await fetch("https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey }),
    });
    const authData = await authRes.json();
    const token = authData.data.accessToken;

    // 2. SAHI ENDPOINT: product/listV2
    // Note: keyWord mein capital 'W' hai, aur features mein description/category maang rahe hain
    const url = `https://developers.cjdropshipping.com/api2.0/v1/product/listV2?page=1&size=20&keyWord=suit&features=enable_description,enable_category`;
    
    const productsRes = await fetch(url, {
      method: "GET",
      headers: { 
        "CJ-Access-Token": token,
        "Content-Type": "application/json" 
      },
    });
    
    const productsData = await productsRes.json();

    // 3. Sahi response structure se data nikalein
    // CJ ka response: data.content[] -> har item ke andar productList[]
    let cjProducts = [];
    if (productsData.data && productsData.data.content) {
      // Saare pages ke products ko flatten karein
      productsData.data.content.forEach((page) => {
        if (page.productList) {
          cjProducts = cjProducts.concat(page.productList);
        }
      });
    }

    if (cjProducts.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: "No products found for 'suit'",
        rawResponse: productsData
      });
    }

    let syncedCount = 0;

    // 4. Supabase mein save karein
    for (const p of cjProducts) {
      const productToSave = {
        name: p.nameEn || p.name || "CJ Suit",
        price: parseFloat(p.sellPrice) || 0,
        image_url: p.bigImage || "",
        description: p.description || "Premium Ready to Wear Suit",
        supplier: "cj", 
        category: "men", 
        product_type: "suit",
        cj_product_id: p.id, // Product ID field ka naam 'id' hai
      };

      const { error } = await supabase
        .from("models")
        .upsert(productToSave, { onConflict: "cj_product_id" });

      if (!error) syncedCount++;
      else console.error("Error saving product:", error);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${syncedCount} products from CJ!`,
      totalFound: cjProducts.length
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
