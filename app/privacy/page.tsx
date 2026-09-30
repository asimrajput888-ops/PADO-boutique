// app/privacy/page.tsx

export const metadata = {
  title: "Privacy Policy | PADO Boutique",
  description: "How PADO Boutique collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase text-center">
          Legal
        </p>
        <h1 className="text-4xl md:text-5xl font-serif mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="text-neutral-500 text-center mb-16">
          Last updated: September 2026
        </p>

        <div className="space-y-10 text-neutral-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-serif mb-3 text-neutral-900">Information We Collect</h2>
            <p>
              We collect information you provide directly, such as your name, email address, phone number, shipping address, and measurements when you place an order or contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif mb-3 text-neutral-900">How We Use Your Information</h2>
            <p>
              Your information is used to process orders, communicate with you about your purchase, improve our services, and send occasional updates if you opt in.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif mb-3 text-neutral-900">Data Protection</h2>
            <p>
              We implement appropriate security measures to protect your personal information. We do not sell or share your data with third parties except as required to fulfill your order.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif mb-3 text-neutral-900">Cookies</h2>
            <p>
              Our website may use cookies to enhance your browsing experience. You can disable cookies in your browser settings at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif mb-3 text-neutral-900">Contact Us</h2>
            <p>
              For any questions about this Privacy Policy, please <a href="/contact" className="text-amber-600 hover:underline">contact us</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
