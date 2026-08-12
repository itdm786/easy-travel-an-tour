import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hajj Packages 2026",
  description: "Comprehensive Hajj packages from Pakistan with premium accommodation, direct flights, complete visa processing, and full spiritual guidance. Book your Hajj journey today.",
};

export default function HajjPage() {
  return (
    <>
      <section className="relative flex min-h-[55vh] items-center bg-primary pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-primary/90" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-accent uppercase">Blessed Journey</p>
          <h1 className="font-display text-5xl font-bold text-white md:text-7xl">Hajj Packages 2026</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Fulfill your sacred obligation with our comprehensive Hajj packages — premium accommodation in Makkah, Mina, Arafat, and Madinah with complete guidance.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Economy Package", duration: "25-30 Days", price: "PKR 1,495,000", desc: "Comfortable 3-star hotels, shared accommodation, coach transportation, and complete Hajj guidance.", features: ["3-star hotels in Makkah & Madinah", "Mina & Arafat tent accommodation", "Shared transportation", "Hajj visa processing", "Group guidance by scholars"] },
              { title: "Gold Package", duration: "22-25 Days", price: "PKR 1,875,000", desc: "Premium 4-star hotels near Haram, enhanced amenities, and comprehensive support throughout your Hajj.", features: ["4-star hotels near Haram", "Premium Mina/Arafat tents", "Private coach transportation", "Hajj visa & documentation", "Dedicated scholar guidance", "Meals included"], featured: true },
              { title: "VIP Package", duration: "18-22 Days", price: "PKR 2,450,000", desc: "Ultimate Hajj experience with 5-star luxury hotels, private transportation, and VIP services.", features: ["5-star hotels steps from Haram", "VIP Mina/Arafat camps", "Private luxury transport", "Priority visa processing", "Personal scholar", "Gourmet meals", "24/7 concierge"] },
            ].map((pkg, i) => (
              <div key={pkg.title} className={`relative overflow-hidden rounded-3xl border p-8 transition-all hover:shadow-xl ${pkg.featured ? "border-accent/40 bg-gradient-to-b from-accent/5 to-white shadow-xl" : "border-gray-100 bg-white shadow-sm"}`}>
                {pkg.featured && <div className="absolute top-0 right-0 rounded-bl-2xl bg-accent px-5 py-2 text-xs font-bold text-primary">RECOMMENDED</div>}
                <h3 className="font-display text-2xl font-bold text-text">{pkg.title}</h3>
                <p className="mt-1 text-sm text-text-light">{pkg.duration}</p>
                <p className="mt-3 font-display text-3xl font-bold text-primary">{pkg.price}</p>
                <p className="mt-3 text-sm text-text-light">{pkg.desc}</p>
                <ul className="mt-5 space-y-2 border-t border-gray-100 pt-5">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-text-light">
                      <span className="mt-0.5 text-accent">✦</span> {f}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-all hover:bg-accent hover:text-primary">Book Now</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
