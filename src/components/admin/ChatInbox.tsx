"use client";

import { useState } from "react";
import { CheckCircle, Mail, MessageCircle, Phone, Reply, UserRound } from "lucide-react";

type ChatMessage = {
  id: number;
  visitorName: string;
  visitorEmail: string | null;
  visitorPhone: string | null;
  page: string | null;
  message: string;
  status: string;
  adminReply: string | null;
  repliedBy: string | null;
  createdAt: string | null;
  repliedAt: string | null;
};

export function ChatInbox({ initialMessages }: { initialMessages: ChatMessage[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [replyText, setReplyText] = useState<Record<number, string>>({});
  const [notice, setNotice] = useState("");

  const reply = async (id: number, status = "answered") => {
    const adminReply = replyText[id] || "We have received your message and our team will contact you shortly.";
    const response = await fetch(`/api/admin/chat/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminReply, status }),
    });
    const result = await response.json();

    if (response.ok) {
      setMessages((current) => current.map((message) => (message.id === id ? result.message : message)));
      setReplyText((current) => ({ ...current, [id]: "" }));
      setNotice("Chat updated successfully.");
    } else {
      setNotice(result.error || "Unable to update chat.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-accent/20 bg-accent/10 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Website Chat Bot Inbox</h2>
            <p className="mt-1 text-sm text-white/60">
              Jab website visitor bot/chat widget se message karega, wo seedha yahan admin portal mein aa jayega. Admin/Manager yahin se reply note save kar sakte hain.
            </p>
          </div>
        </div>
      </div>

      {notice && <div className="rounded-2xl border border-accent/20 bg-accent/10 px-5 py-3 text-sm text-accent">{notice}</div>}

      <div className="space-y-4">
        {messages.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center text-white/45">
            No chat messages yet. Visitor bot messages will appear here live after submission.
          </div>
        )}

        {messages.map((chat) => (
          <div key={chat.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <UserRound className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl font-bold text-white">{chat.visitorName}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs ${chat.status === "open" ? "bg-red-400/10 text-red-200" : "bg-emerald-400/10 text-emerald-300"}`}>
                      {chat.status}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/45">
                    {chat.visitorEmail && <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {chat.visitorEmail}</span>}
                    {chat.visitorPhone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {chat.visitorPhone}</span>}
                    {chat.page && <span>Page: {chat.page}</span>}
                  </div>
                </div>
              </div>
              <p className="text-xs text-white/35">{chat.createdAt ? new Date(chat.createdAt).toLocaleString() : "Just now"}</p>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/10 p-5">
              <p className="text-xs font-semibold tracking-[0.15em] text-white/35 uppercase">Visitor Message</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{chat.message}</p>
            </div>

            {chat.adminReply && (
              <div className="mt-4 rounded-2xl border border-accent/20 bg-accent/10 p-5">
                <p className="text-xs font-semibold tracking-[0.15em] text-accent uppercase">Admin Reply Note</p>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{chat.adminReply}</p>
                <p className="mt-2 text-xs text-white/35">By {chat.repliedBy}</p>
              </div>
            )}

            <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
              <input
                value={replyText[chat.id] || ""}
                onChange={(event) => setReplyText((current) => ({ ...current, [chat.id]: event.target.value }))}
                placeholder="Write internal reply/follow-up note..."
                className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-accent"
              />
              <button onClick={() => reply(chat.id, "answered")} className="flex items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-primary transition-all hover:bg-accent-light">
                <Reply className="h-4 w-4" /> Save Reply
              </button>
              <button onClick={() => reply(chat.id, "closed")} className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-sm text-white/60 transition-all hover:border-emerald-300/50 hover:text-emerald-300">
                <CheckCircle className="h-4 w-4" /> Close
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
