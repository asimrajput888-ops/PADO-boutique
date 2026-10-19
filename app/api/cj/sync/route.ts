// app/api/cj/sync/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function formatLuxuryDescription(rawDesc: string, productName: string) {
  if (!rawDesc || rawDesc.trim() === "") {
    return `Experience the perfect blend of style and comfort with the ${productName}. Handcrafted for a modern fit and tailored to perfection.`;
  }
  let clean = rawDesc.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n').replace(/<[^>]*>?/gm, '').replace(/\n\s*\n/g, '\n\n').trim();
  return `Elevate your wardrobe with the ${productName}.\n\nPRODUCT DETAILS:\n${clean}\n\nPADO PROMISE:\n✓ Premium Quality Fabric\n✓ Expert Tailoring`;
}

const PRODUCT_IDS = ["2084517420358029314"]; // <-- Apni IDs yahan dalein

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

    for (const pid of PRODUCT_IDS) {
      const detailRes = await fetch(`https://developers.cjdropshipping.com/api2.0/v1/product/query?pid=${pid}`, {
        method: "GET", headers: { "CJ-Access-Token": token, "Content-Type": "application/json" },
      });
      const detailData = await detailRes.json();
      const productDetail = detailData.data;

      if (!productDetail) continue;

      // Images Extract
      let rawImages: string[] = [];
      if (productDetail.productImage) rawImages.push(productDetail.productImage);
      if (productDetail.bigImage) rawImages.push(productDetail.bigImage);
      if (Array.isArray(productDetail.productImageSet)) rawImages = rawImages.concat(productDetail.productImageSet);

      const cleanImages = rawImages
        .filter(url => typeof url === 'string' && url.trim().length > 0)
        .map(url => url.startsWith('//') ? `https:${url}` : url)
        .map(url => encodeURI(url))
        .filter(url => url.startsWith('http'));

      const uniqueImages = Array.from(new Set(cleanImages));
      const mainImage = uniqueImages[0] || "";
      const galleryImages = uniqueImages.slice(0, 6); 

      // 🔥 SMART VARIANTS & STOCK FIX 🔥
      let variantsData: any[] = [];
      if (productDetail.variants && Array.isArray(productDetail.variants)) {
        for (const v of productDetail.variants) {
          
          // --- 1. STOCK CHECK LOGIC ---
          let stock = 0;
          if (typeof v.inventoryNum === 'number') {
            stock = v.inventoryNum;
          } else if (Array.isArray(v.inventory)) {
            // Agar inventory ek array hai (multiple warehouses)
            stock = v.inventory.reduce((acc: number, curr: any) => acc + (curr.totalInventory || curr.warehouseInventory || 0), 0);
          } else if (typeof v.inventory === 'number') {
            stock = v.inventory;
          }

          // Agar stock 0 hai, toh is size/color ko skip kar do
          if (stock <= 0) continue; 

          // --- 2. SIZE & COLOR SEPARATION LOGIC ---
          let rawKey = (v.variantKey || v.variantName || "").trim();
          let rawValue = (v.variantValue || v.variantSku || "").trim();
          
          let color = rawKey || "Default";
          let size = "One Size";

          const sizeRegex = /(XXS|XS|S|M|L|XL|XXL|3XL|4XL|5XL|6XL)/i;
          
          const keyMatch = rawKey.match(sizeRegex);
          const valMatch = rawValue.match(sizeRegex);

          if (keyMatch) {
            size = keyMatch[0].toUpperCase();
            color = rawKey.replace(sizeRegex, "").replace(/[-_\s]+$/, "").trim();
          } else if (valMatch) {
            size = valMatch[0].toUpperCase();
            color = rawKey;
          } else if (/^\d{2}$/.test(rawValue)) {
            size = rawValue;
            color = rawKey;
          }

          color = color.replace(/[-_\s]+$/, "").replace(/^(Color|Size):\s*/i, "").trim();
          if (!color) color = "Default";

          variantsData.push({
            vid: v.vid,
            color: color,
            size: size,
            image: v.variantImage ? encodeURI(v.variantImage) : "",
            stock: stock // Debugging ke liye stock save kar rahe hain
          });
        }
      }

      // Agar saare variants out of stock hain, toh product hi save mat karo
      if (variantsData.length === 0) {
        console.log(`Skipping product ${pid} - All variants out of stock.`);
        continue;
      }

      const rawName = productDetail.productNameEn || productDetail.productName || "Exclusive Suit";
      const cleanTitle = rawName.length > 55 ? rawName.substring(0, 55).trim() + "..." : rawName;

      const lowerName = rawName.toLowerCase();
      const isWomen = ["women", "female", "lady", "ladies", "dress"].some(k => lowerName.includes(k));
      const category = isWomen ? "women" : "men";

      const cjPrice = Number(productDetail.sellPrice) || 0;
      const finalSellingPrice = Math.ceil(cjPrice * 4.5); 

      const cleanDescription = formatLuxuryDescription(productDetail.description, cleanTitle);

      const productToSave = {
        name: cleanTitle,
        price: finalSellingPrice, 
        image_url: mainImage, 
        images: galleryImages, 
        variants: variantsData, 
        description: cleanDescription, 
        supplier: "cj", 
        category: category, 
        product_type: "suit",
        cj_product_id: String(pid), 
      };

      const { error } = await supabase.from("models").upsert(productToSave, { onConflict: "cj_product_id" });
      if (!error) syncedCount++;
    }

    return NextResponse.json({ success: true, message: `Synced ${syncedCount} products with active stock.` });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
