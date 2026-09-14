// app/women/[id]/page.tsx

"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";
import { FABRICS, STYLES, DETAILS, FIT_OPTIONS } from "@/lib/customizer-data";
import { getProductById } from "@/lib/products";

export default function WomenBespokePage() {
  const params = useParams();
  const id = params?.id as string;
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({
    fabric: "",
    style: [] as string[],
    details: [] as string[],
    fit: "",
    measurements: { name: "", email: "", chest: "", waist: "", shoulder: "", height: "" },
  });
  const [added, setAdded] = useState(false);

  const totalSteps = 6;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0]">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-[#1E1E2C] mb-4">Product Not Found</h1>
          <Link href="/women" className="text-[#5D1A24] hover:underline">&larr; Back to Women's Collection</Link>
        </div>
      </div>
    );
  }

  const currentFabric = FABRICS.find((f) => f.id === selection.fabric);

  const totalPrice = useMemo(() => {
    let price = product.price;
    if (currentFabric) price += currentFabric.price;
    selection.style.forEach((s) => {
      const st = STYLES.find((x) => x.id === s);
      if (st) price += st.price;
    });
    selection.details.forEach((d) => {
      const dt = DETAILS.find((x) => x.id === d);
      if (dt) price += dt.price;
    });
    const fit = FIT_OPTIONS.find((f) => f.id === selection.fit);
    if (fit) price += fit.price;
    return price;
  }, [selection, currentFabric, product]);

  const nextStep = () => setStep((p) => Math.min(p + 1, totalSteps));
  const prevStep = () => setStep((p) => Math.max(p - 1, 1));

  const toggleArray = (key: "style" | "details", value: string) => {
    setSelection((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-bespoke-${Date.now()}`,
      name: `${product.name} (Bespoke)`,
      price: totalPrice,
      image: product.image,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  const cardVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/women" className="text-sm text-neutral-500 hover:text-[#5D1A24] mb-8 inline-block">
          &larr; Back to Women's Collection
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#C5A059] tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            Bespoke Customizer
          </p>
          <h1 className="text-3xl md:text-5xl font-serif mb-4 text-[#1E1E2C]">{product.name}</h1>
          <p className="text-[#1E1E2C]/60 text-sm">
            Step {step} of {totalSteps} —{" "}
            {step === 1 ? "Choose Fabric" :
             step === 2 ? "Choose Style" :
             step === 3 ? "Customize Details" :
             step === 4 ? "Your Fit" :
             step === 5 ? "Measurements" : "Final Preview"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step > i + 1 ? "bg-[#5D1A24] text-white" :
                step === i + 1 ? "bg-[#C5A059] text-white" :
                "bg-[#1E1E2C]/10 text-[#1E1E2C]/40"
              }`}>
                {i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div className={`w-8 h-[2px] ${step > i + 1 ? "bg-[#5D1A24]" : "bg-[#1E1E2C]/10"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Live Preview */}
          <div className="hidden lg:flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm border border-white/60 rounded-2xl p-8 shadow-xl h-[600px]">
            <div className="text-center w-full">
              <p className="text-[#1E1E2C]/40 text-xs uppercase tracking-widest mb-2">Live Preview</p>
              <h3 className="text-2xl font-serif text-[#1E1E2C] mb-6">{product.name}</h3>
              <div className="w-full h-72 rounded-lg overflow-hidden bg-[#1E1E2C]/5 border border-[#1E1E2C]/10 flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={500}
                  className="object-contain p-4"
                  style={{
                    filter: currentFabric?.colorFilter || "none",
                    transition: "filter 0.5s ease",
                  }}
                />
              </div>
              <div className="mt-6 space-y-1 text-xs text-[#1E1E2C]/60">
                {currentFabric && <p>Fabric: <span className="font-medium text-[#1E1E2C]">{currentFabric.name}</span></p>}
                {selection.style.length > 0 && <p>Style: <span className="font-medium text-[#1E1E2C]">{selection.style.length} selected</span></p>}
                {selection.details.length > 0 && <p>Details: <span className="font-medium text-[#1E1E2C]">{selection.details.length} selected</span></p>}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-8"
              >
                {/* Step 1: Fabric */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif mb-6 text-[#1E1E2C]">Step 01 — Choose Fabric</h2>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                      {FABRICS.map((f) => (
                        <button key={f.id} onClick={() => setSelection({ ...selection, fabric: f.id })}
                          className={`w-full p-4 border rounded-lg text-left flex justify-between transition-all ${
                            selection.fabric === f.id ? "border-[#5D1A24] bg-[#5D1A24]/5 shadow-md" : "border-neutral-200 hover:border-[#C5A059]"
                          }`}>
                          <span className="font-medium text-sm">{f.name}</span>
                          <span className="text-xs text-neutral-500">{f.price > 0 ? `+ PKR ${f.price.toLocaleString()}` : "Included"}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Style */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif mb-6 text-[#1E1E2C]">Step 02 — Choose Style</h2>
                    <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-2">
                      {STYLES.map((s) => (
                        <button key={s.id} onClick={() => toggleArray("style", s.id)}
                          className={`p-3 border rounded-lg text-left flex justify-between transition-all ${
                            selection.style.includes(s.id) ? "border-[#5D1A24] bg-[#5D1A24]/5" : "border-neutral-200 hover:border-[#C5A059]"
                          }`}>
                          <span className="text-sm">{s.name}</span>
                          <span className="text-xs text-neutral-500">{s.price > 0 ? `+ PKR ${s.price.toLocaleString()}` : "Included"}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Details */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif mb-6 text-[#1E1E2C]">Step 03 — Customize Details</h2>
                    <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-2">
                      {DETAILS.map((d) => (
                        <button key={d.id} onClick={() => toggleArray("details", d.id)}
                          className={`p-3 border rounded-lg text-left flex justify-between transition-all ${
                            selection.details.includes(d.id) ? "border-[#5D1A24] bg-[#5D1A24]/5" : "border-neutral-200 hover:border-[#C5A059]"
                          }`}>
                          <span className="text-sm">{d.name}</span>
                          <span className="text-xs text-neutral-500">{d.price > 0 ? `+ PKR ${d.price.toLocaleString()}` : "Included"}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Fit */}
                {step === 4 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif mb-6 text-[#1E1E2C]">Step 04 — Your Fit</h2>
                    <div className="space-y-3">
                      {FIT_OPTIONS.map((f) => (
                        <button key={f.id} onClick={() => setSelection({ ...selection, fit: f.id })}
                          className={`w-full p-4 border rounded-lg text-left flex justify-between transition-all ${
                            selection.fit === f.id ? "border-[#5D1A24] bg-[#5D1A24]/5 shadow-md" : "border-neutral-200 hover:border-[#C5A059]"
                          }`}>
                          <span className="font-medium text-sm">{f.name}</span>
                          <span className="text-xs text-neutral-500">{f.price > 0 ? `+ PKR ${f.price.toLocaleString()}` : "Included"}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 5: Measurements */}
                {step === 5 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif mb-6 text-[#1E1E2C]">Step 05 — Your Measurements</h2>
                    <div className="space-y-3">
                      <input type="text" placeholder="Full Name" value={selection.measurements.name}
                        onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, name: e.target.value } })}
                        className="w-full border border-neutral-200 p-3 rounded-lg focus:border-[#5D1A24] outline-none" />
                      <input type="email" placeholder="Email Address" value={selection.measurements.email}
                        onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, email: e.target.value } })}
                        className="w-full border border-neutral-200 p-3 rounded-lg focus:border-[#5D1A24] outline-none" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Bust (in)" value={selection.measurements.chest}
                          onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, chest: e.target.value } })}
                          className="w-full border border-neutral-200 p-3 rounded-lg focus:border-[#5D1A24] outline-none" />
                        <input type="text" placeholder="Waist (in)" value={selection.measurements.waist}
                          onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, waist: e.target.value } })}
                          className="w-full border border-neutral-200 p-3 rounded-lg focus:border-[#5D1A24] outline-none" />
                        <input type="text" placeholder="Hip (in)" value={selection.measurements.shoulder}
                          onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, shoulder: e.target.value } })}
                          className="w-full border border-neutral-200 p-3 rounded-lg focus:border-[#5D1A24] outline-none" />
                        <input type="text" placeholder="Height (in)" value={selection.measurements.height}
                          onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, height: e.target.value } })}
                          className="w-full border border-neutral-200 p-3 rounded-lg focus:border-[#5D1A24] outline-none" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: Preview */}
                {step === 6 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif mb-6 text-[#1E1E2C]">Step 06 — Final Preview</h2>
                    <div className="bg-[#1E1E2C]/5 rounded-lg h-56 flex items-center justify-center overflow-hidden">
                      <Image src={product.image} alt={product.name} width={300} height={400}
                        className="object-contain p-4" style={{ filter: currentFabric?.colorFilter || "none" }} />
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-[#1E1E2C]/5 p-3 rounded border border-[#1E1E2C]/10">
                        <p className="text-[#1E1E2C]/40 mb-1">Garment</p>
                        <p className="font-medium text-[#1E1E2C]">{product.name}</p>
                      </div>
                      <div className="bg-[#1E1E2C]/5 p-3 rounded border border-[#1E1E2C]/10">
                        <p className="text-[#1E1E2C]/40 mb-1">Fabric</p>
                        <p className="font-medium text-[#1E1E2C]">{currentFabric?.name || "Not selected"}</p>
                      </div>
                      <div className="bg-[#1E1E2C]/5 p-3 rounded border border-[#1E1E2C]/10">
                        <p className="text-[#1E1E2C]/40 mb-1">Style</p>
                        <p className="font-medium text-[#1E1E2C]">{selection.style.length} selected</p>
                      </div>
                      <div className="bg-[#1E1E2C]/5 p-3 rounded border border-[#1E1E2C]/10">
                        <p className="text-[#1E1E2C]/40 mb-1">Details</p>
                        <p className="font-medium text-[#1E1E2C]">{selection.details.length} selected</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Price + Navigation */}
                <div className="mt-8 pt-6 border-t border-[#1E1E2C]/10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-[#1E1E2C]/60">Total Price</span>
                    <span className="text-2xl font-serif text-[#5D1A24]">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    {step > 1 ? (
