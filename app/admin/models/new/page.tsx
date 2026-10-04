// app/admin/models/new/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const PRODUCT_TYPES = [
  { id: "suit", name: "Suit" },
  { id: "blazer", name: "Blazer" },
  { id: "coat", name: "Coat" },
  { id: "tuxedo", name: "Tuxedo" },
  { id: "shirt", name: "Shirt" },
  { id: "vest", name: "Vest" },
  { id: "trouser", name: "Trouser" },
];

export default function NewModelPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("men");
  const [productType, setProductType] = useState("suit");
  const [imageUrl, setImageUrl] = useState("");

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `model-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, file);

    if (uploadError) {
      alert("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    setImageUrl(data.publicUrl);
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || uploading) return;
    setLoading(true);

    try {
      if (!imageUrl) {
        throw new Error("Please upload a model image");
      }

      const { error } = await supabase.from("models").insert({
        name,
        price: Number(price),
        description,
        category,
        product_type: productType,
        image_url: imageUrl,
      });

      if (error) throw new Error(error.message);

      router.push("/admin/models");
    } catch (err: any) {
      alert("Error: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/admin/models"
          className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 inline-block mb-4 transition"
        >
          ← Back to Models
        </Link>
        <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-2">
          Create New
        </p>
        <h1 className="text-3xl font-serif text-neutral-900 mb-2">
          Add Model
        </h1>
        <p className="text-neutral-500 text-sm">
          Create a new customizer model for your collection.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Name */}
        <div>
          <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 font-medium">
            Model Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. The Onyx — Black Tailored Suit"
            className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 font-medium">
            Base Price (USD)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="450"
            className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm"
          />
          <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
            Base price before customizations. Custom options will add to this.
          </p>
        </div>

        {/* Category + Product Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 font-medium">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm bg-white"
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 font-medium">
              Product Type
            </label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm bg-white"
            >
              {PRODUCT_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 font-medium">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            placeholder="Premium black wool-blend suit, single-breasted two-button jacket, notch lapel, tapered trouser. Custom made to your measurements."
            className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none resize-none text-sm"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 font-medium">
            Model Image
          </label>

          <div className="flex gap-5 items-start">
            {/* Preview */}
            {imageUrl ? (
              <div className="w-32 h-40 bg-neutral-100 overflow-hidden border border-neutral-200 flex-shrink-0">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-40 bg-neutral-50 border border-dashed border-neutral-200 flex items-center justify-center flex-shrink-0">
                <span className="text-[9px] uppercase tracking-widest text-neutral-400 text-center px-2">
                  No Image
                </span>
              </div>
            )}

            {/* Upload button */}
            <div className="flex-1">
              <label className="cursor-pointer block border border-neutral-300 px-6 py-4 text-center text-[11px] uppercase tracking-[0.3em] font-medium hover:border-neutral-900 transition">
                {uploading
                  ? "Uploading..."
                  : imageUrl
                  ? "Change Image"
                  : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
              <p className="text-[11px] text-neutral-400 mt-3 leading-relaxed">
                PNG or JPG · Recommended 1200×1600px · Portrait orientation · Clean background
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-8 border-t border-neutral-200">
          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full bg-neutral-900 text-white py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : uploading
              ? "Uploading..."
              : "Save Model"}
          </button>
        </div>

      </form>
    </div>
  );
}
