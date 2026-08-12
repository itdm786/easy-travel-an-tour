import { Metadata } from "next";
import { DestinationsContent } from "./DestinationsContent";

export const metadata: Metadata = {
  title: "Popular Destinations",
  description: "Explore our handpicked travel destinations — Dubai, Istanbul, Bangkok, Kuala Lumpur, Baku, Cappadocia, Antalya, and more. Book your dream vacation today.",
};

export default function DestinationsPage() {
  return <DestinationsContent />;
}
