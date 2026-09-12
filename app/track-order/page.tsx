// app/track-order/page.tsx

export default function TrackOrderPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-2xl text-center">
      <h1 className="text-4xl md:text-5xl font-serif text-amber-500 mb-8">
        Track Your Order
      </h1>
      <p className="text-neutral-400 mb-8">
        Enter your order number and email address below to track your bespoke order.
      </p>
      
      <form className="space-y-4 max-w-md mx-auto text-left">
        <div>
          <label className="block text-sm text-neutral-500 mb-2">Order Number</label>
          <input 
            type="text" 
            placeholder="e.g. PADO-12345" 
            className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white focus:border-amber-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-500 mb-2">Email Address</label>
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="w-full bg-neutral-900 border border-neutral-800 p-3 text-white focus:border-amber-500 outline-none"
          />
        </div>
        <button 
          type="button" 
          className="w-full bg-amber-600 text-black font-bold py-3 hover:bg-amber-500 transition mt-4"
        >
          Track Order
        </button>
      </form>
      
      <p className="text-neutral-600 text-sm mt-8">
        Note: Tracking information will be available once your order has been shipped.
      </p>
    </div>
  );
}
