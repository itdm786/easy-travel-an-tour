import { NextResponse } from "next/server";
import { TOUR_PACKAGES, DESTINATIONS } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const matchingPackages = TOUR_PACKAGES.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.destination.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
  ).slice(0, 5);

  const matchingDestinations = DESTINATIONS.filter(
    (d) =>
      d.name.toLowerCase().includes(query) ||
      d.country.toLowerCase().includes(query) ||
      d.description.toLowerCase().includes(query)
  ).slice(0, 3);

  return NextResponse.json({
    results: [
      ...matchingPackages.map((p) => ({
        type: "package",
        title: p.title,
        url: `/holiday-packages/${p.slug}`,
        price: p.price,
        image: p.image,
      })),
      ...matchingDestinations.map((d) => ({
        type: "destination",
        title: `${d.name}, ${d.country}`,
        url: `/destinations/${d.name.toLowerCase().replace(/\s+/g, "-")}`,
        image: d.image,
      })),
    ],
  });
}
