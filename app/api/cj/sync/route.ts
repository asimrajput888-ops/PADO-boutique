// app/api/cj/sync/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// HTML ko saaf karne aur line breaks dene ka function
function formatLuxuryDescription(rawDesc: string, productName: string) {
  if (!rawDesc || rawDesc.trim() === "") {
    return `Experience the perfect blend of style and comfort with the ${productName}. Handcrafted for a modern fit and tailored to perfection. Perfect for formal occasions.`;
  }

  // CJ ke text ko saaf karke line breaks dalna
  let clean = rawDesc
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]*>?/gm, '') // Baaki HTML tags hatao
    .replace(/\n\s*\n/g, '\n\n') // Extra gaps hatao
    .trim();

  // Ek premium template banate hain
  return `Elevate your wardrobe with the ${productName}. Designed for the modern gentleman, this piece combines premium craftsmanship with a tailored silhouette.

PRODUCT DETAILS:
${clean}

PADO PROMISE:
✓ Premium Quality Fabric
✓ Expert Tailoring
✓ Worldwide Shipping`;
}

// 🔥 YAHAN APNE PRODUCTS KI IDs DALEIN 🔥
const PRODUCT_IDS = [
  "2084517420358029314" 
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
          errors.push({ id: pid, error: "Product not found" });
          continue;
        }

        // 1. TITLE FIX
        let rawName = productDetail.productNameEn || productDetail.productName || productDetail.nameEn || "Exclusive Suit";
        const cleanTitle = rawName.length > 55 ? rawName.substring(0, 55).trim() + "..." : rawName;

        // 2. IMAGE FIX (Main Image hamesha pehle, uske baad gallery)
        let rawImages: string[] = [];
        if (productDetail.productImage) rawImages.push(productDetail.productImage);
        if (productDetail.bigImage) rawImages.push(productDetail.bigImage);
        if (Array.isArray(productDetail.productImageSet)) rawImages = rawImages.concat(productDetail.productImageSet);

        // Clean URLs (https lagana, aur duplicates hatana)
        const cleanImages = rawImages
          .filter(url => typeof url === 'string' && url.trim().length > 0)
          .map(url => url.startsWith('//') ? `https:${url}` : url)
          .filter(url => url.startsWith('http'));

        const uniqueImages = Array.from(new Set(cleanImages)); // Duplicate images hatao
        
        const mainImage = uniqueImages[0] || "";
        const galleryImages = uniqueImages.slice(0, 6); 

        // 3. CATEGORY CHECK
        const lowerName = rawName.toLowerCase();
        const isWomen = ["women", "female", "lady", "ladies", "dress"].some(k => lowerName.includes(k));
        const category = isWomen ? "women" : "men";

        // 4. PRICE MARKUP
        const cjPrice = Number(productDetail.sellPrice) || 0;
        const finalSellingPrice = Math.ceil(cjPrice * 4.5); 

        // 5. DESCRIPTION FIX
        const cleanDescription = formatLuxuryDescription(productDetail.description, cleanTitle);

        const productToSave = {
          name: cleanTitle,
          price: finalSellingPrice, 
          image_url: mainImage, 
          images: galleryImages, 
          description: cleanDescription, 
          supplier: "cj", 
          category: category, 
          product_type: "suit",
          cj_product_id: String(pid), 
        };

        const { error } = await supabase
          .from("models")
          .upsert(productToSave, { onConflict: "cj_product_id" });

        if (error) errors.push({ id: pid, error: error.message });
        else syncedCount++;
        
      } catch (err: any) {
         errors.push({ id: pid, error: err.message });
      }
    }

    return NextResponse.json({ success: true, message: `Synced ${syncedCount} perfect products.`, errors });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
