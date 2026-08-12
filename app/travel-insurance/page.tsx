import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Insurance",
  description: "Comprehensive travel insurance plans — medical coverage, trip cancellation, lost baggage, and emergency support for international and domestic travel.",
};

export default function TravelInsurancePage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <section className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-accent uppercase">Peace of Mind</p>
          <h1 className="font-display text-5xl font-bold text-text md:text-7xl">Travel Insurance</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-light">Comprehensive travel protection for your journey — because your safety and peace of mind matter most.</p>
        </section>

        <div className="grid gap-8 md:grid-cols-3 mb-20">
          {[
            { title: "Medical Coverage", icon: "🏥", text: "Emergency medical expenses, hospitalization, and medical evacuation coverage up to $100,000 during your trip." },
            { title: "Trip Cancellation", icon: "🛡️", text: "Reimbursement for non-refundable trip costs if you need to cancel due to covered reasons like illness or emergency." },
            { title: "Baggage Protection", icon: "🧳", text: "Coverage for lost, stolen, or delayed baggage with compensation for essential items and belongings." },
            { title: "Flight Delay", icon: "⏰", text: "Compensation for flight delays exceeding 6 hours including meals, accommodation, and alternative arrangements." },
            { title: "Personal Liability", icon: "⚖️", text: "Protection against third-party claims for accidental injury or property damage during your travels." },
            { title: "24/7 Emergency", icon: "🆘", text: "Round-the-clock worldwide emergency assistance hotline for medical, travel, and legal emergencies." },
          ].map((s, i) => (
            <div key={i} className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all hover:shadow-lg">
              <span className="text-5xl">{s.icon}</span>
              <h3 className="mt-4 font-display text-xl font-bold text-text">{s.title}</h3>
              <p className="mt-3 text-sm text-text-light">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-primary p-12 text-center">
          <h2 className="font-display text-3xl font-bold text-white">Protect Your Journey</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">Travel with confidence. Our insurance plans start from as low as PKR 2,000 for domestic trips and PKR 5,000 for international journeys.</p>
          <a href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 font-semibold text-primary transition-all hover:bg-accent-light hover:shadow-lg">Get Insured Now</a>
        </div>
      </div>
    </div>
  );
}
