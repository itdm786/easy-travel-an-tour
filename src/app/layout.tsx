import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";

export const metadata: Metadata = {
  title: {
    default: "Easy Travel & Tours | Premium Travel Agency Pakistan",
    template: "%s | Easy Travel & Tours",
  },
  description:
    "IATA-certified premium travel agency in Islamabad offering international flights, hotel bookings, visa services, Umrah & Hajj packages, international & domestic tours, corporate travel, and travel insurance. Best prices guaranteed.",
  keywords: [
    "travel agency Pakistan",
    "flight booking Islamabad",
    "Umrah packages",
    "Hajj packages",
    "visa services Pakistan",
    "international tours",
    "domestic tours Pakistan",
    "hotel booking",
    "corporate travel",
    "travel insurance",
    "IATA certified",
    "easy travel",
    "Islamabad travel",
  ],
  authors: [{ name: "Easy Travel & Tours" }],
  creator: "Easy Travel & Tours",
  publisher: "Easy Travel & Tours",
  metadataBase: new URL("https://www.easytravel.com.pk"),
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "Easy Travel & Tours",
    title: "Easy Travel & Tours | Premium Travel Agency Pakistan",
    description:
      "IATA-certified premium travel agency offering flights, hotels, visa, Umrah, Hajj, and tour packages at the best prices.",
    url: "https://www.easytravel.com.pk",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Easy Travel & Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Easy Travel & Tours | Premium Travel Agency Pakistan",
    description:
      "IATA-certified premium travel agency offering flights, hotels, visa, Umrah, Hajj, and tour packages at the best prices.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.easytravel.com.pk",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Poppins:wght@300;400;500;600;700;800&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Easy Travel & Tours",
              url: "https://www.easytravel.com.pk",
              logo: "https://www.easytravel.com.pk/images/logo.svg",
              description:
                "IATA-certified premium travel agency offering flights, hotels, visa, Umrah, Hajj, and tour packages.",
              telephone: "+92 51 2719103",
              email: "info@easytravel.com.pk",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Office #22, 1st Floor, Rose Plaza, I-8 Markaz",
                addressLocality: "Islamabad",
                addressCountry: "PK",
              },
              sameAs: [
                "https://www.facebook.com/easytravelisb/",
                "https://www.instagram.com/easytraveltours/",
              ],
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "10:00",
                closes: "19:00",
              },
              priceRange: "PKR 20,000 - PKR 1,500,000",
            }),
          }}
        />
      </head>
      <body className="bg-bg text-text antialiased font-body">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
