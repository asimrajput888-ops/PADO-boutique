// app/shop/[id]/page.tsx

"use client";

import { ProductGallery } from "@/components/product/product-gallery";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCurrency } from "@/context/currency-context";
import { supabase } from "@/lib/supabase";

// 🔥 Helper function jo "Black-M" ko "Black" banadega
const getCleanColor = (colorStr: string) => {
  if (!colorStr) return "Default";
  const parts = colorStr.split("-");
  if (parts.length > 1) {
    const lastPart = parts[parts.length - 1].toUpperCase();
    // Agar aakhri hissa size lag raha hai (S, M, L, XL, ya number)
    if (["S", "M", "L", "XL", "XXL", "3XL", "4XL"].includes(lastPart) || !isNaN(Number(lastPart))) {
      return parts.slice(0, -1).join("-"); // Size ko hata kar sirf Color return karo
    }
  }
  return colorStr;
};

function ReadyToWearProductContent() {
  const params = useParams();
  const id = params?.id as string;
  const { formatPrice } = useCurrency();

  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [displayImage, setDisplayImage] = useState<string>("");

  const [contact, setContact] = useState({ name: "", email: "", phone: "", address1: "", address2: "", city: "", postalCode: "", country: "" });

  useEffect(() => {
    const fetchModel = async () => {
      const { data } = await supabase.from("models").select("*").eq("id", Number(id)).single();
      if (data) {
        setModel(data);
        setDisplayImage(data.image_url);
        
        // Auto-select first color
        if (data.variants && data.variants.length > 0) {
          const uniqueColors = Array.from(new Set(data.variants.map((v: any) => getCleanColor(v.color))));
          if (uniqueColors.length > 0) {
            handleColorSelect(uniqueColors[0] as string, data);
          }
        }
      }
      setLoading(false);
    };
    fetchModel();
  }, [id]);

  const handleColorSelect = (cleanColor: string, dataToUse = model) => {
    setSelectedColor(cleanColor);
    
    // Sirf us color ke saare variants nikalein
    const variantsForColor = dataToUse.variants.filter((v: any) => getCleanColor(v.color) === cleanColor);
    const sizesForColor = variantsForColor.map((v: any) => v.size);
    setAvailableSizes(Array.from(new Set(sizesForColor)) as string[]);
    
    const variantWithImage = variantsForColor.find((v: any) => v.image);
    if (variantWithImage) setDisplayImage(variantWithImage.image);
    else setDisplayImage(dataToUse.image_url);

    setSelectedVariant(null); 
  };

  const handleSubmit = async () => {
    if (!selectedVariant) return alert("Please select a size.");
    if (!contact.name || !contact.email || !contact.address1 || !contact.city || !contact.country) return alert("Please fill all required shipping fields");
    
    setSubmitting(true);
    try {
      const payload = {
        customer_name: contact.name, customer_email: contact.email, customer_phone: contact.phone,
        customer_country: contact.country, shipping_address: { ...contact },
        fit_type: "standard", 
        standard_size: `${selectedColor} - ${selectedVariant.size}`, // Yahan "Black - M" jayega
        cj_vid: selectedVariant.vid, 
        model_id: String(model.id), model_name: model.name, category: model.category || "men", product_type: model.product_type || "suit",
        measurements: null, fabric_id: null, fabric_name: null, total_price: model.price,
        currency: "USD", notes: "Ready to Wear Order",
      };

      const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to initiate checkout");
      if (data.url) window.location.href = data.url;
    } catch (err: any) { alert("Error: " + err.message); } finally { setSubmitting(false); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-serif text-xl">Loading...</div>;
  if (!model) return <div className="min-h-screen flex items-center justify-center font-serif text-2xl">Product Not Found</div>;

  const galleryImages: string[] = model?.images?.length > 0 ? model.images : model?.image_url ? [model.image_url] : [];
  const allImages = [displayImage, ...galleryImages.filter((img: string) => img !== displayImage)];
  
  // 🔥 Unique Colors nikaalte waqt bhi Clean function use karein
  const uniqueColors = model.variants ? Array.from(new Set(model.variants.map((v: any) => getCleanColor(v.color)))) : [];

  return (
    <div className="min-h-screen bg-paper pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <Link href="/shop" className="text-[10px] uppercase text-stone mb-12 inline-flex items-center gap-2 hover:text-ink transition-colors"><span>←</span> Back to Ready to Wear</Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <ProductGallery images={allImages} name={model.name} />
          </div>

          <div className="lg:sticky lg:top-32 h-fit">
            <p className="text-[10px] tracking-[0.5em] text-brand-gold uppercase mb-4">Ready to Wear</p>
            <h1 className="text-3xl md:text-5xl font-serif mb-4">{model.name}</h1>
            <p className="text-2xl font-serif text-ink mb-10">{formatPrice(model.price)}</p>
            
            <div className="mb-10">
              <p className="text-sm text-stone leading-relaxed whitespace-pre-line bg-brand-cream p-6 border border-border max-h-64 overflow-y-auto">{model.description}</p>
            </div>

            {/* Color Selector */}
            {uniqueColors.length > 0 && (
              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-[0.2em] mb-4 font-semibold text-ink">Select Color: <span className="text-brand-gold">{selectedColor}</span></p>
                <div className="flex flex-wrap gap-3">
                  {uniqueColors.map((color: any) => (
                    <button 
                      key={color} 
                      onClick={() => handleColorSelect(color)} 
                      className={`px-4 py-2 border text-sm transition-all ${selectedColor === color ? "bg-ink text-paper border-ink" : "border-border text-ink hover:border-ink"}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="mb-10">
              <p className="text-[10px] uppercase tracking-[0.2em] mb-4 font-semibold text-ink">Select Size *</p>
              <div className="flex flex-wrap gap-3">
                {availableSizes.length > 0 ? availableSizes.map((size) => {
                  // 🔥 Sahi variant dhundhne ke liye clean color use karein
                  const variantObj = model.variants.find((v: any) => getCleanColor(v.color) === selectedColor && v.size === size);
                  return (
                    <button 
                      key={size} 
                      onClick={() => setSelectedVariant(variantObj)} 
                      className={`min-w-[3.5rem] h-12 px-4 border flex items-center justify-center text-sm transition-all ${selectedVariant?.size === size ? "bg-ink text-paper border-ink" : "border-border text-ink hover:border-ink"}`}
                    >
                      {size}
                    </button>
                  )
                }) : <p className="text-sm text-stone">Select a color to see sizes.</p>}
              </div>
            </div>

            <div className="border-t border-border pt-8 mb-8">
              <p className="text-[10px] uppercase tracking-[0.2em] mb-6 font-semibold text-ink">Shipping Details</p>
              <div className="space-y-4">
                <input type="text" placeholder="Full Name *" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} className="w-full border border-border p-4 text-sm focus:outline-none focus:border-ink" />
                <input type="email" placeholder="Email Address *" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="w-full border border-border p-4 text-sm focus:outline-none focus:border-ink" />
                <input type="tel" placeholder="Phone / WhatsApp *" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className="w-full border border-border p-4 text-sm focus:outline-none focus:border-ink" />
                <input type="text" placeholder="Address Line 1 *" value={contact.address1} onChange={(e) => setContact({ ...contact, address1: e.target.value })} className="w-full border border-border p-4 text-sm focus:outline-none focus:border-ink" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City *" value={contact.city} onChange={(e) => setContact({ ...contact, city: e.target.value })} className="w-full border border-border p-4 text-sm focus:outline-none focus:border-ink" />
                  <input type="text" placeholder="Country *" value={contact.country} onChange={(e) => setContact({ ...contact, country: e.target.value })} className="w-full border border-border p-4 text-sm focus:outline-none focus:border-ink" />
                </div>
              </div>
            </div>

            <button onClick={handleSubmit} disabled={!selectedVariant || submitting} className="w-full bg-brand-charcoal text-white py-5 text-[11px] uppercase tracking-[0.3em] hover:bg-brand-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
              {submitting ? "Redirecting to Payment..." : `Buy Now — ${formatPrice(model.price)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReadyToWearProduct() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ReadyToWearProductContent />
    </Suspense>
  );
}
