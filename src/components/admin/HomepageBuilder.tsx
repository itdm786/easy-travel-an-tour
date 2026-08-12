"use client";

import { useState } from "react";
import { Save } from "lucide-react";

type HomepageSettings = {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroCtaLabel: string;
  heroCtaLink: string;
};

export function HomepageBuilder({ initialSettings }: { initialSettings: HomepageSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const response = await fetch("/api/admin/homepage", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const result = await response.json();
    setSaving(false);

    if (response.ok) {
      setSettings(result.settings);
      setNotice("Homepage settings save ho gaye.");
    } else {
      setNotice(result.error || "Unable to save homepage settings.");
    }
  };

  return (
    <div className="space-y-6">
      {notice && <div className="rounded-2xl border border-accent/20 bg-accent/10 px-5 py-3 text-sm text-accent">{notice}</div>}

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
        <h3 className="mb-4 font-display text-lg font-bold text-white">Hero Section</h3>
        <div className="grid gap-4">
          <div>
            <label className="mb-1 block text-xs text-white/40">Hero Title</label>
            <input
              value={settings.heroTitle}
              onChange={(event) => setSettings({ ...settings, heroTitle: event.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/40">Hero Subtitle</label>
            <textarea
              value={settings.heroSubtitle}
              onChange={(event) => setSettings({ ...settings, heroSubtitle: event.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30"
              rows={2}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/40">Hero Background Image URL</label>
            <input
              value={settings.heroImage}
              onChange={(event) => setSettings({ ...settings, heroImage: event.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30"
              placeholder="https://..."
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-white/40">Button Label</label>
              <input
                value={settings.heroCtaLabel}
                onChange={(event) => setSettings({ ...settings, heroCtaLabel: event.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/40">Button Link</label>
              <input
                value={settings.heroCtaLink}
                onChange={(event) => setSettings({ ...settings, heroCtaLink: event.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30"
                placeholder="/holiday-packages"
              />
            </div>
          </div>
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="mt-6 flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-primary transition-all hover:bg-accent/90 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Homepage Settings"}
        </button>
      </div>
    </div>
  );
}
