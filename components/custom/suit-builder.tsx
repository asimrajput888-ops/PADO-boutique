'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Check, ArrowRight, ArrowLeft } from 'lucide-react'
import {
  fabrics,
  lapels,
  fits,
  buttons,
  fitPreferences,
  measurementFields,
  BASE_PRICE,
  type Gender,
} from '@/lib/data'
import { formatUSD, formatSigned } from '@/lib/format'
import { useCart } from '@/lib/cart-context'
import { SuitVisual } from '@/components/custom/suit-visual'
import { MeasurementForm, type Unit, type Measurements } from '@/components/custom/measurement-form'
import { LapelIllustration, FitIllustration } from '@/components/custom/illustrations'

const steps = [
  { id: 'fabric', label: 'Fabric' },
  { id: 'lapel', label: 'Lapel' },
  { id: 'fit', label: 'Fit' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'preference', label: 'Fit Preference' },
  { id: 'measurements', label: 'Measurements' },
]

export function SuitBuilder() {
  const router = useRouter()
  const { addItem } = useCart()

  const [step, setStep] = useState(0)
  const [gender, setGender] = useState<Gender>('men')
  const [fabricId, setFabricId] = useState(fabrics[0].id)
  const [lapelId, setLapelId] = useState(lapels[1].id)
  const [fitId, setFitId] = useState(fits[1].id)
  const [buttonId, setButtonId] = useState(buttons[0].id)
  const [prefId, setPrefId] = useState(fitPreferences[1].id)
  const [unit, setUnit] = useState<Unit>('in')
  const [measurements, setMeasurements] = useState<Measurements>({})

  const fabric = fabrics.find((f) => f.id === fabricId)!
  const lapel = lapels.find((l) => l.id === lapelId)!
  const fit = fits.find((f) => f.id === fitId)!
  const button = buttons.find((b) => b.id === buttonId)!
  const pref = fitPreferences.find((p) => p.id === prefId)!

  const total = useMemo(
    () => BASE_PRICE + fabric.price + lapel.price + button.price,
    [fabric.price, lapel.price, button.price],
  )

  const measurementsComplete = measurementFields[gender].every((f) =>
    measurements[f.id]?.trim(),
  )

  const handleAddToBag = () => {
    addItem({
      id: `custom-${Date.now()}`,
      name: 'Bespoke Custom Suit',
      image: '/images/builder-suit.png',
      price: total,
      customization: [
        { label: 'Fabric', value: fabric.name },
        { label: 'Lapel', value: lapel.name },
        { label: 'Fit', value: fit.name },
        { label: 'Buttons', value: button.name },
        { label: 'Preference', value: pref.name },
      ],
      measurements: `${gender === 'men' ? "Men's" : "Women's"} measurements saved (${unit})`,
    })
    router.push('/checkout')
  }

  return (
    <section className="mx-auto max-w-[1500px] px-0 md:px-8 md:py-8">
      <div className="grid lg:grid-cols-[1.05fr_1fr] lg:gap-0">
        {/* LEFT — visual, sticky */}
        <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
          <SuitVisual
            fabric={fabric}
            fitName={fit.name}
            lapelName={lapel.name}
            buttonHex={button.hex}
          />
        </div>

        {/* RIGHT — panel */}
        <div className="flex flex-col px-5 py-10 md:px-10 lg:py-4">
          {/* progress rail */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {steps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setStep(i)}
                className={`flex items-center gap-2 text-[10px] tracking-wide-sm uppercase transition-colors ${
                  i === step
                    ? 'text-foreground'
                    : i < step
                      ? 'text-champagne'
                      : 'text-muted-foreground/50 hover:text-muted-foreground'
                }`}
              >
                <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                {s.label}
              </button>
            ))}
          </div>
          <div className="mt-4 h-px w-full bg-border">
            <div
              className="h-px bg-champagne transition-all duration-700 ease-out"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>

          <div className="mt-10 flex-1">
            {/* STEP: FABRIC */}
            {step === 0 && (
              <StepShell
                index="01"
                title="Choose your cloth"
                text="Every suit begins with the cloth. Select the fabric that suits your season and occasion."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {fabrics.map((f) => {
                    const selected = f.id === fabricId
                    return (
                      <button
                        key={f.id}
                        onClick={() => setFabricId(f.id)}
                        className={`group relative flex gap-4 border p-3 text-left transition-colors ${
                          selected ? 'border-charcoal' : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <span className="relative h-20 w-16 shrink-0 overflow-hidden bg-muted">
                          <Image src={f.swatch || '/placeholder.svg'} alt={f.name} fill sizes="64px" className="object-cover" />
                        </span>
                        <span className="flex flex-1 flex-col">
                          <span className="flex items-center justify-between">
                            <span className="font-serif text-lg leading-tight">{f.name}</span>
                            {selected && <Check className="h-4 w-4 text-champagne" />}
                          </span>
                          <span className="mt-1 text-[11px] leading-snug text-muted-foreground">
                            {f.detail}
                          </span>
                          <span className="mt-auto pt-2 text-[11px] tracking-wide-sm text-muted-foreground uppercase">
                            {formatSigned(f.price)}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </StepShell>
            )}

            {/* STEP: LAPEL */}
            {step === 1 && (
              <StepShell index="02" title="Shape your lapel" text="The lapel sets the tone — from classic to formal.">
                <div className="grid grid-cols-3 gap-3">
                  {lapels.map((l) => {
                    const selected = l.id === lapelId
                    return (
                      <button
                        key={l.id}
                        onClick={() => setLapelId(l.id)}
                        className={`flex flex-col items-center border p-4 transition-colors ${
                          selected ? 'border-charcoal' : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <span className="h-24 w-20">
                          <LapelIllustration id={l.id} active={selected} />
                        </span>
                        <span className="mt-3 text-[12px] tracking-wide-sm uppercase">{l.name}</span>
                        <span className="mt-1 text-center text-[10px] leading-snug text-muted-foreground">
                          {l.detail}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </StepShell>
            )}

            {/* STEP: FIT */}
            {step === 2 && (
              <StepShell index="03" title="Find your silhouette" text="Choose the overall shape that feels most like you.">
                <div className="grid grid-cols-3 gap-3">
                  {fits.map((f) => {
                    const selected = f.id === fitId
                    return (
                      <button
                        key={f.id}
                        onClick={() => setFitId(f.id)}
                        className={`flex flex-col items-center border p-4 transition-colors ${
                          selected ? 'border-charcoal' : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <span className="h-28 w-20">
                          <FitIllustration id={f.id} active={selected} />
                        </span>
                        <span className="mt-3 text-[12px] tracking-wide-sm uppercase">{f.name}</span>
                        <span className="mt-1 text-center text-[10px] leading-snug text-muted-foreground">
                          {f.detail}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </StepShell>
            )}

            {/* STEP: BUTTONS */}
            {step === 3 && (
              <StepShell index="04" title="Select your buttons" text="A small detail that quietly signals the whole.">
                <div className="grid grid-cols-3 gap-3">
                  {buttons.map((b) => {
                    const selected = b.id === buttonId
                    return (
                      <button
                        key={b.id}
                        onClick={() => setButtonId(b.id)}
                        className={`flex flex-col items-center border p-5 transition-colors ${
                          selected ? 'border-charcoal' : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <span
                          className="relative h-14 w-14 rounded-full border border-border shadow-inner"
                          style={{ backgroundColor: b.hex }}
                        >
                          <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-[6px] -translate-y-[3px] rounded-full bg-black/30" />
                          <span className="absolute left-1/2 top-1/2 h-1 w-1 translate-x-[2px] -translate-y-[3px] rounded-full bg-black/30" />
                          <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-[6px] translate-y-[1px] rounded-full bg-black/30" />
                          <span className="absolute left-1/2 top-1/2 h-1 w-1 translate-x-[2px] translate-y-[1px] rounded-full bg-black/30" />
                        </span>
                        <span className="mt-3 text-center text-[12px] tracking-wide-sm uppercase">{b.name}</span>
                        <span className="mt-1 text-[10px] tracking-wide-sm text-muted-foreground uppercase">
                          {formatSigned(b.price)}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </StepShell>
            )}

            {/* STEP: PREFERENCE */}
            {step === 4 && (
              <StepShell index="05" title="Your fit preference" text="How close would you like your suit to sit?">
                <div className="flex flex-col gap-3">
                  {fitPreferences.map((p) => {
                    const selected = p.id === prefId
                    return (
                      <button
                        key={p.id}
                        onClick={() => setPrefId(p.id)}
                        className={`flex items-center justify-between border p-5 text-left transition-colors ${
                          selected ? 'border-charcoal' : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <span>
                          <span className="font-serif text-xl">{p.name}</span>
                          <span className="mt-1 block text-[12px] text-muted-foreground">{p.detail}</span>
                        </span>
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                            selected ? 'border-champagne bg-champagne' : 'border-border'
                          }`}
                        >
                          {selected && <Check className="h-3 w-3 text-charcoal" />}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </StepShell>
            )}

            {/* STEP: MEASUREMENTS */}
            {step === 5 && (
              <StepShell index="06" title="Your perfect fit" text="Precision measurements create a suit made specifically for you.">
                <div className="mb-6 flex items-center gap-1 border border-border p-1">
                  {(['men', 'women'] as Gender[]).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`flex-1 py-2.5 text-[11px] tracking-wide-sm uppercase transition-colors ${
                        gender === g ? 'bg-charcoal text-offwhite' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <MeasurementForm
                  gender={gender}
                  unit={unit}
                  onUnitChange={setUnit}
                  values={measurements}
                  onChange={(id, value) => setMeasurements((m) => ({ ...m, [id]: value }))}
                />
              </StepShell>
            )}
          </div>

          {/* PRICE SUMMARY + NAV */}
          <div className="sticky bottom-0 mt-10 border-t border-border bg-background pt-6">
            <p className="text-[10px] tracking-luxe text-muted-foreground uppercase">Your Bespoke Suit</p>
            <div className="mt-4 space-y-1.5 text-sm">
              <Row label="Base Price" value={formatUSD(BASE_PRICE)} />
              <Row label={`Fabric — ${fabric.name}`} value={formatSigned(fabric.price)} muted />
              {lapel.price > 0 && <Row label={`Lapel — ${lapel.name}`} value={formatSigned(lapel.price)} muted />}
              {button.price > 0 && <Row label={`Buttons — ${button.name}`} value={formatSigned(button.price)} muted />}
            </div>
            <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
              <span className="text-[11px] tracking-wide-sm uppercase text-muted-foreground">Total</span>
              <span className="font-serif text-4xl">{formatUSD(total)}</span>
            </div>

            <div className="mt-6 flex gap-3">
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="flex items-center justify-center gap-2 border border-charcoal px-6 py-4 text-[11px] tracking-wide-sm uppercase transition-colors hover:bg-muted"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>
              )}
              {step < steps.length - 1 ? (
                <button
                  onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                  className="group flex flex-1 items-center justify-center gap-3 bg-charcoal py-4 text-[11px] tracking-wide-sm text-offwhite uppercase transition-colors hover:bg-foreground"
                >
                  Continue
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              ) : (
                <button
                  onClick={handleAddToBag}
                  disabled={!measurementsComplete}
                  className="group flex flex-1 items-center justify-center gap-3 bg-charcoal py-4 text-[11px] tracking-wide-sm text-offwhite uppercase transition-colors hover:bg-foreground disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {measurementsComplete ? 'Add to Bag & Checkout' : 'Complete Measurements'}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StepShell({
  index,
  title,
  text,
  children,
}: {
  index: string
  title: string
  text: string
  children: React.ReactNode
}) {
  return (
    <div className="animate-fade-up">
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-2xl text-champagne">{index}</span>
        <h2 className="font-serif text-3xl md:text-4xl">{title}</h2>
      </div>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{text}</p>
      <div className="mt-8">{children}</div>
    </div>
  )
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={muted ? 'text-muted-foreground' : ''}>{label}</span>
      <span className={muted ? 'text-muted-foreground' : ''}>{value}</span>
    </div>
  )
}
