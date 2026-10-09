// app/custom/men/[id]/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCurrency } from "@/context/currency-context";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

const JACKET_FITS = ["Regular Fit", "Slim Fit", "Relaxed Fit"];
const TROUSER_FITS = ["Classic Comfort Fit", "Slim Fit", "Relaxed Fit"];

const STANDARD_JACKET_SIZES = ["36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60"];
const STANDARD_JACKET_LENGTHS = ["Short", "Regular", "Long"];
const STANDARD_TROUSER_SIZES = ["28", "30", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58"];
const STANDARD_INSEAMS = ["Unhemmed", "28", "30", "32", "34", "36", "38", "40"];

const MEASUREMENT_LIMITS: Record<string, { min: number; max: number }> = {
  chest: { min: 30, max: 60 },
  shoulder: { min: 14, max: 24 },
  sleeve: { min: 20, max: 30 },
  jacketLength: { min: 25, max: 35 },
  bicep: { min: 10, max: 20 },
  waist: { min: 24, max: 56 },
  stomach: { min: 26, max: 56 },
  seat: { min: 30, max: 58 },
  pantsLength: { min: 24, max: 40 },
  thigh: { min: 18, max: 32 },
  knee: { min: 12, max: 24 },
  legOpening: { min: 10, max: 22 },
  neck: { min: 12, max: 22 },
  frontRise: { min: 8, max: 16 },
  backRise: { min: 12, max: 22 },
};

const MEASUREMENT_FIELDS: Record<string, { id: string; label: string; hint: string; required: boolean }[]> = {
  blazer: [
    { id: "chest", label: "Chest", hint: "Around the fullest part of your chest", required: true },
    { id: "shoulder", label: "Shoulder Width", hint: "Shoulder point to shoulder point", required: true },
    { id: "sleeve", label: "Sleeve Length", hint: "Shoulder point to wrist bone", required: true },
    { id: "jacketLength", label: "Jacket Length", hint: "Base of neck to desired hem", required: true },
    { id: "bicep", label: "Bicep", hint: "Fullest part of upper arm", required: false },
    { id: "waist", label: "Waist", hint: "Natural waistline", required: true },
  ],
  shirt: [
    { id: "neck", label: "Neck", hint: "Base of neck, one finger loose", required: true },
    { id: "chest", label: "Chest", hint: "Fullest part of chest", required: true },
    { id: "shoulder", label: "Shoulder Width", hint: "Shoulder to shoulder", required: true },
    { id: "sleeve", label: "Sleeve Length", hint: "Shoulder to wrist bone", required: true },
    { id: "jacketLength", label: "Shirt Length", hint: "Base of neck to shirt hem", required: true },
    { id: "waist", label: "Waist", hint: "Natural waistline", required: false },
    { id: "bicep", label: "Bicep", hint: "Fullest part of upper arm", required: false },
  ],
  trouser: [
    { id: "waist", label: "Waist", hint: "Where you wear your trousers", required: true },
    { id: "seat", label: "Seat / Hip", hint: "Fullest part of hips", required: true },
    { id: "pantsLength", label: "Inseam", hint: "Crotch to ankle bone", required: true },
    { id: "thigh", label: "Thigh", hint: "Fullest part of thigh", required: false },
    { id: "knee", label: "Knee", hint: "Around knee, slightly bent", required: false },
    { id: "legOpening", label: "Leg Opening", hint: "Bottom of trouser leg", required: false },
    { id: "frontRise", label: "Front Rise", hint: "Crotch to top of waistband", required: false },
    { id: "backRise", label: "Back Rise", hint: "Crotch to top of waistband (back)", required: false },
  ],
  suit: [
    { id: "chest", label: "Chest", hint: "Fullest part of chest", required: true },
    { id: "shoulder", label: "Shoulder Width", hint: "Shoulder to shoulder", required: true },
    { id: "sleeve", label: "Sleeve Length", hint: "Shoulder to wrist bone", required: true },
    { id: "jacketLength", label: "Jacket Length", hint: "Base of neck to hem", required: true },
    { id: "bicep", label: "Bicep", hint: "Fullest part of upper arm", required: false },
    { id: "stomach", label: "Jacket Waist", hint: "Natural waistline", required: true },
    { id: "waist", label: "Trouser Waist", hint: "Where you wear trousers", required: true },
    { id: "seat", label: "Seat / Hip", hint: "Fullest part of hips", required: true },
    { id: "pantsLength", label: "Inseam", hint: "Crotch to ankle bone", required: true },
    { id: "thigh", label: "Thigh", hint: "Fullest part of thigh", required: false },
    { id: "knee", label: "Knee", hint: "Around knee", required: false },
    { id: "legOpening", label: "Leg Opening", hint: "Bottom of trouser leg", required: false },
    { id: "frontRise", label: "Front Rise", hint: "Crotch to waistband", required: false },
  ],
  tuxedo: [
    { id: "chest", label: "Chest", hint: "Fullest part of chest", required: true },
    { id: "shoulder", label: "Shoulder Width", hint: "Shoulder to shoulder", required: true },
    { id: "sleeve", label: "Sleeve Length", hint: "Shoulder to wrist bone", required: true },
    { id: "jacketLength", label: "Jacket Length", hint: "Base of neck to hem", required: true },
    { id: "bicep", label: "Bicep", hint: "Fullest part of upper arm", required: false },
    { id: "stomach", label: "Jacket Waist", hint: "Natural waistline", required: true },
    { id: "waist", label: "Trouser Waist", hint: "Where you wear trousers", required: true },
    { id: "seat", label: "Seat / Hip", hint: "Fullest part of hips", required: true },
    { id: "pantsLength", label: "Inseam", hint: "Crotch to ankle bone", required: true },
    { id: "thigh", label: "Thigh", hint: "Fullest part of thigh", required: false },
    { id: "knee", label: "Knee", hint: "Around knee", required: false },
    { id: "legOpening", label: "Leg Opening", hint: "Bottom of trouser leg", required: false },
    { id: "frontRise", label: "Front Rise", hint: "Crotch to waistband", required: false },
  ],
  coat: [
    { id: "chest", label: "Chest", hint: "Fullest part of chest", required: true },
    { id: "shoulder", label: "Shoulder Width", hint: "Shoulder to shoulder", required: true },
    { id: "sleeve", label: "Sleeve Length", hint: "Shoulder to wrist bone", required: true },
    { id: "jacketLength", label: "Coat Length", hint: "Base of neck to hem", required: true },
    { id: "bicep", label: "Bicep", hint: "Fullest part of upper arm", required: false },
    { id: "stomach", label: "Waist", hint: "Natural waistline", required: true },
  ],
  vest: [
    { id: "chest", label: "Chest", hint: "Fullest part of chest", required: true },
    { id: "stomach", label: "Waist", hint: "Natural waistline", required: true },
    { id: "jacketLength", label: "Vest Length", hint: "Top of shoulder to vest hem", required: true },
  ],
};

const MEASUREMENT_IMAGES: Record<string, string> = {
  chest: "/images/measurements-men/chest.webp",
  shoulder: "/images/measurements-men/shoulder.webp",
  sleeve: "/images/measurements-men/sleeve.webp",
  jacketLength: "/images/measurements-men/jacket-length.webp",
  bicep: "/images/measurements-men/bicep.webp",
  waist: "/images/measurements-men/waist.webp",
  stomach: "/images/measurements-men/stomach.webp",
  seat: "/images/measurements-men/seat.webp",
  pantsLength: "/images/measurements-men/pants-length.webp",
  knee: "/images/measurements-men/knee.webp",
  thigh: "/images/measurements-men/thigh.webp",
  legOpening: "/images/measurements-men/leg-opening.webp",
  neck: "/images/measurements-men/chest.webp",
  frontRise: "/images/measurements-men/front-rise.webp",
  backRise: "/images/measurements-men/back-rise.webp",
};

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
  const [activeField, setActiveField] = useState<string>("chest");

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    country: "",
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

  const showJacketSelector = ["suit", "tuxedo", "blazer", "coat", "vest"].includes(pt);
  const showTrouserSelector = ["suit", "tuxedo", "trouser"].includes(pt);
  const showShirtSelector = pt === "shirt";

  const totalSteps = fitType === "standard" ? 3 : 4;

  const updateM = (key: string, value: string) =>
    setM({ ...m, [key]: value });

  const getFieldError = (fieldId: string, value: string): string | null => {
    if (!value || value.trim() === "") return null;
    const num = parseFloat(value);
    if (isNaN(num)) return "Enter a valid number";
    if (num <= 0) return "Must be greater than 0";
    const limits = MEASUREMENT_LIMITS[fieldId];
    if (!limits) return null;
    if (num < limits.min || num > limits.max) {
      return `Must be between ${limits.min}–${limits.max} inches`;
    }
    return null;
  };

  const filledCount = fields.filter((f) => m[f.id]).length;

  const invalidOrMissing = fields.filter((f) => {
    const value = m[f.id];
    if (!value || value.trim() === "") return f.required;
    return getFieldError(f.id, value) !== null;
  });

  const requiredMissing = invalidOrMissing.map((f) => f.label);

  const standardSelectionComplete =
    (showJacketSelector && !jacketSize) ||
    (showTrouserSelector && !trouserSize) ||
    (showShirtSelector && !jacketSize);

  const nextStep = () => {
    if (step === 0 && fitType === "standard") {
      setStep(2);
    } else {
      setStep((p) => Math.min(p + 1, 3));
    }
  };

  const prevStep = () => {
    if (step === 2 && fitType === "standard") {
      setStep(0);
    } else {
      setStep((p) => Math.max(p - 1, -1));
    }
  };

  const getStandardSizeLabel = () => {
    if (showJacketSelector && showTrouserSelector) {
      return `Jacket ${jacketSize} ${jacketLength} / Trouser ${trouserSize} ${inseam}`;
    }
    if (showJacketSelector) return `Jacket ${jacketSize} ${jacketLength}`;
    if (showTrouserSelector) return `Trouser ${trouserSize} ${inseam}`;
    if (showShirtSelector) return `Shirt ${jacketSize}`;
    return jacketSize || "Standard";
  };

  const handleSubmit = async () => {
    if (!contact.name || !contact.email || !contact.address1 || !contact.city || !contact.country) {
      alert("Please fill in all required fields");
      return;
    }
    setSubmitting(true);

    try {
      const payload = {
        customer_name: contact.name,
        customer_email: contact.email,
        customer_phone: contact.phone,
        customer_country: contact.country,
        shipping_address: {
          address1: contact.address1,
          address2: contact.address2,
          city: contact.city,
          postalCode: contact.postalCode,
          country: contact.country,
        },
        fit_type: fitType,
        standard_size: fitType === "standard" ? getStandardSizeLabel() : null,
        model_id: String(model.id),
        model_name: model.name,
        category: "men",
        product_type: pt,
        measurements: fitType === "custom" ? {
          profileName,
          height: `${heightFt}' ${heightIn}"`,
          ...m,
          ...(needsJacketFit ? { jacketFit } : {}),
          ...(needsTrouserFit ? { trouserFit } : {}),
          additionalInfo,
        } : null,
        total_price: model.price,
        currency: "USD",
        notes: additionalInfo || "",
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
      <div className="min-h-screen flex items-center justify-center bg-brand-ivory">
        <div className="w-8 h-8 border-2 border-brand-stone border-t-brand-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-ivory">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-brand-charcoal mb-4">Model Not Found</h1>
          <Link href="/custom/men" className="text-brand-slate hover:text-brand-gold underline">
            ← Back to Men&apos;s Collection
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-ivory flex items-center justify-center px-5 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-full bg-brand-charcoal text-white flex items-center justify-center mx-auto mb-10 text-4xl"
          >
            ✓
          </motion.div>
          <p className="text-[10px] tracking-[0.5em] text-brand-gold uppercase mb-4">Order Confirmed</p>
          <h1 className="text-4xl font-serif text-brand-charcoal mb-6">
            Thank you, {contact.name.split(" ")[0]}.
          </h1>
          <p className="text-brand-slate mb-3 text-sm">Order number</p>
          <p className="text-xl font-mono text-brand-charcoal mb-10 tracking-wider">{orderNumber}</p>
          <div className="border border-brand-stone bg-white p-8 text-left mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-4 font-semibold">Shipping to</p>
            <p className="text-sm text-brand-slate leading-relaxed">
              {contact.address1}<br />
              {contact.address2 && <>{contact.address2}<br /></>}
              {contact.city} {contact.postalCode}<br />
              {contact.country}
            </p>
          </div>
          <Link
            href="/custom/men"
            className="inline-block bg-brand-charcoal text-white px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-brand-gold transition-colors duration-500"
          >
            Back to Collection
          </Link>
        </motion.div>
      </div>
    );
  }

  // STEP -1: Product Showcase
  if (step === -1) {
    return (
      <div className="min-h-screen bg-brand-ivory pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[1500px] mx-auto">
          <Link
            href="/custom/men"
            className="text-[10px] uppercase tracking-[0.4em] text-brand-slate hover:text-brand-gold mb-12 inline-flex items-center gap-2 transition-colors"
          >
            <span>←</span> Back to Collection
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div className="space-y-6">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  className="relative aspect-[3/4] overflow-hidden bg-brand-cream"
                >
                  <img
                    src={img}
                    alt={`${model.name} ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </motion.div>
              ))}
            </div>

            <div className="lg:sticky lg:top-32 lg:self-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-[10px] tracking-[0.5em] text-brand-gold uppercase mb-6">
                  {pt} · Bespoke
                </p>
                <h1 className="text-4xl md:text-6xl font-serif mb-8 text-brand-charcoal leading-[1.05]">
                  {model.name}
                </h1>
                <p className="text-3xl text-brand-charcoal mb-12 pb-12 border-b border-brand-stone font-serif">
                  {formatPrice(model.price)}
                </p>

                <div className="mb-12">
                  <h2 className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-6 font-semibold">
                    Description
                  </h2>
                  <p className="text-brand-slate leading-[1.8] text-[15px] whitespace-pre-line">
                    {model.description}
                  </p>
                </div>

                <div className="border-t border-brand-stone pt-10 mb-12">
                  <h2 className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-6 font-semibold">
                    The PADO Promise
                  </h2>
                  <ul className="space-y-4 text-sm text-brand-slate">
                    {[
                      "Cut to your exact measurements",
                      "Hand-finished by master tailors",
                      "Dispatched within 3 weeks",
                      "Complimentary worldwide shipping",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-4">
                        <span className="w-6 h-[1px] bg-brand-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => setStep(0)}
                    className="w-full bg-brand-charcoal text-white py-6 text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-brand-gold transition-colors duration-500"
                  >
                    Begin Your Order →
                  </button>
                  <a
                    href={`https://wa.me/16393840265?text=${encodeURIComponent(`Hi, I'm interested in: ${model.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full border border-brand-charcoal text-brand-charcoal text-center py-6 text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-brand-charcoal hover:text-white transition-all duration-500"
                  >
                    Speak to a Tailor
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 0: Choose Fit Type
  if (step === 0) {
    return (
      <div className="min-h-screen bg-brand-ivory">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">

          <button
            onClick={() => setStep(-1)}
            className="text-[10px] uppercase tracking-[0.4em] text-brand-slate hover:text-brand-gold mb-12 inline-flex items-center gap-2 transition-colors"
          >
            <span>←</span> Back to Product
          </button>

          <div className="mb-20">
            <div className="flex items-center justify-between max-w-md mx-auto mb-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium border transition-all duration-500 ${
                    step >= i
                      ? "bg-brand-charcoal text-white border-brand-charcoal"
                      : "bg-transparent text-brand-stone border-brand-stone"
                  }`}>
                    {step > i ? "✓" : i + 1}
                  </div>
                  {i < 3 && (
                    <div className={`w-16 md:w-24 h-[1px] transition-colors duration-500 ${
                      step > i ? "bg-brand-charcoal" : "bg-brand-stone"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] uppercase tracking-[0.5em] text-brand-gold">
              Step 1 of {totalSteps}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-serif mb-6 text-brand-charcoal leading-[1.1]">
              How would you like<br />
              <em className="text-brand-gold">your {pt}?</em>
            </h1>
            <p className="text-brand-slate text-[15px] leading-relaxed max-w-xl mx-auto">
              Choose a standard size for faster delivery, or provide your measurements for a perfect bespoke fit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">

            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onClick={() => setFitType("standard")}
              className={`text-left relative overflow-hidden transition-all duration-500 ${
                fitType === "standard"
                  ? "border-brand-charcoal bg-white shadow-[0_20px_60px_rgba(30,30,44,0.08)]"
                  : "border-brand-stone bg-white/50 hover:border-brand-charcoal/50 hover:bg-white"
              } border`}
            >
              <div className="p-8 md:p-12">
                <p className="text-[10px] uppercase tracking-[0.5em] text-brand-gold mb-4">
                  Fastest Delivery
                </p>
                <h3 className="text-3xl md:text-4xl font-serif mb-6 text-brand-charcoal">
                  Standard Size
                </h3>
                <p className="text-sm text-brand-slate leading-relaxed mb-8">
                  Choose from our standard sizes. Crafted on a ready pattern and dispatched within 7–10 days.
                </p>
                <ul className="space-y-3 text-[13px] text-brand-slate">
                  {["Fixed price", "No measurements required", "7–10 day dispatch"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-4 h-[1px] bg-brand-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {fitType === "standard" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-6 right-6 w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center"
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => setFitType("custom")}
              className={`text-left relative overflow-hidden transition-all duration-500 ${
                fitType === "custom"
                  ? "border-brand-charcoal bg-white shadow-[0_20px_60px_rgba(30,30,44,0.08)]"
                  : "border-brand-stone bg-white/50 hover:border-brand-charcoal/50 hover:bg-white"
              } border`}
            >
              <div className="absolute top-0 right-0 bg-brand-charcoal text-white text-[9px] uppercase tracking-[0.4em] px-5 py-2">
                Recommended
              </div>

              <div className="p-8 md:p-12">
                <p className="text-[10px] uppercase tracking-[0.5em] text-brand-gold mb-4">
                  Perfect Fit
                </p>
                <h3 className="text-3xl md:text-4xl font-serif mb-6 text-brand-charcoal">
                  Custom Measurements
                </h3>
                <p className="text-sm text-brand-slate leading-relaxed mb-8">
                  Made to your exact measurements by our master tailors. Delivered within 3 weeks.
                </p>
                <ul className="space-y-3 text-[13px] text-brand-slate">
                  {["Made to your measurements", "15+ measurement fields", "3 week delivery"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-4 h-[1px] bg-brand-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {fitType === "custom" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute bottom-6 right-6 w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center"
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {fitType === "standard" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto mt-16 space-y-8 overflow-hidden"
              >
                {showJacketSelector && (
                  <div className="border border-brand-stone bg-white p-8 md:p-12">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-2">
                          Jacket
                        </p>
                        <h4 className="text-2xl font-serif text-brand-charcoal">Size & Length</h4>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-brand-slate">
                        Inches
                      </span>
                    </div>
                    <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-2 mb-8">
                      {STANDARD_JACKET_SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => setJacketSize(size)}
                          className={`py-3 text-sm transition-all duration-300 border ${
                            jacketSize === size
                              ? "bg-brand-charcoal text-white border-brand-charcoal"
                              : "border-brand-stone text-brand-charcoal hover:border-brand-charcoal"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-4">
                        Length
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {STANDARD_JACKET_LENGTHS.map((len) => (
                          <button
                            key={len}
                            onClick={() => setJacketLength(len)}
                            className={`py-3 text-sm transition-all duration-300 border ${
                              jacketLength === len
                                ? "bg-brand-charcoal text-white border-brand-charcoal"
                                : "border-brand-stone text-brand-charcoal hover:border-brand-charcoal"
                            }`}
                          >
                            {len}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {showTrouserSelector && (
                  <div className="border border-brand-stone bg-white p-8 md:p-12">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-2">
                          Trouser
                        </p>
                        <h4 className="text-2xl font-serif text-brand-charcoal">Waist & Inseam</h4>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-brand-slate">
                        Inches
                      </span>
                    </div>
                    <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-2 mb-8">
                      {STANDARD_TROUSER_SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => setTrouserSize(size)}
                          className={`py-3 text-sm transition-all duration-300 border ${
                            trouserSize === size
                              ? "bg-brand-charcoal text-white border-brand-charcoal"
                              : "border-brand-stone text-brand-charcoal hover:border-brand-charcoal"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-4">
                        Inseam
                      </p>
                      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                        {STANDARD_INSEAMS.map((ins) => (
                          <button
                            key={ins}
                            onClick={() => setInseam(ins)}
                            className={`py-3 text-xs transition-all duration-300 border ${
                              inseam === ins
                                ? "bg-brand-charcoal text-white border-brand-charcoal"
                                : "border-brand-stone text-brand-charcoal hover:border-brand-charcoal"
                            }`}
                          >
                            {ins}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {showShirtSelector && (
                  <div className="border border-brand-stone bg-white p-8 md:p-12">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-2">
                      Shirt
                    </p>
                    <h4 className="text-2xl font-serif text-brand-charcoal mb-8">Neck Size</h4>
                    <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-2">
                      {["14", "14.5", "15", "15.5", "16", "16.5", "17", "17.5", "18", "18.5"].map((size) => (
                        <button
                          key={size}
                          onClick={() => setJacketSize(size)}
                          className={`py-3 text-sm transition-all duration-300 border ${
                            jacketSize === size
                              ? "bg-brand-charcoal text-white border-brand-charcoal"
                              : "border-brand-stone text-brand-charcoal hover:border-brand-charcoal"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {(jacketSize || trouserSize) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-brand-gold/30 bg-brand-cream p-6 md:p-8"
                  >
                    <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-4 font-semibold">
                      Your Selection
                    </p>
                    <div className="space-y-2 text-sm text-brand-charcoal">
                      {jacketSize && showJacketSelector && (
                        <p>Jacket — <strong className="font-medium">{jacketSize} · {jacketLength}</strong></p>
                      )}
                      {jacketSize && showShirtSelector && (
                        <p>Shirt — <strong className="font-medium">{jacketSize}</strong></p>
                      )}
                      {trouserSize && (
                        <p>Trouser — <strong className="font-medium">{trouserSize} · {inseam}</strong></p>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {fitType === "custom" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl mx-auto mt-16 border border-brand-gold/30 bg-brand-cream p-8 md:p-10 text-center"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-4">
                Bespoke Guidance
              </p>
              <p className="text-sm text-brand-slate leading-relaxed max-w-xl mx-auto">
                You&apos;ll be guided through our measurement form on the next step.
                If you need assistance, our master tailors are available on WhatsApp.
              </p>
            </motion.div>
          )}

          <div className="max-w-5xl mx-auto mt-20 pt-12 border-t border-brand-stone flex justify-end">
            <button
              onClick={nextStep}
              disabled={!fitType || (fitType === "standard" && standardSelectionComplete)}
              className="group bg-brand-charcoal text-white px-16 py-5 text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-brand-gold transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 1: Measurements
  if (step === 1 && fitType === "custom") {
    const activeFieldData = fields.find((f) => f.id === activeField);
    const progressPercent = Math.round((filledCount / fields.length) * 100);

    return (
      <div className="min-h-screen bg-brand-ivory">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 py-16 md:py-24">

          <button
            onClick={() => setStep(0)}
            className="text-[10px] uppercase tracking-[0.4em] text-brand-slate hover:text-brand-gold mb-12 inline-flex items-center gap-2 transition-colors"
          >
            <span>←</span> Back to Fit Selection
          </button>

          <div className="mb-16 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold">
                Step 2 of {totalSteps} — Measurements
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-slate">
                {filledCount} / {fields.length} complete
              </span>
            </div>
            <div className="h-[2px] bg-brand-stone overflow-hidden">
              <motion.div
                className="h-full bg-brand-gold"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-serif mb-6 text-brand-charcoal leading-[1.1]">
              Your<br />
              <em className="text-brand-gold">measurements</em>
            </h1>
            <p className="text-brand-slate text-[15px] leading-relaxed">
              Provide your measurements in inches. Fields marked with * are required.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-10"
              >
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-4 font-semibold">
                    Measurement Profile Name *
                  </label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full border-0 border-b border-brand-stone pb-4 focus:border-brand-gold outline-none text-base bg-transparent text-brand-charcoal transition-colors duration-300"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-4 font-semibold">
                    Height *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      className="border border-brand-stone bg-white p-4 focus:border-brand-gold outline-none text-sm text-brand-charcoal transition-colors duration-300"
                    >
                      <option value="">Feet</option>
                      {[4, 5, 6, 7].map((ft) => (
                        <option key={ft} value={ft}>{ft} ft</option>
                      ))}
                    </select>
                    <select
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      className="border border-brand-stone bg-white p-4 focus:border-brand-gold outline-none text-sm text-brand-charcoal transition-colors duration-300"
                    >
                      <option value="">Inches</option>
                      {Array.from({ length: 12 }, (_, i) => i).map((inch) => (
                        <option key={inch} value={inch}>{inch} in</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="w-8 h-[1px] bg-brand-gold" />
                    <h3 className="text-[10px] uppercase tracking-[0.4em] text-brand-charcoal font-semibold">
                      {pt} Measurements
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                    {fields.map((f, index) => {
                      const value = m[f.id] || "";
                      const error = getFieldError(f.id, value);
                      const limits = MEASUREMENT_LIMITS[f.id];
                      const isActive = activeField === f.id;
                      const isFilled = value.length > 0 && !error;

                      return (
                        <motion.div
                          key={f.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.03 }}
                        >
                          <label className="flex items-center justify-between mb-3">
                            <span className={`text-[10px] uppercase tracking-[0.3em] font-medium transition-colors ${
                              isActive ? "text-brand-gold" : "text-brand-charcoal"
                            }`}>
                              {f.label} {f.required && <span className="text-brand-maroon">*</span>}
                            </span>
                            {limits && (
                              <span className="text-[9px] text-brand-slate tracking-wider">
                                {limits.min}–{limits.max} in
                              </span>
                            )}
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              inputMode="decimal"
                              value={value}
                              onChange={(e) => updateM(f.id, e.target.value)}
                              onFocus={() => setActiveField(f.id)}
                              placeholder="—"
                              className={`w-full border p-4 pr-12 outline-none text-base transition-all duration-300 bg-white ${
                                error
                                  ? "border-red-400 bg-red-50/50 focus:border-red-500"
                                  : isActive
                                  ? "border-brand-gold shadow-[0_0_0_3px_rgba(197,160,89,0.1)]"
                                  : isFilled
                                  ? "border-brand-gold/40"
                                  : "border-brand-stone hover:border-brand-charcoal/30"
                              }`}
                            />
                            {isFilled && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-brand-gold flex items-center justify-center"
                              >
                                <span className="text-white text-[10px] font-bold">✓</span>
                              </motion.div>
                            )}
                          </div>
                          {error && (
                            <p className="text-[10px] text-red-500 mt-2">{error}</p>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {needsJacketFit && (
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-4 font-semibold">
                      Jacket Fit
                    </label>
                    <select
                      value={jacketFit}
                      onChange={(e) => setJacketFit(e.target.value)}
                      className="w-full border border-brand-stone bg-white p-4 focus:border-brand-gold outline-none text-sm text-brand-charcoal transition-colors duration-300"
                    >
                      {JACKET_FITS.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                )}

                {needsTrouserFit && (
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-4 font-semibold">
                      Trouser Fit
                    </label>
                    <select
                      value={trouserFit}
                      onChange={(e) => setTrouserFit(e.target.value)}
                      className="w-full border border-brand-stone bg-white p-4 focus:border-brand-gold outline-none text-sm text-brand-charcoal transition-colors duration-300"
                    >
                      {TROUSER_FITS.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-4 font-semibold">
                    Additional Requests
                  </label>
                  <p className="text-xs text-brand-slate mb-4">
                    Any changes to fit, style, or special requests.
                  </p>
                  <textarea
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    rows={5}
                    placeholder="e.g. Taper trousers, add monogram, longer sleeves..."
                    className="w-full border border-brand-stone bg-white p-4 focus:border-brand-gold outline-none resize-none text-sm text-brand-charcoal transition-colors duration-300"
                  />
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 space-y-6">

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="border border-brand-stone bg-white overflow-hidden"
                >
                  <div className="relative aspect-square bg-brand-cream flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      {activeField && MEASUREMENT_IMAGES[activeField] ? (
                        <motion.img
                          key={activeField}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          src={MEASUREMENT_IMAGES[activeField]}
                          alt={activeFieldData?.label || "Measurement"}
                          className="w-full h-full object-contain p-8"
                        />
                      ) : (
                        <p className="text-brand-slate text-[10px] uppercase tracking-[0.3em]">
                          Select a field to see guide
                        </p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="p-6 md:p-8 text-center border-t border-brand-stone">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-3">
                      How to Measure
                    </p>
                    <h3 className="text-2xl font-serif text-brand-charcoal mb-3">
                      {activeFieldData?.label || "Select a Field"}
                    </h3>
                    {activeFieldData?.hint && (
                      <p className="text-xs text-brand-slate leading-relaxed">
                        {activeFieldData.hint}
                      </p>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="border border-brand-gold/30 bg-brand-cream p-6 md:p-8"
                >
                  <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-4 font-semibold">
                    Need assistance?
                  </p>
                  <p className="text-xs text-brand-slate leading-relaxed mb-6">
                    Send us a photo of your best-fitting {pt}. Our master tailors will match the measurements for you.
                  </p>
                  <a
                    href="https://wa.me/16393840265?text=Hi%2C%20I%20need%20help%20with%20measurements"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] tracking-[0.4em] uppercase border-b border-brand-charcoal pb-1 inline-block hover:border-brand-gold hover:text-brand-gold transition-colors duration-300"
                  >
                    WhatsApp Us →
                  </a>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-brand-stone flex flex-col md:flex-row md:justify-between md:items-center gap-6 max-w-5xl mx-auto">
            <div>
              {requiredMissing.length > 0 ? (
                <p className="text-xs text-brand-slate max-w-md">
                  <span className="font-medium text-brand-charcoal">
                    {invalidOrMissing.some((f) => m[f.id]) ? "Fix or complete:" : "Still needed:"}
                  </span>{" "}
                  {requiredMissing.join(", ")}
                </p>
              ) : (
                <p className="text-xs text-brand-gold">✓ All measurements valid — ready to continue</p>
              )}
            </div>
            <button
              onClick={nextStep}
              disabled={requiredMissing.length > 0 || !heightFt || !heightIn}
              className="group bg-brand-charcoal text-white px-16 py-5 text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-brand-gold transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue to Contact <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: Contact + Shipping
  if (step === 2) {
    return (
      <div className="min-h-screen bg-brand-ivory">
        <div className="max-w-2xl mx-auto px-6 md:px-12 py-16 md:py-24">

          <button
            onClick={prevStep}
            className="text-[10px] uppercase tracking-[0.4em] text-brand-slate hover:text-brand-gold mb-12 inline-flex items-center gap-2 transition-colors"
          >
            <span>←</span> Back
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <p className="text-[10px] uppercase tracking-[0.5em] text-brand-gold mb-4">
              Step {fitType === "standard" ? "2" : "3"} of {totalSteps}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-4">
              Contact &<br />
              <em className="text-brand-gold">shipping</em>
            </h1>
            <p className="text-brand-slate text-sm">Where should we send your order?</p>
          </motion.div>

          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-[1px] bg-brand-gold" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-brand-charcoal font-semibold">
                  Contact Details
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-3 font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className="w-full border border-brand-stone bg-white p-4 focus:border-brand-gold outline-none text-sm text-brand-charcoal transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-3 font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="w-full border border-brand-stone bg-white p-4 focus:border-brand-gold outline-none text-sm text-brand-charcoal transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-3 font-semibold">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="w-full border border-brand-stone bg-white p-4 focus:border-brand-gold outline-none text-sm text-brand-charcoal transition-colors duration-300"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-[1px] bg-brand-gold" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-brand-charcoal font-semibold">
                  Shipping Address
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-3 font-semibold">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    value={contact.address1}
                    onChange={(e) => setContact({ ...contact, address1: e.target.value })}
                    placeholder="House / Street"
                    className="w-full border border-brand-stone bg-white p-4 focus:border-brand-gold outline-none text-sm text-brand-charcoal placeholder:text-brand-slate/50 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-3 font-semibold">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={contact.address2}
                    onChange={(e) => setContact({ ...contact, address2: e.target.value })}
                    placeholder="Apartment, suite, etc. (optional)"
                    className="w-full border border-brand-stone bg-white p-4 focus:border-brand-gold outline-none text-sm text-brand-charcoal placeholder:text-brand-slate/50 transition-colors duration-300"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-3 font-semibold">
                      City *
                    </label>
                    <input
                      type="text"
                      value={contact.city}
                      onChange={(e) => setContact({ ...contact, city: e.target.value })}
                      className="w-full border border-brand-stone bg-white p-4 focus:border-brand-gold outline-none text-sm text-brand-charcoal transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-3 font-semibold">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={contact.postalCode}
                      onChange={(e) => setContact({ ...contact, postalCode: e.target.value })}
                      className="w-full border border-brand-stone bg-white p-4 focus:border-brand-gold outline-none text-sm text-brand-charcoal transition-colors duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-3 font-semibold">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={contact.country}
                    onChange={(e) => setContact({ ...contact, country: e.target.value })}
                    className="w-full border border-brand-stone bg-white p-4 focus:border-brand-gold outline-none text-sm text-brand-charcoal transition-colors duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-brand-stone flex justify-between items-center">
            <button
              onClick={prevStep}
              className="text-brand-slate hover:text-brand-gold font-medium text-sm tracking-wide transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={nextStep}
              disabled={!contact.name || !contact.email || !contact.address1 || !contact.city || !contact.country}
              className="group bg-brand-charcoal text-white px-16 py-5 text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-brand-gold transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Review Order <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 3: Review
  return (
    <div className="min-h-screen bg-brand-ivory">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">

        <button
          onClick={prevStep}
          className="text-[10px] uppercase tracking-[0.4em] text-brand-slate hover:text-brand-gold mb-12 inline-flex items-center gap-2 transition-colors"
        >
          <span>←</span> Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-brand-gold mb-4">
            Step {totalSteps} of {totalSteps}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-4">
            Review your<br />
            <em className="text-brand-gold">order</em>
          </h1>
          <p className="text-brand-slate text-sm">Confirm everything looks correct before submitting.</p>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border border-brand-stone bg-white p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-brand-gold" />
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-brand-charcoal font-semibold">
                Order Summary
              </h3>
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-start gap-4">
                <span className="text-brand-slate">Model</span>
                <span className="font-medium text-brand-charcoal text-right">{model.name}</span>
              </div>
              <div className="flex justify-between items-start gap-4 pt-4 border-t border-brand-stone">
                <span className="text-brand-slate">Fit</span>
                <span className="font-medium text-brand-charcoal text-right">
                  {fitType === "custom" ? "Custom Measurements" : getStandardSizeLabel()}
                </span>
              </div>
              <div className="flex justify-between items-start gap-4 pt-4 border-t border-brand-stone">
                <span className="text-brand-slate">Total</span>
                <span className="font-serif text-2xl text-brand-charcoal">{formatPrice(model.price)}</span>
              </div>
            </div>
          </motion.div>

          {fitType === "custom" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border border-brand-stone bg-white p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-[1px] bg-brand-gold" />
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-brand-charcoal font-semibold">
                  Measurements (inches)
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 text-sm">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-brand-slate mb-2">Height</p>
                  <p className="font-medium text-brand-charcoal">{heightFt}&apos; {heightIn}&quot;</p>
                </div>
                {fields.map((f) =>
                  m[f.id] ? (
                    <div key={f.id}>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-brand-slate mb-2">{f.label}</p>
                      <p className="font-medium text-brand-charcoal">{m[f.id]}&quot;</p>
                    </div>
                  ) : null
                )}
                {needsJacketFit && (
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-brand-slate mb-2">Jacket Fit</p>
                    <p className="font-medium text-brand-charcoal">{jacketFit}</p>
                  </div>
                )}
                {needsTrouserFit && (
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-brand-slate mb-2">Trouser Fit</p>
                    <p className="font-medium text-brand-charcoal">{trouserFit}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {additionalInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border border-brand-stone bg-white p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-[1px] bg-brand-gold" />
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-brand-charcoal font-semibold">
                  Additional Requests
                </h3>
              </div>
              <p className="text-sm text-brand-slate whitespace-pre-line leading-relaxed">
                {additionalInfo}
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border border-brand-stone bg-white p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-brand-gold" />
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-brand-charcoal font-semibold">
                Shipping Address
              </h3>
            </div>
            <div className="text-sm text-brand-slate leading-relaxed">
              <p className="font-medium text-brand-charcoal mb-2">{contact.name}</p>
              <p>{contact.address1}</p>
              {contact.address2 && <p>{contact.address2}</p>}
              <p>{contact.city} {contact.postalCode}</p>
              <p>{contact.country}</p>
              <div className="mt-5 pt-5 border-t border-brand-stone space-y-1">
                <p className="text-brand-slate">{contact.email}</p>
                {contact.phone && <p className="text-brand-slate">{contact.phone}</p>}
              </div>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-brand-charcoal text-white py-6 text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-brand-gold transition-colors duration-500 disabled:opacity-50"
          >
            {submitting ? "Submitting Order..." : "Submit Order"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
