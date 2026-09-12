import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { journalPosts } from '@/lib/data'
import { Reveal } from '@/components/site/reveal'

export function JournalPreview() {
  const [lead, ...rest] = journalPosts.slice(0, 3)

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
      <div className="flex items-end justify-between gap-6">
        <div>
          <Reveal as="p" className="text-[11px] tracking-luxe text-muted-foreground uppercase">
            The Journal
          </Reveal>
          <Reveal as="h2" delay={80} className="mt-4 font-serif text-4xl text-balance md:text-6xl">
            Notes on tailoring.
          </Reveal>
        </div>
        <Reveal delay={120} className="hidden md:block">
          <Link
            href="/journal"
            className="group flex items-center gap-2 text-[11px] tracking-wide-sm uppercase text-muted-foreground transition-colors hover:text-foreground"
          >
            All Articles
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <Reveal>
          <Link href={`/journal/${lead.slug}`} className="group block">
            <div className="relative aspect-[16/11] overflow-hidden bg-muted">
              <Image
                src={lead.image || '/placeholder.svg'}
                alt={lead.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
              />
            </div>
            <p className="mt-5 text-[10px] tracking-wide-sm text-muted-foreground uppercase">
              {lead.category} — {lead.readTime}
            </p>
            <h3 className="mt-2 font-serif text-3xl leading-tight">{lead.title}</h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {lead.excerpt}
            </p>
          </Link>
        </Reveal>

        <div className="flex flex-col gap-8">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 90}>
              <Link href={`/journal/${post.slug}`} className="group flex gap-6">
                <div className="relative aspect-[4/3] w-40 shrink-0 overflow-hidden bg-muted sm:w-52">
                  <Image
                    src={post.image || '/placeholder.svg'}
                    alt={post.title}
                    fill
                    sizes="200px"
                    className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[10px] tracking-wide-sm text-muted-foreground uppercase">
                    {post.category} — {post.readTime}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl leading-tight">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
