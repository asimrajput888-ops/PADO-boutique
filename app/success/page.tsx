// app/success/page.tsx

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-5 py-20">
      <div className="max-w-lg text-center">
        <div className="w-24 h-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-10 text-4xl">
          ✓
        </div>
        <h1 className="text-4xl font-serif text-ink mb-6">Payment Successful!</h1>
        <p className="text-stone mb-8 leading-relaxed">
          Thank you for your order. We have received your payment and our team is already working on it. 
          You will receive an order confirmation email shortly with your Order Number.
        </p>
        <div className="space-y-4">
          <Link href="/track-order" className="block w-full bg-ink text-paper py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-bronze transition-colors">
            Track Your Order
          </Link>
          <Link href="/" className="block w-full border border-border text-ink py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-brand-cream transition-colors">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
