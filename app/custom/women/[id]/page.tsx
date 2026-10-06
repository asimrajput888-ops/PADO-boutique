// app/custom/women/[id]/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCurrency } from "@/context/currency-context";
import { supabase } from "@/lib/supabase";

const JACKET_FITS = ["Regular Fit", "Slim Fit", "Relaxed Fit"];
const TROUSER_FITS = ["Classic Comfort Fit", "Slim Fit", "Relaxed Fit"];

// ============================================
// MEASUREMENT FIELDS BY PRODUCT TYPE (WOMEN)
// ============================================

const MEASUREMENT_FIELDS: Record<string, { id: string; label: string; required: boolean }[]> = {
  blazer: [
    { id: "bust", label: "Bust", required: true },
    { id: "shoulder", label: "Shoulder Width", required: true },
    { id: "sleeve", label: "Sleeve Length", required: true },
    { id: "jacketLength", label: "Jacket Length", required: true },
    { id: "bicep", label: "Bicep", required: false },
    { id: "waist", label: "Waist", required: true },
  ],
  shirt: [
    { id: "neck", label: "Neck", required: true },
    { id: "bust", label: "Bust", required: true },
    { id: "shoulder", label: "Shoulder Width", required: true },
    { id: "sleeve", label: "Sleeve Length", required: true },
    { id: "shirtLength", label: "Shirt Length", required: true },
    { id: "cuff", label: "Cuff", required: false },
    { id: "waist", label: "Waist", required: false },
  ],
  trouser: [
    { id: "waist", label: "Waist", required: true },
    { id: "hip", label: "Hip", required: true },
    { id: "inseam", label: "Inseam", required: true },
    { id: "thigh", label: "Thigh", required: false },
    { id: "knee", label: "Knee", required: false },
    { id: "legOpening", label: "Leg Opening", required: false },
    { id: "frontRise", label: "Front Rise", required: false },
    { id: "backRise", label: "Back Rise", required: false },
  ],
  suit: [
    { id: "bust", label: "Bust", required: true },
    { id: "underbust", label: "Underbust", required: true },
    { id: "shoulder", label: "Shoulder Width", required: true },
    { id: "sleeve", label: "Sleeve Length", required: true },
    { id: "jacketLength", label: "Jacket Length", required: true },
    { id: "bicep", label: "Bicep", required: false },
    { id: "waist", label: "Jacket Waist", required: true },
    { id: "trouserWaist", label: "Trouser Waist", required: true },
    { id: "hip", label: "Hip", required: true },
    { id: "inseam", label: "Inseam", required: true },
    { id: "thigh", label: "Thigh", required: false },
    { id: "knee", label: "Knee", required: false },
    { id: "legOpening", label: "Leg Opening", required: false },
    { id: "frontRise", label: "Front Rise", required: false },
  ],
  tuxedo: [
    { id: "bust", label: "Bust", required: true },
    { id: "underbust", label: "Underbust", required: true },
    { id: "shoulder", label: "Shoulder Width", required: true },
    { id: "sleeve", label: "Sleeve Length", required: true },
    { id: "jacketLength", label: "Jacket Length", required: true },
    { id: "bicep", label: "Bicep", required: false },
    { id: "waist", label: "Jacket Waist", required: true },
    { id: "trouserWaist", label: "Trouser Waist", required: true },
    { id: "hip", label: "Hip", required: true },
    { id: "inseam", label: "Inseam", required: true },
    { id: "thigh", label: "Thigh", required: false },
    { id: "knee", label: "Knee", required: false },
    { id: "legOpening", label: "Leg Opening", required: false },
    { id: "frontRise", label: "Front Rise", required: false },
  ],
  coat: [
    { id: "bust", label: "Bust", required: true },
    { id: "shoulder", label: "Shoulder Width", required: true },
    { id: "sleeve", label: "Sleeve Length", required: true },
    { id: "coatLength", label: "Coat Length", required: true },
    { id: "bicep", label: "Bicep", required: false },
    { id: "waist", label: "Waist", required: true },
  ],
  vest: [
    { id: "bust", label: "Bust", required: true },
    { id: "waist", label: "Waist", required: true },
    { id: "vestLength", label: "Vest Length", required: true },
  ],
};

