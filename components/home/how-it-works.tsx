import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'

const steps = [
  {
    n: '01',
    title: 'Choose Your Design',
    text: 'Begin with a signature suit or a blank canvas — for men and women alike.',
  },
  {
    n: '02',
    title: 'Customize Every Detail',
    text: 'Select fabric, lapel, fit, buttons and finish in our digital studio.',
  },
  {
    n: '03',
    title: 'Enter Your Measurements',
    text: 'Follow our guided steps for a precise, personal fit at home.',
  },
  {
    n: '04',
    title: 'We Craft & Deliver',
    text: 'Your suit is hand-finished by our tailors and delivered to your door.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-offwhite py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <SectionHeading eyebrow="The Process" title="How it works." />
        <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal
              key={step.n}
              delay={i * 90}
              className="flex flex-col bg-offwhite p-8 md:p-10"
            >
              <span className="font-serif text-5xl text-champagne">{step.n}</span>
              <h3 className="mt-8 font-serif text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
