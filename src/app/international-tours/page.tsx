import { Metadata } from "next";

export const metadata: Metadata = {
  title: "International Tour Packages",
  description: "Explore our international tour packages to Dubai, Turkey, Thailand, Malaysia, Azerbaijan, Sri Lanka, and more. Premium guided tours with flights, hotels, and visas included.",
};

export default function InternationalToursPage() {
  const tours = [
    { title: "Dubai Luxury Escape", destination: "UAE", duration: "5 Days / 4 Nights", price: "PKR 185,000", image: "https://images.pexels.com/photos/2404656/pexels-photo-2404656.jpeg" },
    { title: "Istanbul, Antalya & Cappadocia", destination: "Turkey", duration: "9 Days / 8 Nights", price: "PKR 199,000", image: "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg" },
    { title: "Thailand Discovery", destination: "Thailand", duration: "7 Days / 6 Nights", price: "PKR 159,000", image: "https://images.pexels.com/photos/1822481/pexels-photo-1822481.jpeg" },
    { title: "Malaysia — KL & Langkawi", destination: "Malaysia", duration: "7 Days / 6 Nights", price: "PKR 165,000", image: "https://images.pexels.com/photos/22804/pexels-photo.jpg" },
    { title: "Azerbaijan — Baku & Gabala", destination: "Azerbaijan", duration: "6 Days / 5 Nights", price: "PKR 145,000", image: "https://images.pexels.com/photos/17395806/pexels-photo-17395806.jpeg" },
    { title: "Sri Lanka Paradise", destination: "Sri Lanka", duration: "7 Days / 6 Nights", price: "PKR 135,000", image: "https://images.pexels.com/photos/28792455/pexels-photo-28792455.jpeg" },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <section className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-accent uppercase">Explore The World</p>
          <h1 className="font-display text-5xl font-bold text-text md:text-7xl">International Tours</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-light">Discover the world with our premium international tour packages — flights, hotels, visas, and guided tours all included.</p>
        </section>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, i) => (
            <div key={i} className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${tour.image})` }} />
              </div>
              <div className="p-6">
                <p className="text-xs text-accent font-medium">{tour.destination} • {tour.duration}</p>
                <h3 className="mt-1 font-display text-xl font-bold text-text">{tour.title}</h3>
                <p className="mt-4 font-display text-2xl font-bold text-primary">{tour.price}</p>
                <a href="/contact" className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary/5 py-3 text-sm font-semibold text-primary transition-all hover:bg-accent hover:text-primary">View Details</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
