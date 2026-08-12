"use client";

import { useState } from "react";
import { Mail, Phone, Trash2, UserRound } from "lucide-react";

type ServiceRequest = {
  id: number;
  type: string;
  name: string;
  email: string | null;
  phone: string | null;
  details: Record<string, unknown> | null;
  status: string;
  createdAt: string | null;
};

const STATUS_OPTIONS = ["new", "contacted", "in_progress", "completed", "cancelled"];

export function ServiceRequestManager({
  initialRequests,
  emptyMessage,
}: {
  initialRequests: ServiceRequest[];
  emptyMessage: string;
}) {
  const [requests, setRequests] = useState(initialRequests);
  const [notice, setNotice] = useState("");

  const setStatus = async (id: number, status: string) => {
    const response = await fetch(`/api/admin/service-requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const result = await response.json();

    if (response.ok) {
      setRequests((current) => current.map((request) => (request.id === id ? result.request : request)));
    } else {
      setNotice(result.error || "Unable to update request.");
    }
  };

  const removeRequest = async (id: number) => {
    const response = await fetch(`/api/admin/service-requests/${id}`, { method: "DELETE" });

    if (response.ok) {
      setRequests((current) => current.filter((request) => request.id !== id));
      setNotice("Request deleted.");
    } else {
      const result = await response.json();
      setNotice(result.error || "Unable to delete request.");
    }
  };

  return (
    <div className="space-y-6">
      {notice && <div className="rounded-2xl border border-accent/20 bg-accent/10 px-5 py-3 text-sm text-accent">{notice}</div>}

      {requests.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center text-sm text-white/50">
          {emptyMessage}
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
          <div className="divide-y divide-white/10">
            {requests.map((request) => (
              <div key={request.id} className="grid gap-3 px-6 py-5 md:grid-cols-12 md:items-start">
                <div className="md:col-span-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <UserRound className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{request.name}</p>
                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/45">
                        {request.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {request.email}
                          </span>
                        )}
                        {request.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {request.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-white/45 md:col-span-4">
                  {request.details && Object.keys(request.details).length > 0
                    ? Object.entries(request.details)
                        .filter(([, value]) => value)
                        .map(([key, value]) => (
                          <div key={key}>
                            <span className="text-white/30">{key}:</span> {String(value)}
                          </div>
                        ))
                    : "No extra details"}
                  <div className="mt-2 text-white/30">
                    {request.createdAt ? new Date(request.createdAt).toLocaleString() : "Just now"}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <select
                    value={request.status}
                    onChange={(event) => setStatus(request.id, event.target.value)}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end md:col-span-2">
                  <button
                    onClick={() => removeRequest(request.id)}
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
