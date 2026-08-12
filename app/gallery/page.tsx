import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Explore our travel gallery featuring stunning destinations — Dubai, Turkey, Thailand, Malaysia, Azerbaijan, Sri Lanka, and more.",
};

const galleryImages = [
  "https://images.pexels.com/photos/2404656/pexels-photo-2404656.jpeg",
  "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg",
  "https://images.pexels.com/photos/1822481/pexels-photo-1822481.jpeg",
  "https://images.pexels.com/photos/22804/pexels-photo.jpg",
  "https://images.pexels.com/photos/17395806/pexels-photo-17395806.jpeg",
  "https://images.pexels.com/photos/4388161/pexels-photo-4388161.jpeg",
  "https://images.pexels.com/photos/18207966/pexels-photo-18207966.jpeg",
  "https://images.pexels.com/photos/11148384/pexels-photo-11148384.jpeg",
  "https://images.pexels.com/photos/28792455/pexels-photo-28792455.jpeg",
  "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg",
  "https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg",
  "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg",
];

export default function GalleryPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <section className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-accent uppercase">Visual Journey</p>
          <h1 className="font-display text-5xl font-bold text-text md:text-7xl">Photo Gallery</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-light">A glimpse into the extraordinary destinations and experiences awaiting you.</p>
        </section>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {galleryImages.map((img, i) => (
            <div key={i} className="mb-6 overflow-hidden rounded-3xl">
              <div
                className="h-64 w-full bg-cover bg-center transition-all duration-700 hover:scale-105 sm:h-80"
                style={{ backgroundImage: `url(${img})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
