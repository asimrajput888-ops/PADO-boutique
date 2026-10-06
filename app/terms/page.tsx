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
            <h2 className="text-xl font-serif mb-3 text-neutral-900">Production &amp; Delivery</h2>
            <p className="mb-4">
              Every PADO BOUTIQUE garment is made to order by our master tailors. Production
              timelines are as follows:
            </p>
            <ul className="space-y-2 text-neutral-700">
              <li className="flex gap-3">
                <span className="text-amber-600">—</span>
                <span>
                  <strong className="text-neutral-900">Standard Size Orders:</strong> dispatched
                  within <strong>10–12 business days</strong> from order confirmation.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-600">—</span>
                <span>
                  <strong className="text-neutral-900">Custom / Bespoke Orders:</strong> handcrafted
                  to your exact measurements and delivered within{" "}
                  <strong>14–18 business days</strong>. Production begins only after measurements
                  are finalized and confirmed.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-600">—</span>
                <span>
                  <strong className="text-neutral-900">International Delivery:</strong> we ship
                  worldwide. Customs clearance may add 1–3 additional business days depending
                  on destination country.
                </span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-neutral-500">
              Delivery timelines may vary slightly during peak seasons or due to circumstances
              beyond our control. Tracking details are shared via email or WhatsApp once your
              order is dispatched.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif mb-3 text-neutral-900">Returns &amp; Exchanges</h2>
            <p className="mb-4">
              As every piece is handcrafted to order, our return policy reflects the bespoke
              nature of our garments:
            </p>
            <ul className="space-y-2 text-neutral-700">
              <li className="flex gap-3">
                <span className="text-amber-600">—</span>
                <span>
                  <strong className="text-neutral-900">Standard Size Orders:</strong> may be
                  returned or exchanged within <strong>7 days</strong> of delivery, provided
                  items are unworn, unwashed, and in original condition with tags intact.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-600">—</span>
                <span>
                  <strong className="text-neutral-900">Custom / Bespoke Orders:</strong> are
                  made to your specific measurements and are{" "}
                  <strong>non-refundable and non-exchangeable</strong>, except in cases of
                  manufacturing defect or incorrect measurements caused by our atelier.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-600">—</span>
                <span>
                  <strong className="text-neutral-900">Alterations:</strong> if your bespoke
                  garment requires minor fit adjustments, we offer one complimentary alteration
                  within <strong>14 days</strong> of delivery (shipping charges may apply).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-600">—</span>
                <span>
                  <strong className="text-neutral-900">Damaged or Defective Items:</strong> must
                  be reported within <strong>48 hours</strong> of delivery with photographic
                  evidence for resolution.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-600">—</span>
                <span>
                  <strong className="text-neutral-900">Return Shipping:</strong> customers are
                  responsible for return shipping costs unless the item is defective or
                  incorrect.
                </span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-neutral-500">
              To initiate a return or exchange, please{" "}
              <a href="/contact" className="text-amber-600 hover:underline">
                contact us
              </a>{" "}
              with your order number.
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
