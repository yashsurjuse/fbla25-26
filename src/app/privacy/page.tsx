import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The Metropolitan Museum of Art",
  description: "Privacy Policy for The Metropolitan Museum of Art website.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen pb-24">
      <section className="bg-[#f3f4f4] border-b border-black/10 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-black sm:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-black/60 uppercase tracking-widest">
            Last Updated: June 2026
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 pt-16 sm:px-6 lg:px-10">
        <div className="prose prose-lg prose-black max-w-none">
          <p className="lead font-medium text-black/80">
            The Metropolitan Museum of Art respects your privacy. We are committed to protecting the personal information you share with us when you visit our website, purchase tickets, or make a donation.
          </p>
          
          <h2 className="font-display text-2xl font-bold mt-10 mb-4 border-b border-black/10 pb-2">1. Information We Collect</h2>
          <p>
            We may collect personal information that you provide voluntarily, such as your name, email address, postal address, and payment information when you register for an event, buy a ticket, or sign up for our newsletter.
          </p>
          <p>
            We also automatically collect certain non-personally identifiable information through cookies, such as your IP address, browser type, and pages visited, to help us improve the website experience.
          </p>

          <h2 className="font-display text-2xl font-bold mt-10 mb-4 border-b border-black/10 pb-2">2. How We Use Your Information</h2>
          <p>
            The Met uses your personal information to process transactions, send requested communications, manage your membership, and respond to your inquiries. We may use aggregated, anonymous data for analytical purposes to understand how visitors use our site.
          </p>

          <h2 className="font-display text-2xl font-bold mt-10 mb-4 border-b border-black/10 pb-2">3. Sharing of Information</h2>
          <p>
            The Met does not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
          </p>

          <h2 className="font-display text-2xl font-bold mt-10 mb-4 border-b border-black/10 pb-2">4. Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. All payment transactions are encrypted using secure socket layer (SSL) technology and processed through secure gateways.
          </p>

          <h2 className="font-display text-2xl font-bold mt-10 mb-4 border-b border-black/10 pb-2">5. Your Choices</h2>
          <p>
            You can opt out of receiving promotional emails from us by clicking the "unsubscribe" link at the bottom of any email we send. You may also contact us to update or delete your personal information.
          </p>
        </div>
      </section>
    </div>
  );
}
