// app/men/[id]/page.tsx

"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";
import { FABRICS, STYLES, DETAILS, FIT_OPTIONS, FINAL_SUIT_IMAGE } from "@/lib/customizer-data";
import { getProductById } from "@/lib/products";
import FittingRoom from "@/components/customizer/FittingRoom";

export default function MenBespokePage() {
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
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-neutral-900 mb-4">Product Not Found</h1>
          <Link href="/men" className="text-amber-600 hover:underline">&larr; Back to Men's Collection</Link>
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
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/men" className="text-sm text-neutral-500 hover:text-amber-600 mb-8 inline-block">
          &larr; Back to Men's Collection
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            Bespoke Customizer
          </p>
          <h1 className="text-3xl md:text-5xl font-serif mb-4">{product.name}</h1>
          <p className="text-neutral-500 text-sm">
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
                step > i + 1 ? "bg-amber-600 text-white" :
                step === i + 1 ? "bg-neutral-900 text-white" :
                "bg-neutral-200 text-neutral-500"
              }`}>
                {i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div className={`w-8 h-[2px] ${step > i + 1 ? "bg-amber-600" : "bg-neutral-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT: LIVE FITTING ROOM PREVIEW */}
          <div className="hidden lg:block sticky top-24 h-fit">
            <FittingRoom
              productImage={product.image}
              productName={product.name}
              selectedStyle={selection.style}
              selectedDetails={selection.details}
              fabricFilter={currentFabric?.colorFilter || "none"}
            />
          </div>

          {/* RIGHT: FORM */}
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
                    <h2 className="text-2xl font-serif mb-6">Step 01 — Choose Fabric</h2>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                      {FABRICS.map((f) => (
                        <button key={f.id} onClick={() => setSelection({ ...selection, fabric: f.id })}
                          className={`w-full p-4 border rounded-lg text-left flex justify-between transition-all ${
                            selection.fabric === f.id ? "border-amber-600 bg-amber-50 shadow-md" : "border-neutral-200 hover:border-amber-400"
                          }`}>
                          <span className="font-medium text-sm">{f.name}</span>
                          <span className="text-xs text-neutral-500">{f.price > 0 ? `+ Rs. ${f.price.toLocaleString()}` : "Included"}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Style */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif mb-6">Step 02 — Choose Style</h2>
                    <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-2">
                      {STYLES.map((s) => (
                        <button key={s.id} onClick={() => toggleArray("style", s.id)}
                          className={`p-3 border rounded-lg text-left flex justify-between items-center transition-all ${
                            selection.style.includes(s.id) ? "border-amber-600 bg-amber-50" : "border-neutral-200 hover:border-amber-400"
                          }`}>
                          <div className="flex items-center gap-3">
                            {s.image && (
                              <img src={s.image} alt={s.name} className="w-10 h-10 object-contain" />
                            )}
                            <span className="text-sm">{s.name}</span>
                          </div>
                          <span className="text-xs text-neutral-500">{s.price > 0 ? `+ Rs. ${s.price.toLocaleString()}` : "Included"}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Details */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif mb-6">Step 03 — Customize Details</h2>
                    <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-2">
                      {DETAILS.map((d) => (
                        <button key={d.id} onClick={() => toggleArray("details", d.id)}
                          className={`p-3 border rounded-lg text-left flex justify-between items-center transition-all ${
                            selection.details.includes(d.id) ? "border-amber-600 bg-amber-50" : "border-neutral-200 hover:border-amber-400"
                          }`}>
                          <div className="flex items-center gap-3">
                            {d.image && (
                              <img src={d.image} alt={d.name} className="w-10 h-10 object-contain" />
                            )}
                            <span className="text-sm">{d.name}</span>
                          </div>
                          <span className="text-xs text-neutral-500">{d.price > 0 ? `+ Rs. ${d.price.toLocaleString()}` : "Included"}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Fit */}
                {step === 4 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif mb-6">Step 04 — Your Fit</h2>
                    <div className="space-y-3">
                      {FIT_OPTIONS.map((f) => (
                        <button key={f.id} onClick={() => setSelection({ ...selection, fit: f.id })}
                          className={`w-full p-4 border rounded-lg text-left flex justify-between transition-all ${
                            selection.fit === f.id ? "border-amber-600 bg-amber-50 shadow-md" : "border-neutral-200 hover:border-amber-400"
                          }`}>
                          <span className="font-medium text-sm">{f.name}</span>
                          <span className="text-xs text-neutral-500">{f.price > 0 ? `+ Rs. ${f.price.toLocaleString()}` : "Included"}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 5: Measurements */}
                {step === 5 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif mb-6">Step 05 — Your Measurements</h2>
                    <div className="space-y-3">
                      <input type="text" placeholder="Full Name" value={selection.measurements.name}
                        onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, name: e.target.value } })}
                        className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none" />
                      <input type="email" placeholder="Email Address" value={selection.measurements.email}
                        onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, email: e.target.value } })}
                        className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Chest (in)" value={selection.measurements.chest}
                          onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, chest: e.target.value } })}
                          className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none" />
                        <input type="text" placeholder="Waist (in)" value={selection.measurements.waist}
                          onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, waist: e.target.value } })}
                          className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none" />
                        <input type="text" placeholder="Shoulder (in)" value={selection.measurements.shoulder}
                          onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, shoulder: e.target.value } })}
                          className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none" />
                        <input type="text" placeholder="Height (in)" value={selection.measurements.height}
                          onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, height: e.target.value } })}
                          className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: Preview */}
                {step === 6 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif mb-6">Step 06 — Final Preview</h2>
                    <div className="bg-neutral-100 rounded-lg h-64 flex items-center justify-center overflow-hidden">
                      <Image
                        src={FINAL_SUIT_IMAGE}
                        alt="Final Suit"
                        width={300}
                        height={400}
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-neutral-50 p-3 rounded border border-neutral-200">
                        <p className="text-neutral-400 mb-1">Garment</p>
                        <p className="font-medium">{product.name}</p>
                      </div>
                      <div className="bg-neutral-50 p-3 rounded border border-neutral-200">
                        <p className="text-neutral-400 mb-1">Fabric</p>
                        <p className="font-medium">{currentFabric?.name || "Not selected"}</p>
                      </div>
                      <div className="bg-neutral-50 p-3 rounded border border-neutral-200">
                        <p className="text-neutral-400 mb-1">Style</p>
                        <p className="font-medium">{selection.style.length} selected</p>
                      </div>
                      <div className="bg-neutral-50 p-3 rounded border border-neutral-200">
                        <p className="text-neutral-400 mb-1">Details</p>
                        <p className="font-medium">{selection.details.length} selected</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Price + Navigation */}
                <div className="mt-8 pt-6 border-t border-neutral-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-neutral-500">Total Price</span>
                    <span className="text-2xl font-serif text-amber-600">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    {step > 1 ? (
                      <button onClick={prevStep} className="text-neutral-500 hover:text-neutral-900 font-medium text-sm">&larr; Back</button>
                    ) : <div />}
                    {step < totalSteps ? (
                      <button onClick={nextStep}
                        disabled={(step === 1 && !selection.fabric) || (step === 4 && !selection.fit)}
                        className="bg-neutral-900 text-white px-8 py-3 font-semibold hover:bg-amber-600 transition rounded-lg disabled:opacity-50 text-sm">
                        Next Step
                      </button>
                    ) : (
                      <button onClick={handleAddToCart}
                        className="bg-amber-600 text-white px-8 py-3 font-semibold hover:bg-neutral-900 transition rounded-lg text-sm">
                        {added ? "✓ Added to Cart" : "Add to Cart"}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
