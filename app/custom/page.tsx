"use client";

import { useState } from "react";
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 tracking-[0.2em] text-sm font-semibold mb-4">
            BESPOKE ATELIER
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-neutral-900">
            Create Your Custom Piece
          </h1>
          <p className="text-neutral-600">
            Experience the art of bespoke tailoring. Fill in your details below.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-200 -z-10"></div>
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                step >= item
                  ? "bg-amber-600 text-white"
                  : "bg-neutral-200 text-neutral-500"
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <div className="bg-white border border-neutral-200 p-8 md:p-12 shadow-sm">
          
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif mb-6 text-neutral-900">Step 1: Garment Details</h2>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-700">Garment Type</label>
                <select
                  name="garmentType"
                  value={formData.garmentType}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 p-3 bg-[#FDFBF7] focus:border-amber-500 outline-none"
                >
                  <option value="">Select a garment</option>
                  <option value="suit">Bespoke Suit</option>
                  <option value="shirt">Custom Shirt</option>
                  <option value="sherwani">Sherwani</option>
                  <option value="loungewear">Silk Loungewear</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-700">Preferred Fabric</label>
                <input
                  type="text"
                  name="fabric"
                  value={formData.fabric}
                  onChange={handleChange}
                  placeholder="e.g., Italian Wool, Pure Silk"
                  className="w-full border border-neutral-300 p-3 bg-[#FDFBF7] focus:border-amber-500 outline-none"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif mb-6 text-neutral-900">Step 2: Your Measurements</h2>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-700">Measurements (inches/cm)</label>
                <textarea
                  name="measurements"
                  value={formData.measurements}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Chest: 40, Waist: 34, Shoulder: 18..."
                  className="w-full border border-neutral-300 p-3 bg-[#FDFBF7] focus:border-amber-500 outline-none"
                ></textarea>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif mb-6 text-neutral-900">Step 3: Contact Information</h2>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 p-3 bg-[#FDFBF7] focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 p-3 bg-[#FDFBF7] focus:border-amber-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 pt-6 border-t border-neutral-200">
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="text-neutral-500 hover:text-neutral-900 font-medium transition"
              >
                &larr; Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <button
                onClick={nextStep}
                className="bg-amber-600 text-white px-8 py-3 font-semibold hover:bg-amber-700 transition"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={() => alert("Custom order submitted successfully!")}
                className="bg-neutral-900 text-white px-8 py-3 font-semibold hover:bg-neutral-800 transition"
              >
                Submit Order
              </button>
            )}
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link href="/" className="text-amber-600 hover:text-amber-700 font-medium text-sm transition">
            &larr; Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
