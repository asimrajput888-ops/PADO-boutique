'use client'

import { measurementFields, type Gender } from '@/lib/data'

export type Unit = 'in' | 'cm'
export type Measurements = Record<string, string>

type Props = {
  gender: Gender
  unit: Unit
  onUnitChange: (u: Unit) => void
  values: Measurements
  onChange: (id: string, value: string) => void
}

export function MeasurementForm({ gender, unit, onUnitChange, values, onChange }: Props) {
  const fields = measurementFields[gender]
  const completed = fields.filter((f) => values[f.id]?.trim()).length
  const progress = Math.round((completed / fields.length) * 100)

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[11px] tracking-wide-sm text-muted-foreground uppercase">Units</span>
          <div className="flex border border-border">
            {(['in', 'cm'] as Unit[]).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => onUnitChange(u)}
                className={`px-4 py-1.5 text-[11px] tracking-wide-sm uppercase transition-colors ${
                  unit === u ? 'bg-charcoal text-offwhite' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
        <span className="text-[11px] tracking-wide-sm text-muted-foreground uppercase">
          {completed} / {fields.length}
        </span>
      </div>

      <div className="mt-4 h-px w-full bg-border">
        <div
          className="h-px bg-champagne transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={`m-${field.id}`}
              className="flex items-baseline justify-between text-[12px] tracking-wide-sm uppercase"
            >
              {field.label}
              <span className="text-[10px] normal-case tracking-normal text-muted-foreground">
                {unit}
              </span>
            </label>
            <input
              id={`m-${field.id}`}
              inputMode="decimal"
              value={values[field.id] ?? ''}
              onChange={(e) => onChange(field.id, e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="0.0"
              className="mt-2 w-full border-b border-border bg-transparent pb-2 font-serif text-2xl text-foreground outline-none transition-colors placeholder:text-border focus:border-champagne"
            />
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{field.hint}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
