// app/returns/page.tsx

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-serif text-amber-500 mb-8">
        Returns & Exchanges
      </h1>
      <div className="space-y-6 text-neutral-400 leading-relaxed">
        <p>
          Due to the bespoke and made-to-order nature of our garments, we accept 
          returns and exchanges within <strong className="text-white">14 days</strong> of delivery, 
          provided the item is unworn, unwashed, and in its original packaging.
        </p>
        <h2 className="text-xl text-white font-serif pt-4">Non-Returnable Items</h2>
        <p>
          Custom-tailored garments, personalized items, and final sale pieces 
          cannot be returned or exchanged.
        </p>
        <h2 className="text-xl text-white font-serif pt-4">How to Initiate a Return</h2>
        <p>
          To start a return, please contact us at hello@padoboutique.com with your 
          order number and reason for return. Our team will guide you through the process.
        </p>
        <h2 className="text-xl text-white font-serif pt-4">Refunds</h2>
        <p>
          Once your return is received and inspected, we will notify you of the 
          approval or rejection of your refund. Approved refunds will be processed 
          to your original method of payment within 7-10 business days.
        </p>
      </div>
    </div>
  );
}
