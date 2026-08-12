import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary">
      <div className="text-center">
        <p className="font-display text-[10rem] font-bold leading-none text-accent/20 md:text-[15rem]">404</p>
        <div className="-mt-16">
          <h1 className="font-display text-3xl font-bold text-white md:text-5xl">Page Not Found</h1>
          <p className="mx-auto mt-4 max-w-md text-white/50">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find your way.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/" className="flex items-center gap-2 rounded-2xl bg-accent px-6 py-3.5 font-semibold text-primary transition-all hover:bg-accent-light hover:shadow-lg">
              <Home className="h-4 w-4" /> Go Home
            </Link>
            <Link href="/contact" className="flex items-center gap-2 rounded-2xl border border-white/20 px-6 py-3.5 font-semibold text-white transition-all hover:border-accent hover:text-accent">
              <ArrowLeft className="h-4 w-4" /> Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
