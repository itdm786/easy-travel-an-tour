"use client";

import { useState } from "react";
import { Copy, Plus, Trash2, X } from "lucide-react";

type MediaAsset = {
  id: number;
  title: string;
  url: string;
  category: string;
  createdAt: string | null;
};

export function MediaManager({
  initialAssets,
  category,
  emptyMessage,
}: {
  initialAssets: MediaAsset[];
  category: string;
  emptyMessage: string;
}) {
  const [assets, setAssets] = useState(initialAssets);
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ title: "", url: "" });

  const addAsset = async () => {
    if (!form.title.trim() || !form.url.trim()) {
      setNotice("Title aur image URL dono zaroori hain.");
      return;
    }

    const response = await fetch("/api/admin/media", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, category }),
    });
    const result = await response.json();

    if (response.ok) {
      setAssets((current) => [result.media, ...current]);
      setForm({ title: "", url: "" });
      setShowForm(false);
      setNotice("Image add ho gayi.");
    } else {
      setNotice(result.error || "Unable to add image.");
    }
  };

  const removeAsset = async (id: number) => {
    const response = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });

    if (response.ok) {
      setAssets((current) => current.filter((asset) => asset.id !== id));
      setNotice("Image deleted.");
    } else {
      const result = await response.json();
      setNotice(result.error || "Unable to delete image.");
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setNotice("URL copy ho gaya clipboard mein.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/50">Total items: {assets.length}</p>
        <button
          onClick={() => setShowForm((current) => !current)}
          className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-accent/90"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Image URL"}
        </button>
      </div>

      {notice && <div className="rounded-2xl border border-accent/20 bg-accent/10 px-5 py-3 text-sm text-accent">{notice}</div>}

      {showForm && (
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:grid-cols-2">
          <input
            placeholder="Title / label"
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30"
          />
          <input
            placeholder="Image URL (https://...)"
            value={form.url}
            onChange={(event) => setForm({ ...form, url: event.target.value })}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30"
          />
          <p className="text-xs text-white/40 md:col-span-2">
            Tip: apni image kisi free image host (jese Imgur, Cloudinary, ya Pexels/Unsplash link) par upload kar ke uska URL yahan paste karein.
          </p>
          <button
            onClick={addAsset}
            className="rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-primary transition-all hover:bg-accent/90 md:col-span-2"
          >
            Save
          </button>
        </div>
      )}

      {assets.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center text-sm text-white/50">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {assets.map((asset) => (
            <div key={asset.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="aspect-square w-full overflow-hidden bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset.url} alt={asset.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-3">
                <p className="truncate text-xs font-medium text-white">{asset.title}</p>
              </div>
              <div className="absolute inset-x-0 top-0 flex justify-end gap-2 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => copyUrl(asset.url)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-sm hover:bg-black/80"
                  title="Copy URL"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => removeAsset(asset.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 text-red-400 backdrop-blur-sm hover:bg-black/80"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
