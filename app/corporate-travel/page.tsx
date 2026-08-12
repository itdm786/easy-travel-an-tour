import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Travel Management",
  description: "Premium corporate travel solutions for businesses — flight booking, hotel reservations, visa assistance, transportation, and event management.",
};

export default function CorporateTravelPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <section className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-accent uppercase">Business Travel</p>
          <h1 className="font-display text-5xl font-bold text-text md:text-7xl">Corporate Travel</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-light">Streamlined business travel management — flights, hotels, visas, transportation, and event logistics for your organization.</p>
        </section>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: "Flight Management", icon: "✈️", text: "Corporate flight booking with preferred airline rates, flexible ticketing, and 24/7 support for last-minute changes." },
            { title: "Hotel & Accommodation", icon: "🏨", text: "Curated hotel selection with corporate rates at premium properties worldwide, from business hotels to conference venues." },
            { title: "Visa & Documentation", icon: "📋", text: "Fast-track visa processing for business travelers with dedicated account managers handling all documentation." },
            { title: "Ground Transportation", icon: "🚗", text: "Airport transfers, chauffeur services, and car rentals arranged for executives and delegations." },
            { title: "Event & Conference Travel", icon: "🎯", text: "End-to-end travel logistics for corporate events, conferences, exhibitions, and incentive trips." },
            { title: "Dedicated Account Manager", icon: "👔", text: "A personal corporate travel consultant who understands your business needs and provides tailored solutions." },
          ].map((s, i) => (
            <div key={i} className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <span className="text-5xl">{s.icon}</span>
              <h3 className="mt-4 font-display text-xl font-bold text-text">{s.title}</h3>
              <p className="mt-3 text-sm text-text-light">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-primary p-12 text-center">
          <h2 className="font-display text-3xl font-bold text-white">Partner with Us</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">Let us handle your corporate travel while you focus on business. Contact our corporate team for a customized proposal.</p>
          <a href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 font-semibold text-primary transition-all hover:bg-accent-light hover:shadow-lg">Get Corporate Quote</a>
        </div>
      </div>
    </div>
  );
}
