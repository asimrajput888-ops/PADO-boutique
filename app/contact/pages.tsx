export default function ContactPage() {
  return (
    <div className="bg-[#FFF8F0]">
      <div className="container mx-auto px-6 py-32 max-w-5xl">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-serif text-[#1E1E2C] mb-6 tracking-tight">
            Get in <span className="italic text-[#5D1A24]">Touch</span>
          </h1>
          <p className="text-[#1E1E2C]/60 uppercase tracking-[0.3em] text-xs">
            We would love to hear from you
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8 text-[#1E1E2C]/80 leading-relaxed font-light">
            <p className="text-lg">
              Have a question about our bespoke services, measurements, or orders? 
              Our team is here to assist you.
            </p>
            <div className="space-y-4">
              <p><strong className="text-[#1E1E2C] font-normal">Email:</strong> hello@padoboutique.com</p>
              <p><strong className="text-[#1E1E2C] font-normal">Phone:</strong> +92 300 1234567</p>
              <p><strong className="text-[#1E1E2C] font-normal">Atelier:</strong> 123 Luxury Avenue, Karachi</p>
            </div>
          </div>
          
          <form className="space-y-6 bg-white p-10 border border-[#1E1E2C]/10">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full bg-transparent border-b border-[#1E1E2C]/20 p-3 text-[#1E1E2C] focus:border-[#5D1A24] outline-none placeholder:text-[#1E1E2C]/40"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full bg-transparent border-b border-[#1E1E2C]/20 p-3 text-[#1E1E2C] focus:border-[#5D1A24] outline-none placeholder:text-[#1E1E2C]/40"
            />
            <textarea 
              placeholder="Your Message" 
              rows={4}
              className="w-full bg-transparent border-b border-[#1E1E2C]/20 p-3 text-[#1E1E2C] focus:border-[#5D1A24] outline-none placeholder:text-[#1E1E2C]/40 resize-none"
            ></textarea>
            <button 
              type="button" 
              className="w-full bg-[#5D1A24] text-white font-medium py-4 hover:bg-[#4A151E] transition tracking-[0.2em] uppercase text-xs"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
