// app/api/cj/sync/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const apiKey = process.env.CJ_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "CJ_API_KEY is missing" }, { status: 500 });

    const authRes = await fetch("https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ apiKey }),
    });
    const authData = await authRes.json();
    const token = authData.data.accessToken;

    // Hum abhi "women suit" search kar rahe hain taake products aayen
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

    let syncedCount = 0;
    let errors: any[] = [];

    for (const p of cjProducts) {
      const productName = p.nameEn || p.name || "Premium Suit";
      
      // 1. Title ko chhota aur clean karein (sirf pehle 50 characters)
      const cleanTitle = productName.length > 50 ? productName.substring(0, 50).trim() + "..." : productName;

      // 2. Auto-detect Gender (Agar naam mein women/dress/skirt hai toh women, warna men)
      const lowerName = productName.toLowerCase();
      const isWomen = lowerName.includes("women") || lowerName.includes("dress") || lowerName.includes("skirt") || lowerName.includes("blouse");
      const category = isWomen ? "women" : "men";

      // 3. PRICE MARKUP (CJ Price ka 4.5x)
      const cjPrice = Number(p.sellPrice) || 0;
      const finalSellingPrice = Math.ceil(cjPrice * 4.5); 

      const productToSave = {
        name: cleanTitle,
        price: finalSellingPrice, // Naya markup wala price
        image_url: p.bigImage || "",
        description: p.description || "Premium Ready to Wear Suit crafted with high-quality fabric.",
        supplier: "cj", 
        category: category, // Ab sahi category mein jayega
        product_type: "suit",
        cj_product_id: String(p.id || p.pid), 
      };

      const { error } = await supabase
        .from("models")
        .upsert(productToSave, { onConflict: "cj_product_id" });

      if (error) {
        errors.push({ id: p.id, error: error.message });
      } else {
        syncedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Synced ${syncedCount} products.`,
      errors: errors.length > 0 ? errors : "No errors"
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