const MEASUREMENT_GUIDE: Record<string, { label: string; hint: string }[]> = {
  blazer: [
    { label: "Bust", hint: "Around the fullest part of your bust, under the arms." },
    { label: "Shoulder Width", hint: "From shoulder point to shoulder point across your back." },
    { label: "Sleeve Length", hint: "From shoulder point to wrist bone, arm slightly bent." },
    { label: "Jacket Length", hint: "From base of neck to where you want the jacket hem." },
    { label: "Bicep", hint: "Around the fullest part of your upper arm." },
    { label: "Waist", hint: "Around your natural waistline, narrowest point." },
  ],
  shirt: [
    { label: "Neck", hint: "Around the base of your neck, one finger loose." },
    { label: "Bust", hint: "Around the fullest part of your bust." },
    { label: "Shoulder Width", hint: "From shoulder point to shoulder point across your back." },
    { label: "Sleeve Length", hint: "From shoulder point to wrist bone." },
    { label: "Shirt Length", hint: "From base of neck to where you want the shirt hem." },
    { label: "Cuff", hint: "Around your wrist where the cuff sits." },
    { label: "Waist", hint: "Around your natural waistline." },
  ],
  trouser: [
    { label: "Waist", hint: "Where you normally wear your trousers." },
    { label: "Hip", hint: "Around the fullest part of your hips." },
    { label: "Inseam", hint: "From crotch to ankle bone." },
    { label: "Thigh", hint: "Around the fullest part of your thigh." },
    { label: "Knee", hint: "Around your knee, slightly bent." },
    { label: "Leg Opening", hint: "Around the bottom of the trouser leg." },
    { label: "Front Rise", hint: "From crotch to top of waistband (front)." },
    { label: "Back Rise", hint: "From crotch to top of waistband (back)." },
  ],
  suit: [
    { label: "Bust", hint: "Around the fullest part of your bust." },
    { label: "Underbust", hint: "Around your rib cage just under the bust." },
    { label: "Shoulder Width", hint: "From shoulder point to shoulder point." },
    { label: "Sleeve Length", hint: "From shoulder point to wrist bone." },
    { label: "Jacket Length", hint: "From base of neck to jacket hem." },
    { label: "Jacket Waist", hint: "Around your natural waistline." },
    { label: "Trouser Waist", hint: "Where you normally wear trousers." },
    { label: "Hip", hint: "Around the fullest part of your hips." },
    { label: "Inseam", hint: "From crotch to ankle bone." },
    { label: "Thigh", hint: "Around the fullest part of your thigh." },
    { label: "Knee", hint: "Around your knee." },
    { label: "Leg Opening", hint: "Around bottom of trouser leg." },
    { label: "Front Rise", hint: "From crotch to top of waistband." },
  ],
  tuxedo: [
    { label: "Bust", hint: "Around the fullest part of your bust." },
    { label: "Underbust", hint: "Around your rib cage just under the bust." },
    { label: "Shoulder Width", hint: "From shoulder point to shoulder point." },
    { label: "Sleeve Length", hint: "From shoulder point to wrist bone." },
    { label: "Jacket Length", hint: "From base of neck to jacket hem." },
    { label: "Trouser Waist", hint: "Where you normally wear trousers." },
    { label: "Hip", hint: "Around the fullest part of your hips." },
    { label: "Inseam", hint: "From crotch to ankle bone." },
  ],
  coat: [
    { label: "Bust", hint: "Around the fullest part of your bust." },
    { label: "Shoulder Width", hint: "From shoulder point to shoulder point." },
    { label: "Sleeve Length", hint: "From shoulder point to wrist bone." },
    { label: "Coat Length", hint: "From base of neck to coat hem." },
    { label: "Waist", hint: "Around your natural waistline." },
  ],
  vest: [
    { label: "Bust", hint: "Around the fullest part of your bust." },
    { label: "Waist", hint: "Around your natural waistline." },
    { label: "Vest Length", hint: "From top of shoulder to desired vest hem." },
  ],
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
  const guide = MEASUREMENT_GUIDE[pt] || MEASUREMENT_GUIDE.suit;
  const needsJacketFit = ["suit", "tuxedo", "blazer", "coat"].includes(pt);
  const needsTrouserFit = ["suit", "tuxedo", "trouser"].includes(pt);

  const updateM = (key: string, value: string) =>
    setM({ ...m, [key]: value });

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
        <p className="text-neutral-400">Loading...</p>
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
          <div className="w-16 h-16 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto mb-8 text-2xl">✓</div>
          <h1 className="text-3xl font-serif text-neutral-900 mb-4">Order Received</h1>
          <p className="text-neutral-500 mb-2">Your order number is:</p>
          <p className="text-lg font-mono text-neutral-900 mb-8">{orderNumber}</p>
          <p className="text-neutral-500 text-sm mb-10 leading-relaxed">
            We&apos;ve sent a confirmation to <strong>{contact.email}</strong>. Our team will review your order within 24 hours and send you payment instructions.
          </p>
          <Link
            href="/custom/women"
            className="inline-block bg-neutral-900 text-white px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition"
          >
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  // STEP -1: Product Showcase
  if (step === -1) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-24 px-5 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <Link
            href="/custom/women"
            className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 mb-8 inline-block"
          >
            ← Back to Collection
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="space-y-3">
              {galleryImages.map((img, i) => (
                <div key={i} className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  <img
                    src={img}
                    alt={`${model.name} ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
                {pt}
              </p>
              <h1 className="text-3xl md:text-4xl font-serif mb-6 text-neutral-900 leading-tight">
                {model.name}
              </h1>
              <p className="text-2xl text-neutral-900 mb-8">
                {formatPrice(model.price)}
              </p>

              <div className="border-t border-neutral-200 pt-8 mb-8">
                <h2 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">
                  Description
                </h2>
                <p className="text-neutral-600 leading-relaxed text-sm whitespace-pre-line">
                  {model.description}
                </p>
              </div>

              <div className="border-t border-neutral-200 pt-8">
                <button
                  onClick={() => setStep(0)}
                  className="w-full bg-neutral-900 text-white py-5 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition"
                >
                  Order Now →
                </button>
                <a
                  href={`https://wa.me/16393840265?text=${encodeURIComponent(`Hi, I'm interested in: ${model.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border border-neutral-300 text-neutral-900 text-center py-5 text-[11px] uppercase tracking-[0.3em] font-medium hover:border-neutral-900 transition mt-3"
                >
                  Chat with a Tailor
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 0: Measurement Form
  if (step === 0) {
    return (
      <div className="min-h-screen bg-white py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setStep(-1)}
            className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 mb-8 inline-block"
          >
            ← Back to Product
          </button>

          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
              {pt.toUpperCase()} MEASUREMENTS
            </p>
            <h1 className="text-3xl md:text-4xl font-serif mb-4 text-neutral-900">
              Create Your Size Profile
            </h1>
            <p className="text-neutral-500 text-sm">
              All measurements in inches. Fields marked * are required.
            </p>
          </div>

          <div className="border border-neutral-200 p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">
                    Measurement Profile Name *
                  </label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">
                    Height *
                  </label>
                  <div className="flex gap-3">
                    <select
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      className="flex-1 border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm bg-white"
                    >
                      <option value="">Feet</option>
                      {[4, 5, 6, 7].map((ft) => (
                        <option key={ft} value={ft}>{ft} ft</option>
                      ))}
                    </select>
                    <select
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      className="flex-1 border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm bg-white"
                    >
                      <option value="">Inches</option>
                      {Array.from({ length: 12 }, (_, i) => i).map((inch) => (
                        <option key={inch} value={inch}>{inch} in</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {fields.map((f) => (
                    <div key={f.id}>
                      <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">
                        {f.label} {f.required && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={m[f.id] || ""}
                        onChange={(e) => updateM(f.id, e.target.value)}
                        placeholder="in"
                        className="w-full border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm"
                      />
                    </div>
                  ))}
                </div>

                {needsJacketFit && (
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">
                      Jacket Fit
                    </label>
                    <select
                      value={jacketFit}
                      onChange={(e) => setJacketFit(e.target.value)}
                      className="w-full border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm bg-white"
                    >
                      {JACKET_FITS.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                )}

                {needsTrouserFit && (
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">
                      Trouser Fit
                    </label>
                    <select
                      value={trouserFit}
                      onChange={(e) => setTrouserFit(e.target.value)}
                      className="w-full border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm bg-white"
                    >
                      {TROUSER_FITS.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">
                    Additional Information
                  </label>
                  <textarea
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    rows={4}
                    placeholder="Any changes, special requests, or notes about your order..."
                    className="w-full border border-neutral-200 p-3 focus:border-neutral-900 outline-none resize-none text-sm"
                  />
                </div>
              </div>

              <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
                <div className="border border-neutral-200 p-6">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">
                    How to Measure {pt}
                  </h3>

                  <div className="space-y-4 text-sm text-neutral-600">
                    {guide.map((g, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="text-neutral-400 font-mono text-xs pt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p>
                          <strong className="text-neutral-900">{g.label}:</strong>{" "}
                          {g.hint}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-neutral-200 p-6 bg-neutral-50">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 font-semibold">
                    Need help?
                  </p>
                  <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                    Send us a photo of your best-fitting {pt} — we&apos;ll match the measurements for you.
                  </p>
                  <a
                    href="https://wa.me/16393840265?text=Hi%2C%20I%20need%20help%20with%20measurements"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] tracking-[0.3em] uppercase border-b border-neutral-900 pb-1 inline-block hover:opacity-60 transition"
                  >
                    WhatsApp Us →
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-neutral-200 flex justify-between items-center">
              <div>
                {requiredMissing.length > 0 && (
                  <p className="text-xs text-neutral-500">
                    Missing: {requiredMissing.join(", ")}
                  </p>
                )}
              </div>
              <button
                onClick={() => setStep(1)}
                disabled={requiredMissing.length > 0 || !heightFt || !heightIn}
                className="bg-neutral-900 text-white px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition disabled:opacity-50"
              >
                Continue →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 1: Contact
  if (step === 1) {
    return (
      <div className="min-h-screen bg-white py-16 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setStep(0)}
            className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 mb-8 inline-block"
          >
            ← Back to Measurements
          </button>

          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
              Step 2 of 3
            </p>
            <h1 className="text-3xl md:text-4xl font-serif mb-4 text-neutral-900">
              Contact Information
            </h1>
          </div>

          <div className="border border-neutral-200 p-6 md:p-10 space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">Full Name *</label>
              <input type="text" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} className="w-full border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">Email Address *</label>
              <input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="w-full border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">Phone / WhatsApp</label>
              <input type="text" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className="w-full border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">Country</label>
              <input type="text" value={contact.country} onChange={(e) => setContact({ ...contact, country: e.target.value })} className="w-full border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm" />
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-neutral-200 flex justify-between items-center">
            <button onClick={() => setStep(0)} className="text-neutral-500 hover:text-neutral-900 font-medium text-sm tracking-wide">← Back</button>
            <button onClick={() => setStep(2)} disabled={!contact.name || !contact.email} className="bg-neutral-900 text-white px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition disabled:opacity-50">Continue →</button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: Review
  return (
    <div className="min-h-screen bg-white py-16 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => setStep(1)} className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 mb-8 inline-block">← Back</button>

        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">Step 3 of 3</p>
          <h1 className="text-3xl md:text-4xl font-serif mb-4 text-neutral-900">Review &amp; Submit</h1>
        </div>

        <div className="border border-neutral-200 p-6 md:p-10 space-y-8">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">Order Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-neutral-50 p-4 border border-neutral-200"><p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Model</p><p className="font-medium text-neutral-900">{model.name}</p></div>
              <div className="bg-neutral-50 p-4 border border-neutral-200"><p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Price</p><p className="font-medium text-neutral-900">{formatPrice(model.price)}</p></div>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">{pt.toUpperCase()} Measurements (inches)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <div><p className="text-neutral-500 text-xs mb-1">Height</p><p className="font-medium">{heightFt}&apos; {heightIn}&quot;</p></div>
              {fields.map((f) =>
                m[f.id] ? (
                  <div key={f.id}>
                    <p className="text-neutral-500 text-xs mb-1">{f.label}</p>
                    <p className="font-medium">{m[f.id]}&quot;</p>
                  </div>
                ) : null
              )}
              {needsJacketFit && <div><p className="text-neutral-500 text-xs mb-1">Jacket Fit</p><p className="font-medium">{jacketFit}</p></div>}
              {needsTrouserFit && <div><p className="text-neutral-500 text-xs mb-1">Trouser Fit</p><p className="font-medium">{trouserFit}</p></div>}
            </div>
          </div>

          {additionalInfo && (
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">Additional Information</h3>
              <p className="text-sm text-neutral-700 whitespace-pre-line">{additionalInfo}</p>
            </div>
          )}

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">Contact</h3>
            <div className="space-y-2 text-sm text-neutral-700">
              <p><strong className="text-neutral-900">Name:</strong> {contact.name}</p>
              <p><strong className="text-neutral-900">Email:</strong> {contact.email}</p>
              {contact.phone && <p><strong className="text-neutral-900">Phone:</strong> {contact.phone}</p>}
              {contact.country && <p><strong className="text-neutral-900">Country:</strong> {contact.country}</p>}
            </div>
          </div>

          <div className="bg-neutral-100 border border-neutral-200 p-5 text-sm text-neutral-700">
            <p className="font-medium mb-1 text-neutral-900">What happens next?</p>
            <p>We&apos;ll review your order within 24 hours and send payment instructions by email. Production starts after deposit.</p>
          </div>

          <button onClick={handleSubmit} disabled={submitting} className="w-full bg-neutral-900 text-white py-5 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition disabled:opacity-50">
            {submitting ? "Submitting..." : "Submit Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
