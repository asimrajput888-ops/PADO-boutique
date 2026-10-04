// app/admin/models/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminModelsPage() {
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchModels = async () => {
    const { data } = await supabase
      .from("models")
      .select("*")
      .order("created_at", { ascending: false });
    setModels(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this model?")) return;
    await supabase.from("models").delete().eq("id", id);
    fetchModels();
  };

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-2">
            Manage
          </p>
          <h1 className="text-3xl font-serif text-neutral-900 mb-1">Models</h1>
          <p className="text-neutral-500 text-sm">
            {models.length} {models.length === 1 ? "model" : "models"} total
          </p>
        </div>
        <Link
          href="/admin/models/new"
          className="bg-neutral-900 text-white px-6 py-3 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition"
        >
          + Add Model
        </Link>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-neutral-400 text-sm">Loading...</p>
      ) : models.length === 0 ? (
        <div className="border border-neutral-200 p-16 text-center">
          <p className="text-neutral-400 text-sm mb-4">
            No models yet. Add your first customizer model.
          </p>
          <Link
            href="/admin/models/new"
            className="inline-block bg-neutral-900 text-white px-6 py-3 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition"
          >
            + Add Model
          </Link>
        </div>
      ) : (
        <div className="border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left p-4 text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                    Image
                  </th>
                  <th className="text-left p-4 text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                    Name
                  </th>
                  <th className="text-left p-4 text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                    Category
                  </th>
                  <th className="text-left p-4 text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                    Type
                  </th>
                  <th className="text-left p-4 text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                    Price
                  </th>
                  <th className="text-left p-4 text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr
                    key={model.id}
                    className="border-t border-neutral-100 hover:bg-neutral-50"
                  >
                    <td className="p-4">
                      <div className="w-14 h-16 bg-neutral-100 overflow-hidden">
                        {model.image_url ? (
                          <img
                            src={model.image_url}
                            alt={model.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-300 text-[9px] uppercase">
                            No img
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-neutral-900">
                      {model.name}
                    </td>
                    <td className="p-4 text-neutral-600 capitalize text-sm">
                      {model.category || "—"}
                    </td>
                    <td className="p-4 text-neutral-600 capitalize text-sm">
                      {model.product_type || "—"}
                    </td>
                    <td className="p-4 text-sm font-medium">
                      ${Number(model.price || 0).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-3">
                        <Link
                          href={`/custom/${
                            model.category === "women" ? "women" : "men"
                          }/${model.id}`}
                          target="_blank"
                          className="text-amber-600 hover:underline text-xs"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(model.id)}
                          className="text-red-500 hover:underline text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
