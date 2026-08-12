"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ visitorName: "", visitorEmail: "", visitorPhone: "", message: "" });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, page: pathname }),
    });
    setForm({ visitorName: "", visitorEmail: "", visitorPhone: "", message: "" });
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 left-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[340px] overflow-hidden rounded-3xl border border-white/10 bg-primary text-white shadow-2xl shadow-black/30"
          >
            <div className="flex items-center justify-between bg-white/[0.06] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-primary">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold">Easy Travel Bot</p>
                  <p className="text-xs text-white/45">Message goes to admin portal</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-xl p-2 text-white/50 hover:bg-white/10 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4">
              {sent ? (
                <div className="rounded-2xl border border-accent/20 bg-accent/10 p-5 text-center">
                  <p className="font-semibold text-accent">Message sent!</p>
                  <p className="mt-2 text-sm text-white/60">Our admin team received your message and will contact you shortly.</p>
                  <button onClick={() => setSent(false)} className="mt-4 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-primary">Send another</button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-3">
                  <input value={form.visitorName} onChange={(event) => setForm({ ...form, visitorName: event.target.value })} placeholder="Your name" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-accent" />
                  <input type="email" value={form.visitorEmail} onChange={(event) => setForm({ ...form, visitorEmail: event.target.value })} placeholder="Email optional" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-accent" />
                  <input value={form.visitorPhone} onChange={(event) => setForm({ ...form, visitorPhone: event.target.value })} placeholder="WhatsApp / phone optional" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-accent" />
                  <textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="How can we help?" rows={4} required className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-accent" />
                  <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-primary transition-all hover:bg-accent-light disabled:opacity-60">
                    <Send className="h-4 w-4" /> {loading ? "Sending..." : "Send to Admin"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((value) => !value)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary shadow-lg shadow-accent/30"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        <span className="sr-only">Open chat bot</span>
      </motion.button>
    </div>
  );
}
