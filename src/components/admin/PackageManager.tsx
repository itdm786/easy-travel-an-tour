"use client";

import { useMemo, useState } from "react";
import { Clock, Edit3, MapPin, Plus, Save, Star, Trash2, X } from "lucide-react";
import { formatPrice, slugify } from "@/lib/utils";

type AdminPackage = {
  id: number;
  title: string;
  slug: string;
  category: string;
  destination: string;
  duration: string;
  price: number;
  originalPrice: number | null;
  image: string;
  featured: boolean | null;
  rating: string | null;
  reviews: number | null;
  description: string;
  highlights: string[] | unknown;
  inclusions: string[] | unknown;
  exclusions: string[] | unknown;
};

type PackageForm = {
  id?: number;
  title: string;
  slug: string;
  category: string;
  destination: string;
  duration: string;
  price: string;
  originalPrice: string;
  image: string;
  featured: boolean;
  rating: string;
  reviews: string;
  description: string;
  highlights: string;
  inclusions: string;
  exclusions: string;
};

const emptyForm: PackageForm = {
  title: "",
  slug: "",
  category: "international",
  destination: "",
  duration: "",
  price: "0",
  originalPrice: "",
  image: "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg",
  featured: false,
  rating: "4.8",
  reviews: "0",
  description: "",
  highlights: "",
  inclusions: "",
  exclusions: "",
};

function asLines(value: unknown) {
  return Array.isArray(value) ? value.join("\n") : "";
}

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function toForm(pkg: AdminPackage): PackageForm {
  return {
    id: pkg.id,
    title: pkg.title,
    slug: pkg.slug,
    category: pkg.category,
    destination: pkg.destination,
    duration: pkg.duration,
    price: String(pkg.price),
    originalPrice: pkg.originalPrice ? String(pkg.originalPrice) : "",
    image: pkg.image,
    featured: Boolean(pkg.featured),
    rating: String(pkg.rating || "4.8"),
    reviews: String(pkg.reviews || 0),
    description: pkg.description,
    highlights: asLines(pkg.highlights),
    inclusions: asLines(pkg.inclusions),
    exclusions: asLines(pkg.exclusions),
  };
}

