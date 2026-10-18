// app/custom/women/[id]/page.tsx

"use client";

import { ProductGallery } from "@/components/product/product-gallery";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useCurrency } from "@/context/currency-context";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

const JACKET_FITS = ["Regular Fit", "Slim Fit", "Relaxed Fit"];
const TROUSER_FITS = ["Classic Comfort Fit", "Slim Fit", "Relaxed Fit"];

const STANDARD_JACKET_SIZES = ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24"];
const STANDARD_JACKET_LENGTHS = ["Petite", "Regular", "Tall"];
const STANDARD_TROUSER_SIZES = ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24"];
const STANDARD_INSEAMS = ["Unhemmed", "28", "30", "32", "34", "36"];
const STANDARD_SHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const MEASUREMENT_LIMITS: Record<string, { min: number; max: number }> = {
  bust: { min: 28, max: 56 }, underbust: { min: 24, max: 50 }, shoulder: { min: 12, max: 20 },
  sleeve: { min: 18, max: 28 }, jacketLength: { min: 22, max: 32 }, bicep: { min: 8, max: 18 },
  waist: { min: 22, max: 48 }, seat: { min: 30, max: 58 }, pantsLength: { min: 24, max: 36 },
  thigh: { min: 16, max: 30 }, knee: { min: 10, max: 22 }, legOpening: { min: 8, max: 20 },
};

const MEASUREMENT_FIELDS: Record<string, { id: string; label: string; hint: string; required: boolean }[]> = {
  blazer: [
    { id: "bust", label: "Bust", hint: "Around the fullest part of your bust", required: true },
    { id: "shoulder", label: "Shoulder Width", hint: "Shoulder point to shoulder point", required: true },
    { id: "sleeve", label: "Sleeve Length", hint: "Shoulder point to wrist bone", required: true },
    { id: "jacketLength", label: "Jacket Length", hint: "Base of neck to desired hem", required: true },
    { id: "waist", label: "Waist", hint: "Narrowest part of waist", required: true },
  ],
  suit: [
    { id: "bust", label: "Bust", hint: "Fullest part of bust", required: true },
    { id: "underbust", label: "Underbust", hint: "Just under the bust", required: true },
    { id: "shoulder", label: "Shoulder Width", hint: "Shoulder to shoulder", required: true },
    { id: "sleeve", label: "Sleeve Length", hint: "Shoulder to wrist bone", required: true },
    { id: "jacketLength", label: "Jacket Length", hint: "Base of neck to hem", required: true },
    { id: "waist", label: "Jacket Waist", hint: "Narrowest part of waist", required: true },
    { id: "seat", label: "Hip", hint: "Fullest part of hips", required: true },
    { id: "pantsLength", label: "Inseam", hint: "Crotch to ankle bone", required: true },
  ],
  trouser: [
    { id: "waist", label: "Waist", hint: "Where you wear your trousers", required: true },
    { id: "seat", label: "Hip", hint: "Fullest part of hips", required: true },
    { id: "pantsLength", label: "Inseam", hint: "Crotch to ankle bone", required: true },
  ],
};

const MEASUREMENT_IMAGES: Record<string, string> = {
  bust: "/images/measurements-women/wom_chest.webp",
  underbust: "/images/measurements-women/wom_stomach.webp",
  shoulder: "/images/measurements-women/wom_shoulder.webp",
  sleeve: "/images/measurements-women/wom_sleeves.webp",
  jacketLength: "/images/measurements-women/wom_jacket_length.webp",
  waist: "/images/measurements-women/wom_waist.webp",
  seat: "/images/measurements-women/wom_seat.webp",
  pantsLength: "/images/measurements-women/wom_pants_length.webp",
};

interface Fabric {
  id: number; name: string; origin: string; price: number; image_url: string;
}

function WomenBespokePageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params?.id as string;
  const { formatPrice } = useCurrency();

  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(-1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [selectedFabric, setSelectedFabric] = useState<Fabric | null>(null);

  const [fitType, setFitType] = useState<"standard" | "custom" | null>(null);
  const [jacketSize, setJacketSize] = useState("");
  const [jacketLength, setJacketLength] = useState("Regular");
  const [trouserSize, setTrouserSize] = useState("");
  const [inseam, setInseam] = useState("Unhemmed");

  const [profileName, setProfileName] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [m, setM] = useState<Record<string, string>>({});
  const [jacketFit, setJacketFit] = useState(JACKET_FITS[0]);
  const [trouserFit, setTrouserFit] = useState(TROUSER_FITS[0]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [activeField, setActiveField] = useState<string>("bust");

  const [contact, setContact] = useState({
    name: "", email: "", phone: "", address1: "", address2: "", city: "", postalCode: "", country: "",
  });

  useEffect(() => {
    if (searchParams.get("start") === "order") setStep(0);
  }, [searchParams]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [step]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: modelData } = await supabase.from("models").select("*").eq("id", Number(id)).single();
      if (!modelData) { setLoading(false); return; }
      
      setModel(modelData);
      setProfileName(`${modelData.name} — ${new Date().toLocaleDateString()}`);
      
      const isReadyToWear = ["cj", "1688"].includes(modelData.supplier?.toLowerCase());
      setFitType(isReadyToWear ? "standard" : "custom");

      if (!isReadyToWear) {
        const { data: fabricData } = await supabase.from("fabrics").select("*").eq("is_active", true);
        if (fabricData) setFabrics(fabricData);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const galleryImages: string[] = model?.images?.length > 0 ? model.images : model?.image_url ? [model.image_url] : [];
  const pt = model?.product_type || "suit";
  const fields = MEASUREMENT_FIELDS[pt] || MEASUREMENT_FIELDS.suit;
  const needsJacketFit = ["suit", "tuxedo", "blazer", "coat"].includes(pt);
  const needsTrouserFit = ["suit", "tuxedo", "trouser"].includes(pt);

  const showJacketSelector = ["suit", "tuxedo", "blazer", "coat", "vest"].includes(pt);
  const showTrouserSelector = ["suit", "tuxedo", "trouser"].includes(pt);
  const showShirtSelector = pt === "shirt";

  const updateM = (key: string, value: string) => setM({ ...m, [key]: value });
  const getFieldError = (fieldId: string, value: string): string | null => {
    if (!value || value.trim() === "") return null;
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) return "Enter a valid number";
    const limits = MEASUREMENT_LIMITS[fieldId];
    if (limits && (num < limits.min || num > limits.max)) return `Must be between ${limits.min}–${limits.max}`;
    return null;
  };

  const filledCount = fields.filter((f) => m[f.id]).length;
  const invalidOrMissing = fields.filter((f) => {
    const value = m[f.id];
    if (!value || value.trim() === "") return f.required;
    return getFieldError(f.id, value) !== null;
  });
  const requiredMissing = invalidOrMissing.map((f) => f.label);
  const standardSelectionComplete = (showJacketSelector && !jacketSize) || (showTrouserSelector && !trouserSize) || (showShirtSelector && !jacketSize);

  const nextStep = () => {
    if (step === 0) setStep(3); 
    else if (step === 1) setStep(2); 
    else if (step === 2) setStep(3); 
    else setStep((p) => Math.min(p + 1, 4));
  };

  const prevStep = () => {
    if (step === 3) setStep(fitType === "standard" ? 0 : 2);
    else if (step === 2) setStep(1); 
    else if (step === 1 || step === 0) setStep(-1);
    else setStep((p) => Math.max(p - 1, -1));
  };

  const getStandardSizeLabel = () => {
    if (showJacketSelector && showTrouserSelector) return `Jacket ${jacketSize} ${jacketLength} / Trouser ${trouserSize} ${inseam}`;
    if (showJacketSelector) return `Jacket ${jacketSize} ${jacketLength}`;
    if (showTrouserSelector) return `Trouser ${trouserSize} ${inseam}`;
    return jacketSize || "Ready to Wear";
  };

  const basePrice = model?.price || 0;
  const fabricPrice = selectedFabric ? selectedFabric.price : 0;
  const finalPrice = fitType === "standard" ? basePrice : (basePrice + fabricPrice);

  const handleSubmit = async () => {
    if (!contact.name || !contact.email || !contact.address1 || !contact.city || !contact.country) return alert("Please fill all fields");
    setSubmitting(true);

    try {
      const payload = {
        customer_name: contact.name, customer_email: contact.email, customer_phone: contact.phone,
        customer_country: contact.country, shipping_address: { ...contact },
        fit_type: fitType, standard_size: fitType === "standard" ? getStandardSizeLabel() : null,
        model_id: String(model.id), model_name: model.name, category: "women", product_type: pt,
        measurements: fitType === "custom" ? { profileName, height: `${heightFt}' ${heightIn}"`, ...m, jacketFit, trouserFit, additionalInfo } : null,
        fabric_id: selectedFabric?.id || null, fabric_name: selectedFabric?.name || null,
        total_price: finalPrice, currency: "USD", notes: additionalInfo || "",
      };

      const res = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setOrderNumber(data.order?.order_number || "");
      setSubmitted(true);
    } catch (err: any) { alert("Error: " + err.message); } 
    finally { setSubmitting(false); }
  };

  if (loading) return (<div className="min-h-screen flex items-center justify-center bg-paper"><div className="w-8 h-8 border border-border border-t-ink rounded-full animate-spin" /></div>);
  if (!model) return (<div className="min-h-screen flex items-center justify-center bg-paper"><h1 className="text-4xl font-serif text-ink">Model Not Found</h1></div>);

  if (submitted) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center px-5 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg text-center">
          <div className="w-24 h-24 rounded-full bg-ink text-paper flex items-center justify-center mx-auto mb-10 text-4xl">✓</div>
          <h1 className="text-4xl font-serif text-ink mb-6">Thank you, {contact.name.split(" ")[0]}.</h1>
          <p className="text-xl font-mono text-ink mb-10">{orderNumber}</p>
          <Link href="/custom/women" className="bg-ink text-paper px-10 py-4 text-[11px] uppercase tracking-[0.3em]">Back to Collection</Link>
        </motion.div>
      </div>
    );
  }

  // STEP -1: Product Showcase
  if (step === -1) {
    return (
      <div className="min-h-screen bg-paper pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[1500px] mx-auto">
          <Link href="/custom/women" className="text-[10px] uppercase text-stone mb-12 inline-flex items-center gap-2"><span>←</span> Back</Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <ProductGallery images={galleryImages} name={model.name} />
            <div className="lg:sticky lg:top-32">
              <p className="text-[10px] tracking-[0.5em] text-bronze uppercase mb-6">{pt} · Bespoke</p>
              <h1 className="text-4xl md:text-6xl font-serif mb-8">{model.name}</h1>
              <p className="text-3xl text-ink mb-12 pb-12 border-b border-border font-serif">{formatPrice(model.price)}</p>
              <div className="space-y-4">
                <button onClick={() => setStep(fitType === "standard" ? 0 : 1)} className="w-full bg-ink text-paper py-6 text-[11px] uppercase tracking-[0.4em]">
                  {fitType === "standard" ? "Select Size →" : "Select Fabric →"}
                </button>
                <a href={`https://wa.me/16393840265?text=Hi, I'm interested in: ${model.name}`} target="_blank" className="block w-full border border-ink text-ink text-center py-6 text-[11px] uppercase">Speak to a Tailor</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 0: Standard Size (CJ / 1688)
  if (step === 0 && fitType === "standard") {
    return (
      <div className="min-h-screen bg-paper">
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <button onClick={() => setStep(-1)} className="text-[10px] uppercase text-stone mb-12">← Back</button>
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-serif mb-6">Select your <br /><em className="text-bronze">size</em></h1>
          </div>
          <div className="max-w-5xl mx-auto space-y-8">
            {showJacketSelector && (
              <div className="border border-border bg-white p-8">
                <h4 className="text-2xl font-serif mb-8">Jacket Size & Length</h4>
                <div className="grid grid-cols-5 md:grid-cols-9 gap-2 mb-8">
                  {STANDARD_JACKET_SIZES.map((size) => (
                    <button key={size} onClick={() => setJacketSize(size)} className={`py-3 text-sm border ${jacketSize === size ? "bg-ink text-paper" : "border-border hover:border-ink"}`}>{size}</button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {STANDARD_JACKET_LENGTHS.map((len) => (
                    <button key={len} onClick={() => setJacketLength(len)} className={`py-3 text-sm border ${jacketLength === len ? "bg-ink text-paper" : "border-border hover:border-ink"}`}>{len}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="max-w-5xl mx-auto mt-20 flex justify-end">
            <button onClick={nextStep} disabled={standardSelectionComplete} className="bg-ink text-paper px-16 py-5 text-[11px] disabled:opacity-30">Continue →</button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 1: FABRIC SELECTION
  if (step === 1 && fitType === "custom") {
    return (
      <div className="min-h-screen bg-paper">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <button onClick={() => setStep(-1)} className="text-[10px] uppercase text-stone mb-12 inline-flex items-center gap-2">← Back to Product</button>
          
          <div className="mb-16">
            <p className="text-center text-[10px] uppercase tracking-[0.5em] text-bronze mb-4">Step 1 of 4 — Made to Measure</p>
            <h1 className="text-4xl md:text-6xl font-serif text-center mb-6">Select your <br /><em className="text-bronze">Fabric</em></h1>
            <p className="text-stone text-center text-[15px] max-w-xl mx-auto">Choose from our premium collections of Italian, UK, and Chinese wool fabrics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {fabrics.map((fabric) => (
              <button
                key={fabric.id}
                onClick={() => setSelectedFabric(fabric)}
                className={`text-left group border transition-all duration-300 overflow-hidden ${
                  selectedFabric?.id === fabric.id ? "border-ink shadow-lg scale-[1.02]" : "border-border hover:border-ink/50"
                }`}
              >
                <div className="relative aspect-[4/3] bg-cream overflow-hidden">
                  <img src={fabric.image_url} alt={fabric.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-[10px] font-semibold tracking-wider uppercase">
                    {fabric.origin}
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-serif text-xl text-ink mb-2">{fabric.name}</h3>
                  <p className="text-sm text-stone">Half Canvas Construction</p>
                  <p className="mt-4 font-serif text-lg text-ink">+ {formatPrice(fabric.price)}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-border flex justify-end">
            <button onClick={nextStep} disabled={!selectedFabric} className="bg-ink text-paper px-16 py-5 text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-bronze transition-colors disabled:opacity-30">
              Continue to Measurements →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: MEASUREMENTS
  if (step === 2 && fitType === "custom") {
    const activeFieldData = fields.find((f) => f.id === activeField);
    const progressPercent = Math.round((filledCount / fields.length) * 100);

    return (
      <div className="min-h-screen bg-paper">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 py-16">
          <button onClick={() => setStep(1)} className="text-[10px] uppercase text-stone mb-12">← Back to Fabric</button>
          
          <div className="mb-16 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-[0.4em] text-bronze">Step 2 of 4 — Measurements</span>
              <span className="text-[10px] uppercase text-stone">{filledCount} / {fields.length} complete</span>
            </div>
            <div className="h-[2px] bg-border overflow-hidden">
              <motion.div className="h-full bg-ink" initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7">
              <div className="space-y-10">
                <div>
                  <label className="block text-[10px] uppercase text-bronze mb-4">Profile Name *</label>
                  <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full border-b border-border pb-4 focus:border-ink outline-none bg-transparent" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-bronze mb-4">Height *</label>
                  <div className="grid grid-cols-2 gap-4">
                    <select value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="border border-border bg-white p-4"><option value="">Feet</option>{[4,5,6,7].map(f => <option key={f} value={f}>{f} ft</option>)}</select>
                    <select value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="border border-border bg-white p-4"><option value="">Inches</option>{Array.from({length:12},(_,i)=>i).map(i => <option key={i} value={i}>{i} in</option>)}</select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                  {fields.map((f) => {
                    const value = m[f.id] || "";
                    const error = getFieldError(f.id, value);
                    return (
                      <div key={f.id}>
                        <label className="flex justify-between mb-3"><span className="text-[10px] uppercase">{f.label} {f.required && "*"}</span></label>
                        <input type="text" value={value} onChange={(e) => updateM(f.id, e.target.value)} onFocus={() => setActiveField(f.id)} placeholder="—" className={`w-full border p-4 bg-white ${error ? "border-red-400" : "border-border focus:border-bronze"}`} />
                        {error && <p className="text-[10px] text-red-500 mt-2">{error}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 border border-border bg-white">
                <div className="aspect-square bg-cream flex items-center justify-center">
                  {activeField && MEASUREMENT_IMAGES[activeField] ? <img src={MEASUREMENT_IMAGES[activeField]} className="w-full h-full object-contain p-8" /> : "Select field"}
                </div>
                <div className="p-6 text-center border-t border-border">
                  <h3 className="text-2xl font-serif mb-2">{activeFieldData?.label}</h3>
                  <p className="text-xs text-stone">{activeFieldData?.hint}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-border flex justify-between max-w-5xl mx-auto">
            <p className="text-xs text-stone">{requiredMissing.length > 0 ? `Still needed: ${requiredMissing.join(", ")}` : "✓ All valid"}</p>
            <button onClick={nextStep} disabled={requiredMissing.length > 0 || !heightFt} className="bg-ink text-paper px-16 py-5 text-[11px] disabled:opacity-30">Continue →</button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 3: CONTACT
  if (step === 3) {
    return (
      <div className="min-h-screen bg-paper">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <button onClick={prevStep} className="text-[10px] uppercase text-stone mb-12">← Back</button>
          <h1 className="text-4xl font-serif text-center mb-16">Contact & Shipping</h1>
          
          <div className="space-y-6">
            <input type="text" placeholder="Full Name *" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} className="w-full border border-border p-4" />
            <input type="email" placeholder="Email *" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="w-full border border-border p-4" />
            <input type="text" placeholder="Phone" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className="w-full border border-border p-4" />
            <input type="text" placeholder="Address 1 *" value={contact.address1} onChange={(e) => setContact({ ...contact, address1: e.target.value })} className="w-full border border-border p-4" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="City *" value={contact.city} onChange={(e) => setContact({ ...contact, city: e.target.value })} className="w-full border border-border p-4" />
              <input type="text" placeholder="Postal Code" value={contact.postalCode} onChange={(e) => setContact({ ...contact, postalCode: e.target.value })} className="w-full border border-border p-4" />
            </div>
            <input type="text" placeholder="Country *" value={contact.country} onChange={(e) => setContact({ ...contact, country: e.target.value })} className="w-full border border-border p-4" />
          </div>

          <div className="mt-16 flex justify-between">
            <button onClick={prevStep} className="text-stone text-sm">← Back</button>
            <button onClick={nextStep} disabled={!contact.name || !contact.email || !contact.address1 || !contact.city} className="bg-ink text-paper px-16 py-5 text-[11px] disabled:opacity-30">Review →</button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 4: REVIEW
  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-serif text-center mb-16">Review Order</h1>
        
        <div className="border border-border bg-white p-8 mb-6">
          <div className="flex justify-between mb-4"><span>Model</span><span className="font-medium">{model.name}</span></div>
          {selectedFabric && (
            <div className="flex justify-between mb-4 border-t pt-4"><span>Fabric</span><span className="font-medium">{selectedFabric.name} (+{formatPrice(selectedFabric.price)})</span></div>
          )}
          <div className="flex justify-between border-t pt-4"><span>Total</span><span className="text-2xl font-serif">{formatPrice(finalPrice)}</span></div>
        </div>

        <button onClick={handleSubmit} disabled={submitting} className="w-full bg-ink text-paper py-6 text-[11px] uppercase tracking-[0.4em]">
          {submitting ? "Submitting..." : "Submit Order"}
        </button>
      </div>
    </div>
  );
}

export default function WomenBespokePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <WomenBespokePageContent />
    </Suspense>
  );
}
