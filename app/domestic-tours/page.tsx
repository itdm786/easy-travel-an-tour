import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Domestic Tour Packages Pakistan",
  description: "Explore Pakistan's most beautiful destinations — Hunza, Skardu, Swat, Naran, Kaghan, Murree, and more. Premium domestic tour packages with transportation and hotels.",
};

export default function DomesticToursPage() {
  const tours = [
    { title: "Hunza Valley Explorer", location: "Gilgit-Baltistan", duration: "7 Days / 6 Nights", price: "PKR 65,000", desc: "Discover the breathtaking Hunza Valley — Karimabad, Altit & Baltit Forts, Attabad Lake, and Khunjerab Pass." },
    { title: "Skardu & Deosai Adventure", location: "Gilgit-Baltistan", duration: "8 Days / 7 Nights", price: "PKR 75,000", desc: "Explore Skardu Valley, Shangrila Resort, Deosai Plains, and the cold desert with stunning mountain views." },
    { title: "Swat & Kalam Retreat", location: "Khyber Pakhtunkhwa", duration: "5 Days / 4 Nights", price: "PKR 45,000", desc: "Escape to the stunning Swat Valley — Mingora, Malam Jabba, Kalam, and Mahodand Lake." },
    { title: "Naran Kaghan Adventure", location: "Khyber Pakhtunkhwa", duration: "5 Days / 4 Nights", price: "PKR 42,000", desc: "Experience the beauty of Naran Valley — Saif-ul-Malook Lake, Babusar Top, and lush green meadows." },
    { title: "Murree & Nathia Gali Getaway", location: "Punjab / KP", duration: "3 Days / 2 Nights", price: "PKR 28,000", desc: "A perfect weekend getaway to the picturesque hill stations of Murree, Nathia Gali, and Ayubia." },
    { title: "Neelum Valley Discovery", location: "Azad Kashmir", duration: "6 Days / 5 Nights", price: "PKR 55,000", desc: "Explore the paradise of Kashmir — Keran, Sharda, Kel, and Arang Kel with stunning river views." },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <section className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-accent uppercase">Discover Pakistan</p>
          <h1 className="font-display text-5xl font-bold text-text md:text-7xl">Domestic Tours</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-light">Explore the breathtaking beauty of Pakistan — from the northern valleys to the southern coast.</p>
        </section>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, i) => (
            <div key={i} className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <h3 className="font-display text-xl font-bold text-text">{tour.title}</h3>
              <p className="mt-1 text-sm text-accent">{tour.location} • {tour.duration}</p>
              <p className="mt-3 text-sm text-text-light">{tour.desc}</p>
              <p className="mt-4 font-display text-2xl font-bold text-primary">{tour.price}</p>
              <a href="/contact" className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary/5 py-3 text-sm font-semibold text-primary transition-all hover:bg-accent hover:text-primary">Book Now</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
