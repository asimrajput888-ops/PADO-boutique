// app/admin/products/new/page.tsx

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "men",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";

    // Upload Image
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, imageFile);

      if (uploadError) {
        alert("Image upload failed: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    }

    // Insert Product
    const { error } = await supabase.from("products").insert({
      name: formData.name,
      price: parseInt(formData.price),
      category: formData.category,
      description: formData.description,
      image_url: imageUrl,
    });

    if (error) {
      alert("Error: " + error.message);
      setLoading(false);
    } else {
      router.push("/admin/products");
    }
  };

  return (
    <div className="p-10 max-w-2xl">
      <Link href="/admin/products" className="text-sm text-neutral-500 hover:text-amber-600 mb-6 inline-block">
        ← Back to Products
      </Link>

      <h1 className="text-3xl font-serif mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-neutral-200 p-8 rounded-lg">
        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Product Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-neutral-300 p-3 rounded-lg focus:border-amber-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Price (PKR)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full border border-neutral-300 p-3 rounded-lg focus:border-amber-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border border-neutral-300 p-3 rounded-lg focus:border-amber-500 outline-none"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="custom">Custom</option>
            <option value="signature">Signature Suit</option>
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full border border-neutral-300 p-3 rounded-lg focus:border-amber-500 outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full border border-neutral-300 p-3 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-neutral-900 text-white py-4 rounded-lg font-semibold hover:bg-amber-600 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}
