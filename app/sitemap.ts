import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.easytravel.com.pk";

  const staticPages = [
    "",
    "/about",
    "/flights",
    "/visa-services",
    "/hotels",
    "/holiday-packages",
    "/international-tours",
    "/domestic-tours",
    "/umrah",
    "/hajj",
    "/travel-insurance",
    "/corporate-travel",
    "/destinations",
    "/gallery",
    "/reviews",
    "/blog",
    "/faq",
    "/contact",
    "/privacy-policy",
    "/terms-conditions",
  ];

  return staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "daily" : "weekly",
    priority: page === "" ? 1 : 0.8,
  }));
}
