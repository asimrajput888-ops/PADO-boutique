// app/admin/models/new/page.tsx

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewModel() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    default_fabric: "premium-wool",
    default_lapel: "notch",
    default_buttons: "2-button",
    default_sleeve: "4-sleeve",
    default_pocket: "flap",
    default_fit: "slim",
    default_trouser: "flat-front",
    default_vent: "double-vent",
    default_vest: "without-vest",
    default_lining: "navy",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = "";

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `model-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from("product-images").upload(fileName, imageFile);
      if (uploadError) {
        alert("Image upload failed: " + uploadError.message);
        setLoading(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    }

    const { error } = await supabase.from("models").insert({
      name: formData.name,
      price: parseInt(formData.price),
      description: formData.description,
      image_url: imageUrl,
      default_fabric: formData.default_fabric,
      default_lapel: formData.default_lapel,
      default_buttons: formData.default_buttons,
      default_sleeve: formData.default_sleeve,
      default_pocket: formData.default_pocket,
      default_fit: formData.default_fit,
      default_trouser: formData.default_trouser,
      default_vent: formData.default_vent,
      default_vest: formData.default_vest,
      default_lining: formData.default_lining,
    });

    if (error) {
      alert("Error: " + error.message);
      setLoading(false);
    } else {
      router.push("/admin/models");
    }
  };

  return (
    <div className="p-10 max-w-3xl">
      <Link href="/admin/models" className="text-sm text-neutral-500 hover:text-amber-600 mb-6 inline-block">
        ← Back to Models
      </Link>
      <h1 className="text-3xl font-serif mb-8">Add New Model</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-neutral-200 p-8 rounded-lg">
        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Model Name</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-neutral-300 p-3 rounded-lg focus:border-amber-500 outline-none" required />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Price (PKR)</label>
          <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full border border-neutral-300 p-3 rounded-lg focus:border-amber-500 outline-none" required />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Description</label>
          <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full border border-neutral-300 p-3 rounded-lg focus:border-amber-500 outline-none resize-none" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Model Image</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full border border-neutral-300 p-3 rounded-lg" required />
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <h3 className="text-sm font-semibold mb-4">Default Selections</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Fabric</label>
              <select value={formData.default_fabric} onChange={(e) => setFormData({ ...formData, default_fabric: e.target.value })} className="w-full border border-neutral-300 p-2 rounded">
                <option value="premium-wool">Premium Wool</option>
                <option value="super-120s">Super 120s</option>
                <option value="super-130s">Super 130s</option>
                <option value="linen">Linen</option>
                <option value="wool-blend">Wool Blend</option>
                <option value="seasonal">Seasonal Fabrics</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Lapel</label>
              <select value={formData.default_lapel} onChange={(e) => setFormData({ ...formData, default_lapel: e.target.value })} className="w-full border border-neutral-300 p-2 rounded">
                <option value="notch">Notch</option>
                <option value="peak">Peak</option>
                <option value="shawl">Shawl</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Buttons</label>
              <select value={formData.default_buttons} onChange={(e) => setFormData({ ...formData, default_buttons: e.target.value })} className="w-full border border-neutral-300 p-2 rounded">
                <option value="1-button">1 Button</option>
                <option value="2-button">2 Button</option>
                <option value="3-button">3 Button</option>
                <option value="double-breasted">Double Breasted</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Sleeve</label>
              <select value={formData.default_sleeve} onChange={(e) => setFormData({ ...formData, default_sleeve: e.target.value })} className="w-full border border-neutral-300 p-2 rounded">
                <option value="1-sleeve">1 Sleeve</option>
                <option value="2-sleeve">2 Sleeve</option>
                <option value="3-sleeve">3 Sleeve</option>
                <option value="4-sleeve">4 Sleeve</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Fit</label>
              <select value={formData.default_fit} onChange={(e) => setFormData({ ...formData, default_fit: e.target.value })} className="w-full border border-neutral-300 p-2 rounded">
                <option value="slim">Slim</option>
                <option value="modern">Modern</option>
                <option value="regular">Regular</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Lining</label>
              <select value={formData.default_lining} onChange={(e) => setFormData({ ...formData, default_lining: e.target.value })} className="w-full border border-neutral-300 p-2 rounded">
                <option value="navy">Navy</option>
                <option value="black">Black</option>
                <option value="burgundy">Burgundy</option>
                <option value="grey">Grey</option>
                <option value="cream">Cream</option>
                <option value="royal-blue">Royal Blue</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-neutral-900 text-white py-4 rounded-lg font-semibold hover:bg-amber-600 transition disabled:opacity-50">
          {loading ? "Saving..." : "Save Model"}
        </button>
      </form>
    </div>
  );
}