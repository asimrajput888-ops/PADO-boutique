"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CustomPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    garmentType: "",
    fabric: "",
    measurements: "",
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // 3D Animation Variants
  const cardVariants = {
    initial: { opacity: 0, rotateY: -10, scale: 0.95 },
    animate: { opacity: 1, rotateY: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, rotateY: 10, scale: 0.95, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 py-24 px-6 relative overflow-hidden">
      
      {/* Background Decorative Elements (3D Vibe) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-amber-100 rounded-full blur-[120px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-neutral-200 rounded-full blur-[100px] opacity-50 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            Bespoke Atelier
          </p>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600">
            Create Your Custom Piece
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto text-lg font-light">
            Experience the art of bespoke tailoring. Fill in your details below.
          </p>
        </motion.div>

        {/* 3D Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Visual/Image Section */}
          <div className="hidden lg:block relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-neutral-900/0 transition-all duration-700 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1594938298603-c8148c47e35f?q=80&w=1000&auto=format&fit=crop" 
              alt="Tailoring" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Glass Overlay */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl z-20">
              <h3 className="text-white font-serif text-2xl mb-2">The Perfect Fit</h3>
              <p className="text-white/80 text-sm">Every stitch is crafted to your unique silhouette.</p>
            </div>
          </div>

          {/* Right Side: 3D Form Card */}
          <div className="relative perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-8 md:p-12 relative overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* 3D Decorative Corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/20 to-transparent rounded-bl-full" />

                {/* Step Indicator */}
                <div className="flex items-center gap-2 mb-8">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                        step >= item ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30" : "bg-neutral-100 text-neutral-400"
                      }`}>
                        {item}
                      </div>
                      {item < 3 && <div className={`w-8 h-[2px] transition-colors duration-500 ${step > item ? "bg-amber-600" : "bg-neutral-200"}`} />}
                    </div>
                  ))}
                </div>

                {/* Step 1 */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h2 className="text-2xl font-serif mb-6 text-neutral-900">Step 1: Garment Details</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-neutral-600">Garment Type</label>
                        <select
                          name="garmentType"
                          value={formData.garmentType}
                          onChange={handleChange}
                          className="w-full border border-neutral-200 p-4 bg-white/50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all rounded-lg appearance-none"
                        >
                          <option value="">Select a garment</option>
                          <option value="suit">Bespoke Suit</option>
                          <option value="shirt">Custom Shirt</option>
                          <option value="sherwani">Sherwani</option>
                          <option value="loungewear">Silk Loungewear</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-neutral-600">Preferred Fabric</label>
                        <input
                          type="text"
                          name="fabric"
                          value={formData.fabric}
                          onChange={handleChange}
                          placeholder="e.g., Italian Wool, Pure Silk"
                          className="w-full border border-neutral-200 p-4 bg-white/50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all rounded-lg"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h2 className="text-2xl font-serif mb-6 text-neutral-900">Step 2: Your Measurements</h2>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-neutral-600">Measurements (inches/cm)</label>
                      <textarea
                        name="measurements"
                        value={formData.measurements}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Chest: 40, Waist: 34, Shoulder: 18..."
                        className="w-full border border-neutral-200 p-4 bg-white/50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all rounded-lg resize-none"
                      ></textarea>
                    </div>
                  </motion.div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <h2 className="text-2xl font-serif mb-6 text-neutral-900">Step 3: Contact Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-neutral-600">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full border border-neutral-200 p-4 bg-white/50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-neutral-600">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border border-neutral-200 p-4 bg-white/50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all rounded-lg"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-12 pt-6 border-t border-neutral-100">
                  {step > 1 ? (
                    <button
                      onClick={prevStep}
                      className="text-neutral-500 hover:text-neutral-900 font-medium transition-colors"
                    >
                      &larr; Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {step < 3 ? (
                    <button
                      onClick={nextStep}
                      className="bg-neutral-900 text-white px-8 py-3 font-semibold hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-amber-600/30 rounded-lg"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      onClick={() => alert("Custom order submitted successfully!")}
                      className="bg-amber-600 text-white px-8 py-3 font-semibold hover:bg-neutral-900 transition-all duration-300 shadow-lg hover:shadow-neutral-900/30 rounded-lg"
                    >
                      Submit Order
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-16">
          <Link href="/" className="text-neutral-400 hover:text-amber-600 transition-colors font-medium text-sm tracking-wide">
            &larr; Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
