// app/journal/page.tsx

import Link from "next/link";

export const metadata = {
  title: "Journal | PADO Boutique",
  description: "Stories, style guides, and craft notes from PADO Boutique.",
};

export default function JournalPage() {
  const articles = [
    {
      slug: "art-of-bespoke",
      title: "The Art of Bespoke Tailoring",
      excerpt: "Why a made-to-measure suit changes how you carry yourself.",
      date: "Coming soon",
    },
    {
      slug: "fabric-guide",
      title: "A Gentleman's Guide to Fabric",
      excerpt: "Wool, cashmere, linen — what to pick and when.",
      date: "Coming soon",
    },
    {
      slug: "perfect-fit",
      title: "The Perfect Fit",
      excerpt: "How to measure yourself for a bespoke suit.",
      date: "Coming soon",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            PADO Journal
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Stories &amp; Style</h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Notes on craft, fabric, and the art of dressing well.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((a) => (
            <article
              key={a.slug}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] bg-neutral-100 mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-neutral-300 text-xs">
                  Image coming soon
                </div>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-600 mb-2">
                {a.date}
              </p>
              <h2 className="font-serif text-xl text-neutral-900 group-hover:text-amber-600 transition mb-2">
                {a.title}
              </h2>
              <p className="text-sm text-neutral-500 leading-relaxed">
                {a.excerpt}
              </p>
            </article>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/"
            className="text-sm text-neutral-500 hover:text-amber-600"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
