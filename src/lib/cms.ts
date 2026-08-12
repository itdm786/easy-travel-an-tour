import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  adminUsers,
  blogPosts,
  chatMessages,
  contacts,
  customers,
  destinations,
  mediaAssets,
  packages,
  reviews,
  seoSettings,
  serviceRequests,
  siteSettings,
} from "@/db/schema";
import { BLOG_POSTS, DESTINATIONS, TOUR_PACKAGES, UMRAH_PACKAGES } from "@/lib/data";
import { hashPassword } from "@/lib/password";

export type AdminRole = "super_admin" | "admin" | "manager" | "editor";

export type SiteBrandingSettings = {
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  logoWidth: number;
  logoHeight: number;
  headerLogoWidth: number;
  footerLogoWidth: number;
  logoGuidelines: string;
};

export const defaultBrandingSettings: SiteBrandingSettings = {
  siteName: "Easy Travel & Tours",
  tagline: "Your Journey, Our Passion",
  logoUrl: "",
  faviconUrl: "",
  logoWidth: 220,
  logoHeight: 64,
  headerLogoWidth: 190,
  footerLogoWidth: 220,
  logoGuidelines:
    "Recommended website logo size: 220x64px PNG/SVG with transparent background. Header display width: 190px. Favicon recommended size: 32x32px PNG/ICO.",
};

export async function ensureCmsSeedData() {
  const packageRows = await db.select({ id: packages.id }).from(packages).limit(1);

  if (packageRows.length === 0) {
    const seedPackages = [...TOUR_PACKAGES, ...UMRAH_PACKAGES].map((pkg) => ({
      title: pkg.title,
      slug: pkg.slug,
      category: pkg.category,
      destination: pkg.destination,
      duration: pkg.duration,
      price: pkg.price,
      originalPrice: pkg.originalPrice ?? null,
      image: pkg.image,
      featured: pkg.featured,
      rating: String(pkg.rating),
      reviews: pkg.reviews,
      description: pkg.description,
      highlights: pkg.highlights,
      inclusions: pkg.inclusions,
      exclusions: pkg.exclusions,
    }));

    await db.insert(packages).values(seedPackages);
  }

  const destinationRows = await db.select({ id: destinations.id }).from(destinations).limit(1);

  if (destinationRows.length === 0) {
    await db.insert(destinations).values(
      DESTINATIONS.map((destination) => ({
        name: destination.name,
        country: destination.country,
        image: destination.image,
        description: destination.description,
        rating: String(destination.rating),
        packages: destination.packages,
      }))
    );
  }

  const blogRows = await db.select({ id: blogPosts.id }).from(blogPosts).limit(1);

  if (blogRows.length === 0) {
    await db.insert(blogPosts).values(
      BLOG_POSTS.map((post) => ({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content:
          post.content ||
          `${post.excerpt}\n\nEasy Travel & Tours experts prepare every guide with practical advice, destination insights, and booking recommendations for Pakistani travelers.`,
        image: post.image,
        author: post.author,
        category: post.category,
        tags: post.tags,
        readTime: post.readTime,
        published: true,
      }))
    );
  }

  await ensureDefaultAdminUser();
  await ensureDefaultSettings();
}

export async function ensureDefaultAdminUser() {
  const email = process.env.ADMIN_EMAIL || "admin@easytravel.com.pk";
  const password = process.env.ADMIN_PASSWORD || "EasyTravel@2026";

  const existing = await db
    .select({ id: adminUsers.id })
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);

  if (existing.length === 0) {
    await db.insert(adminUsers).values({
      name: "Easy Travel Super Admin",
      email,
      passwordHash: hashPassword(password),
      role: "super_admin",
      active: true,
    });
  }
}

export async function ensureDefaultSettings() {
  const existing = await db
    .select({ id: siteSettings.id })
    .from(siteSettings)
    .where(eq(siteSettings.key, "branding"))
    .limit(1);

  if (existing.length === 0) {
    await db.insert(siteSettings).values({
      key: "branding",
      value: JSON.stringify(defaultBrandingSettings),
    });
  }
}

export async function getBrandingSettings() {
  await ensureDefaultSettings();
  const rows = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, "branding"))
    .limit(1);

  if (!rows[0]) return defaultBrandingSettings;

  try {
    return {
      ...defaultBrandingSettings,
      ...(JSON.parse(rows[0].value) as Partial<SiteBrandingSettings>),
    };
  } catch {
    return defaultBrandingSettings;
  }
}

