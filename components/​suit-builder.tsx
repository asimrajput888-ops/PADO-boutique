'use client'

import { useState } from 'react'
import { useCart } from '@/context/cart-context'

interface BespokeOptions {
  fabric: string
  fit: 'slim' | 'classic' | 'relaxed'
  lapel: 'notch' | 'peak' | 'shawl'
  buttons: 'single-1' | 'single-2' | 'double-4' | 'double-6'
  lining: 'matching' | 'burgundy' | 'paisley' | 'silk-gold'
  pockets: 'flap' | 'patched' | 'welt'
  monogramText: string
  // Body Measurements (Inches)
  chest: string
  waist: string
  shoulder: string
  sleeve: string
  jacketLength: string
  trouserWaist: string
  trouserInseam: string
}

export default function SuitBuilder() {
  const { addToCart } = useCart()
  const [step, setStep] = useState<1 | 2 | 3>(1) // 1: Fabric & Style, 2: Monogram & Details, 3: Measurements

  const [options, setOptions] = useState<BespokeOptions>({
    fabric: 'Super 130s Italian Wool (Charcoal)',
    fit: 'slim',
    lapel: 'notch',
    buttons: 'single-2',
    lining: 'matching',
    pockets: 'flap',
    monogramText: '',
    chest: '40',
    waist: '34',
    shoulder: '18',
    sleeve: '25',
    jacketLength: '30',
    trouserWaist: '34',
    trouserInseam: '32',
  })

  const basePrice = 1250

  const handleAddToCart = () => {
    addToCart({
      id: 'bespoke-' + Date.now(),
      name: `Bespoke Suit (${options.fabric.split(' ')[0]} ${options.fit.toUpperCase()})`,
      price: basePrice,
      fabric: options.fabric,
      quantity: 1,
      isCustom: true,
      details: { ...options } as any,
    })
    alert('Your custom bespoke suit with exact measurements has been added to the bag!')
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-10">
      {/* Progress Tabs */}
      <div className="flex justify-center mb-10 border-b border-neutral-200">
        <button
          onClick={() => setStep(1)}
          className={`pb-4 px-6 text-xs uppercase tracking-widest font-semibold border-b-2 transition-all ${
            step === 1 ? 'border-black text-black' : 'border-transparent text-neutral-400'
          }`}
        >
          1. Fabric & Cut Styling
        </button>
        <button
          onClick={() => setStep(2)}
          className={`pb-4 px-6 text-xs uppercase tracking-widest font-semibold border-b-2 transition-all ${
            step === 2 ? 'border-black text-black' : 'border-transparent text-neutral-400'
          }`}
        >
          2. Lining & Monogram
        </button>
        <button
          onClick={() => setStep(3)}
          className={`pb-4 px-6 text-xs uppercase tracking-widest font-semibold border-b-2 transition-all ${
            step === 3 ? 'border-black text-black' : 'border-transparent text-neutral-400'
          }`}
        >
          3. Tailor Measurements
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Interactive Form Area */}
        <div className="lg:col-span-7 space-y-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold">Select Fabric & Silhouette</h2>

              {/* Fit Type */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  Suit Cut / Fit Profile
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['slim', 'classic', 'relaxed'].map((fit) => (
                    <button
                      key={fit}
                      onClick={() => setOptions({ ...options, fit: fit as any })}
                      className={`p-3 border text-xs uppercase tracking-wider font-semibold transition-all ${
                        options.fit === fit ? 'bg-black text-white border-black' : 'border-neutral-200 bg-neutral-50'
                      }`}
                    >
                      {fit} Fit
                    </button>
                  ))}
                </div>
              </div>

              {/* Lapel Style */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  Jacket Lapel Style
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'notch', name: 'Notch Lapel' },
                    { id: 'peak', name: 'Peak Lapel' },
                    { id: 'shawl', name: 'Shawl Collar' },
                  ].map((lapel) => (
                    <button
                      key={lapel.id}
                      onClick={() => setOptions({ ...options, lapel: lapel.id as any })}
                      className={`p-3 border text-xs uppercase tracking-wider font-semibold transition-all ${
                        options.lapel === lapel.id ? 'bg-black text-white border-black' : 'border-neutral-200 bg-neutral-50'
                      }`}
                    >
                      {lapel.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  Button Stance
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'single-2', name: 'Single-Breasted (2 Button)' },
                    { id: 'double-6', name: 'Double-Breasted (6 Button)' },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setOptions({ ...options, buttons: btn.id as any })}
                      className={`p-3 border text-xs uppercase tracking-wider font-semibold transition-all ${
                        options.buttons === btn.id ? 'bg-black text-white border-black' : 'border-neutral-200 bg-neutral-50'
                      }`}
                    >
                      {btn.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold">Internal Lining & Custom Monogram</h2>

              {/* Lining */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  Interior Lining Silk
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'matching', name: 'Matching Tonal Lining' },
                    { id: 'burgundy', name: 'Bespoke Burgundy Silk' },
                    { id: 'paisley', name: 'Royal Paisley Pattern' },
                    { id: 'silk-gold', name: 'Champagne Gold Silk' },
                  ].map((lining) => (
                    <button
                      key={lining.id}
                      onClick={() => setOptions({ ...options, lining: lining.id as any })}
                      className={`p-3 border text-xs uppercase tracking-wider font-semibold transition-all ${
                        options.lining === lining.id ? 'bg-black text-white border-black' : 'border-neutral-200 bg-neutral-50'
                      }`}
                    >
                      {lining.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monogram */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  Custom Monogram Embroidery (Initials inside jacket)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. M.A.R."
                  value={options.monogramText}
                  onChange={(e) => setOptions({ ...options, monogramText: e.target.value })}
                  className="w-full border border-neutral-300 p-3 text-sm focus:outline-none uppercase tracking-widest font-mono"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold">Tailor Measurement Profile (Inches)</h2>
              <p className="text-xs text-neutral-500">Provide your precise body measurements for custom pattern creation.</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Chest Circumference</label>
                  <input
                    type="number"
                    value={options.chest}
                    onChange={(e) => setOptions({ ...options, chest: e.target.value })}
                    className="w-full border border-neutral-300 p-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Jacket Waist</label>
                  <input
                    type="number"
                    value={options.waist}
                    onChange={(e) => setOptions({ ...options, waist: e.target.value })}
                    className="w-full border border-neutral-300 p-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Shoulder Width</label>
                  <input
                    type="number"
                    value={options.shoulder}
                    onChange={(e) => setOptions({ ...options, shoulder: e.target.value })}
                    className="w-full border border-neutral-300 p-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Sleeve Length</label>
                  <input
                    type="number"
                    value={options.sleeve}
                    onChange={(e) => setOptions({ ...options, sleeve: e.target.value })}
                    className="w-full border border-neutral-300 p-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Trouser Waist</label>
                  <input
                    type="number"
                    value={options.trouserWaist}
                    onChange={(e) => setOptions({ ...options, trouserWaist: e.target.value })}
                    className="w-full border border-neutral-300 p-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Trouser Inseam</label>
                  <input
                    type="number"
                    value={options.trouserInseam}
                    onChange={(e) => setOptions({ ...options, trouserInseam: e.target.value })}
                    className="w-full border border-neutral-300 p-2 text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between pt-6 border-t border-neutral-200">
            {step > 1 ? (
              <button
                onClick={() => setStep((step - 1) as any)}
                className="px-6 py-2.5 border border-neutral-300 text-xs uppercase tracking-wider font-semibold"
              >
                Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                onClick={() => setStep((step + 1) as any)}
                className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-wider font-semibold"
              >
                Next Step →
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="px-8 py-3 bg-black text-white text-xs uppercase tracking-widest font-bold hover:bg-neutral-800 transition-all"
              >
                Add Bespoke Suit to Bag (${basePrice} USD)
              </button>
            )}
          </div>
        </div>

        {/* Right Live Summary Panel */}
        <div className="lg:col-span-5 bg-neutral-50 p-6 border border-neutral-200 h-fit space-y-6">
          <h3 className="font-serif text-lg font-bold border-b pb-3">Suit Specification Preview</h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between"><span className="text-neutral-500">Selected Fabric:</span><span className="font-semibold text-right">{options.fabric}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">Fit Silhouette:</span><span className="font-semibold uppercase">{options.fit}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">Lapel Type:</span><span className="font-semibold uppercase">{options.lapel}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">Button Stance:</span><span className="font-semibold uppercase">{options.buttons}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">Lining:</span><span className="font-semibold uppercase">{options.lining}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">Monogram:</span><span className="font-semibold font-mono">{options.monogramText || 'None'}</span></div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Measurements Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3 border border-neutral-200">
              <div>Chest: <strong>{options.chest}"</strong></div>
              <div>Jacket Waist: <strong>{options.waist}"</strong></div>
              <div>Shoulders: <strong>{options.shoulder}"</strong></div>
              <div>Sleeves: <strong>{options.sleeve}"</strong></div>
              <div>Trouser Waist: <strong>{options.trouserWaist}"</strong></div>
              <div>Inseam: <strong>{options.trouserInseam}"</strong></div>
            </div>
          </div>

          <div className="border-t pt-4 flex justify-between items-center font-bold text-base">
            <span>Total Bespoke Price:</span>
            <span>${basePrice} USD</span>
          </div>
        </div>
      </div>
    </div>
  )
}
