import { Metadata } from "next";
import { FlightsContent } from "./FlightsContent";

export const metadata: Metadata = {
  title: "Flight Booking",
  description:
    "Book cheap flights worldwide with Easy Travel & Tours. Search, compare, and book the best flight deals with major airlines. IATA-certified travel agency in Islamabad, Pakistan.",
};

export default function FlightsPage() {
  return <FlightsContent />;
}
