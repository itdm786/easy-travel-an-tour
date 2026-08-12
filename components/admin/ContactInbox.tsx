"use client";

import { useState } from "react";
import { Mail, MailOpen, Phone, Trash2, UserRound } from "lucide-react";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  read: boolean;
  createdAt: string | null;
};

export function ContactInbox({ initialContacts }: { initialContacts: Contact[] }) {
  const [contacts, setContacts] = useState(initialContacts);
  const [notice, setNotice] = useState("");

  const toggleRead = async (id: number, read: boolean) => {
    const response = await fetch(`/api/admin/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    const result = await response.json();

    if (response.ok) {
      setContacts((current) => current.map((contact) => (contact.id === id ? result.contact : contact)));
    } else {
      setNotice(result.error || "Unable to update this message.");
    }
  };

  const removeContact = async (id: number) => {
    const response = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });

    if (response.ok) {
      setContacts((current) => current.filter((contact) => contact.id !== id));
      setNotice("Message deleted.");
    } else {
      const result = await response.json();
      setNotice(result.error || "Unable to delete this message.");
    }
  };

  return (
    <div className="space-y-6">
      {notice && <div className="rounded-2xl border border-accent/20 bg-accent/10 px-5 py-3 text-sm text-accent">{notice}</div>}

      {contacts.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center text-sm text-white/50">
          Koi contact form submission abhi tak nahi aayi. Jab visitor website ke Contact page se form bharega, yahan dikhega.
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
          <div className="divide-y divide-white/10">
            {contacts.map((contact) => (
              <div key={contact.id} className="grid gap-4 px-6 py-5 md:grid-cols-12 md:items-start">
                <div className="md:col-span-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <UserRound className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{contact.name}</p>
                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/45">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {contact.email}
                        </span>
                        {contact.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {contact.phone}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-accent">{contact.service || "General Inquiry"}</p>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-4">
                  <p className="text-sm text-white/60">{contact.message}</p>
                  <p className="mt-2 text-xs text-white/35">
                    {contact.createdAt ? new Date(contact.createdAt).toLocaleString() : "Just now"}
                  </p>
                </div>
                <div className="flex items-center gap-2 md:col-span-3 md:justify-end">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      contact.read ? "bg-white/10 text-white/50" : "bg-accent/10 text-accent"
                    }`}
                  >
                    {contact.read ? "Read" : "New"}
                  </span>
                  <button
                    onClick={() => toggleRead(contact.id, !contact.read)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/60 transition-all hover:border-accent/40 hover:text-accent"
                    title={contact.read ? "Mark as unread" : "Mark as read"}
                  >
                    {contact.read ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => removeContact(contact.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/60 transition-all hover:border-red-400/40 hover:text-red-400"
                    title="Delete"
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
