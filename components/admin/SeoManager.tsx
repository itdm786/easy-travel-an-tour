"use client";

import { useState } from "react";
import { Save } from "lucide-react";

type SeoPage = {
  id: number;
  pageKey: string;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogImage: string | null;
  updatedAt: string | null;
};

const PAGE_LABELS: Record<string, string> = {
  home: "Homepage",
  packages: "Holiday Packages",
  destinations: "Destinations",
  blog: "Blog",
  contact: "Contact",
  about: "About Us",
};

export function SeoManager({ initialPages }: { initialPages: SeoPage[] }) {
  const [pages, setPages] = useState(initialPages);
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState<string | null>(null);

  const updateField = (pageKey: string, field: keyof SeoPage, value: string) => {
    setPages((current) =>
      current.map((page) => (page.pageKey === pageKey ? { ...page, [field]: value } : page))
    );
  };

  const savePage = async (pageKey: string) => {
    const page = pages.find((item) => item.pageKey === pageKey);
    if (!page) return;

    setSaving(pageKey);
    const response = await fetch(`/api/admin/seo/${pageKey}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        metaKeywords: page.metaKeywords,
        ogImage: page.ogImage,
      }),
    });
    const result = await response.json();
    setSaving(null);

    if (response.ok) {
      setNotice(`${PAGE_LABELS[pageKey] || pageKey} ke SEO settings save ho gaye.`);
    } else {
      setNotice(result.error || "Unable to save SEO settings.");
    }
  };

  return (
    <div className="space-y-6">
      {notice && <div className="rounded-2xl border border-accent/20 bg-accent/10 px-5 py-3 text-sm text-accent">{notice}</div>}

      <div className="grid gap-4">
        {pages.map((page) => (
          <div key={page.pageKey} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-white">{PAGE_LABELS[page.pageKey] || page.pageKey}</h3>
              <button
                onClick={() => savePage(page.pageKey)}
                disabled={saving === page.pageKey}
                className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-accent/90 disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5" />
                {saving === page.pageKey ? "Saving..." : "Save"}
              </button>
            </div>

            <div className="grid gap-3">
              <div>
                <label className="mb-1 block text-xs text-white/40">Meta Title</label>
                <input
                  value={page.metaTitle || ""}
                  onChange={(event) => updateField(page.pageKey, "metaTitle", event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30"
                  placeholder="e.g. Best Umrah Packages in Pakistan | Easy Travel"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/40">Meta Description</label>
                <textarea
                  value={page.metaDescription || ""}
                  onChange={(event) => updateField(page.pageKey, "metaDescription", event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30"
                  rows={2}
                  placeholder="Short, keyword-rich description shown in Google search results"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-white/40">Meta Keywords</label>
                  <input
                    value={page.metaKeywords || ""}
                    onChange={(event) => updateField(page.pageKey, "metaKeywords", event.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30"
                    placeholder="umrah packages, travel agency pakistan"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-white/40">Social Share Image URL</label>
                  <input
                    value={page.ogImage || ""}
                    onChange={(event) => updateField(page.pageKey, "ogImage", event.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
