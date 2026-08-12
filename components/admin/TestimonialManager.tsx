"use client";

import { useState } from "react";
import { CheckCircle2, Star, Trash2, XCircle } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  package: string | null;
  approved: boolean;
  createdAt: string | null;
};

export function TestimonialManager({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [notice, setNotice] = useState("");

  const setApproval = async (id: number, approved: boolean) => {
    const response = await fetch(`/api/admin/testimonials/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved }),
    });
    const result = await response.json();

    if (response.ok) {
      setTestimonials((current) =>
        current.map((testimonial) => (testimonial.id === id ? result.testimonial : testimonial))
      );
      setNotice(approved ? "Testimonial approved and now live on website." : "Testimonial hidden from website.");
    } else {
      setNotice(result.error || "Unable to update this testimonial.");
    }
  };

  const removeTestimonial = async (id: number) => {
    const response = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });

    if (response.ok) {
      setTestimonials((current) => current.filter((testimonial) => testimonial.id !== id));
      setNotice("Testimonial deleted.");
    } else {
      const result = await response.json();
      setNotice(result.error || "Unable to delete this testimonial.");
    }
  };

  return (
    <div className="space-y-6">
      {notice && <div className="rounded-2xl border border-accent/20 bg-accent/10 px-5 py-3 text-sm text-accent">{notice}</div>}

      {testimonials.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center text-sm text-white/50">
          Koi testimonial/review abhi tak submit nahi hui.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  {testimonial.package && <p className="text-xs text-white/40">{testimonial.package}</p>}
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    testimonial.approved ? "bg-accent/10 text-accent" : "bg-white/10 text-white/50"
                  }`}
                >
                  {testimonial.approved ? "Live on site" : "Pending"}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4"
                    fill={index < testimonial.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>

              <p className="mt-3 text-sm text-white/60">{testimonial.comment}</p>

              <div className="mt-4 flex items-center gap-2">
                {!testimonial.approved ? (
                  <button
                    onClick={() => setApproval(testimonial.id, true)}
                    className="flex items-center gap-1 rounded-xl border border-accent/30 px-3 py-2 text-xs font-medium text-accent transition-all hover:bg-accent/10"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                  </button>
                ) : (
                  <button
                    onClick={() => setApproval(testimonial.id, false)}
                    className="flex items-center gap-1 rounded-xl border border-white/10 px-3 py-2 text-xs font-medium text-white/60 transition-all hover:border-white/30"
                  >
                    <XCircle className="h-3.5 w-3.5" /> Hide
                  </button>
                )}
                <button
                  onClick={() => removeTestimonial(testimonial.id)}
                  className="flex items-center gap-1 rounded-xl border border-white/10 px-3 py-2 text-xs font-medium text-white/60 transition-all hover:border-red-400/40 hover:text-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
