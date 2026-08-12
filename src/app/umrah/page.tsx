import { Metadata } from "next";
import { UmrahContent } from "./UmrahContent";

export const metadata: Metadata = {
  title: "Umrah Packages 2026",
  description: "Premium Umrah packages from Pakistan with 5-star hotels near Haram, direct flights, complete visa processing, and spiritual guidance. Economy & VIP Umrah packages available.",
};

export default function UmrahPage() {
  return <UmrahContent />;
}
