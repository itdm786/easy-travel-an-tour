import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Easy Travel & Tours privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-display text-4xl font-bold text-text md:text-5xl">Privacy Policy</h1>
        <p className="mt-2 text-text-light">Last updated: January 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-text-light">
          <section>
            <h2 className="font-display text-xl font-bold text-text">1. Information We Collect</h2>
            <p className="mt-2">We collect personal information that you voluntarily provide when using our services, including your name, email address, phone number, passport details, travel preferences, and payment information. We also automatically collect certain data including IP addresses, browser type, and pages visited to improve our services.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-text">2. How We Use Your Information</h2>
            <p className="mt-2">Your information is used to process bookings, provide travel services, communicate about your reservations, send promotional offers with your consent, improve our website and services, comply with legal obligations, and prevent fraudulent activities.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-text">3. Information Sharing</h2>
            <p className="mt-2">We share your information with airlines, hotels, visa processing authorities, and other service providers necessary to fulfill your travel bookings. We do not sell your personal information to third parties. We may disclose information when required by law or to protect our rights.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-text">4. Data Security</h2>
            <p className="mt-2">We implement industry-standard security measures including encryption, secure servers, and access controls to protect your personal data. However, no method of transmission over the Internet is 100% secure.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-text">5. Your Rights</h2>
            <p className="mt-2">You have the right to access, correct, or delete your personal information. You may opt out of marketing communications at any time. To exercise these rights, please contact us at info@easytravel.com.pk.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-text">6. Contact Us</h2>
            <p className="mt-2">For questions about this Privacy Policy, contact Easy Travel & Tours at Office #22, 1st Floor, Rose Plaza, I-8 Markaz, Islamabad, Pakistan, or email info@easytravel.com.pk.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
