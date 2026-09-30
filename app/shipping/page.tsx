// app/shipping/page.tsx

export const metadata = {
  title: "Shipping | PADO Boutique",
  description: "Shipping timelines, delivery information, and dispatch details for PADO Boutique orders.",
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
            Our Promise
          </p>
        </div>

        {/* Intro */}
        <div className="text-[#1E1E2C]/80 leading-relaxed font-light mb-12">
          <p>
            At PADO BOUTIQUE, every garment is crafted with precision and shipped with care.
            Below are our delivery timelines and dispatch details.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 text-[#1E1E2C]/80 leading-relaxed font-light">

          <div className="border-l-2 border-[#C5A059] pl-6">
            <h2 className="text-xl font-serif mb-3 text-[#1E1E2C]">
              Ready-to-Wear
            </h2>
            <p>
              Ready-to-wear pieces are dispatched within <strong>2–3 business days</strong> of
              order confirmation. You will receive a tracking number via email or WhatsApp once
              your order ships.
            </p>
          </div>

          <div className="border-l-2 border-[#C5A059] pl-6">
            <h2 className="text-xl font-serif mb-3 text-[#1E1E2C]">
              Bespoke Orders
            </h2>
            <p>
              Bespoke orders are handcrafted to your exact measurements and typically delivered
              within <strong>3 weeks</strong>. Production begins only after measurements are
              finalized and confirmed.
            </p>
          </div>

          <div className="border-l-2 border-[#C5A059] pl-6">
            <h2 className="text-xl font-serif mb-3 text-[#1E1E2C]">
              Delivery Within Pakistan
            </h2>
            <p>
              Standard delivery within Pakistan takes <strong>3–5 business days</strong> after
              dispatch. Free delivery on orders above Rs. 50,000.
            </p>
          </div>

          <div className="border-l-2 border-[#C5A059] pl-6">
            <h2 className="text-xl font-serif mb-3 text-[#1E1E2C]">
              International Delivery
            </h2>
            <p>
              We ship worldwide. International delivery typically takes{" "}
              <strong>7–14 business days</strong>, depending on destination and customs clearance.
              Shipping charges are calculated at checkout.
            </p>
          </div>

          <div className="border-l-2 border-[#C5A059] pl-6">
            <h2 className="text-xl font-serif mb-3 text-[#1E1E2C]">
              Order Tracking
            </h2>
            <p>
              Once your order ships, you will receive a tracking link via email or WhatsApp. You
              can also track your order from our{" "}
              <a href="/track-order" className="text-[#5D1A24] hover:underline">
                Track Order
              </a>{" "}
              page.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 p-6 bg-[#C5A059]/10 border border-[#C5A059]/30 rounded-lg text-center">
          <p className="text-sm text-[#1E1E2C]/80">
            Have questions about shipping?{" "}
            <a href="/contact" className="text-[#5D1A24] hover:underline font-medium">
              Contact us
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
