// app/terms/page.tsx

export const metadata = {
  title: "Terms & Conditions | PADO Boutique",
  description: "Terms and conditions for shopping with PADO Boutique.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase text-center">
          Legal
        </p>
        <h1 className="text-4xl md:text-5xl font-serif mb-6 text-center">
          Terms &amp; Conditions
        </h1>
        <p className="text-neutral-500 text-center mb-16">
          Last updated: September 2026
        </p>

        <div className="space-y-10 text-neutral-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-serif mb-3 text-neutral-900">Orders</h2>
            <p>
              All orders are subject to acceptance and availability. Once an order is placed, you will receive a confirmation. Bespoke orders require measurements to be finalized before production begins.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif mb-3 text-neutral-900">Pricing</h2>
            <p>
              All prices are listed in the currency shown at checkout. We reserve the right to update prices without prior notice. Prices are confirmed at the time of order.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif mb-3 text-neutral-900">Production & Delivery</h2>
            <p>
              Bespoke pieces are handcrafted and typically delivered within 3 weeks. Ready-to-wear items are dispatched within 2–3 business days. Delivery timelines may vary based on location.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif mb-3 text-neutral-900">Returns & Exchanges</h2>
            <p>
              Ready-to-wear items may be returned within 7 days of delivery in original condition. Bespoke orders are non-refundable as they are made to your specific measurements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif mb-3 text-neutral-900">Intellectual Property</h2>
            <p>
              All content on this website, including designs, images, and text, is the property of PADO BOUTIQUE and may not be reproduced without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif mb-3 text-neutral-900">Contact</h2>
            <p>
              For any questions regarding these Terms, please <a href="/contact" className="text-amber-600 hover:underline">contact us</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
