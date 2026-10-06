// app/custom/men/[id]/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCurrency } from "@/context/currency-context";
import { supabase } from "@/lib/supabase";

const JACKET_FITS = ["Regular Fit", "Slim Fit", "Relaxed Fit"];
const TROUSER_FITS = ["Classic Comfort Fit", "Slim Fit", "Relaxed Fit"];

export default function MenBespokePage() {
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

  const [m, setM] = useState<Record<string, string>>({
    chest: "", sleeves: "", shoulder: "", jacketLength: "",
    stomach: "", bicep: "", pantsLength: "", waist: "",
    seat: "", frontRise: "", backRise: "", thighs: "",
    knee: "", legOpening: "",
  });

  const [jacketFit, setJacketFit] = useState(JACKET_FITS[0]);
  const [trouserFit, setTrouserFit] = useState(TROUSER_FITS[0]);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const [contact, setContact] = useState({
    name: "", email: "", phone: "", country: "", notes: "",
  });

  const totalSteps = 3;

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

  const updateM = (key: string, value: string) =>
    setM({ ...m, [key]: value });

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
        category: "men",
        product_type: model.product_type || "suit",
        measurements: {
          profileName,
          height: `${heightFt}' ${heightIn}"`,
          ...m,
          jacketFit,
          trouserFit,
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
          <Link href="/custom/men" className="text-neutral-500 hover:text-neutral-900 underline">
            ← Back to Men&apos;s Collection
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
            href="/custom/men"
            className="inline-block bg-neutral-900 text-white px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition"
          >
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  // ============================================
  // STEP -1: PRODUCT SHOWCASE
  // ============================================
  if (step === -1) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-24 px-5 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <Link
            href="/custom/men"
            className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 mb-8 inline-block"
          >
            ← Back to Collection
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Gallery */}
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

            {/* Info */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
                {model.product_type || "Suit"}
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

              <div className="border-t border-neutral-200 pt-8 mb-8">
                <h2 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">
                  Details
                </h2>
                <ul className="space-y-3 text-sm text-neutral-600">
                  <li className="flex gap-3"><span className="text-neutral-400">—</span><span>Custom made to your exact measurements</span></li>
                  <li className="flex gap-3"><span className="text-neutral-400">—</span><span>Handcrafted in limited quantities</span></li>
                  <li className="flex gap-3"><span className="text-neutral-400">—</span><span>Dispatched within 3 weeks</span></li>
                  <li className="flex gap-3"><span className="text-neutral-400">—</span><span>Free worldwide shipping</span></li>
                </ul>
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

  // ============================================
  // STEP 0: MEASUREMENT FORM
  // ============================================
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
              Custom Measurements
            </p>
            <h1 className="text-3xl md:text-4xl font-serif mb-4 text-neutral-900">
              Create Your Size Profile
            </h1>
            <p className="text-neutral-500 text-sm">
              All measurements in inches. Measure over well-fitted clothing.
            </p>
          </div>

          <div className="border border-neutral-200 p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* LEFT: Form fields */}
              <div className="space-y-6">
                {/* Profile Name */}
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

                {/* Height */}
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

                {/* Measurements grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "chest", label: "Chest *" },
                    { id: "shoulder", label: "Shoulder *" },
                    { id: "stomach", label: "Stomach *" },
                    { id: "sleeves", label: "Sleeves *" },
                    { id: "jacketLength", label: "Jacket Length *" },
                    { id: "bicep", label: "Bicep" },
                    { id: "waist", label: "Waist *" },
                    { id: "seat", label: "Seat *" },
                    { id: "pantsLength", label: "Pants Length *" },
                    { id: "frontRise", label: "Front Rise" },
                    { id: "backRise", label: "Back Rise" },
                    { id: "thighs", label: "Thighs" },
                    { id: "knee", label: "Knee" },
                    { id: "legOpening", label: "Leg Opening" },
                  ].map((f) => (
                    <div key={f.id}>
                      <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">
                        {f.label}
                      </label>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={m[f.id]}
                        onChange={(e) => updateM(f.id, e.target.value)}
                        placeholder="in"
                        className="w-full border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm"
                      />
                    </div>
                  ))}
                </div>

                {/* Jacket Fit */}
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

                {/* Trouser Fit */}
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

                {/* Additional Info */}
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

              {/* RIGHT: Measuring Guide */}
              <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
                <div className="border border-neutral-200 p-6">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">
                    How to Measure
                  </h3>

                  <div className="space-y-4 text-sm text-neutral-600">
                    <div className="flex gap-3">
                      <span className="text-neutral-400 font-mono">01</span>
                      <p><strong className="text-neutral-900">Chest:</strong> Measure around the fullest part of your chest.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-neutral-400 font-mono">02</span>
                      <p><strong className="text-neutral-900">Shoulder:</strong> Measure across the back from shoulder point to shoulder point.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-neutral-400 font-mono">03</span>
                      <p><strong className="text-neutral-900">Stomach:</strong> Measure around your stomach at the widest point.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-neutral-400 font-mono">04</span>
                      <p><strong className="text-neutral-900">Sleeves:</strong> From shoulder point to wrist bone.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-neutral-400 font-mono">05</span>
                      <p><strong className="text-neutral-900">Jacket Length:</strong> From base of neck to where you want jacket hem.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-neutral-400 font-mono">06</span>
                      <p><strong className="text-neutral-900">Waist:</strong> Around your natural waistline.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-neutral-400 font-mono">07</span>
                      <p><strong className="text-neutral-900">Seat:</strong> Around the fullest part of your hips.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-neutral-400 font-mono">08</span>
                      <p><strong className="text-neutral-900">Pants Length:</strong> From waistband to ankle bone.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-neutral-200 p-6 bg-neutral-50">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 font-semibold">
                    Need help?
                  </p>
                  <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                    Send us a photo of your best-fitting suit — we&apos;ll match the measurements for you.
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

            {/* Navigation */}
            <div className="mt-10 pt-6 border-t border-neutral-200 flex justify-between items-center">
              <div />
              <button
                onClick={() => setStep(1)}
                disabled={
                  !m.chest || !m.shoulder || !m.waist ||
                  !m.sleeves || !m.jacketLength || !m.pantsLength
                }
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

  // ============================================
  // STEP 1: CONTACT INFO
  // ============================================
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
              <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">
                Full Name *
              </label>
              <input
                type="text"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                className="w-full border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">
                Email Address *
              </label>
              <input
                type="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="w-full border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">
                Phone / WhatsApp
              </label>
              <input
                type="text"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                className="w-full border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">
                Country
              </label>
              <input
                type="text"
                value={contact.country}
                onChange={(e) => setContact({ ...contact, country: e.target.value })}
                className="w-full border border-neutral-200 p-3 focus:border-neutral-900 outline-none text-sm"
              />
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-neutral-200 flex justify-between items-center">
            <button
              onClick={() => setStep(0)}
              className="text-neutral-500 hover:text-neutral-900 font-medium text-sm tracking-wide"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(2)}
              disabled={!contact.name || !contact.email}
              className="bg-neutral-900 text-white px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition disabled:opacity-50"
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // STEP 2: REVIEW + SUBMIT
  // ============================================
  return (
    <div className="min-h-screen bg-white py-16 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => setStep(1)}
          className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 mb-8 inline-block"
        >
          ← Back
        </button>

        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
            Step 3 of 3
          </p>
          <h1 className="text-3xl md:text-4xl font-serif mb-4 text-neutral-900">
            Review &amp; Submit
          </h1>
        </div>

        <div className="border border-neutral-200 p-6 md:p-10 space-y-8">
          {/* Order summary */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">
              Order Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-neutral-50 p-4 border border-neutral-200">
                <p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Model</p>
                <p className="font-medium text-neutral-900">{model.name}</p>
              </div>
              <div className="bg-neutral-50 p-4 border border-neutral-200">
                <p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Price</p>
                <p className="font-medium text-neutral-900">{formatPrice(model.price)}</p>
              </div>
            </div>
          </div>

          {/* Measurements */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">
              Measurements (inches)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              {heightFt && (
                <div>
                  <p className="text-neutral-500 text-xs mb-1">Height</p>
                  <p className="font-medium">{heightFt}&apos; {heightIn}&quot;</p>
                </div>
              )}
              {Object.entries(m).map(([key, value]) =>
                value ? (
                  <div key={key}>
                    <p className="text-neutral-500 text-xs mb-1 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <p className="font-medium">{value}&quot;</p>
                  </div>
                ) : null
              )}
              <div>
                <p className="text-neutral-500 text-xs mb-1">Jacket Fit</p>
                <p className="font-medium">{jacketFit}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-xs mb-1">Trouser Fit</p>
                <p className="font-medium">{trouserFit}</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          {additionalInfo && (
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">
                Additional Information
              </h3>
              <p className="text-sm text-neutral-700 whitespace-pre-line">{additionalInfo}</p>
            </div>
          )}

          {/* Contact */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">
              Contact
            </h3>
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

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-neutral-900 text-white py-5 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
