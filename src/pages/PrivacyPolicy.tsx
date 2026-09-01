import { useEffect } from "react";
import { Link } from "react-router-dom";
import ULogo from "@/components/ULogo";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy — BulletproofFit";
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-[#E8E8E8]">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(255,255,255,0.08)] bg-black/95 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <ULogo size={32} className="text-white" />
            <span className="font-display text-xs sm:text-sm font-bold tracking-wider text-white truncate">
              BULLETPROOFFIT
            </span>
          </Link>
          <Link
            to="/"
            className="text-xs font-body text-[#A0A0A0] hover:text-white transition-colors"
          >
            ← Back
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-3xl md:text-5xl font-black font-display text-white mb-2">
          BulletproofFit — Privacy Policy
        </h1>
        <p className="text-sm text-[#808080] font-body mb-10">
          Effective date: September 1, 2026. Applies to the BulletproofFit iOS app.
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-heading text-white mb-3">
            1. Information We Collect
          </h2>
          <p className="text-[#C0C0C0] font-body leading-relaxed mb-4">
            BulletproofFit is local-first: the app works fully without an account, using an anonymous on-device session. If you choose to create an account, we collect:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[#C0C0C0] font-body leading-relaxed">
            <li>
              <strong className="text-white">Email Address</strong> — the email you sign up with, used to create/secure your account and sign in across devices.
            </li>
            <li>
              <strong className="text-white">Health data</strong> — nutrition and workout data written to Apple Health, only if you turn on the optional "Sync with Apple Health" toggle. Write-only; we do not read your existing Health data.
            </li>
            <li>
              <strong className="text-white">Fitness data</strong> — workouts, exercises, sets, and training-plan progress you log in the app.
            </li>
            <li>
              <strong className="text-white">Other user content</strong> — photos you take of food for AI recognition, voice recordings for logging food or asking your coach, and your AI Coach messages.
            </li>
            <li>
              <strong className="text-white">User ID</strong> — an internal account identifier from our authentication provider.
            </li>
            <li>
              <strong className="text-white">Purchase history</strong> — subscription and purchase status, used to unlock paid features and manage your subscription.
            </li>
          </ul>
          <p className="text-[#C0C0C0] font-body leading-relaxed mt-4">
            We do not collect precise location, browsing history, contacts, or advertising identifiers, and the app does not request location permission.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-heading text-white mb-3">
            2. How We Use Your Information
          </h2>
          <p className="text-[#C0C0C0] font-body leading-relaxed">
            To provide core app functionality (meal logging, workout tracking, AI food recognition, AI coaching), manage your account and sync across devices, process subscription purchases, maintain security, and communicate with you about your account. We do not use your data for third-party advertising and we do not sell your personal data.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-heading text-white mb-3">
            3. AI Features
          </h2>
          <p className="text-[#C0C0C0] font-body leading-relaxed">
            When you use Photo AI, Voice Log, or the AI Coach, the relevant photo, voice transcript, or message is sent from your device to our backend, which forwards it to our AI provider (OpenAI) solely to generate a response. This data is not used to train models and is not linked to advertising.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-heading text-white mb-3">
            4. Third Parties We Work With
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-[#C0C0C0] font-body leading-relaxed">
            <li>
              <strong className="text-white">Supabase</strong> (database, authentication, backend hosting)
            </li>
            <li>
              <strong className="text-white">OpenAI</strong> (processes food photos, voice transcripts, and coach messages to generate AI responses)
            </li>
            <li>
              <strong className="text-white">RevenueCat</strong> (manages subscription status/entitlements)
            </li>
            <li>
              <strong className="text-white">Apple</strong> (processes In-App Purchases; Apple Health sync and Face ID run entirely on-device)
            </li>
          </ul>
          <p className="text-[#C0C0C0] font-body leading-relaxed mt-4">
            These providers may process data outside your country of residence; where required we rely on their standard contractual safeguards for international transfers.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-heading text-white mb-3">
            5. Data Retention
          </h2>
          <p className="text-[#C0C0C0] font-body leading-relaxed">
            We retain your account data for as long as your account is active. Deleting your account from within the app (Profile → Account → Delete Account) permanently removes your account and associated logged data from our systems.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-heading text-white mb-3">
            6. Data Security
          </h2>
          <p className="text-[#C0C0C0] font-body leading-relaxed">
            All data is transmitted using TLS encryption. Database access is protected with row-level security. Session tokens are stored in the iOS Keychain. You can optionally lock the app with Face ID.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-heading text-white mb-3">
            7. Your Rights
          </h2>
          <p className="text-[#C0C0C0] font-body leading-relaxed">
            Depending on where you live, you may have rights under GDPR (EU/UK) or U.S. state privacy laws (e.g. California's CCPA/CPRA), including the right to access, correct, delete, export, object to/restrict processing, and withdraw consent. Contact us to exercise these rights; we'll respond within the timeframe required by applicable law.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-heading text-white mb-3">
            8. Children's Privacy
          </h2>
          <p className="text-[#C0C0C0] font-body leading-relaxed">
            BulletproofFit is not directed to children and we do not knowingly collect personal information from anyone under 16. Contact us if you believe a child has provided personal information and we will delete it.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-heading text-white mb-3">
            9. Changes to This Policy
          </h2>
          <p className="text-[#C0C0C0] font-body leading-relaxed">
            We may update this policy from time to time; material changes will be reflected by updating the effective date above.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-heading text-white mb-3">
            10. Contact Us
          </h2>
          <p className="text-[#C0C0C0] font-body leading-relaxed">
            Mohamed Ibrahim (Bulletproofbuilt)
            <br />
            Email:{" "}
            <a
              href="mailto:info@mohamedibrahim.biz"
              className="text-white underline hover:text-[#C0C0C0]"
            >
              info@mohamedibrahim.biz
            </a>
            <br />
            Phone:{" "}
            <a
              href="tel:+34645564465"
              className="text-white underline hover:text-[#C0C0C0]"
            >
              +34 645 564 465
            </a>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
