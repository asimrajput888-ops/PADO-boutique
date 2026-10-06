// app/shipping/page.tsx

export const metadata = {
  title: "Shipping | PADO Boutique",
  description:
    "Worldwide shipping timelines for PADO Boutique — bespoke tailoring, custom orders, and ready-to-wear pieces delivered with care.",
};

export default function ShippingPage() {
  return (
    <div className="bg-[#FFF8F0]">
      <div className="container mx-auto px-6 py-32 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-[#1E1E2C] mb-4">
            Shipping
          </h1>
          <p className="text-[#1E1E2C]/60 uppercase tracking-[0.3em] text-xs">
            Worldwide Delivery
          </p>
        </div>

        {/* Intro */}
        <div className="text-[#1E1E2C]/80 leading-relaxed font-light mb-12">
          <p>
            At PADO BOUTIQUE, every garment is handcrafted to order by our master tailors
            and shipped worldwide with care. Below are our production and delivery
            timelines so you know exactly when to expect your piece.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 text-[#1E1E2C]/80 leading-relaxed font-light">

          <div className="border-l-2 border-[#C5A059] pl-6">
            <h2 className="text-xl font-serif mb-3 text-[#1E1E2C]">
              Standard Size Orders
            </h2>
            <p>
              Standard size pieces are crafted on a ready pattern and dispatched within{" "}
              <strong>10–12 business days</strong> from the date of order confirmation.
              You will receive a tracking number via email or WhatsApp once your order ships.
            </p>
          </div>

          <div className="border-l-2 border-[#C5A059] pl-6">
            <h2 className="text-xl font-serif mb-3 text-[#1E1E2C]">
              Custom / Bespoke Orders
            </h2>
            <p>
              Bespoke orders are handcrafted to your exact measurements and typically
              delivered within <strong>14–18 business days</strong>. Production begins only
              after your measurements are finalized and confirmed. Each piece passes through
              multiple fittings and quality checks before dispatch.
            </p>
          </div>

          <div className="border-l-2 border-[#C5A059] pl-6">
            <h2 className="text-xl font-serif mb-3 text-[#1E1E2C]">
              International Delivery
            </h2>
            <p>
              We ship worldwide. Delivery timelines above include international transit,
              though customs clearance may occasionally add 1–3 additional days depending on
              your destination country. Shipping charges are calculated at checkout.
            </p>
          </div>

          <div className="border-l-2 border-[#C5A059] pl-6">
            <h2 className="text-xl font-serif mb-3 text-[#1E1E2C]">
              Bespoke Tailoring Process
            </h2>
            <p>
              Every PADO BOUTIQUE garment is made to order — not mass-produced. Here&apos;s what
              happens after you place your order:
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex gap-3">
                <span className="text-[#C5A059]">—</span>
                <span>Order review &amp; measurement verification (within 24 hours)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#C5A059]">—</span>
                <span>Fabric cutting &amp; hand-tailoring by master craftsmen</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#C5A059]">—</span>
                <span>Quality inspection &amp; finishing</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#C5A059]">—</span>
                <span>Careful packaging &amp; worldwide dispatch</span>
              </li>
            </ul>
          </div>

          <div className="border-l-2 border-[#C5A059] pl-6">
            <h2 className="text-xl font-serif mb-3 text-[#1E1E2C]">
              Order Tracking
            </h2>
            <p>
              Once your order ships, you will receive a tracking link via email or WhatsApp.
              You can also track your order from our{" "}
              <a href="/track-order" className="text-[#5D1A24] hover:underline">
                Track Order
              </a>{" "}
              page.
            </p>
          </div>

          <div className="border-l-2 border-[#C5A059] pl-6">
            <h2 className="text-xl font-serif mb-3 text-[#1E1E2C]">
              Duties &amp; Taxes
            </h2>
            <p>
              International orders may be subject to customs duties or import taxes levied by
              your destination country. These charges are the responsibility of the customer
              and are not included in the order total.
            </p>
          </div>

        </div>

        {/* Contact CTA */}
        <div className="mt-16 p-6 bg-[#C5A059]/10 border border-[#C5A059]/30 rounded-lg text-center">
          <p className="text-sm text-[#1E1E2C]/80">
            Have questions about shipping or your bespoke order?{" "}
            <a href="/contact" className="text-[#5D1A24] hover:underline font-medium">
              Contact us
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