export function PackageManager({ initialPackages }: { initialPackages: AdminPackage[] }) {
  const [packages, setPackages] = useState(initialPackages);
  const [form, setForm] = useState<PackageForm>(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const matchesCategory = category === "All" || pkg.category === category.toLowerCase();
      const matchesQuery =
        pkg.title.toLowerCase().includes(query.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [packages, category, query]);

  const savePackage = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      rating: form.rating,
      reviews: Number(form.reviews),
      highlights: linesToArray(form.highlights),
      inclusions: linesToArray(form.inclusions),
      exclusions: linesToArray(form.exclusions),
    };

    const url = form.id ? `/api/admin/packages/${form.id}` : "/api/admin/packages";
    const method = form.id ? "PATCH" : "POST";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error || "Unable to save package");
      setSaving(false);
      return;
    }

    const saved = result.package as AdminPackage;
    setPackages((current) =>
      form.id ? current.map((pkg) => (pkg.id === saved.id ? saved : pkg)) : [saved, ...current]
    );
    setForm(emptyForm);
    setIsEditing(false);
    setMessage("Package saved successfully.");
    setSaving(false);
  };

  const deletePackage = async (id: number) => {
    if (!confirm("Delete this package?")) return;
    const response = await fetch(`/api/admin/packages/${id}`, { method: "DELETE" });
    if (response.ok) {
      setPackages((current) => current.filter((pkg) => pkg.id !== id));
      setMessage("Package deleted successfully.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-2">
          {["All", "International", "Domestic", "Umrah", "Hajj", "Honeymoon", "Group"].map((filter) => (
            <button
              key={filter}
              onClick={() => setCategory(filter)}
              className={`rounded-full border px-4 py-2 text-sm transition-all ${
                category === filter
                  ? "border-accent bg-accent text-primary"
                  : "border-white/10 bg-white/[0.04] text-white/60 hover:border-accent/40 hover:text-accent"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search packages..."
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-accent"
          />
          <button
            onClick={() => {
              setForm(emptyForm);
              setIsEditing(true);
            }}
            className="flex items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-primary transition-all hover:bg-accent-light"
          >
            <Plus className="h-4 w-4" /> Add Package
          </button>
        </div>
      </div>

      {message && (
        <div className="rounded-2xl border border-accent/20 bg-accent/10 px-5 py-3 text-sm text-accent">
          {message}
        </div>
      )}

      {isEditing && (
        <form onSubmit={savePackage} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold">{form.id ? "Edit Package" : "Add Package"}</h2>
              <p className="text-sm text-white/45">All package fields are editable and saved to the database.</p>
            </div>
            <button type="button" onClick={() => setIsEditing(false)} className="rounded-xl border border-white/10 p-2 text-white/60 hover:text-accent">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Field label="Title" value={form.title} onChange={(value) => setForm({ ...form, title: value, slug: form.slug || slugify(value) })} required />
            <Field label="Slug" value={form.slug} onChange={(value) => setForm({ ...form, slug: slugify(value) })} />
            <SelectField label="Category" value={form.category} onChange={(value) => setForm({ ...form, category: value })} options={["international", "domestic", "umrah", "hajj", "honeymoon", "group", "corporate"]} />
            <Field label="Destination" value={form.destination} onChange={(value) => setForm({ ...form, destination: value })} required />
            <Field label="Duration" value={form.duration} onChange={(value) => setForm({ ...form, duration: value })} required />
            <Field label="Price" type="number" value={form.price} onChange={(value) => setForm({ ...form, price: value })} required />
            <Field label="Original Price" type="number" value={form.originalPrice} onChange={(value) => setForm({ ...form, originalPrice: value })} />
            <Field label="Rating" value={form.rating} onChange={(value) => setForm({ ...form, rating: value })} />
            <Field label="Reviews" type="number" value={form.reviews} onChange={(value) => setForm({ ...form, reviews: value })} />
            <Field label="Image URL" value={form.image} onChange={(value) => setForm({ ...form, image: value })} className="xl:col-span-3" />
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <TextArea label="Description" value={form.description} onChange={(value) => setForm({ ...form, description: value })} />
            <TextArea label="Highlights (one per line)" value={form.highlights} onChange={(value) => setForm({ ...form, highlights: value })} />
            <TextArea label="Inclusions (one per line)" value={form.inclusions} onChange={(value) => setForm({ ...form, inclusions: value })} />
            <TextArea label="Exclusions (one per line)" value={form.exclusions} onChange={(value) => setForm({ ...form, exclusions: value })} />
          </div>

          <label className="mt-4 flex items-center gap-3 text-sm text-white/70">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) => setForm({ ...form, featured: event.target.checked })}
              className="h-4 w-4 accent-accent"
            />
            Featured on homepage / top selling section
          </label>

          <button disabled={saving} className="mt-6 flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 font-semibold text-primary disabled:opacity-60">
            <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Package"}
          </button>
        </form>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all hover:border-accent/40">
            <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${pkg.image})` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">
                {pkg.category}
              </span>
            </div>
            <div className="p-5">
              <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-white/45">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-accent" /> {pkg.destination}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-accent" /> {pkg.duration}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-white">{pkg.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-white/45">{pkg.description}</p>
              <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs text-white/40">Starting price</p>
                  <p className="font-display text-2xl font-bold text-accent">{formatPrice(pkg.price)}</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-white/60">
                  <Star className="h-4 w-4 fill-accent text-accent" /> {pkg.rating}
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button onClick={() => { setForm(toForm(pkg)); setIsEditing(true); }} className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-accent hover:text-primary">
                  <Edit3 className="h-4 w-4" /> Edit
                </button>
                <button onClick={() => deletePackage(pkg.id)} className="flex items-center justify-center gap-2 rounded-xl border border-red-400/20 px-4 py-2 text-sm text-red-200 transition-all hover:bg-red-500 hover:text-white">
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required, className = "" }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; className?: string }) {
  return (
    <label className={className}>
      <span className="mb-2 block text-xs font-semibold tracking-[0.15em] text-white/40 uppercase">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-accent" />
    </label>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label>
      <span className="mb-2 block text-xs font-semibold tracking-[0.15em] text-white/40 uppercase">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#0b1f3a] px-4 py-3 text-sm text-white outline-none focus:border-accent">
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label>
      <span className="mb-2 block text-xs font-semibold tracking-[0.15em] text-white/40 uppercase">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={5} className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-accent" />
    </label>
  );
}
