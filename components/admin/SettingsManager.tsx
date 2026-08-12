"use client";

import { useEffect, useState } from "react";
import { ImageIcon, KeyRound, Save, Upload } from "lucide-react";

type BrandingSettings = {
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

export function SettingsManager({ initialSettings }: { initialSettings: BrandingSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    if (settings.faviconUrl) {
      let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = settings.faviconUrl;
    }
  }, [settings.faviconUrl]);

  const readFile = (file: File, key: "logoUrl" | "faviconUrl") => {
    const reader = new FileReader();
    reader.onload = () => {
      setSettings((current) => ({ ...current, [key]: String(reader.result || "") }));
    };
    reader.readAsDataURL(file);
  };

  const saveBranding = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const response = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error || "Unable to save settings");
      setSaving(false);
      return;
    }

    setSettings(result.settings);
    setMessage("Website logo, favicon, and sizes saved successfully.");
    setSaving(false);
  };

  const changePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setPasswordSaving(true);
    setPasswordMessage("");

    if (newPassword !== confirmPassword) {
      setPasswordMessage("New password and confirmation do not match.");
      setPasswordSaving(false);
      return;
    }

    const response = await fetch("/api/admin/password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const result = await response.json();

    if (!response.ok) {
      setPasswordMessage(result.error || "Unable to change password");
      setPasswordSaving(false);
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordMessage("Password changed successfully. Use the new password on next login.");
    setPasswordSaving(false);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
      <form onSubmit={saveBranding} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <ImageIcon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">Website Branding</h2>
            <p className="text-sm text-white/45">Upload/change website logo, favicon, and display sizes from the portal.</p>
          </div>
        </div>

        {message && <div className="mb-5 rounded-2xl border border-accent/20 bg-accent/10 px-5 py-3 text-sm text-accent">{message}</div>}

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Site Name" value={settings.siteName} onChange={(value) => setSettings({ ...settings, siteName: value })} />
          <Field label="Tagline" value={settings.tagline} onChange={(value) => setSettings({ ...settings, tagline: value })} />
          <Field label="Logo URL" value={settings.logoUrl} onChange={(value) => setSettings({ ...settings, logoUrl: value })} />
          <Field label="Favicon URL" value={settings.faviconUrl} onChange={(value) => setSettings({ ...settings, faviconUrl: value })} />
          <Field label="Original Logo Width (px)" type="number" value={String(settings.logoWidth)} onChange={(value) => setSettings({ ...settings, logoWidth: Number(value) })} />
          <Field label="Original Logo Height (px)" type="number" value={String(settings.logoHeight)} onChange={(value) => setSettings({ ...settings, logoHeight: Number(value) })} />
          <Field label="Header Logo Width (px)" type="number" value={String(settings.headerLogoWidth)} onChange={(value) => setSettings({ ...settings, headerLogoWidth: Number(value) })} />
          <Field label="Footer Logo Width (px)" type="number" value={String(settings.footerLogoWidth)} onChange={(value) => setSettings({ ...settings, footerLogoWidth: Number(value) })} />
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <UploadBox label="Upload Website Logo" help="Recommended 220x64px PNG/SVG transparent background" onFile={(file) => readFile(file, "logoUrl")} />
          <UploadBox label="Upload Favicon" help="Recommended 32x32px PNG/ICO" onFile={(file) => readFile(file, "faviconUrl")} />
        </div>

        <div className="mt-5 rounded-2xl border border-accent/20 bg-accent/10 p-5 text-sm text-accent">
          {settings.logoGuidelines}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
            <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-white/40 uppercase">Logo Preview</p>
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt="Logo preview" style={{ width: settings.headerLogoWidth, maxWidth: "100%" }} className="rounded-xl bg-white/5 p-2" />
            ) : (
              <p className="text-sm text-white/45">No uploaded logo. The default compass icon will show.</p>
            )}
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
            <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-white/40 uppercase">Favicon Preview</p>
            {settings.faviconUrl ? (
              <img src={settings.faviconUrl} alt="Favicon preview" className="h-10 w-10 rounded-lg bg-white p-1" />
            ) : (
              <p className="text-sm text-white/45">No favicon uploaded yet.</p>
            )}
          </div>
        </div>

        <button disabled={saving} className="mt-6 flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 font-semibold text-primary disabled:opacity-60">
          <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Branding"}
        </button>
      </form>

      <form onSubmit={changePassword} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <KeyRound className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">Change Password</h2>
            <p className="text-sm text-white/45">Reset your own portal password securely.</p>
          </div>
        </div>

        {passwordMessage && <div className="mb-5 rounded-2xl border border-accent/20 bg-accent/10 px-5 py-3 text-sm text-accent">{passwordMessage}</div>}

        <div className="space-y-4">
          <Field label="Current Password" type="password" value={currentPassword} onChange={setCurrentPassword} />
          <Field label="New Password" type="password" value={newPassword} onChange={setNewPassword} />
          <Field label="Confirm New Password" type="password" value={confirmPassword} onChange={setConfirmPassword} />
        </div>

        <button disabled={passwordSaving} className="mt-6 flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 font-semibold text-primary disabled:opacity-60">
          <Save className="h-4 w-4" /> {passwordSaving ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label>
      <span className="mb-2 block text-xs font-semibold tracking-[0.15em] text-white/40 uppercase">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none focus:border-accent" />
    </label>
  );
}

function UploadBox({ label, help, onFile }: { label: string; help: string; onFile: (file: File) => void }) {
  return (
    <label className="block cursor-pointer rounded-2xl border border-dashed border-white/15 bg-black/10 p-5 transition-all hover:border-accent/50">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Upload className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-white">{label}</p>
          <p className="text-xs text-white/45">{help}</p>
        </div>
      </div>
      <input type="file" accept="image/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) onFile(file); }} />
    </label>
  );
}
