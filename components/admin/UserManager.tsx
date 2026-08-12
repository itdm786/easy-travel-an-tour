"use client";

import { useState } from "react";
import { Edit3, Plus, Save, ShieldCheck, Trash2, X } from "lucide-react";

type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "manager" | "editor" | string;
  active: boolean | null;
};

type UserForm = {
  id?: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
  password: string;
};

const emptyForm: UserForm = {
  name: "",
  email: "",
  role: "editor",
  active: true,
  password: "",
};

function formatRole(role: string) {
  return role
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function UserManager({ initialUsers }: { initialUsers: AdminUser[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState<UserForm>(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const saveUser = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const url = form.id ? `/api/admin/users/${form.id}` : "/api/admin/users";
    const method = form.id ? "PATCH" : "POST";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error || "Unable to save user");
      setSaving(false);
      return;
    }

    const saved = result.user as AdminUser;
    setUsers((current) =>
      form.id ? current.map((user) => (user.id === saved.id ? saved : user)) : [saved, ...current]
    );
    setForm(emptyForm);
    setIsEditing(false);
    setMessage("Portal user saved successfully.");
    setSaving(false);
  };

  const deleteUser = async (id: number) => {
    if (!confirm("Delete this portal user?")) return;
    const response = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    const result = await response.json().catch(() => ({}));
    if (response.ok) {
      setUsers((current) => current.filter((user) => user.id !== id));
      setMessage("Portal user deleted successfully.");
    } else {
      setMessage(result.error || "Unable to delete user");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Portal Roles</h2>
          <p className="text-sm text-white/45">Add Admin, Manager, or Editor users. Admin/Manager/Editor routes use only portal header.</p>
        </div>
        <button
          onClick={() => {
            setForm(emptyForm);
            setIsEditing(true);
          }}
          className="flex items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-primary transition-all hover:bg-accent-light"
        >
          <Plus className="h-4 w-4" /> Add User
        </button>
      </div>

      {message && <div className="rounded-2xl border border-accent/20 bg-accent/10 px-5 py-3 text-sm text-accent">{message}</div>}

      {isEditing && (
        <form onSubmit={saveUser} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-bold">{form.id ? "Edit Portal User" : "Add Portal User"}</h3>
              <p className="text-sm text-white/45">Set name, email, role, active status, and reset password.</p>
            </div>
            <button type="button" onClick={() => setIsEditing(false)} className="rounded-xl border border-white/10 p-2 text-white/60 hover:text-accent">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Field label="Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} required />
            <Field label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required />
            <label>
              <span className="mb-2 block text-xs font-semibold tracking-[0.15em] text-white/40 uppercase">Role</span>
              <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className="w-full rounded-2xl border border-white/10 bg-[#0b1f3a] px-4 py-3 text-sm text-white outline-none focus:border-accent">
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="editor">Editor</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </label>
            <Field label={form.id ? "New Password (optional)" : "Password"} type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} required={!form.id} />
          </div>

          <label className="mt-4 flex items-center gap-3 text-sm text-white/70">
            <input type="checkbox" checked={form.active} onChange={(event) => setForm({ ...form, active: event.target.checked })} className="h-4 w-4 accent-accent" />
            User is active
          </label>

          <button disabled={saving} className="mt-6 flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 font-semibold text-primary disabled:opacity-60">
            <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save User"}
          </button>
        </form>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {users.map((user) => (
          <div key={user.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">{user.name}</h3>
                  <p className="text-sm text-white/45">{user.email}</p>
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs ${user.active ? "bg-emerald-400/10 text-emerald-300" : "bg-red-400/10 text-red-200"}`}>
                {user.active ? "Active" : "Disabled"}
              </span>
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/10 p-4">
              <p className="text-xs text-white/40">Role</p>
              <p className="font-semibold text-accent">{formatRole(user.role)}</p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setForm({ id: user.id, name: user.name, email: user.email, role: user.role, active: Boolean(user.active), password: "" });
                  setIsEditing(true);
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-accent hover:text-primary"
              >
                <Edit3 className="h-4 w-4" /> Edit / Reset
              </button>
              <button onClick={() => deleteUser(user.id)} className="flex items-center justify-center gap-2 rounded-xl border border-red-400/20 px-4 py-2 text-sm text-red-200 transition-all hover:bg-red-500 hover:text-white">
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return (
    <label>
      <span className="mb-2 block text-xs font-semibold tracking-[0.15em] text-white/40 uppercase">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none focus:border-accent" />
    </label>
  );
}
