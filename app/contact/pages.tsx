// app/contact/page.tsx

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-serif text-amber-500 mb-8">
        Contact Us
      </h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6 text-neutral-400 leading-relaxed">
          <p>
            Have a question about our bespoke services, measurements, or orders? 
            Our team is here to assist you.
          </p>
          <div className="space-y-2">
            <p><strong className="text-white">Email:</strong> hello@padoboutique.com</p>
            <p><strong className="text-white">Phone:</strong> +92 300 1234567</p>
            <p><strong className="text-white">Address:</strong> 123 Luxury Avenue, Karachi, Pakistan</p>
          </div>
          <p className="text-sm">
            We typically respond within 24-48 business hours.
          </p>
        </div>
        
        <form className="space-y-4 bg-neutral-900 p-8 border border-neutral-800">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full bg-neutral-950 border border-neutral-800 p-3 text-white focus:border-amber-500 outline-none"
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="w-full bg-neutral-950 border border-neutral-800 p-3 text-white focus:border-amber-500 outline-none"
          />
          <textarea 
            placeholder="Your Message" 
            rows={4}
            className="w-full bg-neutral-950 border border-neutral-800 p-3 text-white focus:border-amber-500 outline-none"
          ></textarea>
          <button 
            type="button" 
            className="w-full bg-amber-600 text-black font-bold py-3 hover:bg-amber-500 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
