// app/api/cj/sync/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// HTML tags remove karne ka function
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

    let syncedCount = 0;
    let errors: any[] = [];

    // Hamein dono categories ke liye alag search karna hai
    const searchQueries = [
      { keyword: "women suit", category: "women" },
      { keyword: "men suit", category: "men" }
    ];

    for (const query of searchQueries) {
      const url = `https://developers.cjdropshipping.com/api2.0/v1/product/listV2?page=1&size=10&keyWord=${encodeURIComponent(query.keyword)}`;
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

      for (const p of cjProducts) {
        const pid = p.id || p.pid;

        // Detail API call
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

        const cjPrice = Number(p.sellPrice) || 0;
        const finalSellingPrice = Math.ceil(cjPrice * 4.5); 

        // Description nikalne ka behtar tarika
        let rawDescription = productDetail?.description || "";
        
        // Agar CJ ne description nahi di hai, toh ek achi si default description likh do
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
          category: query.category, // Ab category direct search ke hisaab se set hogi
          product_type: "suit",
          cj_product_id: String(pid), 
        };

        const { error } = await supabase
          .from("models")
          .upsert(productToSave, { onConflict: "cj_product_id" });

        if (error) errors.push({ id: pid, error: error.message });
        else syncedCount++;
      }
    }

    return NextResponse.json({ success: true, message: `Synced ${syncedCount} products.`, errors });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
