import { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Easy Travel & Tours — an IATA-certified travel agency with 15+ years of experience in flights, hotels, visa services, Umrah & Hajj packages, and international tours.",
};

export default function AboutPage() {
  return <AboutContent />;
}
