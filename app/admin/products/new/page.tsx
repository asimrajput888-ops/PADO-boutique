// app/admin/products/new/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("men");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([""]);

  const addImageField = () => {
    if (imageUrls.length < 8) setImageUrls([...imageUrls, ""]);
  };

  const updateImage = (index: number, value: string) => {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
  };

  const removeImage = (index: number) => {
    if (imageUrls.length === 1) return;
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${index}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file);

    if (uploadError) {
      alert("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    updateImage(index, data.publicUrl);
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const cleanImages = imageUrls.filter((url) => url.trim() !== "");

    if (cleanImages.length === 0) {
      alert("Please add at least one image");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("products").insert({
      name,
      price: Number(price),
      category,
      description,
      image_url: cleanImages[0],
      images: cleanImages,
    });

    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    router.push("/admin/products");
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/products" className="text-sm text-neutral-500 hover:text-amber-600">
          ← Back to Products
        </Link>
        <h1 className="text-3xl font-serif mt-4 mb-1">Add New Product</h1>
        <p className="text-neutral-500 text-sm">Fill in the details and add up to 8 images.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. The Navy Wool Suit — Women's 40R"
            className="w-full border border-neutral-300 p-3 rounded-lg focus:border-amber-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Price (USD)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="300"
            className="w-full border border-neutral-300 p-3 rounded-lg focus:border-amber-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-neutral-300 p-3 rounded-lg focus:border-amber-500 outline-none"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="signature">Signature (Ready to Wear)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={6}
            placeholder="Premium navy wool-blend two-piece suit..."
            className="w-full border border-neutral-300 p-3 rounded-lg focus:border-amber-500 outline-none resize-none"
          />
        </div>

        {/* IMAGES — 8 fields */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
            Images ({imageUrls.filter(u => u).length} added)
          </label>
          <p className="text-xs text-neutral-400 mb-4">
            First image will be the main listing image. Add up to 8 images.
          </p>

          <div className="space-y-3">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex gap-2 items-start">
                {url && (
                  <div className="w-16 h-20 bg-neutral-100 rounded overflow-hidden flex-shrink-0">
                    <img src={url} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                )}
                <input
                  type="text"
                  value={url}
                  onChange={(e) => updateImage(index, e.target.value)}
                  placeholder={`Image ${index + 1} URL`}
                  className="flex-1 border border-neutral-300 p-3 rounded-lg focus:border-amber-500 outline-none text-sm"
                />
                <label className="cursor-pointer border border-neutral-300 px-4 py-3 rounded-lg hover:border-amber-500 transition text-xs uppercase tracking-widest whitespace-nowrap">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, index)}
                  />
                </label>
                {imageUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="border border-red-200 text-red-500 px-3 py-3 rounded-lg hover:bg-red-50 transition"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {imageUrls.length < 8 && (
            <button
              type="button"
              onClick={addImageField}
              className="mt-4 text-sm text-amber-600 hover:text-amber-700 underline"
            >
              + Add another image ({imageUrls.length}/8)
            </button>
          )}
        </div>

        <div className="pt-6 border-t border-neutral-200">
          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full bg-neutral-900 text-white py-4 rounded-lg font-medium hover:bg-neutral-800 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : uploading ? "Uploading..." : "Add Product"}
          </button>
        </div>

      </form>
    </div>
  );
}
