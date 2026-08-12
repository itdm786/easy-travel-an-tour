import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { packages } from "@/db/schema";
import { ensureCmsSeedData } from "@/lib/cms";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, CheckCircle, Clock, MapPin, Star } from "lucide-react";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await ensureCmsSeedData();
  const rows = await db.select().from(packages).where(eq(packages.slug, slug)).limit(1);
  const pkg = rows[0];

  if (!pkg) return { title: "Package Not Found" };

  return {
    title: pkg.title,
    description: pkg.description,
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  await ensureCmsSeedData();
  const rows = await db.select().from(packages).where(eq(packages.slug, slug)).limit(1);
  const pkg = rows[0];

  if (!pkg) notFound();

  const highlights = Array.isArray(pkg.highlights) ? (pkg.highlights as string[]) : [];
  const inclusions = Array.isArray(pkg.inclusions) ? (pkg.inclusions as string[]) : [];
  const exclusions = Array.isArray(pkg.exclusions) ? (pkg.exclusions as string[]) : [];

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <Link href="/holiday-packages" className="mb-8 inline-flex items-center gap-2 text-sm text-text-light hover:text-accent">
          <ArrowLeft className="h-4 w-4" /> Back to packages
        </Link>

        <div className="relative overflow-hidden rounded-3xl bg-primary">
          <div className="h-[480px] bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${pkg.image})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-accent" /> {pkg.destination}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-accent" /> {pkg.duration}</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" /> {pkg.rating} ({pkg.reviews || 0} reviews)</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-white md:text-6xl">{pkg.title}</h1>
            <p className="mt-4 max-w-3xl text-white/65">{pkg.description}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <Section title="Highlights" items={highlights} />
            <Section title="Inclusions" items={inclusions} />
            <Section title="Exclusions" items={exclusions} muted />
          </div>

          <aside className="h-fit rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-black/[0.03]">
            <p className="text-sm text-text-light">Starting from</p>
            <p className="mt-1 font-display text-4xl font-bold text-primary">{formatPrice(pkg.price)}</p>
            {pkg.originalPrice && <p className="mt-1 text-text-light line-through">{formatPrice(pkg.originalPrice)}</p>}
            <Link href="/contact" className="mt-6 flex w-full items-center justify-center rounded-2xl bg-accent px-6 py-4 font-semibold text-primary transition-all hover:bg-accent-light">
              Request Booking
            </Link>
            <p className="mt-4 text-center text-xs text-text-light">Our consultant will confirm availability and final price.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Section({ title, items, muted = false }: { title: string; items: string[]; muted?: boolean }) {
  if (!items.length) return null;
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-text">{title}</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm text-text-light">
            <CheckCircle className={`mt-0.5 h-4 w-4 shrink-0 ${muted ? "text-text-light" : "text-accent"}`} />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
