"use client";

import { useState } from "react";
import { Edit3, MapPin, Plus, Save, Star, Trash2, X } from "lucide-react";

type DestinationRow = {
  id: number;
  name: string;
  country: string;
  image: string;
  description: string;
  rating: string | null;
  packages: number | null;
};

type DestinationForm = {
  id?: number;
  name: string;
  country: string;
  image: string;
  description: string;
  rating: string;
  packages: string;
};

const emptyForm: DestinationForm = {
  name: "",
  country: "",
  image: "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg",
  description: "",
  rating: "4.8",
  packages: "0",
};

function toForm(destination: DestinationRow): DestinationForm {
  return {
    id: destination.id,
    name: destination.name,
    country: destination.country,
    image: destination.image,
    description: destination.description,
    rating: destination.rating || "4.8",
    packages: String(destination.packages || 0),
  };
}

export function DestinationManager({ initialDestinations }: { initialDestinations: DestinationRow[] }) {
  const [destinations, setDestinations] = useState(initialDestinations);
  const [form, setForm] = useState<DestinationForm>(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const saveDestination = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const payload = { ...form, packages: Number(form.packages) };
    const url = form.id ? `/api/admin/destinations/${form.id}` : "/api/admin/destinations";
    const method = form.id ? "PATCH" : "POST";
    const response = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error || "Unable to save destination");
      setSaving(false);
      return;
    }

    const saved = result.destination as DestinationRow;
    setDestinations((current) => form.id ? current.map((item) => item.id === saved.id ? saved : item) : [saved, ...current]);
    setForm(emptyForm);
    setIsEditing(false);
    setMessage("Destination saved successfully.");
    setSaving(false);
  };

  const deleteDestination = async (id: number) => {
    if (!confirm("Delete this destination?")) return;
    const response = await fetch(`/api/admin/destinations/${id}`, { method: "DELETE" });
    if (response.ok) {
      setDestinations((current) => current.filter((destination) => destination.id !== id));
      setMessage("Destination deleted successfully.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold">Destination Content</h2>
          <p className="text-sm text-white/45">Edit destination titles, images, descriptions, package counts, and ratings.</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setIsEditing(true); }} className="flex items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-primary hover:bg-accent-light">
          <Plus className="h-4 w-4" /> Add Destination
        </button>
      </div>

      {message && <div className="rounded-2xl border border-accent/20 bg-accent/10 px-5 py-3 text-sm text-accent">{message}</div>}

      {isEditing && (
        <form onSubmit={saveDestination} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-bold">{form.id ? "Edit Destination" : "Add Destination"}</h3>
              <p className="text-sm text-white/45">Destination page data is saved in PostgreSQL.</p>
            </div>
            <button type="button" onClick={() => setIsEditing(false)} className="rounded-xl border border-white/10 p-2 text-white/60 hover:text-accent"><X className="h-5 w-5" /></button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Field label="Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} required />
            <Field label="Country" value={form.country} onChange={(value) => setForm({ ...form, country: value })} required />
            <Field label="Rating" value={form.rating} onChange={(value) => setForm({ ...form, rating: value })} />
            <Field label="Packages Count" type="number" value={form.packages} onChange={(value) => setForm({ ...form, packages: value })} />
            <Field label="Image URL" value={form.image} onChange={(value) => setForm({ ...form, image: value })} className="xl:col-span-2" />
          </div>
          <label className="mt-4 block">
            <span className="mb-2 block text-xs font-semibold tracking-[0.15em] text-white/40 uppercase">Description</span>
            <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={5} className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none focus:border-accent" />
          </label>
          <button disabled={saving} className="mt-6 flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 font-semibold text-primary disabled:opacity-60"><Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Destination"}</button>
        </form>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {destinations.map((destination) => (
          <div key={destination.id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all hover:border-accent/40">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${destination.image})` }} />
            <div className="p-5">
              <div className="mb-2 flex items-center gap-2 text-xs text-white/45"><MapPin className="h-3 w-3 text-accent" /> {destination.country}</div>
              <h3 className="font-display text-xl font-bold text-white">{destination.name}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-white/45">{destination.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-white/60">
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" /> {destination.rating}</span>
                <span>{destination.packages || 0} packages</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button onClick={() => { setForm(toForm(destination)); setIsEditing(true); }} className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-accent hover:text-primary"><Edit3 className="h-4 w-4" /> Edit</button>
                <button onClick={() => deleteDestination(destination.id)} className="flex items-center justify-center gap-2 rounded-xl border border-red-400/20 px-4 py-2 text-sm text-red-200 transition-all hover:bg-red-500 hover:text-white"><Trash2 className="h-4 w-4" /> Delete</button>
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
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none focus:border-accent" />
    </label>
  );
}
