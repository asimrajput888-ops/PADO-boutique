// app/custom/men/[id]/page.tsx

"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useCurrency } from "@/context/currency-context";
import { supabase } from "@/lib/supabase";
import {
  FABRICS, LAPEL_OPTIONS, BUTTON_OPTIONS, SLEEVE_OPTIONS,
  SHIRT_COLLAR_OPTIONS, POCKET_OPTIONS, FIT_OPTIONS, TROUSER_OPTIONS,
  VENT_OPTIONS, VEST_OPTIONS, LINING_OPTIONS,
} from "@/lib/customizer-data";
import ThumbnailOption from "@/components/customizer/ThumbnailOption";
import SimpleOption from "@/components/customizer/SimpleOption";

const STANDARD_SIZES = ["36R", "38R", "40R", "42R", "44R", "46R"];

export default function MenBespokePage() {
  const params = useParams();
  const id = params?.id as string;
  const { formatPrice } = useCurrency();

  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [fitType, setFitType] = useState<"standard" | "custom" | null>(null);
  const [standardSize, setStandardSize] = useState("40R");

  const [contact, setContact] = useState({
    name: "", email: "", phone: "", country: "", notes: "",
  });

  const [measurements, setMeasurements] = useState<Record<string, string>>({});

  const [selection, setSelection] = useState<any>({
    fabric: "", lapel: "", buttons: "", sleeve: "", collar: "",
    pocket: "", fit: "", trouser: "", vent: "", vest: "", lining: "",
  });

  // Total steps: Standard = 2 (Fit + Contact), Custom = 5
  const totalSteps = fitType === "custom" ? 5 : 2;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  useEffect(() => {
    const fetchModel = async () => {
      const { data } = await supabase
        .from("models")
        .select("*")
        .eq("id", id)
        .single();

      if (!data) {
        setLoading(false);
        return;
      }
      setModel(data);
      setSelection((prev: any) => ({
        ...prev,
        fabric: data.default_fabric || FABRICS[0]?.id || "",
        lapel: data.default_lapel || LAPEL_OPTIONS[0]?.id || "",
        buttons: data.default_buttons || BUTTON_OPTIONS[0]?.id || "",
        sleeve: data.default_sleeve || SLEEVE_OPTIONS[0]?.id || "",
        collar: data.default_collar || SHIRT_COLLAR_OPTIONS[0]?.id || "",
        pocket: data.default_pocket || POCKET_OPTIONS[0]?.id || "",
        fit: data.default_fit || FIT_OPTIONS[0]?.id || "",
        trouser: data.default_trouser || TROUSER_OPTIONS[0]?.id || "",
        vent: data.default_vent || VENT_OPTIONS[0]?.id || "",
        vest: data.default_vest || VEST_OPTIONS[0]?.id || "",
        lining: data.default_lining || LINING_OPTIONS[0]?.id || "",
      }));
      setLoading(false);
    };
    fetchModel();
  }, [id]);

  const currentFabric = FABRICS.find((f) => f.id === selection.fabric);

  const pt = model?.product_type || "suit";
  const showLapel = ["suit", "blazer", "coat", "tuxedo"].includes(pt);
  const showCollar = ["suit", "shirt", "tuxedo"].includes(pt);
  const showButtons = ["suit", "blazer", "coat", "tuxedo", "vest"].includes(pt);
  const showSleeve = ["suit", "blazer", "coat", "tuxedo", "shirt"].includes(pt);
  const showTrouser = ["suit", "trouser", "tuxedo"].includes(pt);
  const showVent = ["suit", "blazer", "coat", "tuxedo"].includes(pt);
  const showVest = ["suit", "tuxedo"].includes(pt);
  const showLining = ["suit", "blazer", "coat", "tuxedo", "vest", "trouser"].includes(pt);

  const totalPrice = useMemo(() => {
    if (!model) return 0;
    let price = model.price;
    // Standard size = base price only, no customizations
    if (fitType === "standard") return price;
    const add = (opt: any) => { if (opt) price += opt.price; };
    add(currentFabric);
    if (showLapel) add(LAPEL_OPTIONS.find((l) => l.id === selection.lapel));
    if (showButtons) add(BUTTON_OPTIONS.find((b) => b.id === selection.buttons));
    if (showSleeve) add(SLEEVE_OPTIONS.find((s) => s.id === selection.sleeve));
    if (showCollar) add(SHIRT_COLLAR_OPTIONS.find((c) => c.id === selection.collar));
    add(POCKET_OPTIONS.find((p) => p.id === selection.pocket));
    add(FIT_OPTIONS.find((f) => f.id === selection.fit));
    if (showTrouser) add(TROUSER_OPTIONS.find((t) => t.id === selection.trouser));
    if (showVent) add(VENT_OPTIONS.find((v) => v.id === selection.vent));
    if (showVest) add(VEST_OPTIONS.find((v) => v.id === selection.vest));
    if (showLining) add(LINING_OPTIONS.find((l) => l.id === selection.lining));
    return price;
  }, [selection, currentFabric, model, fitType, showLapel, showButtons, showSleeve, showCollar, showTrouser, showVent, showVest, showLining]);

  const nextStep = () => setStep((p) => Math.min(p + 1, totalSteps - 1));
  const prevStep = () => setStep((p) => Math.max(p - 1, 0));

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
        fit_type: fitType,
        standard_size: fitType === "standard" ? standardSize : null,
        model_id: String(model.id),
        model_name: model.name,
        category: "men",
        product_type: pt,
        fabric: fitType === "custom" ? selection.fabric : null,
        fabric_name: fitType === "custom" ? currentFabric?.name || "" : null,
        lapel: fitType === "custom" ? selection.lapel : null,
        buttons: fitType === "custom" ? selection.buttons : null,
        sleeve: fitType === "custom" ? selection.sleeve : null,
        collar: fitType === "custom" ? selection.collar : null,
        pocket: fitType === "custom" ? selection.pocket : null,
        fit: fitType === "custom" ? selection.fit : null,
        trouser: fitType === "custom" ? selection.trouser : null,
        vent: fitType === "custom" ? selection.vent : null,
        vest: fitType === "custom" ? selection.vest : null,
        lining: fitType === "custom" ? selection.lining : null,
        measurements: fitType === "custom" ? measurements : null,
        total_price: totalPrice,
        currency: "USD",
        notes: contact.notes,
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
            ← Back to Men&apos;s Signature
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

  const cardVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/custom/men" className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 mb-8 inline-block">
          ← Back to Models
        </Link>

        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
            {fitType === "standard" ? "Standard Size Order" : "Custom Made"}
          </p>
          <h1 className="text-3xl md:text-5xl font-serif mb-4 text-neutral-900">{model.name}</h1>
          <p className="text-neutral-500 text-sm">
            Step {step + 1} of {totalSteps}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-12">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step > i ? "bg-neutral-900 text-white" : step === i ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-500"
              }`}>
                {step > i ? "✓" : i + 1}
              </div>
              {i < totalSteps - 1 && <div className={`w-8 h-[1px] ${step > i ? "bg-neutral-900" : "bg-neutral-200"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-white border border-neutral-200 p-6 md:p-10"
          >
            {/* STEP 0 — Fit Type */}
            {step === 0 && (
              <div>
                <h2 className="text-2xl font-serif mb-8 text-neutral-900">Choose Your Fit</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setFitType("standard")}
                    className={`text-left p-6 border transition-all ${
                      fitType === "standard" ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3">
                      Fastest
                    </p>
                    <h3 className="text-xl font-serif mb-2 text-neutral-900">Standard Size</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                      Choose from our standard sizes. Dispatch within 7–10 days.
                    </p>
                    <p className="text-xs text-neutral-400">Fixed price · no measurements</p>
                  </button>

                  <button
                    onClick={() => setFitType("custom")}
                    className={`text-left p-6 border transition-all ${
                      fitType === "custom" ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3">
                      Made to Measure
                    </p>
                    <h3 className="text-xl font-serif mb-2 text-neutral-900">Custom Measurements</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                      Made to your exact measurements. Delivered within 3 weeks.
                    </p>
                    <p className="text-xs text-neutral-400">Premium fit · 15+ measurements</p>
                  </button>
                </div>

                {fitType === "standard" && (
                  <div className="mt-8">
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4">
                      Select Your Size
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {STANDARD_SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => setStandardSize(size)}
                          className={`px-5 py-3 text-sm border transition-all ${
                            standardSize === size ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300 hover:border-neutral-900"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 bg-neutral-100 border border-neutral-200 p-5 text-sm text-neutral-700">
                      <p className="font-medium mb-1 text-neutral-900">Standard Size Order</p>
                      <p>Your suit will be made in our standard size {standardSize} pattern. Dispatch within 7–10 days. No measurements required.</p>
                    </div>
                  </div>
                )}

                {fitType === "custom" && (
                  <div className="mt-8 bg-neutral-100 border border-neutral-200 p-5 text-sm text-neutral-700">
                    <p className="font-medium mb-1 text-neutral-900">Custom Measurements</p>
                    <p>You&apos;ll customize fabric, lapel, buttons, and provide your measurements. Delivered within 3 weeks.</p>
                  </div>
                )}
              </div>
            )}

            {/* STEP 1 — Custom only: Fabric & Style */}
            {step === 1 && fitType === "custom" && (
              <div className="space-y-12">
                <h2 className="text-2xl font-serif mb-8 text-neutral-900">Fabric &amp; Style</h2>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-5 font-semibold">Fabric</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {FABRICS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSelection({ ...selection, fabric: f.id })}
                        className={`p-5 border flex flex-col items-center gap-3 transition-all ${
                          selection.fabric === f.id ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-neutral-300" style={{ backgroundColor: f.color }} />
                        <span className="text-sm font-medium text-neutral-900 text-center">{f.name}</span>
                        <span className="text-xs text-neutral-500">
                          {f.price > 0 ? `+ ${formatPrice(f.price)}` : "Included"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {showLapel && (
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-5 font-semibold">Lapel Style</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {LAPEL_OPTIONS.map((l) => (
                        <ThumbnailOption key={l.id} id={l.id} name={l.name} price={l.price} thumbnail={l.thumbnail} selected={selection.lapel === l.id} onSelect={() => setSelection({ ...selection, lapel: l.id })} />
                      ))}
                    </div>
                  </div>
                )}

                {showButtons && (
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-5 font-semibold">Buttons</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {BUTTON_OPTIONS.map((b) => (
                        <ThumbnailOption key={b.id} id={b.id} name={b.name} price={b.price} thumbnail={b.thumbnail} selected={selection.buttons === b.id} onSelect={() => setSelection({ ...selection, buttons: b.id })} />
                      ))}
                    </div>
                  </div>
                )}

                {showSleeve && (
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-5 font-semibold">Sleeve Buttons</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {SLEEVE_OPTIONS.map((s) => (
                        <ThumbnailOption key={s.id} id={s.id} name={s.name} price={s.price} thumbnail={s.thumbnail} selected={selection.sleeve === s.id} onSelect={() => setSelection({ ...selection, sleeve: s.id })} />
                      ))}
                    </div>
                  </div>
                )}

                {showCollar && (
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-5 font-semibold">Shirt Collar</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {SHIRT_COLLAR_OPTIONS.map((c) => (
                        <ThumbnailOption key={c.id} id={c.id} name={c.name} price={c.price} thumbnail={c.thumbnail} selected={selection.collar === c.id} onSelect={() => setSelection({ ...selection, collar: c.id })} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2 — Custom only: Details */}
            {step === 2 && fitType === "custom" && (
              <div className="space-y-12">
                <h2 className="text-2xl font-serif mb-8 text-neutral-900">Customize Details</h2>

                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-5 font-semibold">Pockets</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {POCKET_OPTIONS.map((p) => (
                      <ThumbnailOption key={p.id} id={p.id} name={p.name} price={p.price} thumbnail={p.thumbnail} selected={selection.pocket === p.id} onSelect={() => setSelection({ ...selection, pocket: p.id })} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-5 font-semibold">Fit</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {FIT_OPTIONS.map((f) => (
                      <ThumbnailOption key={f.id} id={f.id} name={f.name} price={f.price} thumbnail={f.thumbnail} selected={selection.fit === f.id} onSelect={() => setSelection({ ...selection, fit: f.id })} />
                    ))}
                  </div>
                </div>

                {showTrouser && (
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-5 font-semibold">Trouser Style</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {TROUSER_OPTIONS.map((t) => (
                        <ThumbnailOption key={t.id} id={t.id} name={t.name} price={t.price} thumbnail={t.thumbnail} selected={selection.trouser === t.id} onSelect={() => setSelection({ ...selection, trouser: t.id })} />
                      ))}
                    </div>
                  </div>
                )}

                {showVent && (
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-5 font-semibold">Jacket Vents</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {VENT_OPTIONS.map((v) => (
                        <ThumbnailOption key={v.id} id={v.id} name={v.name} price={v.price} thumbnail={v.thumbnail} selected={selection.vent === v.id} onSelect={() => setSelection({ ...selection, vent: v.id })} />
                      ))}
                    </div>
                  </div>
                )}

                {showVest && (
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-5 font-semibold">Vest</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {VEST_OPTIONS.map((v) => (
                        <SimpleOption key={v.id} id={v.id} name={v.name} price={v.price} selected={selection.vest === v.id} onSelect={() => setSelection({ ...selection, vest: v.id })} />
                      ))}
                    </div>
                  </div>
                )}

                {showLining && (
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-5 font-semibold">Lining Color</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {LINING_OPTIONS.map((l) => (
                        <button
                          key={l.id}
                          onClick={() => setSelection({ ...selection, lining: l.id })}
                          className={`p-4 border flex flex-col items-center gap-3 transition-all ${
                            selection.lining === l.id ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"
                          }`}
                        >
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-neutral-300" style={{ backgroundColor: l.color }} />
                          <span className="text-xs font-medium text-center text-neutral-900">{l.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3 — Custom only: Measurements */}
            {step === 3 && fitType === "custom" && (
              <div>
                <h2 className="text-2xl font-serif mb-4 text-neutral-900">Your Measurements</h2>
                <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
                  All measurements in inches. Measure over a well-fitted shirt, keeping the tape snug but not tight.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "neck", label: "Neck", required: true },
                    { id: "chest", label: "Chest", required: true },
                    { id: "waist", label: "Waist", required: true },
                    { id: "hip", label: "Hip", required: true },
                    { id: "shoulder", label: "Shoulder Width", required: true },
                    { id: "sleeve", label: "Sleeve Length", required: true },
                    { id: "jacketLength", label: "Jacket Length", required: false },
                    { id: "trouserWaist", label: "Trouser Waist", required: false },
                    { id: "inseam", label: "Inseam", required: false },
                    { id: "thigh", label: "Thigh", required: false },
                    { id: "height", label: "Height", required: true },
                    { id: "weight", label: "Weight (lbs)", required: false },
                  ].map((f) => (
                    <div key={f.id}>
                      <label className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-semibold">
                        {f.label} {f.required && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={measurements[f.id] || ""}
                        onChange={(e) => setMeasurements({ ...measurements, [f.id]: e.target.value })}
                        className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm"
                        placeholder="e.g. 40"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-8 border border-neutral-200 p-5 bg-neutral-50">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 font-semibold">
                    Need help measuring?
                  </p>
                  <p className="text-sm text-neutral-600 mb-3">
                    Send us a photo of your best-fitting suit — we&apos;ll match the measurements for you.
                  </p>
                  <a
                    href="https://wa.me/16393840265?text=Hi%2C%20I%20need%20help%20with%20measurements"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] tracking-[0.3em] uppercase border-b border-neutral-900 pb-1 inline-block hover:opacity-60 transition"
                  >
                    Message on WhatsApp →
                  </a>
                </div>
              </div>
            )}

            {/* FINAL STEP — Review + Contact (both flows) */}
            {step === totalSteps - 1 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-serif mb-4 text-neutral-900">
                  {fitType === "standard" ? "Confirm Order" : "Review & Submit"}
                </h2>

                {/* Order summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-neutral-50 p-4 border border-neutral-200">
                    <p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Model</p>
                    <p className="font-medium text-neutral-900">{model.name}</p>
                  </div>
                  <div className="bg-neutral-50 p-4 border border-neutral-200">
                    <p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Fit</p>
                    <p className="font-medium text-neutral-900">
                      {fitType === "custom" ? "Custom Measurements" : `Standard Size ${standardSize}`}
                    </p>
                  </div>
                  {fitType === "custom" && currentFabric && (
                    <div className="bg-neutral-50 p-4 border border-neutral-200">
                      <p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Fabric</p>
                      <p className="font-medium text-neutral-900">{currentFabric.name}</p>
                    </div>
                  )}
                  {fitType === "custom" && selection.lapel && showLapel && (
                    <div className="bg-neutral-50 p-4 border border-neutral-200">
                      <p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Lapel</p>
                      <p className="font-medium text-neutral-900">{LAPEL_OPTIONS.find((l) => l.id === selection.lapel)?.name}</p>
                    </div>
                  )}
                  {fitType === "custom" && selection.lining && showLining && (
                    <div className="bg-neutral-50 p-4 border border-neutral-200">
                      <p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Lining</p>
                      <p className="font-medium text-neutral-900">{LINING_OPTIONS.find((l) => l.id === selection.lining)?.name}</p>
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="border-t border-neutral-200 pt-8">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-5 font-semibold">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={contact.name}
                      onChange={(e) => setContact({ ...contact, name: e.target.value })}
                      className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm"
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Phone / WhatsApp"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={contact.country}
                      onChange={(e) => setContact({ ...contact, country: e.target.value })}
                      className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm"
                    />
                    <textarea
                      placeholder="Additional notes (optional)"
                      value={contact.notes}
                      onChange={(e) => setContact({ ...contact, notes: e.target.value })}
                      rows={3}
                      className="md:col-span-2 w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none resize-none text-sm"
                    />
                  </div>
                </div>

                <div className="bg-neutral-100 border border-neutral-200 p-5 text-sm text-neutral-700">
                  <p className="font-medium mb-1 text-neutral-900">What happens next?</p>
                  <p>We&apos;ll review your order within 24 hours and send payment instructions by email. Production starts after deposit.</p>
                </div>
              </div>
            )}

            {/* Price + Nav */}
            <div className="mt-12 pt-6 border-t border-neutral-200">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500">Total Price</span>
                <span className="text-2xl font-serif text-neutral-900">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                {step > 0 ? (
                  <button onClick={prevStep} className="text-neutral-500 hover:text-neutral-900 font-medium text-sm tracking-wide">
                    ← Back
                  </button>
                ) : <div />}
                {step < totalSteps - 1 ? (
                  <button
                    onClick={nextStep}
                    disabled={step === 0 && !fitType}
                    className="bg-neutral-900 text-white px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition disabled:opacity-50"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="bg-neutral-900 text-white px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : "Submit Order"}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