export async function saveBrandingSettings(settings: SiteBrandingSettings) {
  await ensureDefaultSettings();
  const value = JSON.stringify({ ...defaultBrandingSettings, ...settings });
  const rows = await db
    .update(siteSettings)
    .set({ value, updatedAt: new Date() })
    .where(eq(siteSettings.key, "branding"))
    .returning();

  return rows[0];
}

export async function getCmsPackages() {
  await ensureCmsSeedData();
  return db.select().from(packages).orderBy(desc(packages.createdAt));
}

export async function getCmsBlogs() {
  await ensureCmsSeedData();
  return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
}

export async function getCmsDestinations() {
  await ensureCmsSeedData();
  return db.select().from(destinations).orderBy(desc(destinations.createdAt));
}

export async function getAdminUsers() {
  await ensureDefaultAdminUser();
  return db.select().from(adminUsers).orderBy(desc(adminUsers.createdAt));
}

export async function getChatMessages() {
  return db.select().from(chatMessages).orderBy(desc(chatMessages.createdAt));
}

export async function getContactLeads() {
  return db.select().from(contacts).orderBy(desc(contacts.createdAt));
}

export async function markContactRead(id: number, read: boolean) {
  const updated = await db
    .update(contacts)
    .set({ read })
    .where(eq(contacts.id, id))
    .returning();
  return updated[0];
}

export async function deleteContactLead(id: number) {
  await db.delete(contacts).where(eq(contacts.id, id));
}

export async function getTestimonials() {
  return db.select().from(reviews).orderBy(desc(reviews.createdAt));
}

export async function setTestimonialApproval(id: number, approved: boolean) {
  const updated = await db
    .update(reviews)
    .set({ approved })
    .where(eq(reviews.id, id))
    .returning();
  return updated[0];
}

export async function deleteTestimonial(id: number) {
  await db.delete(reviews).where(eq(reviews.id, id));
}

export type HomepageSettings = {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroCtaLabel: string;
  heroCtaLink: string;
};

export const defaultHomepageSettings: HomepageSettings = {
  heroTitle: "Your Journey, Our Passion",
  heroSubtitle: "Premium travel packages, visa services, and unforgettable tours across the globe.",
  heroImage: "",
  heroCtaLabel: "Explore Packages",
  heroCtaLink: "/holiday-packages",
};

export async function ensureDefaultHomepageSettings() {
  const existing = await db
    .select({ id: siteSettings.id })
    .from(siteSettings)
    .where(eq(siteSettings.key, "homepage"))
    .limit(1);

  if (existing.length === 0) {
    await db.insert(siteSettings).values({
      key: "homepage",
      value: JSON.stringify(defaultHomepageSettings),
    });
  }
}

export async function getHomepageSettings() {
  await ensureDefaultHomepageSettings();
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, "homepage")).limit(1);

  if (!rows[0]) return defaultHomepageSettings;

  try {
    return { ...defaultHomepageSettings, ...(JSON.parse(rows[0].value) as Partial<HomepageSettings>) };
  } catch {
    return defaultHomepageSettings;
  }
}

export async function saveHomepageSettings(settings: HomepageSettings) {
  await ensureDefaultHomepageSettings();
  const value = JSON.stringify({ ...defaultHomepageSettings, ...settings });
  const rows = await db
    .update(siteSettings)
    .set({ value, updatedAt: new Date() })
    .where(eq(siteSettings.key, "homepage"))
    .returning();

  return rows[0];
}

export async function getCustomers() {
  return db.select().from(customers).orderBy(desc(customers.createdAt));
}

export async function createCustomer(data: { name: string; email?: string; phone?: string; source?: string; notes?: string }) {
  const inserted = await db
    .insert(customers)
    .values({
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      source: data.source || null,
      notes: data.notes || null,
    })
    .returning();
  return inserted[0];
}

export async function updateCustomerStatus(id: number, status: string) {
  const updated = await db.update(customers).set({ status }).where(eq(customers.id, id)).returning();
  return updated[0];
}

export async function deleteCustomer(id: number) {
  await db.delete(customers).where(eq(customers.id, id));
}

