// app/custom/men/[id]/page.tsx

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

  // Product type helpers
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
  }, [selection, currentFabric, model, showLapel, showButtons, showSleeve, showCollar, showTrouser, showVent, showVest, showLining]);

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
            Customize Your Model
          </p>
          <h1 className="text-3xl md:text-5xl font-serif mb-4 text-neutral-900">{model.name}</h1>
          <p className="text-neutral-500 text-sm">
            Step {step} of {totalSteps} — {step === 1 ? "Fabric & Style" : step === 2 ? "Details" : step === 3 ? "Measurements" : "Final Review"}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-12">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step > i + 1 ? "bg-neutral-900 text-white" : step === i + 1 ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-500"
              }`}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              {i < totalSteps - 1 && <div className={`w-8 h-[1px] ${step > i + 1 ? "bg-neutral-900" : "bg-neutral-200"}`} />}
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
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl font-serif mb-8 text-neutral-900">Step 01 — Fabric &amp; Style</h2>
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

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-12">
                <h2 className="text-2xl font-serif mb-8 text-neutral-900">Step 02 — Customize Details</h2>

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

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif mb-8 text-neutral-900">Step 03 — Your Measurements</h2>
                <div className="space-y-4">
                  <input type="text" placeholder="Full Name" value={selection.measurements.name} onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, name: e.target.value } })} className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm" />
                  <input type="email" placeholder="Email Address" value={selection.measurements.email} onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, email: e.target.value } })} className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Chest (in)" value={selection.measurements.chest} onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, chest: e.target.value } })} className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm" />
                    <input type="text" placeholder="Waist (in)" value={selection.measurements.waist} onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, waist: e.target.value } })} className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm" />
                    <input type="text" placeholder="Shoulder (in)" value={selection.measurements.shoulder} onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, shoulder: e.target.value } })} className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm" />
                    <input type="text" placeholder="Height (in)" value={selection.measurements.height} onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, height: e.target.value } })} className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm" />
                  </div>
                  <textarea placeholder="Additional notes (optional)" value={selection.measurements.notes} onChange={(e) => setSelection({ ...selection, measurements: { ...selection.measurements, notes: e.target.value } })} rows={4} className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none resize-none text-sm" />
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif mb-8 text-neutral-900">Step 04 — Final Review</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-neutral-50 p-4 border border-neutral-200">
                    <p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Model</p>
                    <p className="font-medium text-neutral-900">{model.name}</p>
                  </div>
                  <div className="bg-neutral-50 p-4 border border-neutral-200">
                    <p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Fabric</p>
                    <p className="font-medium text-neutral-900">{currentFabric?.name || "Not selected"}</p>
                  </div>
                  {showLapel && selection.lapel && <div className="bg-neutral-50 p-4 border border-neutral-200"><p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Lapel</p><p className="font-medium text-neutral-900">{LAPEL_OPTIONS.find((l) => l.id === selection.lapel)?.name}</p></div>}
                  {showButtons && selection.buttons && <div className="bg-neutral-50 p-4 border border-neutral-200"><p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Buttons</p><p className="font-medium text-neutral-900">{BUTTON_OPTIONS.find((b) => b.id === selection.buttons)?.name}</p></div>}
                  {showCollar && selection.collar && <div className="bg-neutral-50 p-4 border border-neutral-200"><p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Collar</p><p className="font-medium text-neutral-900">{SHIRT_COLLAR_OPTIONS.find((c) => c.id === selection.collar)?.name}</p></div>}
                  {selection.fit && <div className="bg-neutral-50 p-4 border border-neutral-200"><p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Fit</p><p className="font-medium text-neutral-900">{FIT_OPTIONS.find((f) => f.id === selection.fit)?.name}</p></div>}
                  {showTrouser && selection.trouser && <div className="bg-neutral-50 p-4 border border-neutral-200"><p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Trouser</p><p className="font-medium text-neutral-900">{TROUSER_OPTIONS.find((t) => t.id === selection.trouser)?.name}</p></div>}
                  {showVent && selection.vent && <div className="bg-neutral-50 p-4 border border-neutral-200"><p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Vent</p><p className="font-medium text-neutral-900">{VENT_OPTIONS.find((v) => v.id === selection.vent)?.name}</p></div>}
                  {showVest && selection.vest && <div className="bg-neutral-50 p-4 border border-neutral-200"><p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Vest</p><p className="font-medium text-neutral-900">{VEST_OPTIONS.find((v) => v.id === selection.vest)?.name}</p></div>}
                  {showLining && selection.lining && <div className="bg-neutral-50 p-4 border border-neutral-200"><p className="text-neutral-400 mb-1 text-[10px] uppercase tracking-widest">Lining</p><p className="font-medium text-neutral-900">{LINING_OPTIONS.find((l) => l.id === selection.lining)?.name}</p></div>}
                </div>

                <div className="bg-neutral-100 border border-neutral-200 p-5 text-sm text-neutral-700">
                  <p className="font-medium mb-1 text-neutral-900">📦 Order Summary</p>
                  <p>Your bespoke piece will be handcrafted and delivered within 3 weeks.</p>
                </div>
              </div>
            )}

            <div className="mt-12 pt-6 border-t border-neutral-200">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500">Total Price</span>
                <span className="text-2xl font-serif text-neutral-900">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                {step > 1 ? (
                  <button onClick={prevStep} className="text-neutral-500 hover:text-neutral-900 font-medium text-sm tracking-wide">
                    ← Back
                  </button>
                ) : <div />}
                {step < totalSteps ? (
                  <button onClick={nextStep} className="bg-neutral-900 text-white px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition">
                    Next Step
                  </button>
                ) : (
                  <button onClick={handleAddToCart} className="bg-neutral-900 text-white px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition">
                    {added ? "✓ Added" : "Add to Cart"}
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
