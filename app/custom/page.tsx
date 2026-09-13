"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { GARMENTS, FABRICS, STYLES, DETAILS, FIT_OPTIONS } from "@/lib/customizer-data";

export default function CustomPage() {
  const [step, setStep] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selection, setSelection] = useState<{
    garment: string;
    fabric: string;
    style: string[];
    details: string[];
    fit: string;
    measurements: { name: string; email: string; notes: string };
  }>({
    garment: "",
    fabric: "",
    style: [],
    details: [],
    fit: "",
    measurements: { name: "", email: "", notes: "" },
  });

  const totalSteps = 6;

  const currentGarment = GARMENTS.find((g) => g.id === selection.garment);
  const currentFabric = FABRICS.find((f) => f.id === selection.fabric);

  const totalPrice = useMemo(() => {
    let price = 0;
    if (currentGarment) price += currentGarment.basePrice;
    if (currentFabric) price += currentFabric.price;

    selection.style.forEach((s) => {
      const style = STYLES.find((st) => st.id === s);
      if (style) price += style.price;
    });

    selection.details.forEach((d) => {
      const detail = DETAILS.find((dt) => dt.id === d);
      if (detail) price += detail.price;
    });

    const fit = FIT_OPTIONS.find((f) => f.id === selection.fit);
    if (fit) price += fit.price;

    return price;
  }, [selection, currentGarment, currentFabric]);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const toggleArray = (key: "style" | "details", value: string) => {
    setSelection((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const cardVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 py-16 px-6 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-amber-100 rounded-full blur-[120px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-neutral-200 rounded-full blur-[100px] opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            Bespoke Atelier
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Create Your Custom Piece</h1>
          <p className="text-neutral-500 text-sm">
            Step {step} of {totalSteps} — {step === 1 ? "Choose Garment" : step === 2 ? "Choose Fabric" : step === 3 ? "Choose Style" : step === 4 ? "Customize Details" : step === 5 ? "Your Fit" : "Final Preview"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                  step > i + 1 ? "bg-amber-600 text-white" : step === i + 1 ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-500"
                }`}
              >
                {i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div className={`w-8 h-[2px] transition-colors duration-500 ${step > i + 1 ? "bg-amber-600" : "bg-neutral-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: 3D Semi Preview Area */}
          <div 
            className="hidden lg:flex flex-col justify-center items-center relative h-[600px]"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
              const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
              setMousePos({ x, y });
            }}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            style={{ perspective: "1200px" }}
          >
            {/* Glass Background Card */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl" />
            
            {/* Amber Glow */}
            <div className="absolute w-64 h-64 bg-amber-400/20 rounded-full blur-[80px] pointer-events-none" />

            {/* 3D Rotating Card */}
            <motion.div
              className="relative z-10 w-full max-w-md p-8"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${mousePos.x * 20}deg) rotateX(${-mousePos.y * 20}deg)`,
                transition: "transform 0.3s ease-out"
              }}
            >
              {/* Floating Image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 border border-white/80 shadow-xl flex items-center justify-center"
                style={{ transform: "translateZ(40px)" }}
              >
                {selection.garment ? (
                  <img 
                    src={currentGarment?.image} 
                    alt={currentGarment?.name}
                    className="w-full h-full object-contain p-6 drop-shadow-2xl"
                    style={{ 
                      filter: currentFabric?.colorFilter || "none",
                      transition: "filter 0.5s ease"
                    }}
                  />
                ) : (
                  <span className="text-neutral-400 text-sm">Select a garment</span>
                )}
              </motion.div>

              {/* Text Info */}
              <div className="mt-6 text-center" style={{ transform: "translateZ(20px)" }}>
                <p className="text-neutral-400 text-[10px] uppercase tracking-[0.3em] mb-2">Live Preview</p>
                <h3 className="text-2xl font-serif text-neutral-800 mb-4">
                  {currentGarment?.name || "Your Garment"}
                </h3>
                
                {/* Selection Pills */}
                <div className="flex flex-wrap justify-center gap-2 text-[10px]">
                  {selection.fabric && (
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium">
                      {currentFabric?.name}
                    </span>
                  )}
                  {selection.style.length > 0 && (
                    <span className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full font-medium">
                      {selection.style.length} Styles
                    </span>
                  )}
                  {selection.details.length > 0 && (
                    <span className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full font-medium">
                      {selection.details.length} Details
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Form Step */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-8 md:p-10"
              >
                {/* Step 1: Garment */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif mb-6">Step 01 — Choose Garment</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {GARMENTS.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => setSelection({ ...selection, garment: g.id })}
                          className={`p-4 border rounded-lg text-left transition-all ${
                            selection.garment === g.id ? "border-amber-600 bg-amber-50 shadow-md" : "border-neutral-200 hover:border-amber-400"
                          }`}
                        >
                          <p className="font-medium text-sm">{g.name}</p>
                          <p className="text-xs text-neutral-500">Rs. {g.basePrice.toLocaleString()}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Fabric */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif mb-6">Step 02 — Choose Fabric</h2>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                      {FABRICS.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setSelection({ ...selection, fabric: f.id })}
                          className={`w-full p-4 border rounded-lg text-left flex justify-between items-center transition-all ${
                            selection.fabric === f.id ? "border-amber-600 bg-amber-50 shadow-md" : "border-neutral-200 hover:border-amber-400"
                          }`}
                        >
                          <span className="font-medium text-sm">{f.name}</span>
                          <span className="text-xs text-neutral-500">{f.price > 0 ? `+ Rs. ${f.price.toLocaleString()}` : "Included"}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Style */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif mb-6">Step 03 — Choose Style</h2>
                    <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-2">
                      {STYLES.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => toggleArray("style", s.id)}
                          className={`p-3 border rounded-lg text-left flex justify-between transition-all ${
                            selection.style.includes(s.id) ? "border-amber-600 bg-amber-50" : "border-neutral-200 hover:border-amber-400"
                          }`}
                        >
                          <span className="text-sm">{s.name}</span>
                          <span className="text-xs text-neutral-500">{s.price > 0 ? `+ Rs. ${s.price.toLocaleString()}` : "Included"}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Details */}
                {step === 4 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif mb-6">Step 04 — Customize Details</h2>
                    <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-2">
                      {DETAILS.map((d) => (
                        <button
                          key={d.id}
                          onClick={() => toggleArray("details", d.id)}
                          className={`p-3 border rounded-lg text-left flex justify-between transition-all ${
                            selection.details.includes(d.id) ? "border-amber-600 bg-amber-50" : "border-neutral-200 hover:border-amber-400"
                          }`}
                        >
                          <span className="text-sm">{d.name}</span>
                          <span className="text-xs text-neutral-500">{d.price > 0 ? `+ Rs. ${d.price.toLocaleString()}` : "Included"}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 5: Fit */}
                {step === 5 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif mb-6">Step 05 — Your Fit</h2>
                    <div className="space-y-3">
                      {FIT_OPTIONS.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setSelection({ ...selection, fit: f.id })}
                          className={`w-full p-4 border rounded-lg text-left flex justify-between transition-all ${
                            selection.fit === f.id ? "border-amber-600 bg-amber-50 shadow-md" : "border-neutral-200 hover:border-amber-400"
                          }`}
                        >
                          <span className="font-medium text-sm">{f.name}</span>
                          <span className="text-xs text-neutral-500">{f.price > 0 ? `+ Rs. ${f.price.toLocaleString()}` : "Included"}</span>
                        </button>
                      ))}
                    </div>
                    {selection.fit === "measurements" && (
                      <div className="space-y-3 pt-4">
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={selection.measurements.name}
                          onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, name: e.target.value } })}
                          className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none"
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={selection.measurements.email}
                          onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, email: e.target.value } })}
                          className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Step 6: Preview */}
                {step === 6 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif mb-6">Step 06 — Final Preview</h2>
                    
                    <div className="bg-neutral-100 rounded-lg h-56 flex items-center justify-center overflow-hidden">
                      {currentGarment ? (
                        <img 
                          src={currentGarment.image} 
                          alt={currentGarment.name}
                          className="w-full h-full object-contain p-4"
                          style={{ filter: currentFabric?.colorFilter || "none" }}
                        />
                      ) : (
                        <span className="text-neutral-400 text-sm">No garment selected</span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-neutral-50 p-3 rounded border border-neutral-200">
                        <p className="text-neutral-400 mb-1">Garment</p>
                        <p className="font-medium">{currentGarment?.name || "Not selected"}</p>
                      </div>
                      <div className="bg-neutral-50 p-3 rounded border border-neutral-200">
                        <p className="text-neutral-400 mb-1">Fabric</p>
                        <p className="font-medium">{currentFabric?.name || "Not selected"}</p>
                      </div>
                      <div className="bg-neutral-50 p-3 rounded border border-neutral-200">
                        <p className="text-neutral-400 mb-1">Style</p>
                        <p className="font-medium">{selection.style.length} options</p>
                      </div>
                      <div className="bg-neutral-50 p-3 rounded border border-neutral-200">
                        <p className="text-neutral-400 mb-1">Details</p>
                        <p className="font-medium">{selection.details.length} options</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Price + Navigation */}
                <div className="mt-8 pt-6 border-t border-neutral-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-neutral-500">Total Price</span>
                    <span className="text-2xl font-serif text-amber-600">Rs. {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    {step > 1 ? (
                      <button onClick={prevStep} className="text-neutral-500 hover:text-neutral-900 font-medium transition-colors text-sm">
                        &larr; Back
                      </button>
                    ) : <div />}
                    {step < totalSteps ? (
                      <button
                        onClick={nextStep}
                        disabled={
                          (step === 1 && !selection.garment) ||
                          (step === 2 && !selection.fabric) ||
                          (step === 5 && !selection.fit)
                        }
                        className="bg-neutral-900 text-white px-8 py-3 font-semibold hover:bg-amber-600 transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        Next Step
                      </button>
                    ) : (
                      <button
                        onClick={() => alert("Custom order submitted successfully!")}
                        className="bg-amber-600 text-white px-8 py-3 font-semibold hover:bg-neutral-900 transition-all duration-300 rounded-lg text-sm"
                      >
                        Submit Order
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link href="/" className="text-neutral-400 hover:text-amber-600 transition-colors font-medium text-xs tracking-wide">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
