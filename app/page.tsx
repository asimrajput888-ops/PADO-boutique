import { Hero } from '@/components/home/hero'
import { EditorialCategories } from '@/components/home/editorial-categories'
import { SignatureCollection } from '@/components/home/signature-collection'
import { BuilderTeaser } from '@/components/home/builder-teaser'
import { FabricAtelier } from '@/components/home/fabric-atelier'
import { HowItWorks } from '@/components/home/how-it-works'
import { WhyBespoke } from '@/components/home/why-bespoke'
import { Reviews } from '@/components/home/reviews'
import { JournalPreview } from '@/components/home/journal-preview'
import { FinalCta } from '@/components/home/final-cta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <EditorialCategories />
      <SignatureCollection />
      <BuilderTeaser />
      <FabricAtelier />
      <HowItWorks />
      <WhyBespoke />
      <Reviews />
      <JournalPreview />
      <FinalCta />
    </>
  )
}
