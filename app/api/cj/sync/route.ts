// app/api/cj/sync/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function stripHtml(html: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
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

    // Hum list API se 50 products fetch kar rahe hain taake koi saved product miss na ho
    const url = `https://developers.cjdropshipping.com/api2.0/v1/product/listV2?page=1&size=50&keyWord=`;
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
      // 🔥 SIRF SAVED PRODUCTS FILTER (Agar aapne save nahi kiya toh skip kar do)
      if (p.myProduct === false) continue;

      const pid = p.id || p.pid;

      // Detail API call taake 6 pictures mil sakein
      const detailRes = await fetch(`https://developers.cjdropshipping.com/api2.0/v1/product/query?pid=${pid}`, {
        method: "GET", headers: { "CJ-Access-Token": token, "Content-Type": "application/json" },
      });
      const detailData = await detailRes.json();
      const productDetail = detailData.data;
      
      let imageArray = productDetail?.productImageSet || [];
      if (imageArray.length === 0 && p.bigImage) imageArray = [p.bigImage];
      
      const mainImage = imageArray[0] || p.bigImage || "";
      const galleryImages = imageArray.slice(0, 6); // 6 pictures

      const productName = p.nameEn || p.name || "Premium Suit";
      const cleanTitle = productName.length > 45 ? productName.substring(0, 45).trim() + "..." : productName;

      // Category Check
      const lowerName = productName.toLowerCase();
      const womenKeywords = ["women", "female", "lady", "ladies", "dress", "skirt", "blouse", "bra", "top", "peplum", "tunic"];
      const isWomen = womenKeywords.some(keyword => lowerName.includes(keyword));
      const category = isWomen ? "women" : "men";

      const cjPrice = Number(p.sellPrice) || 0;
      const finalSellingPrice = Math.ceil(cjPrice * 4.5); // 4.5x profit

      let rawDescription = productDetail?.description || "";
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

      if (error) errors.push({ id: pid, error: error.message });
      else syncedCount++;
    }

    return NextResponse.json({ success: true, message: `Synced ${syncedCount} saved products.`, errors });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
