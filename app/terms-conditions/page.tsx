import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Easy Travel & Tours terms and conditions — booking policies, cancellation rules, payment terms, and liability information.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-display text-4xl font-bold text-text md:text-5xl">Terms & Conditions</h1>
        <p className="mt-2 text-text-light">Last updated: January 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-text-light">
          <section>
            <h2 className="font-display text-xl font-bold text-text">1. Acceptance of Terms</h2>
            <p className="mt-2">By using the Easy Travel & Tours website and services, you agree to these Terms & Conditions. If you disagree with any part, please do not use our services.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-text">2. Booking & Payment</h2>
            <p className="mt-2">All bookings are subject to availability. Prices are quoted in Pakistani Rupees (PKR) unless otherwise stated. Full or partial payment may be required at the time of booking depending on the service. We accept bank transfers, credit/debit cards, and cash payments at our office.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-text">3. Cancellation & Refunds</h2>
            <p className="mt-2">Cancellation policies vary by service (flights, hotels, tours, Umrah packages). Airlines and hotels have their own cancellation terms which apply. Refund processing may take 7-21 working days. Some services are non-refundable after booking confirmation. Please review the specific cancellation policy for your booking.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-text">4. Travel Documents</h2>
            <p className="mt-2">It is your responsibility to ensure you have valid passports (minimum 6 months validity), visas, and any other required travel documents. Easy Travel & Tours assists with visa processing but does not guarantee visa approval, which remains at the discretion of the issuing authority.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-text">5. Liability</h2>
            <p className="mt-2">Easy Travel & Tours acts as an intermediary between you and travel service providers (airlines, hotels, tour operators). We are not liable for delays, cancellations, overbooking, or other issues caused by these providers. We recommend purchasing travel insurance for comprehensive protection.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold text-text">6. Changes & Modifications</h2>
            <p className="mt-2">We reserve the right to modify these terms at any time. Changes become effective upon posting. Continued use of our services constitutes acceptance of updated terms.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
