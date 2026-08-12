import { Metadata } from "next";
import { HolidayPackagesContent } from "./HolidayPackagesContent";

export const metadata: Metadata = {
  title: "Holiday Packages",
  description: "Discover premium holiday packages for international and domestic destinations. Customized tours, honeymoon specials, and group travel packages at the best prices.",
};

export default function HolidayPackagesPage() {
  return <HolidayPackagesContent />;
}
