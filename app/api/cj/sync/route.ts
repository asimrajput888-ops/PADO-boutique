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
      const pid = p.id || p.pid;

      const detailRes = await fetch(`https://developers.cjdropshipping.com/api2.0/v1/product/query?pid=${pid}`, {
        method: "GET", headers: { "CJ-Access-Token": token, "Content-Type": "application/json" },
      });
      const detailData = await detailRes.json();
      const productDetail = detailData.data;
      
      // SAARI PICTURES NIKALEIN (Max 6)
      let imageArray = productDetail?.productImageSet || [];
      if (imageArray.length === 0 && p.bigImage) imageArray = [p.bigImage];
      
      const mainImage = imageArray[0] || p.bigImage || "";
      const galleryImages = imageArray.slice(0, 6); // 6 pictures tak allow kiya

      const productName = p.nameEn || p.name || "Premium Suit";
      const cleanTitle = productName.length > 45 ? productName.substring(0, 45).trim() + "..." : productName;

      // STRONG WOMEN DETECTION (Agar title mein ye words hain toh Women)
      const lowerName = productName.toLowerCase();
      const womenKeywords = ["women", "female", "lady", "ladies", "dress", "skirt", "blouse", "bra", "top", "peplum", "tunic"];
      const isWomen = womenKeywords.some(keyword => lowerName.includes(keyword));
      const category = isWomen ? "women" : "men";

      const cjPrice = Number(p.sellPrice) || 0;
      const finalSellingPrice = Math.ceil(cjPrice * 4.5); 

      const rawDescription = productDetail?.description || p.description || "Premium Ready to Wear Suit crafted with high-quality fabric.";
      let cleanDescription = stripHtml(rawDescription);
      // Description ko chhota rakhein taake page clean lage
      cleanDescription = cleanDescription.substring(0, 300) + "..."; 

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
    }

    return NextResponse.json({ success: true, message: `Synced ${syncedCount} products.`, errors });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
