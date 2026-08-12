"use client";

import { useState } from "react";
import { Mail, Phone, Plus, Trash2, UserRound, X } from "lucide-react";

type Customer = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  source: string | null;
  notes: string | null;
  status: string;
  createdAt: string | null;
};

export function CustomerManager({ initialCustomers }: { initialCustomers: Customer[] }) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", source: "", notes: "" });

  const addCustomer = async () => {
    if (!form.name.trim()) {
      setNotice("Name is required.");
      return;
    }

    const response = await fetch("/api/admin/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();

    if (response.ok) {
      setCustomers((current) => [result.customer, ...current]);
      setForm({ name: "", email: "", phone: "", source: "", notes: "" });
      setShowForm(false);
      setNotice("Customer added.");
    } else {
      setNotice(result.error || "Unable to add customer.");
    }
  };

  const setStatus = async (id: number, status: string) => {
    const response = await fetch(`/api/admin/customers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const result = await response.json();

    if (response.ok) {
      setCustomers((current) => current.map((customer) => (customer.id === id ? result.customer : customer)));
    } else {
      setNotice(result.error || "Unable to update customer.");
    }
  };

  const removeCustomer = async (id: number) => {
    const response = await fetch(`/api/admin/customers/${id}`, { method: "DELETE" });

    if (response.ok) {
      setCustomers((current) => current.filter((customer) => customer.id !== id));
      setNotice("Customer deleted.");
    } else {
      const result = await response.json();
      setNotice(result.error || "Unable to delete customer.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/50">Total customers: {customers.length}</p>
        <button
          onClick={() => setShowForm((current) => !current)}
          className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-accent/90"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Customer"}
        </button>
      </div>

      {notice && <div className="rounded-2xl border border-accent/20 bg-accent/10 px-5 py-3 text-sm text-accent">{notice}</div>}

      {showForm && (
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:grid-cols-2">
          <input
            placeholder="Full name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30"
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30"
          />
          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30"
          />
          <input
            placeholder="Source (e.g. Referral, Website, Walk-in)"
            value={form.source}
            onChange={(event) => setForm({ ...form, source: event.target.value })}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30"
          />
          <textarea
            placeholder="Notes"
            value={form.notes}
            onChange={(event) => setForm({ ...form, notes: event.target.value })}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 md:col-span-2"
            rows={2}
          />
          <button
            onClick={addCustomer}
            className="rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-primary transition-all hover:bg-accent/90 md:col-span-2"
          >
            Save Customer
          </button>
        </div>
      )}

      {customers.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center text-sm text-white/50">
          Koi customer record abhi nahi hai. &quot;Add Customer&quot; se manually add karein.
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
          <div className="divide-y divide-white/10">
            {customers.map((customer) => (
              <div key={customer.id} className="grid gap-3 px-6 py-5 md:grid-cols-12 md:items-center">
                <div className="md:col-span-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <UserRound className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{customer.name}</p>
                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/45">
                        {customer.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {customer.email}
                          </span>
                        )}
                        {customer.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {customer.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-white/50 md:col-span-3">{customer.source || "—"}</div>
                <div className="md:col-span-2">
                  <select
                    value={customer.status}
                    onChange={(event) => setStatus(customer.id, event.target.value)}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white"
                  >
                    <option value="active">Active</option>
                    <option value="vip">VIP</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex justify-end md:col-span-2">
                  <button
                    onClick={() => removeCustomer(customer.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/60 transition-all hover:border-red-400/40 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
