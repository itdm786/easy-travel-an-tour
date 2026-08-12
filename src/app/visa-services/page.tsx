import { Metadata } from "next";
import { VisaServicesContent } from "./VisaServicesContent";

export const metadata: Metadata = {
  title: "Visa Services",
  description:
    "Hassle-free visa processing for UAE, Turkey, Thailand, Malaysia, Saudi Arabia, Azerbaijan, and 30+ countries. Expert visa assistance with 98% approval rate in Islamabad, Pakistan.",
};

export default function VisaServicesPage() {
  return <VisaServicesContent />;
}
