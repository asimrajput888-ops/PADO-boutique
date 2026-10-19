// app/api/cj/sync/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// HTML tags remove karne ka function
function stripHtml(html: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '').trim();
}

export async function GET() {
  try {
    const apiKey = process.env.CJ_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "CJ_API_KEY is missing" }, { status: 500 });

    const authRes = await fetch("https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ apiKey }),
    });
    const authData = await authRes.json();
    const token = authData.data.accessToken;

    // 15 products fetch kar rahe hain
    const url = `https://developers.cjdropshipping.com/api2.0/v1/product/listV2?page=1&size=15&keyWord=suit`;
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
      const pid = p.id || p.pid;

      // Detail API call taake sahi images mil sakein
      const detailRes = await fetch(`https://developers.cjdropshipping.com/api2.0/v1/product/query?pid=${pid}`, {
        method: "GET", headers: { "CJ-Access-Token": token, "Content-Type": "application/json" },
      });
      const detailData = await detailRes.json();
      const productDetail = detailData.data;
      
      // Pictures ka logic
      let imageArray = productDetail?.productImageSet || [];
      if (imageArray.length === 0 && p.bigImage) imageArray = [p.bigImage];
      
      const mainImage = imageArray[0] || p.bigImage || "";
      const galleryImages = imageArray.slice(0, 3); // Sirf 3 pictures

      const productName = p.nameEn || p.name || "Premium Suit";
      const cleanTitle = productName.length > 50 ? productName.substring(0, 50).trim() + "..." : productName;

      // Category check (Women/Men)
      const lowerName = productName.toLowerCase();
      const isWomen = lowerName.includes("women") || lowerName.includes("female");
      const category = isWomen ? "women" : "men";

      // Price 4.5x badha rahe hain
      const cjPrice = Number(p.sellPrice) || 0;
      const finalSellingPrice = Math.ceil(cjPrice * 4.5); 

      // Description se HTML tags saaf karein
      const rawDescription = productDetail?.description || p.description || "Premium Ready to Wear Suit crafted with high-quality fabric.";
      const cleanDescription = stripHtml(rawDescription).substring(0, 500);

      const productToSave = {
        name: cleanTitle,
        price: finalSellingPrice, 
        image_url: mainImage, 
        images: galleryImages, 
        description: cleanDescription + "...", 
        supplier: "cj", 
        category: category, 
        product_type: "suit",
        cj_product_id: String(pid), 
      };

      const { error } = await supabase
        .from("models")
        .upsert(productToSave, { onConflict: "cj_product_id" });

      if (error) {
        errors.push({ id: pid, error: error.message });
      } else {
        syncedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Synced ${syncedCount} clean products.`,
      errors: errors.length > 0 ? errors : "No errors"
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
