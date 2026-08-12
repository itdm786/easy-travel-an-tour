import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotel Booking",
  description: "Book luxury hotels worldwide at the best rates. Premium hotel reservations with Easy Travel & Tours — from 5-star resorts to boutique stays.",
};

export default function HotelsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <section className="relative mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-accent uppercase">Stay in Luxury</p>
          <h1 className="font-display text-5xl font-bold text-text md:text-7xl">Hotel Booking</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-light">
            Book premium hotels worldwide at the best rates. From 5-star luxury resorts to boutique stays.
          </p>
        </section>

        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl shadow-black/[0.03]">
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-light uppercase">Destination</label>
              <input type="text" placeholder="Where?" className="w-full rounded-xl border border-gray-200 bg-bg px-4 py-3 text-sm outline-none focus:border-accent" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-light uppercase">Check-in</label>
              <input type="date" className="w-full rounded-xl border border-gray-200 bg-bg px-4 py-3 text-sm outline-none focus:border-accent" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-light uppercase">Check-out</label>
              <input type="date" className="w-full rounded-xl border border-gray-200 bg-bg px-4 py-3 text-sm outline-none focus:border-accent" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-light uppercase">Guests</label>
              <select className="w-full rounded-xl border border-gray-200 bg-bg px-4 py-3 text-sm outline-none focus:border-accent">
                {["1 Adult", "2 Adults", "3 Adults", "4+ Adults"].map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button className="rounded-2xl bg-accent px-10 py-5 font-semibold text-primary transition-all hover:bg-accent-light hover:shadow-lg">Search Hotels</button>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Burj Al Arab", location: "Dubai, UAE", stars: 7, price: "From PKR 450,000/night" },
            { name: "Pullman ZamZam", location: "Makkah, Saudi Arabia", stars: 5, price: "From PKR 120,000/night" },
            { name: "Ciragan Palace Kempinski", location: "Istanbul, Turkey", stars: 5, price: "From PKR 250,000/night" },
            { name: "Mandarin Oriental", location: "Bangkok, Thailand", stars: 5, price: "From PKR 180,000/night" },
          ].map((hotel, i) => (
            <div key={hotel.name} className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10" />
              <div className="p-5">
                <div className="flex items-center gap-1 text-xs text-accent">{"★".repeat(Math.min(hotel.stars, 5))}</div>
                <h3 className="font-display text-lg font-bold text-text">{hotel.name}</h3>
                <p className="text-sm text-text-light">{hotel.location}</p>
                <p className="mt-2 font-semibold text-primary">{hotel.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
