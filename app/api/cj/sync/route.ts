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

    // 2. Products fetch karein (Filhaal sirf 20 products test ke liye)
    const productsRes = await fetch("https://developers.cjdropshipping.com/api2.0/v1/product/listV2?page=1&size=20", {
      method: "GET",
      headers: { "CJ-Access-Token": token },
    });
    const productsData = await productsRes.json();
    const cjProducts = productsData.data?.list || [];

    if (cjProducts.length === 0) {
      return NextResponse.json({ success: false, message: "No products found from CJ" });
    }

    let syncedCount = 0;

    // 3. Ek-ek karke Supabase mein save karein
    for (const p of cjProducts) {
      // CJ ke data ko hamare database ke format mein map karein
      const productToSave = {
        name: p.productNameEn || p.productName || "CJ Product",
        price: parseFloat(p.sellPrice) || 0,
        image_url: p.productImage || "",
        description: p.description || "Premium Ready to Wear Suit",
        supplier: "cj", 
        category: "men", // Filhaal sabko men's mein daal rahe hain, baad mein logic laga sakte hain
        product_type: "suit",
        cj_product_id: p.pid, // Ye bahut zaroori hai order bhejne ke liye
      };

      // Supabase mein insert ya update karein (Agar pehle se hai toh update kar dega)
      const { error } = await supabase
        .from("models")
        .upsert(productToSave, { onConflict: "cj_product_id" });

      if (!error) syncedCount++;
      else console.error("Error saving product:", error);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${syncedCount} products from CJ to your database!`,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
