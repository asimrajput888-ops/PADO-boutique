// app/admin/models/page.tsx

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminModels() {
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchModels = async () => {
    const { data } = await supabase.from("models").select("*").order("created_at", { ascending: false });
    setModels(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this model?")) {
      await supabase.from("models").delete().eq("id", id);
      fetchModels();
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif mb-1">Models</h1>
          <p className="text-neutral-500 text-sm">{models.length} models total</p>
        </div>
        <Link href="/admin/models/new" className="bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition text-sm">
          + Add Model
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
                <th className="text-left p-4 text-xs uppercase tracking-widest text-neutral-500">Price</th>
                <th className="text-left p-4 text-xs uppercase tracking-widest text-neutral-500">Lapel</th>
                <th className="text-left p-4 text-xs uppercase tracking-widest text-neutral-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.id} className="border-t border-neutral-100">
                  <td className="p-4">
                    {m.image_url && <img src={m.image_url} alt={m.name} className="w-14 h-14 object-cover rounded" />}
                  </td>
                  <td className="p-4 font-medium text-sm">{m.name}</td>
                  <td className="p-4 text-sm">Rs. {m.price?.toLocaleString()}</td>
                  <td className="p-4 text-sm capitalize">{m.default_lapel || "-"}</td>
                  <td className="p-4 space-x-3">
                    <Link href={`/admin/models/edit/${m.id}`} className="text-amber-600 hover:underline text-sm">Edit</Link>
                    <button onClick={() => handleDelete(m.id)} className="text-red-500 hover:underline text-sm">Delete</button>
                  </td>
                </tr>
              ))}
              {models.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-neutral-400">
                    No models yet. Click "Add Model" to start.
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