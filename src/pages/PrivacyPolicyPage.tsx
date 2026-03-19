import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-10">
          Last updated: March 19, 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg text-foreground mb-3">1. Introduction</h2>
            <p>
              BULLETPROOFFIT ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (collectively, the "Service").
            </p>
          </section>

          <section>
            <h2 className="text-lg text-foreground mb-3">2. Information We Collect</h2>
            <p className="mb-3">We collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Account Information:</strong> Email address, display name, and password when you create an account.</li>
              <li><strong className="text-foreground">Health & Fitness Data:</strong> Weight, height, age, sex, body measurements, workout logs, meal logs, water intake, and fitness goals that you voluntarily enter.</li>
              <li><strong className="text-foreground">Payment Information:</strong> Payment details are processed securely by Stripe. We store only your Stripe customer ID and subscription status — never your card number.</li>
              <li><strong className="text-foreground">Usage Data:</strong> App interactions, feature usage patterns, and device information to improve the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg text-foreground mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, maintain, and improve the Service.</li>
              <li>To personalize your experience, including meal plans, workout recommendations, and progress tracking.</li>
              <li>To process payments and manage your subscription.</li>
              <li>To communicate with you about your account, updates, and support.</li>
              <li>To detect and prevent fraud or abuse.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg text-foreground mb-3">4. Data Storage & Security</h2>
            <p>
              Your data is stored securely using industry-standard encryption and cloud infrastructure. We use secure HTTPS connections for all data transmission. Access to your data is restricted to authorized personnel and automated systems necessary to operate the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-foreground mb-3">5. Third-Party Services</h2>
            <p className="mb-3">We use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Stripe:</strong> For secure payment processing. Stripe's privacy policy applies to payment data.</li>
              <li><strong className="text-foreground">AI Services:</strong> For food identification and meal planning features. Data sent to AI models is not used to train those models.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg text-foreground mb-3">6. Data Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share anonymized, aggregated data for analytics purposes. We may disclose information if required by law or to protect the rights and safety of our users.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-foreground mb-3">7. Data Retention & Deletion</h2>
            <p>
              We retain your data for as long as your account is active. You may request deletion of your account and all associated data at any time by contacting us. Upon account deletion, all personal data — including health metrics, workout logs, and meal history — will be permanently removed within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-foreground mb-3">8. Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, correct, or delete your personal data.</li>
              <li>Export your data in a portable format.</li>
              <li>Withdraw consent for data processing at any time.</li>
              <li>Opt out of non-essential communications.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg text-foreground mb-3">9. Children's Privacy</h2>
            <p>
              The Service is not intended for users under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-foreground mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy within the app. Your continued use of the Service after changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-foreground mb-3">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or your data, please contact us at:
            </p>
            <p className="mt-2 text-foreground">
              support@bulletprooffit.com
            </p>
          </section>
        </div>

        <div className="border-t border-border mt-12 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} BULLETPROOFFIT. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
