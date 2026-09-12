"use client"

import { useState } from "react"
import { useCurrency } from "@/context/currency-context"

const BASE_PRICE_USD = 499

export default function SuitBuilder() {
  const { formatPrice } = useCurrency()
  const [step, setStep] = useState(1)
  const [fit, setFit] = useState("Slim Fit")
  const [fabric, setFabric] = useState("Super 120s Wool - Navy")
  const [lapel, setLapel] = useState("Notch Lapel")
  const [lining, setLining] = useState("Bespoke Silk - Burgundy")
  const [monogram, setMonogram] = useState("")
  const [chest, setChest] = useState(40)
  const [waist, setWaist] = useState(34)
  const [shoulder, setShoulder] = useState(18)
  const [sleeve, setSleeve] = useState(25)

  return (
    <div className="max-w-4xl mx-auto p-6 bg-card text-card-foreground rounded-xl shadow-lg border border-border">
      <h2 className="text-3xl font-serif font-bold mb-6 text-center">Bespoke Suit Configurator</h2>

      {/* Steps Indicator */}
      <div className="flex justify-between mb-8 border-b border-border pb-4">
        {["1. Fabric & Style", "2. Personalization", "3. Tailor Measurements"].map((label, idx) => (
          <button
            key={label}
            onClick={() => setStep(idx + 1)}
            className={`font-medium ${step === idx + 1 ? "text-primary border-b-2 border-primary pb-2" : "text-muted-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-2">Fit Selection</label>
            <div className="grid grid-cols-3 gap-4">
              {["Slim Fit", "Classic Fit", "Modern Tailored"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFit(f)}
                  className={`p-4 border rounded-lg text-center ${fit === f ? "border-primary bg-primary/10" : "border-border"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block font-medium mb-2">Lapel Style</label>
            <div className="grid grid-cols-3 gap-4">
              {["Notch Lapel", "Peak Lapel", "Shawl Collar"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLapel(l)}
                  className={`p-4 border rounded-lg text-center ${lapel === l ? "border-primary bg-primary/10" : "border-border"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-2">Inner Lining</label>
            <select
              value={lining}
              onChange={(e) => setLining(e.target.value)}
              className="w-full p-3 border border-border rounded-lg bg-background"
            >
              <option>Bespoke Silk - Burgundy</option>
              <option>Italian Satin - Midnight Blue</option>
              <option>Monogrammed Jacquard - Gold</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">Custom Monogram Initials</label>
            <input
              type="text"
              maxLength={4}
              placeholder="e.g. MAP"
              value={monogram}
              onChange={(e) => setMonogram(e.target.value)}
              className="w-full p-3 border border-border rounded-lg bg-background"
            />
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Chest (inches)</label>
            <input
              type="number"
              value={chest}
              onChange={(e) => setChest(Number(e.target.value))}
              className="w-full p-3 border border-border rounded-lg bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Waist (inches)</label>
            <input
              type="number"
              value={waist}
              onChange={(e) => setWaist(Number(e.target.value))}
              className="w-full p-3 border border-border rounded-lg bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Shoulder Width (inches)</label>
            <input
              type="number"
              value={shoulder}
              onChange={(e) => setShoulder(Number(e.target.value))}
              className="w-full p-3 border border-border rounded-lg bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Sleeve Length (inches)</label>
            <input
              type="number"
              value={sleeve}
              onChange={(e) => setSleeve(Number(e.target.value))}
              className="w-full p-3 border border-border rounded-lg bg-background"
            />
          </div>
        </div>
      )}

      {/* Controls & Total */}
      <div className="mt-8 flex justify-between items-center border-t border-border pt-6">
        <div>
          <span className="text-sm text-muted-foreground">Total Price:</span>
          <div className="text-2xl font-bold">{formatPrice(BASE_PRICE_USD)}</div>
        </div>
        <div className="flex gap-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 border border-border rounded-lg hover:bg-secondary"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={() => alert("Suit order configured!")}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium"
            >
              Add Custom Suit to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
