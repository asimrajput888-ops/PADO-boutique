// app/contact/page.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");

      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-paper pt-40 pb-24 px-6 md:px-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-full bg-ink text-paper flex items-center justify-center mx-auto mb-10 text-4xl"
          >
            ✓
          </motion.div>
          <p className="text-[10px] tracking-[0.5em] text-bronze uppercase mb-4">
            Message Sent
          </p>
          <h1 className="text-4xl font-serif text-ink mb-6">
            Thank you.
          </h1>
          <p className="text-stone mb-10 leading-relaxed">
            We've received your message and will get back to you within 24 hours. 
            A confirmation has been sent to your email.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="inline-block bg-ink text-paper px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-bronze transition-colors duration-500"
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper pt-40 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20 max-w-2xl mx-auto"
        >
          <p className="text-[10px] tracking-[0.5em] text-bronze uppercase mb-5">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-ink leading-[1.1] mb-6">
            Let's talk.
          </h1>
          <p className="text-stone text-base leading-relaxed">
            Questions about sizing, fabrics, or your order? Our team is here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.4em] text-bronze mb-3 font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full border border-border bg-white p-4 focus:border-ink outline-none text-sm text-ink transition-colors duration-300"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.4em] text-bronze mb-3 font-semibold">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full border border-border bg-white p-4 focus:border-ink outline-none text-sm text-ink transition-colors duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.4em] text-bronze mb-3 font-semibold">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-border bg-white p-4 focus:border-ink outline-none text-sm text-ink transition-colors duration-300"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.4em] text-bronze mb-3 font-semibold">
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-border bg-white p-4 focus:border-ink outline-none text-sm text-ink transition-colors duration-300"
                  >
                    <option value="">Select a topic</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Question">Order Question</option>
                    <option value="Sizing Help">Sizing Help</option>
                    <option value="Fabric Question">Fabric Question</option>
                    <option value="Returns">Returns</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.4em] text-bronze mb-3 font-semibold">
                  Message *
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={8}
                  className="w-full border border-border bg-white p-4 focus:border-ink outline-none resize-none text-sm text-ink transition-colors duration-300"
                />
              </div>

              {error && (
                <div className="border border-red-300 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="bg-ink text-paper px-12 py-5 text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-bronze transition-colors duration-500 disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="border border-border bg-white p-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-bronze mb-4 font-semibold">
                WhatsApp
              </p>
              <p className="text-sm text-graphite leading-relaxed mb-4">
                Fastest way to reach us — we usually reply within minutes.
              </p>
              <a
                href="https://wa.me/16393840265"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.4em] uppercase border-b border-ink pb-1 inline-block hover:border-bronze hover:text-bronze transition-colors duration-300"
              >
                +1 (639) 384-0265 →
              </a>
            </div>

            <div className="border border-border bg-white p-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-bronze mb-4 font-semibold">
                Email
              </p>
              <p className="text-sm text-graphite leading-relaxed mb-4">
                For order questions and detailed inquiries.
              </p>
              <a
                href="mailto:orders@padoshop.com"
                className="text-[10px] tracking-[0.4em] uppercase border-b border-ink pb-1 inline-block hover:border-bronze hover:text-bronze transition-colors duration-300"
              >
                orders@padoshop.com →
              </a>
            </div>

            <div className="border border-border bg-cream p-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-bronze mb-4 font-semibold">
                Response Time
              </p>
              <p className="text-sm text-graphite leading-relaxed">
                We reply to all inquiries within 24 hours (Mon–Fri). Weekend messages 
                are answered on Monday.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
