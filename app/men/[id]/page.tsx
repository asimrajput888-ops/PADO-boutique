// app/men/[id]/page.tsx

"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";
import { supabase } from "@/lib/supabase";
import {
  FABRICS, LAPEL_OPTIONS, BUTTON_OPTIONS, SLEEVE_OPTIONS,
  SHIRT_COLLAR_OPTIONS, POCKET_OPTIONS, FIT_OPTIONS, TROUSER_OPTIONS,
  VENT_OPTIONS, VEST_OPTIONS, LINING_OPTIONS,
} from "@/lib/customizer-data";
import ThumbnailOption from "@/components/customizer/ThumbnailOption";
import SimpleOption from "@/components/customizer/SimpleOption";

export default function MenBespokePage() {
  const params = useParams();
  const id = params?.id as string;
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState<any>({
    fabric: "", lapel: "", buttons: "", sleeve: "", collar: "",
    pocket: "", fit: "", trouser: "", vent: "", vest: "", lining: "",
    measurements: { name: "", email: "", chest: "", waist: "", shoulder: "", height: "", notes: "" },
  });
  const [added, setAdded] = useState(false);
  const totalSteps = 4;

  useEffect(() => {
    const fetchModel = async () => {
      const { data } = await supabase.from("models").select("*").eq("id", id).single();
      if (data) {
        setModel(data);
        setSelection((prev: any) => ({
          ...prev,
          fabric: data.default_fabric || "",
          lapel: data.default_lapel || "",
          buttons: data.default_buttons || "",
          sleeve: data.default_sleeve || "",
          pocket: data.default_pocket || "",
          fit: data.default_fit || "",
          trouser: data.default_trouser || "",
          vent: data.default_vent || "",
          vest: data.default_vest || "",
          lining: data.default_lining || "",
        }));
      }
      setLoading(false);
    };
    if (id) fetchModel();
  }, [id]);

  const currentFabric = FABRICS.find((f) => f.id === selection.fabric);

  const totalPrice = useMemo(() => {
    if (!model) return 0;
    let price = model.price;
    const add = (opt: any) => { if (opt) price += opt.price; };
    add(currentFabric);
    add(LAPEL_OPTIONS.find((l) => l.id === selection.lapel));
    add(BUTTON_OPTIONS.find((b) => b.id === selection.buttons));
    add(SLEEVE_OPTIONS.find((s) => s.id === selection.sleeve));
    add(SHIRT_COLLAR_OPTIONS.find((c) => c.id === selection.collar));
    add(POCKET_OPTIONS.find((p) => p.id === selection.pocket));
    add(FIT_OPTIONS.find((f) => f.id === selection.fit));
    add(TROUSER_OPTIONS.find((t) => t.id === selection.trouser));
    add(VENT_OPTIONS.find((v) => v.id === selection.vent));
    add(VEST_OPTIONS.find((v) => v.id === selection.vest));
    add(LINING_OPTIONS.find((l) => l.id === selection.lining));
    return price;
  }, [selection, currentFabric, model]);

  const nextStep = () => setStep((p) => Math.min(p + 1, totalSteps));
  const prevStep = () => setStep((p) => Math.max(p - 1, 1));

  const handleAddToCart = () => {
    addToCart({
      id: `${model.id}-custom-${Date.now()}`,
      name: `${model.name} (Custom)`,
      price: totalPrice,
      image: model.image_url,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]"><p className="text-neutral-400">Loading...</p></div>;
  if (!model) return <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]"><p>Model not found</p></div>;

  const cardVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/custom/men" className="text-sm text-neutral-500 hover:text-amber-600 mb-8 inline-block">← Back to Models</Link>

        <div className="text-center mb-12">
          <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">Customize Your Model</p>
          <h1 className="text-3xl md:text-5xl font-serif mb-4">{model.name}</h1>
          <p className="text-neutral-500 text-sm">
            Step {step} of {totalSteps} — {step === 1 ? "Fabric & Style" : step === 2 ? "Details" : step === 3 ? "Measurements" : "Final Review"}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-12">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step > i + 1 ? "bg-amber-600 text-white" : step === i + 1 ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-500"
              }`}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              {i < totalSteps - 1 && <div className={`w-8 h-[2px] ${step > i + 1 ? "bg-amber-600" : "bg-neutral-200"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} variants={cardVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-6 md:p-10">

            {step === 1 && (
              <div className="space-y-10">
                <div>
                  <h2 className="text-2xl font-serif mb-6">Step 01 — Fabric & Style</h2>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4 font-semibold">Fabric</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {FABRICS.map((f) => (
                      <button key={f.id} onClick={() => setSelection({ ...selection, fabric: f.id })}
                        className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${selection.fabric === f.id ? "border-amber-600 bg-amber-50 shadow-md" : "border-neutral-200 hover:border-amber-400"}`}>
                        <div className="w-12 h-12 rounded-full border-2 border-neutral-300" style={{ backgroundColor: f.color }} />
                        <span className="text-sm font-medium">{f.name}</span>
                        <span className="text-xs text-neutral-500">{f.price > 0 ? `+ Rs. ${f.price.toLocaleString()}` : "Included"}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4 font-semibold">Lapel Style</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {LAPEL_OPTIONS.map((l) => (
                      <ThumbnailOption key={l.id} id={l.id} name={l.name} price={l.price} thumbnail={l.thumbnail} selected={selection.lapel === l.id} onSelect={() => setSelection({ ...selection, lapel: l.id })} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4 font-semibold">Buttons</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {BUTTON_OPTIONS.map((b) => (
                      <ThumbnailOption key={b.id} id={b.id} name={b.name} price={b.price} thumbnail={b.thumbnail} selected={selection.buttons === b.id} onSelect={() => setSelection({ ...selection, buttons: b.id })} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4 font-semibold">Sleeve Buttons</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {SLEEVE_OPTIONS.map((s) => (
                      <ThumbnailOption key={s.id} id={s.id} name={s.name} price={s.price} thumbnail={s.thumbnail} selected={selection.sleeve === s.id} onSelect={() => setSelection({ ...selection, sleeve: s.id })} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4 font-semibold">Shirt Collar</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {SHIRT_COLLAR_OPTIONS.map((c) => (
                      <ThumbnailOption key={c.id} id={c.id} name={c.name} price={c.price} thumbnail={c.thumbnail} selected={selection.collar === c.id} onSelect={() => setSelection({ ...selection, collar: c.id })} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10">
                <h2 className="text-2xl font-serif mb-6">Step 02 — Customize Details</h2>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4 font-semibold">Pockets</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {POCKET_OPTIONS.map((p) => (
                      <ThumbnailOption key={p.id} id={p.id} name={p.name} price={p.price} thumbnail={p.thumbnail} selected={selection.pocket === p.id} onSelect={() => setSelection({ ...selection, pocket: p.id })} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4 font-semibold">Fit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {FIT_OPTIONS.map((f) => (
                      <ThumbnailOption key={f.id} id={f.id} name={f.name} price={f.price} thumbnail={f.thumbnail} selected={selection.fit === f.id} onSelect={() => setSelection({ ...selection, fit: f.id })} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4 font-semibold">Trouser Style</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {TROUSER_OPTIONS.map((t) => (
                      <ThumbnailOption key={t.id} id={t.id} name={t.name} price={t.price} thumbnail={t.thumbnail} selected={selection.trouser === t.id} onSelect={() => setSelection({ ...selection, trouser: t.id })} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4 font-semibold">Jacket Vents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {VENT_OPTIONS.map((v) => (
                      <ThumbnailOption key={v.id} id={v.id} name={v.name} price={v.price} thumbnail={v.thumbnail} selected={selection.vent === v.id} onSelect={() => setSelection({ ...selection, vent: v.id })} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4 font-semibold">Vest</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {VEST_OPTIONS.map((v) => (
                      <SimpleOption key={v.id} id={v.id} name={v.name} price={v.price} selected={selection.vest === v.id} onSelect={() => setSelection({ ...selection, vest: v.id })} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4 font-semibold">Lining Color</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {LINING_OPTIONS.map((l) => (
                      <button key={l.id} onClick={() => setSelection({ ...selection, lining: l.id })}
                        className={`p-3 border rounded-xl flex flex-col items-center gap-2 transition-all ${selection.lining === l.id ? "border-amber-600 bg-amber-50 shadow-md" : "border-neutral-200 hover:border-amber-400"}`}>
                        <div className="w-10 h-10 rounded-full border-2 border-neutral-300" style={{ backgroundColor: l.color }} />
                        <span className="text-xs font-medium text-center">{l.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif mb-6">Step 03 — Your Measurements</h2>
                <div className="space-y-4">
                  <input type="text" placeholder="Full Name" value={selection.measurements.name} onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, name: e.target.value } })} className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none" />
                  <input type="email" placeholder="Email Address" value={selection.measurements.email} onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, email: e.target.value } })} className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Chest (in)" value={selection.measurements.chest} onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, chest: e.target.value } })} className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none" />
                    <input type="text" placeholder="Waist (in)" value={selection.measurements.waist} onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, waist: e.target.value } })} className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none" />
                    <input type="text" placeholder="Shoulder (in)" value={selection.measurements.shoulder} onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, shoulder: e.target.value } })} className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none" />
                    <input type="text" placeholder="Height (in)" value={selection.measurements.height} onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, height: e.target.value } })} className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none" />
                  </div>
                  <textarea placeholder="Additional notes (optional)" value={selection.measurements.notes} onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, notes: e.target.value } })} rows={3} className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none resize-none" />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif mb-6">Step 04 — Final Review</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-neutral-50 p-3 rounded border border-neutral-200">
                    <p className="text-neutral-400 mb-1 text-xs uppercase">Model</p>
                    <p className="font-medium">{model.name}</p>
                  </div>
                  <div className="bg-neutral-50 p-3 rounded border border-neutral-200">
                    <p className="text-neutral-400 mb-1 text-xs uppercase">Fabric</p>
                    <p className="font-medium">{currentFabric?.name || "Not selected"}</p>
                  </div>
                  {selection.lapel && <div className="bg-neutral-50 p-3 rounded border border-neutral-200"><p className="text-neutral-400 mb-1 text-xs uppercase">Lapel</p><p className="font-medium">{LAPEL_OPTIONS.find((l) => l.id === selection.lapel)?.name}</p></div>}
                  {selection.buttons && <div className="bg-neutral-50 p-3 rounded border border-neutral-200"><p className="text-neutral-400 mb-1 text-xs uppercase">Buttons</p><p className="font-medium">{BUTTON_OPTIONS.find((b) => b.id === selection.buttons)?.name}</p></div>}
                  {selection.collar && <div className="bg-neutral-50 p-3 rounded border border-neutral-200"><p className="text-neutral-400 mb-1 text-xs uppercase">Collar</p><p className="font-medium">{SHIRT_COLLAR_OPTIONS.find((c) => c.id === selection.collar)?.name}</p></div>}
                  {selection.fit && <div className="bg-neutral-50 p-3 rounded border border-neutral-200"><p className="text-neutral-400 mb-1 text-xs uppercase">Fit</p><p className="font-medium">{FIT_OPTIONS.find((f) => f.id === selection.fit)?.name}</p></div>}
                  {selection.vent && <div className="bg-neutral-50 p-3 rounded border border-neutral-200"><p className="text-neutral-400 mb-1 text-xs uppercase">Vent</p><p className="font-medium">{VENT_OPTIONS.find((v) => v.id === selection.vent)?.name}</p></div>}
                  {selection.lining && <div className="bg-neutral-50 p-3 rounded border border-neutral-200"><p className="text-neutral-400 mb-1 text-xs uppercase">Lining</p><p className="font-medium">{LINING_OPTIONS.find((l) => l.id === selection.lining)?.name}</p></div>}
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-sm text-neutral-700">
                  <p className="font-medium mb-1">📦 Order Summary</p>
                  <p>Your bespoke piece will be handcrafted and delivered within 3 weeks.</p>
                </div>
              </div>
            )}

            <div className="mt-10 pt-6 border-t border-neutral-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-neutral-500">Total Price</span>
                <span className="text-2xl font-serif text-amber-600">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                {step > 1 ? (
                  <button onClick={prevStep} className="text-neutral-500 hover:text-neutral-900 font-medium text-sm">← Back</button>
                ) : <div />}
                {step < totalSteps ? (
                  <button onClick={nextStep}
                    className="bg-neutral-900 text-white px-8 py-3 font-semibold hover:bg-amber-600 transition rounded-lg text-sm">
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
  );
}
