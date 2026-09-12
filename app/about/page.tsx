export default function AboutPage() {
  return (
    <div className="bg-[#FFF8F0]">
      <div className="container mx-auto px-6 py-32 max-w-5xl">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-serif text-[#1E1E2C] mb-6 tracking-tight">
            Our <span className="italic text-[#5D1A24]">Story</span>
          </h1>
          <p className="text-[#1E1E2C]/60 uppercase tracking-[0.3em] text-xs">
            Crafting Timeless Elegance Since 2020
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div className="bg-[#1E1E2C]/5 aspect-[4/5] border border-[#1E1E2C]/10 flex items-center justify-center">
            <span className="text-[#1E1E2C]/30 font-serif italic text-xl">Atelier Image</span>
          </div>
          <div className="space-y-8 text-[#1E1E2C]/80 leading-relaxed font-light">
            <h2 className="text-3xl font-serif text-[#1E1E2C]">The PADO Philosophy</h2>
            <p>
              Founded with a passion for perfection, PADO BOUTIQUE specializes in creating 
              garments that are as unique as the individuals who wear them.
            </p>
            <p>
              We believe that luxury is not just about the fabric, but about the experience. 
              Our atelier blends traditional techniques with a contemporary vision.
            </p>
          </div>
        </div>

        {/* Signature Line */}
        <div className="text-center border-t border-[#1E1E2C]/10 pt-16">
          <p className="text-4xl font-serif italic text-[#C5A059]">PADO</p>
          <p className="text-xs uppercase tracking-[0.3em] text-[#1E1E2C]/40 mt-4">Bespoke Tailoring</p>
        </div>
      </div>
    </div>
  );
}
