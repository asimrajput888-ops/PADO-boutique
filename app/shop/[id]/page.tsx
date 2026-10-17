// app/shop/[id]/page.tsx

"use client";

import { ProductGallery } from "@/components/product/product-gallery";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCurrency } from "@/context/currency-context";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

// Standard sizes (Aap apne hisaab se adjust kar sakte hain)
const SIZES = ["S", "M", "L", "XL", "XXL"]; 

function ReadyToWearProductContent() {
  const params = useParams();
  const id = params?.id as string;
  const { formatPrice } = useCurrency();

  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // State
  const [selectedSize, setSelectedSize] = useState("");
  const [contact, setContact] = useState({
    name: "", email: "", phone: "", address1: "", address2: "", city: "", postalCode: "", country: "",
  });

  useEffect(() => {
    const fetchModel = async () => {
      const { data } = await supabase.from("models").select("*").eq("id", Number(id)).single();
      if (data) setModel(data);
      setLoading(false);
    };
    fetchModel();
  }, [id]);

  const handleSubmit = async () => {
    if (!contact.name || !contact.email || !contact.address1 || !contact.city || !contact.country) {
      return alert("Please fill all shipping fields");
    }
    setSubmitting(true);

    try {
      const payload = {
        customer_name: contact.name, 
        customer_email: contact.email, 
        customer_phone: contact.phone,
        customer_country: contact.country, 
        shipping_address: { ...contact },
        fit_type: "standard", // Forces standard routing
        standard_size: selectedSize,
        model_id: String(model.id), 
        model_name: model.name, 
        category: model.category || "men", 
        product_type: model.product_type,
        measurements: null, 
        fabric_id: null, 
        fabric_name: null,
        total_price: model.price, 
        currency: "USD", 
        notes: "Ready to Wear Order",
      };

      // Aapka existing API route
      const res = await fetch("/api/orders", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(payload) 
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      
      setOrderNumber(data.order?.order_number || "");
      setSubmitted(true);
    } catch (err: any) { 
      alert("Error: " + err.message); 
    } finally { 
      setSubmitting(false); 
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!model) return <div className="min-h-screen flex items-center justify-center font-serif text-2xl">Product Not Found</div>;

  if (submitted) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center px-5 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg text-center">
          <div className="w-24 h-24 rounded-full bg-ink text-paper flex items-center justify-center mx-auto mb-10 text-4xl">✓</div>
          <h1 className="text-4xl font-serif text-ink mb-6">Thank you, {contact.name.split(" ")[0]}.</h1>
          <p className="text-stone mb-3">Your Order Number is:</p>
          <p className="text-xl font-mono text-ink mb-10">{orderNumber}</p>
          <Link href="/shop" className="bg-ink text-paper px-10 py-4 text-[11px] uppercase tracking-[0.3em]">Continue Shopping</Link>
        </motion.div>
      </div>
    );
  }

  const galleryImages: string[] = model?.images?.length > 0 ? model.images : model?.image_url ? [model.image_url] : [];

  return (
    <div className="min-h-screen bg-paper pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <Link href="/shop" className="text-[10px] uppercase text-stone mb-12 inline-flex items-center gap-2 hover:text-ink transition-colors"><span>←</span> Back to Ready to Wear</Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left: Image */}
          <div>
            <ProductGallery images={galleryImages} name={model.name} />
          </div>

          {/* Right: Details & Checkout */}
          <div className="lg:sticky lg:top-32 h-fit">
            <p className="text-[10px] tracking-[0.5em] text-brand-gold uppercase mb-4">Ready to Wear</p>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">{model.name}</h1>
            <p className="text-2xl font-serif text-ink mb-10">{formatPrice(model.price)}</p>
            
            <div className="mb-10">
              <p className="text-sm text-stone leading-relaxed">{model.description}</p>
            </div>

            {/* Size Selector */}
            <div className="mb-10">
              <p className="text-[10px] uppercase tracking-[0.2em] mb-4">Select Size</p>
              <div className="flex flex-wrap gap-3">
                {SIZES.map((size) => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)} 
                    className={`w-14 h-12 border flex items-center justify-center text-sm transition-all duration-300 ${
                      selectedSize === size ? "bg-ink text-paper border-ink" : "border-border hover:border-ink"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Checkout Form */}
            <div className="border-t border-border pt-8 mb-8">
              <p className="text-[10px] uppercase tracking-[0.2em] mb-6">Shipping Details</p>
              <div className="space-y-4">
                <input type="text" placeholder="Full Name *" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} className="w-full border border-border p-4 text-sm focus:outline-none focus:border-ink" />
                <input type="email" placeholder="Email *" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="w-full border border-border p-4 text-sm focus:outline-none focus:border-ink" />
                <input type="text" placeholder="Address *" value={contact.address1} onChange={(e) => setContact({ ...contact, address1: e.target.value })} className="w-full border border-border p-4 text-sm focus:outline-none focus:border-ink" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City *" value={contact.city} onChange={(e) => setContact({ ...contact, city: e.target.value })} className="w-full border border-border p-4 text-sm focus:outline-none focus:border-ink" />
                  <input type="text" placeholder="Country *" value={contact.country} onChange={(e) => setContact({ ...contact, country: e.target.value })} className="w-full border border-border p-4 text-sm focus:outline-none focus:border-ink" />
                </div>
              </div>
            </div>

            <button 
              onClick={handleSubmit} 
              disabled={!selectedSize || submitting} 
              className="w-full bg-brand-charcoal text-white py-5 text-[11px] uppercase tracking-[0.3em] hover:bg-brand-gold transition-colors disabled:opacity-30"
            >
              {submitting ? "Processing..." : `Buy Now — ${formatPrice(model.price)}`}
            </button>
            {!selectedSize && <p className="text-xs text-red-500 mt-2 text-center">Please select a size first</p>}
            
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-stone">
              <span>✓ Ships in 3-5 days</span>
              <span>•</span>
              <span>✓ Secure Checkout</span>
            </div>

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
