"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Compass, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@easytravel.com.pk");
  const [password, setPassword] = useState("EasyTravel@2026");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Unable to login");
      setLoading(false);
      return;
    }

    router.push(result.redirectTo || "/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen overflow-hidden bg-primary text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: "url(https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-black" />

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        <div className="hidden items-center p-12 lg:flex">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm text-accent">
              <ShieldCheck className="h-4 w-4" /> Secure Admin Portal
            </div>
            <h1 className="font-display text-6xl font-bold leading-tight">
              Manage Premium Travel Operations
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/60">
              Control packages, leads, visa requests, customer inquiries, testimonials, media, and SEO from one elegant dashboard.
            </p>
          </motion.div>
        </div>

        <div className="flex items-center justify-center px-6 py-12">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/30 backdrop-blur-2xl"
          >
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-primary">
                <Compass className="h-9 w-9" />
              </div>
              <h2 className="font-display text-3xl font-bold">Admin Login</h2>
              <p className="mt-2 text-sm text-white/50">Easy Travel & Tours control panel</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium tracking-[0.15em] text-white/50 uppercase">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-accent"
                    placeholder="admin@easytravel.com.pk"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium tracking-[0.15em] text-white/50 uppercase">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-11 pr-12 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-accent"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-accent"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-accent px-6 py-4 font-semibold text-primary transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login to Admin Panel"}
            </button>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/10 p-4 text-xs text-white/50">
              <p className="font-semibold text-accent">Demo credentials are pre-filled.</p>
              <p className="mt-1">Change ADMIN_EMAIL and ADMIN_PASSWORD in the environment for production.</p>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
