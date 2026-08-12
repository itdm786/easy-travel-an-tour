import { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Easy Travel & Tours in Islamabad for flights, hotels, visa services, Umrah & Hajj packages. Visit our office at I-8 Markaz or call +92 51 2719103.",
};

export default function ContactPage() {
  return <ContactContent />;
}
