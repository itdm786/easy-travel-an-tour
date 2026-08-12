import { Metadata } from "next";
import { FAQContent } from "./FAQContent";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to commonly asked questions about Easy Travel & Tours services — flights, hotels, visa, Umrah, Hajj, tours, and travel insurance.",
};

export default function FAQPage() {
  return <FAQContent />;
}