export async function getServiceRequests(type?: string) {
  if (type) {
    return db
      .select()
      .from(serviceRequests)
      .where(eq(serviceRequests.type, type))
      .orderBy(desc(serviceRequests.createdAt));
  }
  return db.select().from(serviceRequests).orderBy(desc(serviceRequests.createdAt));
}

export async function createServiceRequest(data: {
  type: string;
  name: string;
  email?: string;
  phone?: string;
  details?: Record<string, unknown>;
}) {
  const inserted = await db
    .insert(serviceRequests)
    .values({
      type: data.type,
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      details: data.details || {},
    })
    .returning();
  return inserted[0];
}

export async function updateServiceRequestStatus(id: number, status: string) {
  const updated = await db.update(serviceRequests).set({ status }).where(eq(serviceRequests.id, id)).returning();
  return updated[0];
}

export async function deleteServiceRequest(id: number) {
  await db.delete(serviceRequests).where(eq(serviceRequests.id, id));
}

export async function getMediaAssets(category?: string) {
  if (category) {
    return db.select().from(mediaAssets).where(eq(mediaAssets.category, category)).orderBy(desc(mediaAssets.createdAt));
  }
  return db.select().from(mediaAssets).orderBy(desc(mediaAssets.createdAt));
}

export async function createMediaAsset(data: { title: string; url: string; category?: string }) {
  const inserted = await db
    .insert(mediaAssets)
    .values({ title: data.title, url: data.url, category: data.category || "general" })
    .returning();
  return inserted[0];
}

export async function deleteMediaAsset(id: number) {
  await db.delete(mediaAssets).where(eq(mediaAssets.id, id));
}

const DEFAULT_SEO_PAGES = [
  { pageKey: "home", label: "Homepage" },
  { pageKey: "packages", label: "Holiday Packages" },
  { pageKey: "destinations", label: "Destinations" },
  { pageKey: "blog", label: "Blog" },
  { pageKey: "contact", label: "Contact" },
  { pageKey: "about", label: "About Us" },
];

export async function ensureDefaultSeoSettings() {
  const existing = await db.select({ pageKey: seoSettings.pageKey }).from(seoSettings);
  const existingKeys = new Set(existing.map((row) => row.pageKey));
  const missing = DEFAULT_SEO_PAGES.filter((page) => !existingKeys.has(page.pageKey));

  if (missing.length) {
    await db.insert(seoSettings).values(
      missing.map((page) => ({
        pageKey: page.pageKey,
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        ogImage: "",
      }))
    );
  }
}

export async function getSeoSettings() {
  await ensureDefaultSeoSettings();
  return db.select().from(seoSettings).orderBy(seoSettings.pageKey);
}

export async function upsertSeoSetting(
  pageKey: string,
  data: { metaTitle?: string; metaDescription?: string; metaKeywords?: string; ogImage?: string }
) {
  const updated = await db
    .update(seoSettings)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(seoSettings.pageKey, pageKey))
    .returning();
  return updated[0];
}

export async function getAnalyticsSummary() {
  const [
    packageRows,
    destinationRows,
    blogRows,
    contactRows,
    chatRows,
    testimonialRows,
    customerRows,
    requestRows,
  ] = await Promise.all([
    db.select().from(packages),
    db.select().from(destinations),
    db.select().from(blogPosts),
    db.select().from(contacts),
    db.select().from(chatMessages),
    db.select().from(reviews),
    db.select().from(customers),
    db.select().from(serviceRequests),
  ]);

  const requestsByType = ["visa", "flight", "hotel", "umrah"].map((type) => ({
    type,
    count: requestRows.filter((row) => row.type === type).length,
  }));

  return {
    totalPackages: packageRows.length,
    totalDestinations: destinationRows.length,
    totalBlogPosts: blogRows.length,
    totalContacts: contactRows.length,
    unreadContacts: contactRows.filter((row) => !row.read).length,
    totalChats: chatRows.length,
    openChats: chatRows.filter((row) => row.status === "open").length,
    totalTestimonials: testimonialRows.length,
    approvedTestimonials: testimonialRows.filter((row) => row.approved).length,
    totalCustomers: customerRows.length,
    totalServiceRequests: requestRows.length,
    newServiceRequests: requestRows.filter((row) => row.status === "new").length,
    requestsByType,
  };
}
