{/* Left: 3D Preview Area */}
<div className="hidden lg:flex flex-col justify-center items-center bg-white/40 backdrop-blur-sm border border-white/60 rounded-2xl p-8 shadow-xl relative h-[600px]">
  <div className="text-center w-full">
    <p className="text-neutral-400 text-sm uppercase tracking-widest mb-2">Live Preview</p>
    <h3 className="text-3xl font-serif text-neutral-800 mb-6">
      {GARMENTS.find((g) => g.id === selection.garment)?.name || "Your Garment"}
    </h3>
    
    {/* Real Image Display */}
    <div className="w-full h-64 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 flex items-center justify-center">
      {selection.garment ? (
        <img 
          src={GARMENTS.find((g) => g.id === selection.garment)?.image} 
          alt="Selected Garment" 
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-neutral-400 text-sm">Select a garment to preview</span>
      )}
    </div>

    <div className="mt-8 space-y-2 text-sm text-neutral-600">
      {selection.fabric && <p>Fabric: <span className="font-medium">{FABRICS.find((f) => f.id === selection.fabric)?.name}</span></p>}
      {selection.style.length > 0 && <p>Style: <span className="font-medium">{selection.style.length} selected</span></p>}
      {selection.details.length > 0 && <p>Details: <span className="font-medium">{selection.details.length} selected</span></p>}
    </div>
  </div>
</div>
