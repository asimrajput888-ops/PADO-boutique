// app/admin/products/page.tsx

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await supabase.from("products").delete().eq("id", id);
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif mb-1">Products</h1>
          <p className="text-neutral-500 text-sm">{products.length} products total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition text-sm"
        >
          + Add Product
        </Link>
      </div>

      {loading ? (
        <p className="text-neutral-400">Loading...</p>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left p-4 text-xs uppercase tracking-widest text-neutral-500">Image</th>
                <th className="text-left p-4 text-xs uppercase tracking-widest text-neutral-500">Name</th>
                <th className="text-left p-4 text-xs uppercase tracking-widest text-neutral-500">Category</th>
                <th className="text-left p-4 text-xs uppercase tracking-widest text-neutral-500">Price</th>
                <th className="text-left p-4 text-xs uppercase tracking-widest text-neutral-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-neutral-100">
                  <td className="p-4">
                    <img src={product.image_url} alt={product.name} className="w-14 h-14 object-cover rounded" />
                  </td>
                  <td className="p-4 font-medium text-sm">{product.name}</td>
                  <td className="p-4 text-neutral-500 text-sm capitalize">{product.category}</td>
                  <td className="p-4 text-sm">Rs. {product.price.toLocaleString()}</td>
                  <td className="p-4 space-x-3">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="text-amber-600 hover:underline text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-neutral-400">
                    No products yet. Click "Add Product" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
