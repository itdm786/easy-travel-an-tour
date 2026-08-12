import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: "Read verified customer reviews and testimonials for Easy Travel & Tours — Umrah, Hajj, tours, flights, and visa services.",
};

export default function ReviewsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <section className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-accent uppercase">Testimonials</p>
          <h1 className="font-display text-5xl font-bold text-text md:text-7xl">Customer Reviews</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-light">Hear from travelers who have experienced the world with us.</p>
        </section>

        <div className="space-y-6">
          {[
            { name: "Ahmed Hassan", rating: 5, package: "VIP Umrah Package", text: "MashAllah, it was a wonderful experience. Great host, nice hotels, and a really informative tour! The Umrah trip was well-organized and our tour leader provided us with valuable insights.", date: "December 2025" },
            { name: "Fatima Khan", rating: 5, package: "Turkey Trilogy Tour", text: "Don't think twice before choosing Easy Travel and Tours. This was my first international trip, and I can't thank the team enough. Everything was very well organized.", date: "November 2025" },
            { name: "Mohammad Usman", rating: 5, package: "Dubai Luxury Escape", text: "One of the best experiences I've had in my life. The team is very knowledgeable and hard-working when it comes to organizing everything before, during, and after the trip.", date: "October 2025" },
            { name: "Sara Ali", rating: 5, package: "Thailand Discovery", text: "Outstanding, professional service from start to finish. The itinerary was perfectly balanced. Hotels were excellent and the local guides were fantastic.", date: "September 2025" },
            { name: "Bilal Mahmood", rating: 4, package: "Azerbaijan Tour", text: "Great value for money. Baku was absolutely stunning and the arrangements were seamless. Overall, highly recommended!", date: "August 2025" },
            { name: "Ayesha Tariq", rating: 5, package: "Malaysia Tour", text: "One of the best travel agencies I've worked with. They went above and beyond to customize our Malaysia itinerary. Will come back for Umrah!", date: "July 2025" },
          ].map((r, i) => (
            <div key={i} className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className={j < r.rating ? "text-accent" : "text-gray-200"}>★</span>
                ))}
              </div>
              <p className="text-text-light leading-relaxed italic">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-4 border-t border-gray-100 pt-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text">{r.name}</p>
                  <p className="text-sm text-text-light">{r.package}</p>
                </div>
                <span className="text-xs text-text-light">{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
