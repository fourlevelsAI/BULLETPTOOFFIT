import { useEffect } from "react";
import { Link } from "react-router-dom";
import ULogo from "@/components/ULogo";
import Footer from "@/components/Footer";

const TermsOfUse = () => {
  useEffect(() => {
    document.title = "Terms of Use — BulletproofFit";
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
        <h1 className="text-3xl md:text-5xl font-black font-display text-white mb-10">
          BulletproofFit — Terms of Use
        </h1>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-heading text-white mb-3">Acceptance</h2>
          <p className="text-[#C0C0C0] font-body leading-relaxed">
            By using BulletproofFit, you agree to these terms. If you don't agree, please don't use the app.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-heading text-white mb-3">Not medical advice</h2>
          <p className="text-[#C0C0C0] font-body leading-relaxed">
            BulletproofFit's coach, meal suggestions, and training plans are for general fitness and nutrition guidance only, not a substitute for professional medical, dietary, or medical advice. Consult a doctor before starting any new diet or exercise program, especially with an existing condition or injury.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-heading text-white mb-3">Accuracy of AI features</h2>
          <p className="text-[#C0C0C0] font-body leading-relaxed">
            Calorie and macro estimates from photo or voice logging are AI-generated estimates, not lab-verified measurements. Always use your own judgment, especially around allergens or medical dietary restrictions.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-heading text-white mb-3">Subscriptions</h2>
          <p className="text-[#C0C0C0] font-body leading-relaxed">
            Paid tiers, where offered, renew automatically until cancelled. You can manage or cancel a subscription anytime from your device's App Store account settings.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-heading text-white mb-3">Account & data</h2>
          <p className="text-[#C0C0C0] font-body leading-relaxed">
            You're responsible for the accuracy of the information you log. You can delete your account data at any time from Profile → Delete My Data.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-heading text-white mb-3">Changes</h2>
          <p className="text-[#C0C0C0] font-body leading-relaxed">
            We may update these terms as the app evolves. Continued use after an update means you accept the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-heading text-white mb-3">Contact</h2>
          <p className="text-[#C0C0C0] font-body leading-relaxed">
            <a
              href="mailto:info@mohamedibrahim.biz"
              className="text-white underline hover:text-[#C0C0C0]"
            >
              info@mohamedibrahim.biz
            </a>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfUse;
