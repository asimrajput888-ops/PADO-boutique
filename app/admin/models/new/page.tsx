// app/admin/models/new/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

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
    setLoading(true);

    if (!imageUrl) {
      alert("Please upload a model image");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("models").insert({
      name,
      price: Number(price),
      description,
      category,
      product_type: productType,
      image_url: imageUrl,
    });

    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    router.push("/admin/models");
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/models"
          className="text-sm text-neutral-500 hover:text-neutral-900"
        >
          ← Back to Models
        </Link>
        <h1 className="text-3xl font-serif mt-4 mb-1">Add New Model</h1>
        <p className="text-neutral-500 text-sm">
          Create a new customizer model.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
            Model Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. The Navy Windowpane Blazer"
            className="w-full border border-neutral-300 p-3 focus:border-neutral-900 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
            Price (USD)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="350"
            className="w-full border border-neutral-300 p-3 focus:border-neutral-900 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-neutral-300 p-3 focus:border-neutral-900 outline-none"
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
              Product Type
            </label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full border border-neutral-300 p-3 focus:border-neutral-900 outline-none"
            >
              {PRODUCT_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            placeholder="Premium navy wool-blend blazer with subtle windowpane check..."
            className="w-full border border-neutral-300 p-3 focus:border-neutral-900 outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
            Model Image
          </label>

          <div className="flex gap-3 items-start">
            {imageUrl && (
              <div className="w-24 h-32 bg-neutral-100 overflow-hidden flex-shrink-0">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex-1">
              <label className="cursor-pointer block border border-neutral-300 p-3 text-center text-xs uppercase tracking-widest hover:border-neutral-900 transition">
                {uploading ? "Uploading..." : imageUrl ? "Change Image" : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
              <p className="text-xs text-neutral-400 mt-2">
                PNG or JPG. Recommended: transparent or white background, portrait orientation.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-200">
          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full bg-neutral-900 text-white py-4 font-medium hover:bg-neutral-700 transition disabled:opacity-50 uppercase tracking-widest text-xs"
          >
            {loading ? "Saving..." : uploading ? "Uploading..." : "Save Model"}
          </button>
        </div>

      </form>
    </div>
  );
}
