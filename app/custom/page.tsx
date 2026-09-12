// app/custom/page.tsx

import Link from "next/link";

export default function CustomPage() {
  const steps = [
    { step: "01", title: "Consultation", desc: "Book an appointment to discuss your vision, fabric, and style preferences." },
    { step: "02", title: "Measurements", desc: "Our master tailors take precise measurements to ensure a perfect fit." },
    { step: "03", title: "Crafting", desc: "Your garment is handcrafted over 2-3 weeks using premium materials." },
    { step: "04", title: "Fitting", desc: "A final fitting to ensure perfection before delivery to your door." },
  ];

  return (
    <div className="bg-[#FFF8F0] min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#1E1E2C] text-white py-32 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-[#C5A059] uppercase tracking-[0.4em] text-xs mb-6">Bespoke Service</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight">
            Made to <span className="italic text-[#C5A059]">Measure</span>
          </h1>
          <p className="text-white/60 max-w-xl mx-auto font-light leading-relaxed">
            Experience the art of bespoke tailoring. From consultation to final stitch, 
            every detail is crafted around you.
          </p>
        </div>
      </div>

      {/* Process Steps */}
      <div className="container mx-auto px-6 py-24 max-w-5xl">
        <h2 className="text-3xl font-serif text-[#1E1E2C] mb-16 text-center">The Process</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mb-20">
          {steps.map((item) => (
            <div key={item.step} className="flex gap-6">
              <span className="text-4xl font-serif text-[#C5A059]">{item.step}</span>
              <div>
                <h3 className="text-xl font-serif text-[#1E1E2C] mb-2">{item.title}</h3>
                <p className="text-[#1E1E2C]/70 font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-white border border-[#1E1E2C]/10 p-16">
          <h3 className="text-3xl font-serif text-[#1E1E2C] mb-4">Begin Your Bespoke Journey</h3>
          <p className="text-[#1E1E2C]/60 mb-8 font-light">Book a consultation with our master tailors today.</p>
          <Link 
            href="/contact" 
            className="inline-block bg-[#5D1A24] text-white px-10 py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#4A151E] transition"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
