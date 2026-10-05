// app/contact/page.tsx

export const metadata = {
  title: "Contact | PADO Boutique",
  description: "Get in touch with PADO Boutique for bespoke orders and consultations.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white py-32 px-5 md:px-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
            Get in Touch
          </p>
          <h1 className="text-3xl md:text-5xl font-serif mb-4 text-neutral-900">
            Contact Us
          </h1>
          <p className="text-neutral-500 max-w-md mx-auto text-sm">
            For bespoke orders, measurements help, or general enquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <a
            href="https://wa.me/16393840265?text=Hi%2C%20I%20have%20a%20question"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-neutral-200 p-8 hover:border-neutral-900 transition group"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4">
              WhatsApp
            </p>
            <p className="font-serif text-xl text-neutral-900 mb-2 group-hover:text-neutral-500">
              Chat with a Tailor
            </p>
            <p className="text-sm text-neutral-500">+1 (639) 384-0265</p>
          </a>

          <a
            href="mailto:padoboutique@gmail.com"
            className="border border-neutral-200 p-8 hover:border-neutral-900 transition group"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4">
              Email
            </p>
            <p className="font-serif text-xl text-neutral-900 mb-2 group-hover:text-neutral-500">
              Write to Us
            </p>
            <p className="text-sm text-neutral-500">padoboutique@gmail.com</p>
          </a>
        </div>

        <div className="border-t border-neutral-200 pt-12">
          <h2 className="text-xl font-serif mb-6 text-neutral-900">Send a Message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none resize-none text-sm"
            />
            <button
              type="submit"
              className="w-full bg-neutral-900 text-white py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
