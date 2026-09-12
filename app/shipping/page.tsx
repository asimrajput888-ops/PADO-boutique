// app/shipping/page.tsx

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-serif text-amber-500 mb-8">
        Shipping Policy
      </h1>
      <div className="space-y-6 text-neutral-400 leading-relaxed">
        <p>
          At PADO BOUTIQUE, every garment is crafted with precision. Because our 
          pieces are made-to-order, please allow <strong className="text-white">2-3 weeks</strong> for 
          crafting before your order is shipped.
        </p>
        <h2 className="text-xl text-white font-serif pt-4">Domestic Shipping (Pakistan)</h2>
        <p>
          We offer free standard shipping on all orders above PKR 50,000. 
          Standard delivery takes 3-5 business days after crafting.
        </p>
        <h2 className="text-xl text-white font-serif pt-4">International Shipping</h2>
        <p>
          We ship worldwide via DHL Express. International delivery typically takes 
          5-10 business days after crafting. Shipping charges are calculated at checkout.
        </p>
        <h2 className="text-xl text-white font-serif pt-4">Order Tracking</h2>
        <p>
          Once your order is shipped, you will receive a tracking number via email. 
          You can also track your order using our Track Order page.
        </p>
      </div>
    </div>
  );
}
