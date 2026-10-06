// app/custom/women/[id]/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCurrency } from "@/context/currency-context";
import { supabase } from "@/lib/supabase";

const JACKET_FITS = ["Regular Fit", "Slim Fit", "Relaxed Fit"];
const TROUSER_FITS = ["Classic Comfort Fit", "Slim Fit", "Relaxed Fit"];

const MEASUREMENT_FIELDS: Record<string, { id: string; label: string; hint: string; required: boolean }[]> = {
  blazer: [
    { id: "bust", label: "Bust", hint: "Around the fullest part of your bust", required: true },
    { id: "shoulder", label: "Shoulder Width", hint: "Shoulder point to shoulder point", required: true },
    { id: "sleeve", label: "Sleeve Length", hint: "Shoulder point to wrist bone", required: true },
    { id: "jacketLength", label: "Jacket Length", hint: "Base of neck to desired hem", required: true },
    { id: "bicep", label: "Bicep", hint: "Fullest part of upper arm", required: false },
    { id: "waist", label: "Waist", hint: "Narrowest part of waist", required: true },
  ],
  shirt: [
    { id: "bust", label: "Bust", hint: "Fullest part of bust", required: true },
    { id: "shoulder", label: "Shoulder Width", hint: "Shoulder to shoulder", required: true },
    { id: "sleeve", label: "Sleeve Length", hint: "Shoulder to wrist bone", required: true },
    { id: "jacketLength", label: "Shirt Length", hint: "Base of neck to shirt hem", required: true },
    { id: "waist", label: "Waist", hint: "Natural waistline", required: false },
  ],
  trouser: [
    { id: "waist", label: "Waist", hint: "Where you wear your trousers", required: true },
    { id: "seat", label: "Hip", hint: "Fullest part of hips", required: true },
    { id: "pantsLength", label: "Inseam", hint: "Crotch to ankle bone", required: true },
    { id: "thighs", label: "Thigh", hint: "Fullest part of thigh", required: false },
    { id: "knee", label: "Knee", hint: "Around knee, slightly bent", required: false },
    { id: "legOpening", label: "Leg Opening", hint: "Bottom of trouser leg", required: false },
  ],
  suit: [
    { id: "bust", label: "Bust", hint: "Fullest part of bust", required: true },
    { id: "underbust", label: "Underbust", hint: "Just under the bust", required: true },
    { id: "shoulder", label: "Shoulder Width", hint: "Shoulder to shoulder", required: true },
    { id: "sleeve", label: "Sleeve Length", hint: "Shoulder to wrist bone", required: true },
    { id: "jacketLength", label: "Jacket Length", hint: "Base of neck to hem", required: true },
    { id: "bicep", label: "Bicep", hint: "Fullest part of upper arm", required: false },
    { id: "waist", label: "Jacket Waist", hint: "Narrowest part of waist", required: true },
    { id: "seat", label: "Hip", hint: "Fullest part of hips", required: true },
    { id: "pantsLength", label: "Inseam", hint: "Crotch to ankle bone", required: true },
    { id: "thighs", label: "Thigh", hint: "Fullest part of thigh", required: false },
    { id: "knee", label: "Knee", hint: "Around knee", required: false },
    { id: "legOpening", label: "Leg Opening", hint: "Bottom of trouser leg", required: false },
  ],
  tuxedo: [
    { id: "bust", label: "Bust", hint: "Fullest part of bust", required: true },
    { id: "underbust", label: "Underbust", hint: "Just under the bust", required: true },
    { id: "shoulder", label: "Shoulder Width", hint: "Shoulder to shoulder", required: true },
    { id: "sleeve", label: "Sleeve Length", hint: "Shoulder to wrist bone", required: true },
    { id: "jacketLength", label: "Jacket Length", hint: "Base of neck to hem", required: true },
    { id: "waist", label: "Jacket Waist", hint: "Narrowest part of waist", required: true },
    { id: "seat", label: "Hip", hint: "Fullest part of hips", required: true },
    { id: "pantsLength", label: "Inseam", hint: "Crotch to ankle bone", required: true },
    { id: "thighs", label: "Thigh", hint: "Fullest part of thigh", required: false },
    { id: "knee", label: "Knee", hint: "Around knee", required: false },
    { id: "legOpening", label: "Leg Opening", hint: "Bottom of trouser leg", required: false },
  ],
  coat: [
    { id: "bust", label: "Bust", hint: "Fullest part of bust", required: true },
    { id: "shoulder", label: "Shoulder Width", hint: "Shoulder to shoulder", required: true },
    { id: "sleeve", label: "Sleeve Length", hint: "Shoulder to wrist bone", required: true },
    { id: "jacketLength", label: "Coat Length", hint: "Base of neck to hem", required: true },
    { id: "waist", label: "Waist", hint: "Narrowest part of waist", required: true },
  ],
  vest: [
    { id: "bust", label: "Bust", hint: "Fullest part of bust", required: true },
    { id: "waist", label: "Waist", hint: "Narrowest part of waist", required: true },
    { id: "jacketLength", label: "Vest Length", hint: "Top of shoulder to vest hem", required: true },
  ],
};

