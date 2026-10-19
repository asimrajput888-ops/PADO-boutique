// app/api/cj/sync/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function stripHtml(html: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
}

const PRODUCT_IDS = [
  "2084517420358029314" // <-- Apni IDs yahan dalein
];

export async function GET() {
  try {
    const apiKey = process.env.CJ_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "CJ_API_KEY is missing" }, { status: 500 });

    const authRes = await fetch("https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ apiKey }),
    });
    const authData = await authRes.json();
    const token = authData.data.accessToken;

    let syncedCount = 0;
    let debugImages: any = []; // DEBUG KE LIYE

    for (const pid of PRODUCT_IDS) {
      const detailRes = await fetch(`https://developers.cjdropshipping.com/api2.0/v1/product/query?pid=${pid}`, {
        method: "GET", headers: { "CJ-Access-Token": token, "Content-Type": "application/json" },
      });
      const detailData = await detailRes.json();
      const productDetail = detailData.data;

      if (!productDetail) continue;

      // 🔥 IMAGE EXTRACTION LOGIC (Robust) 🔥
      let rawImages: string[] = [];
      
      if (productDetail.productImage) rawImages.push(productDetail.productImage);
      if (productDetail.bigImage) rawImages.push(productDetail.bigImage);
      
      if (Array.isArray(productDetail.productImageSet)) {
        rawImages = rawImages.concat(productDetail.productImageSet);
      }

      // Clean URLs (Ensure https:// and remove empties)
      const cleanImages = rawImages
        .filter(url => typeof url === 'string' && url.trim().length > 0)
        .map(url => url.startsWith('//') ? `https:${url}` : url)
        .filter(url => url.startsWith('http'));

      const uniqueImages = Array.from(new Set(cleanImages));
      
      // Debug ke liye first product ki images save karte hain
      if (debugImages.length === 0) debugImages = uniqueImages;

      const mainImage = uniqueImages[0] || "";
      const galleryImages = uniqueImages.slice(0, 6); 

      const productName = productDetail.nameEn || productDetail.name || "Premium Suit";
      const cleanTitle = productName.length > 45 ? productName.substring(0, 45).trim() + "..." : productName;

      const lowerName = productName.toLowerCase();
      const isWomen = ["women", "female", "lady", "ladies", "dress"].some(k => lowerName.includes(k));
      const category = isWomen ? "women" : "men";

      const cjPrice = Number(productDetail.sellPrice) || 0;
      const finalSellingPrice = Math.ceil(cjPrice * 4.5); 

      let rawDescription = productDetail.description || "";
      if (!rawDescription || rawDescription.trim() === "") {
        rawDescription = `Elevate your wardrobe with this premium ${cleanTitle}. Crafted with high-quality fabric for a perfect fit and elegant look.`;
      } else {
        rawDescription = stripHtml(rawDescription).substring(0, 400) + "...";
      }

      const productToSave = {
        name: cleanTitle,
        price: finalSellingPrice, 
        image_url: mainImage, 
        images: galleryImages, 
        description: rawDescription, 
        supplier: "cj", 
        category: category, 
        product_type: "suit",
        cj_product_id: String(pid), 
      };

      const { error } = await supabase
        .from("models")
        .upsert(productToSave, { onConflict: "cj_product_id" });

      if (!error) syncedCount++;
    }

    return NextResponse.json({ 
      success: true, 
      message: `Synced ${syncedCount} products.`,
      // 👇 YE DEBUG ARRAY DEKHEIN 👇
      debug_image_urls: debugImages 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
