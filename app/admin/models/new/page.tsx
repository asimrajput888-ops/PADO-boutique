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

const SUBCATEGORIES = [
  { id: "", name: "— None —" },
  { id: "halloween", name: "Halloween" },
  { id: "superhero", name: "Superhero" },
  { id: "gothic", name: "Gothic" },
  { id: "movie", name: "Movie-Inspired" },
  { id: "party", name: "Party & Events" },
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
  const [subcategory, setSubcategory] = useState("");

  // 8 image slots
  const [imageUrls, setImageUrls] = useState<string[]>([
    "", "", "", "", "", "", "", "",
  ]);

  const updateImage = (index: number, url: string) => {
    const updated = [...imageUrls];
    updated[index] = url;
    setImageUrls(updated);
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `model-${Date.now()}-${index}.${fileExt}`;

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

    updateImage(index, data.publicUrl);
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || uploading) return;

    // Validate at least 1 image
    const cleanImages = imageUrls.filter((url) => url.trim() !== "");
    if (cleanImages.length === 0) {
      alert("Please upload at least 1 image");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("models").insert({
        name,
        price: Number(price),
        description,
        category,
        product_type: productType,
        subcategory: subcategory || null,
        image_url: cleanImages[0], // main listing image
        images: cleanImages, // all images array
      });

      if (error) throw new Error(error.message);

      router.push("/admin/models");
    } catch (err: any) {
      alert("Error: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl">
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
          Create a new customizer model with up to 8 gallery images.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Name */}
        <div>
          <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 font-medium">
            Model Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. The Muerto — Day of the Dead Suit (Men)"
            className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 font-medium">
            Base Price (USD) *
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="550"
            className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm"
          />
          <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
            Base price before customizations.
          </p>
        </div>

        {/* Category + Product Type + Subcategory */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 font-medium">
              Category *
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
              Product Type *
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

          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 font-medium">
              Subcategory
            </label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm bg-white"
            >
              {SUBCATEGORIES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
              For seasonal collection (Halloween, Superhero, etc.)
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 font-medium">
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={6}
            placeholder="Hand-embroidered Day of the Dead inspired tuxedo suit. Black wool-blend fabric with red rose, gold vine, and skull embroidery."
            className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none resize-none text-sm"
          />
        </div>

        {/* Images — 8 slots */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-medium">
              Gallery Images
            </label>
            <p className="text-[10px] tracking-widest uppercase text-neutral-400">
              {imageUrls.filter((u) => u).length} / 8 added
            </p>
          </div>
          <p className="text-[11px] text-neutral-400 mb-6 leading-relaxed">
            First image = main listing thumbnail. Add up to 8 images for the gallery.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {imageUrls.map((url, i) => (
              <div key={i} className="border border-neutral-200 p-3">
                {/* Image slot number */}
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">
                  Image {i + 1}
                  {i === 0 && " · Main"}
                </p>

                {/* Preview */}
                <div className="relative aspect-[3/4] bg-neutral-100 mb-3 overflow-hidden">
                  {url ? (
                    <>
                      <img
                        src={url}
                        alt={`Image ${i + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => updateImage(i, "")}
                        className="absolute top-2 right-2 w-6 h-6 bg-white/90 text-neutral-900 text-xs hover:bg-red-500 hover:text-white transition"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <label className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-neutral-50 transition">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-400 text-center px-2">
                        {uploading
                          ? "Uploading..."
                          : "+ Upload"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, i)}
                        disabled={uploading}
                      />
                    </label>
                  )}
                </div>

                {/* Replace button */}
                {url && (
                  <label className="block cursor-pointer border border-neutral-300 text-center py-2 text-[10px] uppercase tracking-widest hover:border-neutral-900 transition">
                    Change
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, i)}
                      disabled={uploading}
                    />
                  </label>
                )}
              </div>
            ))}
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
