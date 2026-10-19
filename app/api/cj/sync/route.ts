// app/api/cj/sync/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// HTML tags remove karne ka function
function stripHtml(html: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
}

// 🔥 YAHAN APNE PRODUCTS KI IDs DALEIN 🔥
const PRODUCT_IDS = [
  "2084517420358029314" // Aap yahan aur IDs add kar sakte hain comma laga kar
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

    for (const pid of PRODUCT_IDS) {
      try {
        const detailRes = await fetch(`https://developers.cjdropshipping.com/api2.0/v1/product/query?pid=${pid}`, {
          method: "GET", headers: { "CJ-Access-Token": token, "Content-Type": "application/json" },
        });
        const detailData = await detailRes.json();
        const productDetail = detailData.data;

        if (!productDetail) {
          errors.push({ id: pid, error: "Product detail not found from CJ" });
          continue;
        }

        // 🔥 IMAGE FIX LOGIC 🔥
        // CJ ka 'productImage' hamesha sabse best full cover photo hota hai
        const coverImage = productDetail.productImage || productDetail.bigImage || "";
        
        // Baaki saari pictures ka set
        let imageArray = productDetail.productImageSet || [];
        
        // Cover image ko array ke sabse shuru mein dalo
        let allImages = [coverImage, ...imageArray];
        
        // Duplicate images hatao (agar cover image array mein pehle se ho)
        allImages = Array.from(new Set(allImages)).filter(img => img !== "");
        
        const mainImage = allImages[0] || "";
        const galleryImages = allImages.slice(0, 6); // Total 6 pictures

        const productName = productDetail.nameEn || productDetail.name || "Premium Suit";
        const cleanTitle = productName.length > 45 ? productName.substring(0, 45).trim() + "..." : productName;

        // Category Check
        const lowerName = productName.toLowerCase();
        const womenKeywords = ["women", "female", "lady", "ladies", "dress", "skirt", "blouse", "bra", "top", "peplum", "tunic"];
        const isWomen = womenKeywords.some(keyword => lowerName.includes(keyword));
        const category = isWomen ? "women" : "men";

        // Price 4.5x
        const cjPrice = Number(productDetail.sellPrice) || 0;
        const finalSellingPrice = Math.ceil(cjPrice * 4.5); 

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
