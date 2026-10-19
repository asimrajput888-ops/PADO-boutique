// app/api/cj/sync/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// HTML tags remove karne ka function
function stripHtml(html: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
}

// 🔥 YAHAN APNE PRODUCTS KI IDs DALEIN 🔥
// Jaise: ["2084517420358029314", "1234567890123456"]
const PRODUCT_IDS = [
  "2084517420358029314" // <-- Yahan apna PID dalein (quotes ke sath)
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
    let errors: any[] = [];

    // Hum direct IDs par loop chala rahe hain
    for (const pid of PRODUCT_IDS) {
      try {
        // Direct Product Detail API Call
        const detailRes = await fetch(`https://developers.cjdropshipping.com/api2.0/v1/product/query?pid=${pid}`, {
          method: "GET", headers: { "CJ-Access-Token": token, "Content-Type": "application/json" },
        });
        const detailData = await detailRes.json();
        const productDetail = detailData.data;

        if (!productDetail) {
          errors.push({ id: pid, error: "Product detail not found from CJ" });
          continue;
        }

        // 6 Pictures nikalna
        let imageArray = productDetail.productImageSet || [];
        if (imageArray.length === 0 && productDetail.bigImage) imageArray = [productDetail.bigImage];
        
        const mainImage = imageArray[0] || "";
        const galleryImages = imageArray.slice(0, 6); 

        const productName = productDetail.nameEn || productDetail.name || "Premium Suit";
        const cleanTitle = productName.length > 45 ? productName.substring(0, 45).trim() + "..." : productName;

        // Category Check (Taki For Him / For Her mein sahi jaye)
        const lowerName = productName.toLowerCase();
        const womenKeywords = ["women", "female", "lady", "ladies", "dress", "skirt", "blouse", "bra", "top", "peplum", "tunic"];
        const isWomen = womenKeywords.some(keyword => lowerName.includes(keyword));
        const category = isWomen ? "women" : "men";

        // Price 4.5x (Markup)
        const cjPrice = Number(productDetail.sellPrice) || 0;
        const finalSellingPrice = Math.ceil(cjPrice * 4.5); 

        // Description
        let rawDescription = productDetail.description || "";
        if (!rawDescription || rawDescription.trim() === "") {
          rawDescription = `Elevate your wardrobe with this premium ${cleanTitle}. Crafted with high-quality fabric for a perfect fit and elegant look. Ideal for formal events, office wear, and special occasions.`;
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

        if (error) {
          errors.push({ id: pid, error: error.message });
        } else {
          syncedCount++;
        }
      } catch (err: any) {
         errors.push({ id: pid, error: err.message });
      }
    }

    return NextResponse.json({ success: true, message: `Synced ${syncedCount} selected products.`, errors });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