const MEASUREMENT_IMAGES: Record<string, string> = {
  bust: "/images/measurements-women/wom_chest.webp",
  underbust: "/images/measurements-women/wom_stomach.webp",
  shoulder: "/images/measurements-women/wom_shoulder.webp",
  sleeve: "/images/measurements-women/wom_sleeves.webp",
  jacketLength: "/images/measurements-women/wom_jacket_length.webp",
  bicep: "/images/measurements-women/wom_bicep.webp",
  waist: "/images/measurements-women/wom_waist.webp",
  seat: "/images/measurements-women/wom_seat.webp",
  pantsLength: "/images/measurements-women/wom_pants_length.webp",
  knee: "/images/measurements-women/wom_knee.webp",
  thighs: "/images/measurements-women/wom_thighs.webp",
  legOpening: "/images/measurements-women/body_leg_opening.webp",
  frontRise: "/images/measurements-women/front-rise-women.webp",
  backRise: "/images/measurements-women/back-rise-women.webp",
};

export default function WomenBespokePage() {
  const params = useParams();
  const id = params?.id as string;
  const { formatPrice } = useCurrency();

  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(-1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [profileName, setProfileName] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [m, setM] = useState<Record<string, string>>({});
  const [jacketFit, setJacketFit] = useState(JACKET_FITS[0]);
  const [trouserFit, setTrouserFit] = useState(TROUSER_FITS[0]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [activeField, setActiveField] = useState<string>("bust");

  const [contact, setContact] = useState({
    name: "", email: "", phone: "", country: "", notes: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  useEffect(() => {
    const fetchModel = async () => {
      const { data } = await supabase
        .from("models")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (!data) {
        setLoading(false);
        return;
      }
      setModel(data);
      setProfileName(`${data.name} — ${new Date().toLocaleDateString()}`);
      setLoading(false);
    };
    fetchModel();
  }, [id]);

  const galleryImages: string[] =
    model?.images && Array.isArray(model.images) && model.images.length > 0
      ? model.images
      : model?.image_url
      ? [model.image_url]
      : [];

  const pt = model?.product_type || "suit";
  const fields = MEASUREMENT_FIELDS[pt] || MEASUREMENT_FIELDS.suit;
  const needsJacketFit = ["suit", "tuxedo", "blazer", "coat"].includes(pt);
  const needsTrouserFit = ["suit", "tuxedo", "trouser"].includes(pt);

  const updateM = (key: string, value: string) =>
    setM({ ...m, [key]: value });

  const filledCount = fields.filter((f) => m[f.id]).length;
  const requiredMissing = fields
    .filter((f) => f.required && !m[f.id])
    .map((f) => f.label);

  const handleSubmit = async () => {
    if (!contact.name || !contact.email) {
      alert("Please fill in your name and email");
      return;
    }
    setSubmitting(true);

    try {
      const payload = {
        customer_name: contact.name,
        customer_email: contact.email,
        customer_phone: contact.phone,
        customer_country: contact.country,
        fit_type: "custom",
        standard_size: null,
        model_id: String(model.id),
        model_name: model.name,
        category: "women",
        product_type: pt,
        measurements: {
          profileName,
          height: `${heightFt}' ${heightIn}"`,
          ...m,
          ...(needsJacketFit ? { jacketFit } : {}),
          ...(needsTrouserFit ? { trouserFit } : {}),
          additionalInfo,
        },
        total_price: model.price,
        currency: "USD",
        notes: additionalInfo || contact.notes,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-neutral-900 mb-4">Model Not Found</h1>
          <Link href="/custom/women" className="text-neutral-500 hover:text-neutral-900 underline">
            ← Back to Women&apos;s Collection
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-5 py-20">
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto mb-10 text-3xl">✓</div>
          <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">Order Confirmed</p>
          <h1 className="text-3xl font-serif text-neutral-900 mb-6">Thank you, {contact.name.split(" ")[0]}.</h1>
          <p className="text-neutral-500 mb-3 text-sm">Order number</p>
          <p className="text-lg font-mono text-neutral-900 mb-10 tracking-wider">{orderNumber}</p>
          <div className="border border-neutral-200 p-6 text-left mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4">What happens next</p>
            <ol className="space-y-3 text-sm text-neutral-600">
              <li className="flex gap-3"><span className="text-neutral-400 font-mono">01</span><span>We review your measurements within 24 hours</span></li>
              <li className="flex gap-3"><span className="text-neutral-400 font-mono">02</span><span>Payment instructions sent to <strong className="text-neutral-900">{contact.email}</strong></span></li>
              <li className="flex gap-3"><span className="text-neutral-400 font-mono">03</span><span>Production starts — dispatch within 3 weeks</span></li>
            </ol>
          </div>
          <Link href="/custom/women" className="inline-block bg-neutral-900 text-white px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition">
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  if (step === -1) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-24 px-5 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <Link href="/custom/women" className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 mb-8 inline-block">
            ← Back to Collection
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
            <div className="space-y-4">
              {galleryImages.map((img, i) => (
                <div key={i} className="relative aspect-[3/4] overflow-hidden bg-neutral-50">
                  <img src={img} alt={`${model.name} ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" loading={i === 0 ? "eager" : "lazy"} />
                </div>
              ))}
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">{pt} · Bespoke</p>
              <h1 className="text-3xl md:text-5xl font-serif mb-6 text-neutral-900 leading-[1.1]">{model.name}</h1>
              <p className="text-2xl text-neutral-900 mb-10 pb-10 border-b border-neutral-200">{formatPrice(model.price)}</p>

              <div className="mb-10">
                <h2 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">Description</h2>
                <p className="text-neutral-600 leading-relaxed text-sm whitespace-pre-line">{model.description}</p>
              </div>

              <div className="border-t border-neutral-200 pt-8 mb-10">
                <h2 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">The PADO Promise</h2>
                <ul className="space-y-3 text-sm text-neutral-600">
                  <li className="flex gap-3"><span className="text-neutral-400">—</span><span>Cut to your exact measurements</span></li>
                  <li className="flex gap-3"><span className="text-neutral-400">—</span><span>Hand-finished by master tailors</span></li>
                  <li className="flex gap-3"><span className="text-neutral-400">—</span><span>Dispatched within 3 weeks</span></li>
                  <li className="flex gap-3"><span className="text-neutral-400">—</span><span>Complimentary worldwide shipping</span></li>
                </ul>
              </div>

              <div className="space-y-3">
                <button onClick={() => setStep(0)} className="w-full bg-neutral-900 text-white py-5 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition">
                  Begin Your Order →
                </button>
                <a href={`https://wa.me/16393840265?text=${encodeURIComponent(`Hi, I'm interested in: ${model.name}`)}`} target="_blank" rel="noopener noreferrer" className="block w-full border border-neutral-300 text-neutral-900 text-center py-5 text-[11px] uppercase tracking-[0.3em] font-medium hover:border-neutral-900 transition">
                  Speak to a Tailor
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 0) {
    return (
      <div className="min-h-screen bg-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <button onClick={() => setStep(-1)} className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 mb-10 inline-block">
            ← Back to Product
          </button>

          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium border transition-all ${step >= i ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-400 border-neutral-300"}`}>
                    {i + 1}
                  </div>
                  {i < 2 && <div className={`w-12 h-[1px] ${step > i ? "bg-neutral-900" : "bg-neutral-200"}`} />}
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] uppercase tracking-[0.4em] text-neutral-500">Step 1 of 3 — Measurements</p>
          </div>

          <div className="text-center mb-14">
            <h1 className="text-3xl md:text-5xl font-serif mb-4 text-neutral-900">Your Measurements</h1>
            <p className="text-neutral-500 text-sm max-w-xl mx-auto leading-relaxed">
              Provide your measurements in inches. Fields marked with * are required.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="border-b border-neutral-200 pb-6 mb-6">
                <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-3 font-semibold">Measurement Profile Name *</label>
                <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full border-0 border-b border-neutral-200 pb-3 focus:border-neutral-900 outline-none text-sm bg-transparent" />
              </div>

              <div className="border-b border-neutral-200 pb-6 mb-8">
                <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-3 font-semibold">Height *</label>
                <div className="flex gap-4">
                  <select value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="flex-1 border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm bg-white">
                    <option value="">Feet</option>
                    {[4, 5, 6, 7].map((ft) => (<option key={ft} value={ft}>{ft} ft</option>))}
                  </select>
                  <select value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="flex-1 border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm bg-white">
                    <option value="">Inches</option>
                    {Array.from({ length: 12 }, (_, i) => i).map((inch) => (<option key={inch} value={inch}>{inch} in</option>))}
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-semibold">{pt} Measurements</h3>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400">{filledCount} / {fields.length} filled</p>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  {fields.map((f) => (
                    <div key={f.id}>
                      <label className="block text-[11px] uppercase tracking-[0.15em] text-neutral-700 mb-2 font-medium">
                        {f.label} {f.required && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={m[f.id] || ""}
                        onChange={(e) => updateM(f.id, e.target.value)}
                        onFocus={() => setActiveField(f.id)}
                        placeholder="—"
                        className={`w-full border p-3 focus:border-neutral-900 outline-none text-sm transition-colors ${activeField === f.id ? "border-neutral-900 bg-neutral-50" : "border-neutral-200"}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {needsJacketFit && (
                <div className="border-t border-neutral-200 pt-6 mb-6">
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-neutral-700 mb-3 font-medium">Jacket Fit</label>
                  <select value={jacketFit} onChange={(e) => setJacketFit(e.target.value)} className="w-full border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm bg-white">
                    {JACKET_FITS.map((f) => (<option key={f} value={f}>{f}</option>))}
                  </select>
                </div>
              )}

              {needsTrouserFit && (
                <div className="border-t border-neutral-200 pt-6 mb-6">
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-neutral-700 mb-3 font-medium">Trouser Fit</label>
                  <select value={trouserFit} onChange={(e) => setTrouserFit(e.target.value)} className="w-full border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm bg-white">
                    {TROUSER_FITS.map((f) => (<option key={f} value={f}>{f}</option>))}
                  </select>
                </div>
              )}

              <div className="border-t border-neutral-200 pt-6">
                <label className="block text-[11px] uppercase tracking-[0.15em] text-neutral-700 mb-3 font-medium">Additional Requests</label>
                <p className="text-[11px] text-neutral-400 mb-3">Any changes to fit, style, or special requests.</p>
                <textarea value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} rows={4} placeholder="e.g. Taper trousers, add monogram, longer sleeves..." className="w-full border border-neutral-200 p-3 focus:border-neutral-900 outline-none resize-none text-sm" />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="border border-neutral-200 bg-neutral-50">
                  <div className="aspect-square flex items-center justify-center overflow-hidden relative">
                    {activeField && MEASUREMENT_IMAGES[activeField] ? (
                      <img src={MEASUREMENT_IMAGES[activeField]} alt={fields.find((f) => f.id === activeField)?.label || "Measurement"} className="w-full h-full object-contain p-6" />
                    ) : (
                      <p className="text-neutral-400 text-[10px] uppercase tracking-widest">Select a field to see guide</p>
                    )}
                  </div>
                  <div className="p-5 bg-white border-t border-neutral-200 text-center">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">How to Measure</p>
                    <p className="text-base font-serif text-neutral-900">{fields.find((f) => f.id === activeField)?.label || "Select a Field"}</p>
                    {fields.find((f) => f.id === activeField)?.hint && (
                      <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{fields.find((f) => f.id === activeField)?.hint}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 border border-neutral-200 p-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 font-semibold">Need assistance?</p>
                  <p className="text-xs text-neutral-600 mb-4 leading-relaxed">Send us a photo of your best-fitting {pt}. Our master tailors will match the measurements for you.</p>
                  <a href="https://wa.me/16393840265?text=Hi%2C%20I%20need%20help%20with%20measurements" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.3em] uppercase border-b border-neutral-900 pb-1 inline-block hover:opacity-60 transition">
                    WhatsApp Us →
                  </a>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="border border-neutral-200 p-3"><p className="text-[9px] uppercase tracking-widest text-neutral-500 leading-tight">Secure Order</p></div>
                  <div className="border border-neutral-200 p-3"><p className="text-[9px] uppercase tracking-widest text-neutral-500 leading-tight">Worldwide Shipping</p></div>
                  <div className="border border-neutral-200 p-3"><p className="text-[9px] uppercase tracking-widest text-neutral-500 leading-tight">Master Tailors</p></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-neutral-200 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              {requiredMissing.length > 0 ? (
                <p className="text-xs text-neutral-500"><span className="font-medium text-neutral-900">Still needed:</span> {requiredMissing.join(", ")}</p>
              ) : (
                <p className="text-xs text-neutral-500">All required fields completed ✓</p>
              )}
            </div>
            <button onClick={() => setStep(1)} disabled={requiredMissing.length > 0 || !heightFt || !heightIn} className="bg-neutral-900 text-white px-12 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition disabled:opacity-40">
              Continue to Contact →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-white py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setStep(0)} className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 mb-10 inline-block">
            ← Back to Measurements
          </button>

          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium border ${step >= i ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-400 border-neutral-300"}`}>
                    {step > i ? "✓" : i + 1}
                  </div>
                  {i < 2 && <div className={`w-12 h-[1px] ${step > i ? "bg-neutral-900" : "bg-neutral-200"}`} />}
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] uppercase tracking-[0.4em] text-neutral-500">Step 2 of 3 — Contact</p>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif mb-4 text-neutral-900">Contact Information</h1>
            <p className="text-neutral-500 text-sm">We&apos;ll use this to send order updates and payment instructions.</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">Full Name *</label>
              <input type="text" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} className="w-full border border-neutral-200 p-3.5 focus:border-neutral-900 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">Email Address *</label>
              <input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="w-full border border-neutral-200 p-3.5 focus:border-neutral-900 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">Phone / WhatsApp</label>
              <input type="text" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className="w-full border border-neutral-200 p-3.5 focus:border-neutral-900 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">Country</label>
              <input type="text" value={contact.country} onChange={(e) => setContact({ ...contact, country: e.target.value })} className="w-full border border-neutral-200 p-3.5 focus:border-neutral-900 outline-none text-sm" />
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-200 flex justify-between items-center">
            <button onClick={() => setStep(0)} className="text-neutral-500 hover:text-neutral-900 font-medium text-sm tracking-wide">← Back</button>
            <button onClick={() => setStep(2)} disabled={!contact.name || !contact.email} className="bg-neutral-900 text-white px-12 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition disabled:opacity-40">
              Review Order →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => setStep(1)} className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 mb-10 inline-block">
          ← Back to Contact
        </button>

        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium border bg-neutral-900 text-white border-neutral-900">✓</div>
                {i < 2 && <div className="w-12 h-[1px] bg-neutral-900" />}
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] uppercase tracking-[0.4em] text-neutral-500">Step 3 of 3 — Review</p>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif mb-4 text-neutral-900">Review Your Order</h1>
          <p className="text-neutral-500 text-sm">Confirm everything looks correct before submitting.</p>
        </div>

        <div className="space-y-8">
          <div className="border border-neutral-200 p-6">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-start gap-4"><span className="text-neutral-500">Model</span><span className="font-medium text-neutral-900 text-right">{model.name}</span></div>
              <div className="flex justify-between items-start gap-4 pt-3 border-t border-neutral-100"><span className="text-neutral-500">Fit</span><span className="font-medium text-neutral-900">Custom Measurements</span></div>
              <div className="flex justify-between items-start gap-4 pt-3 border-t border-neutral-100"><span className="text-neutral-500">Total</span><span className="font-serif text-xl text-neutral-900">{formatPrice(model.price)}</span></div>
            </div>
          </div>

          <div className="border border-neutral-200 p-6">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-5 font-semibold">Measurements (inches)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div><p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Height</p><p className="font-medium text-neutral-900">{heightFt}&apos; {heightIn}&quot;</p></div>
              {fields.map((f) => m[f.id] ? (
                <div key={f.id}><p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">{f.label}</p><p className="font-medium text-neutral-900">{m[f.id]}&quot;</p></div>
              ) : null)}
              {needsJacketFit && <div><p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Jacket Fit</p><p className="font-medium text-neutral-900">{jacketFit}</p></div>}
              {needsTrouserFit && <div><p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Trouser Fit</p><p className="font-medium text-neutral-900">{trouserFit}</p></div>}
            </div>
          </div>

          {additionalInfo && (
            <div className="border border-neutral-200 p-6">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">Additional Requests</h3>
              <p className="text-sm text-neutral-700 whitespace-pre-line leading-relaxed">{additionalInfo}</p>
            </div>
          )}

          <div className="border border-neutral-200 p-6">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">Contact</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-neutral-500">Name:</span> <span className="text-neutral-900">{contact.name}</span></p>
              <p><span className="text-neutral-500">Email:</span> <span className="text-neutral-900">{contact.email}</span></p>
              {contact.phone && <p><span className="text-neutral-500">Phone:</span> <span className="text-neutral-900">{contact.phone}</span></p>}
              {contact.country && <p><span className="text-neutral-500">Country:</span> <span className="text-neutral-900">{contact.country}</span></p>}
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">What happens after you submit</p>
            <ol className="space-y-3 text-sm text-neutral-600">
              <li className="flex gap-3"><span className="text-neutral-400 font-mono text-xs pt-0.5">01</span><span>Our master tailors review your measurements within 24 hours</span></li>
              <li className="flex gap-3"><span className="text-neutral-400 font-mono text-xs pt-0.5">02</span><span>Payment instructions sent to your email</span></li>
              <li className="flex gap-3"><span className="text-neutral-400 font-mono text-xs pt-0.5">03</span><span>Crafting begins — dispatched within 3 weeks</span></li>
            </ol>
          </div>

          <button onClick={handleSubmit} disabled={submitting} className="w-full bg-neutral-900 text-white py-5 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition disabled:opacity-50">
            {submitting ? "Submitting Order..." : "Submit Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
