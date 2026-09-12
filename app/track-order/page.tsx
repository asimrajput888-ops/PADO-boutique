export default function TrackOrderPage() {
  return (
    <div className="bg-[#FFF8F0]">
      <div className="container mx-auto px-6 py-32 max-w-2xl text-center">
        <h1 className="text-5xl md:text-6xl font-serif text-[#1E1E2C] mb-8">Track Order</h1>
        <form className="space-y-6 text-left">
          <input type="text" placeholder="Order Number" className="w-full bg-transparent border-b border-[#1E1E2C]/20 p-3 text-[#1E1E2C] focus:border-[#5D1A24] outline-none placeholder:text-[#1E1E2C]/40" />
          <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-[#1E1E2C]/20 p-3 text-[#1E1E2C] focus:border-[#5D1A24] outline-none placeholder:text-[#1E1E2C]/40" />
          <button type="button" className="w-full bg-[#5D1A24] text-white font-medium py-4 hover:bg-[#4A151E] transition tracking-[0.2em] uppercase text-xs mt-4">Track Order</button>
        </form>
      </div>
    </div>
  );
}
