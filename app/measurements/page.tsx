// app/measurements/page.tsx

export const metadata = {
  title: "Measurements Guide | PADO Boutique",
  description: "How to take your own measurements for a perfect bespoke fit.",
};

export default function MeasurementsPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase text-center">
          Size Guide
        </p>
        <h1 className="text-4xl md:text-5xl font-serif mb-6 text-center">
          Measurements
        </h1>
        <p className="text-neutral-500 text-center max-w-xl mx-auto mb-16">
          Follow this guide to take accurate measurements at home. If you need help, our team is one message away.
        </p>

        <div className="space-y-8">
          <div className="border-l-2 border-amber-500 pl-6">
            <h2 className="text-xl font-serif mb-3">1. Chest</h2>
            <p className="text-neutral-600 leading-relaxed">
              Wrap the measuring tape around the fullest part of your chest, keeping it level under your arms.
            </p>
          </div>

          <div className="border-l-2 border-amber-500 pl-6">
            <h2 className="text-xl font-serif mb-3">2. Waist</h2>
            <p className="text-neutral-600 leading-relaxed">
              Measure around your natural waistline, at the narrowest point. Keep one finger between the tape and your body.
            </p>
          </div>

          <div className="border-l-2 border-amber-500 pl-6">
            <h2 className="text-xl font-serif mb-3">3. Shoulder</h2>
            <p className="text-neutral-600 leading-relaxed">
              Measure from the edge of one shoulder to the other, across the back.
            </p>
          </div>

          <div className="border-l-2 border-amber-500 pl-6">
            <h2 className="text-xl font-serif mb-3">4. Sleeve Length</h2>
            <p className="text-neutral-600 leading-relaxed">
              From the shoulder point, measure down to your wrist bone with the arm slightly bent.
            </p>
          </div>

          <div className="border-l-2 border-amber-500 pl-6">
            <h2 className="text-xl font-serif mb-3">5. Trouser Length</h2>
            <p className="text-neutral-600 leading-relaxed">
              Measure from the top of the waistband down to where you want the trouser to end.
            </p>
          </div>

          <div className="border-l-2 border-amber-500 pl-6">
            <h2 className="text-xl font-serif mb-3">6. Height</h2>
            <p className="text-neutral-600 leading-relaxed">
              Stand straight against a wall, without shoes, and measure from floor to top of head.
            </p>
          </div>
        </div>

        <div className="mt-16 p-6 bg-amber-50 border border-amber-200 rounded-lg text-center">
          <p className="text-sm text-neutral-700">
            Need help? <a href="/contact" className="text-amber-600 hover:underline">Contact us</a> or message us on WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
