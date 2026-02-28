import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus, ArrowRight, Crown, Diamond, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { STRIPE_TIERS } from "@/lib/stripe";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ULogo from "@/components/ULogo";
import ThemeToggle from "@/components/ThemeToggle";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

const FREE_FEATURES = [
  "Manual food search + logging",
  "Basic calorie & macro tracking",
  "7-day meal history",
  "1 progress photo/month",
  "Basic workout logging",
  "Water tracking",
  "Daily streak counter",
  "3 barcode scans/day",
];

const PRO_FEATURES = [
  "Everything in Free",
  "Unlimited barcode scanning",
  "Photo AI food recognition",
  "Voice Commander",
  "Smart meal & workout suggestions",
  "Unlimited progress photos",
  "Before/After comparison slider",
  "AI Nutrition Coach (chat)",
  "Advanced analytics (30/90/365 days)",
  "AI-generated weekly meal plans",
  "Full nutrition breakdown",
  "Predictive goal timeline",
  "Data export (CSV + PDF)",
  "Priority AI response speed",
];

const ELITE_FEATURES = [
  "Everything in Pro",
  "Coach Dashboard (up to 20 clients)",
  "Shareable progress link",
  "Custom macro formula builder",
  "Branded PDF progress reports",
  "Blood sugar impact score",
  "Supplement stack tracker",
  "Early access to new features",
  "Priority support (24h response)",
  "White-label profile link",
];

const COMPARISON_ROWS = [
  { feature: "Food logging", free: "✓", pro: "✓", elite: "✓" },
  { feature: "Calorie & macro tracking", free: "✓", pro: "✓", elite: "✓" },
  { feature: "Meal history", free: "7 days", pro: "Unlimited", elite: "Unlimited" },
  { feature: "Barcode scanning", free: "3/day", pro: "Unlimited", elite: "Unlimited" },
  { feature: "Photo AI recognition", free: "—", pro: "✓", elite: "✓" },
  { feature: "Voice Commander", free: "—", pro: "✓", elite: "✓" },
  { feature: "Progress photos", free: "1/month", pro: "Unlimited", elite: "Unlimited" },
  { feature: "Analytics", free: "Basic", pro: "Advanced", elite: "Advanced" },
  { feature: "AI Nutrition Coach", free: "—", pro: "✓", elite: "✓" },
  { feature: "Meal plans", free: "—", pro: "AI-generated", elite: "AI-generated" },
  { feature: "Data export", free: "—", pro: "CSV + PDF", elite: "CSV + PDF" },
  { feature: "Coach Dashboard", free: "—", pro: "—", elite: "20 clients" },
  { feature: "Custom macro formulas", free: "—", pro: "—", elite: "✓" },
  { feature: "Branded reports", free: "—", pro: "—", elite: "✓" },
  { feature: "Priority support", free: "—", pro: "—", elite: "24h" },
];

const FAQ_ITEMS = [
  { q: "Can I cancel anytime?", a: "Yes, immediately. No questions asked. Your access continues until the end of your billing period." },
  { q: "What happens to my data if I downgrade?", a: "Your data is kept for 30 days, then archived. You can always re-upgrade to restore full access." },
  { q: "Is the free trial really free?", a: "No card. No catch. Full Pro features for 14 days. If you don't upgrade, you keep the Free plan forever." },
  { q: "Does lifetime include future features?", a: "All Pro features, forever, including every new feature we ship. You'll never pay again." },
  { q: "Can I import my MyFitnessPal data?", a: "Yes, free for all plans. Export your MFP data as CSV, upload it in our app, and we'll import everything." },
];

const PricingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tier, startCheckout } = useSubscription();
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [counters, setCounters] = useState({ founding: 0, foundingMax: 10000, lifetime: 0, lifetimeMax: 500 });

  useEffect(() => {
    const fetchCounters = async () => {
      const { data } = await supabase.from("app_counters").select("*");
      if (data) {
        const founding = data.find(c => c.id === "founding_members");
        const lifetime = data.find(c => c.id === "lifetime_deals");
        setCounters({
          founding: founding?.count || 0,
          foundingMax: founding?.max_count || 10000,
          lifetime: lifetime?.count || 0,
          lifetimeMax: lifetime?.max_count || 500,
        });
      }
    };
    fetchCounters();
  }, []);

  const handleCheckout = async (priceId: string, mode: "subscription" | "payment" = "subscription") => {
    if (!user) {
      navigate("/auth");
      return;
    }
    try {
      await startCheckout(priceId, mode);
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  const lifetimeRemaining = counters.lifetimeMax - counters.lifetime;
  const lifetimeSoldOut = lifetimeRemaining <= 0;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-3">
            <ULogo size={32} />
            <span className="font-display text-sm font-bold tracking-wider">BULLETPROOFFIT</span>
          </button>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {!user && (
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate("/auth")}
                className="bg-foreground text-background px-5 py-2 rounded-[4px] text-sm font-semibold font-body">
                Sign Up
              </motion.button>
            )}
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-6">
            <p className="code-label text-muted-foreground mb-3">SYS:06 — PRICING</p>
            <h1 className="text-4xl md:text-6xl font-black font-display chrome-text">CHOOSE YOUR PROTOCOL</h1>
            <p className="text-muted-foreground font-body mt-3">No tricks. No hidden fees. Cancel anytime.</p>
          </motion.div>

          {/* Billing toggle */}
          <motion.div variants={fadeUp} className="flex justify-center mb-12">
            <div className="terminal-card !p-1 flex items-center gap-1">
              <button
                onClick={() => setAnnual(false)}
                className={`px-5 py-2.5 rounded-[3px] text-sm font-semibold font-body transition-all ${
                  !annual ? "bg-foreground text-background" : "text-muted-foreground"
                }`}
              >
                MONTHLY
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-5 py-2.5 rounded-[3px] text-sm font-semibold font-body transition-all ${
                  annual ? "bg-foreground text-background" : "text-muted-foreground"
                }`}
              >
                ANNUAL — SAVE 50%
              </button>
            </div>
          </motion.div>

          {/* Pricing cards */}
          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6 mb-16">
            {/* FREE */}
            <motion.div variants={fadeUp} className="terminal-card !p-8 flex flex-col">
              <p className="code-label text-muted-foreground mb-2">FREE</p>
              <h3 className="text-3xl font-black font-display text-foreground">$0</h3>
              <p className="text-sm text-muted-foreground font-body mb-6">forever</p>
              <ul className="space-y-2.5 flex-1 mb-8">
                {FREE_FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                    <Check className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button whileTap={{ scale: 0.97 }}
                onClick={() => navigate(user ? "/" : "/auth")}
                className="w-full py-3 rounded-[4px] border border-border text-sm font-semibold font-body text-foreground hover:bg-accent transition-colors">
                {tier === "free" ? "CURRENT PLAN" : "START FREE"}
              </motion.button>
            </motion.div>

            {/* PRO */}
            <motion.div variants={fadeUp}
              className="terminal-card !p-8 flex flex-col relative overflow-hidden"
              style={{ border: "1px solid rgba(192,192,192,0.35)" }}
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-bold font-body tracking-wider px-2.5 py-1 rounded-[3px] chrome-bar text-background">
                  MOST POPULAR
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-foreground" />
                <p className="code-label text-foreground">PRO</p>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={annual ? "annual" : "monthly"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  {annual ? (
                    <>
                      <h3 className="text-3xl font-black font-display text-foreground">
                        <span className="line-through text-muted-foreground text-xl mr-2">${STRIPE_TIERS.pro_annual.price}</span>
                        $39.99
                      </h3>
                      <p className="text-sm text-muted-foreground font-body mb-1">/year — Founding Member Price</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-3xl font-black font-display text-foreground">${STRIPE_TIERS.pro_monthly.price}</h3>
                      <p className="text-sm text-muted-foreground font-body mb-1">/month</p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
              <p className="text-xs text-muted-foreground font-body mb-6">
                {counters.foundingMax - counters.founding} founding spots remaining
              </p>
              <ul className="space-y-2.5 flex-1 mb-8">
                {PRO_FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                    <Check className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button whileTap={{ scale: 0.97 }}
                onClick={() => handleCheckout(annual ? STRIPE_TIERS.pro_annual.price_id : STRIPE_TIERS.pro_monthly.price_id)}
                disabled={tier === "pro"}
                className="w-full py-3 rounded-[4px] bg-foreground text-background text-sm font-bold font-body disabled:opacity-50 btn-chrome-shimmer">
                {tier === "pro" ? "CURRENT PLAN" : "START 14-DAY FREE TRIAL"}
              </motion.button>
              <p className="text-[10px] text-center text-muted-foreground font-body mt-2">No credit card required</p>
            </motion.div>

            {/* ELITE */}
            <motion.div variants={fadeUp}
              className="terminal-card !p-8 flex flex-col relative"
              style={{
                border: "1px solid transparent",
                backgroundImage: "linear-gradient(var(--card-raw, #0D0D0D), var(--card-raw, #0D0D0D)), linear-gradient(135deg, #606060, #C0C0C0, #808080, #E8E8E8, #606060)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-bold font-body tracking-wider text-muted-foreground">FOR COACHES & ATHLETES</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Diamond className="w-5 h-5 text-foreground" />
                <p className="code-label text-foreground font-display">ELITE</p>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={annual ? "annual" : "monthly"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  <h3 className="text-3xl font-black font-display text-foreground">
                    ${annual ? STRIPE_TIERS.elite_annual.price : STRIPE_TIERS.elite_monthly.price}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body mb-6">/{annual ? "year" : "month"}</p>
                </motion.div>
              </AnimatePresence>
              <ul className="space-y-2.5 flex-1 mb-8">
                {ELITE_FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                    <Check className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button whileTap={{ scale: 0.97 }}
                onClick={() => handleCheckout(annual ? STRIPE_TIERS.elite_annual.price_id : STRIPE_TIERS.elite_monthly.price_id)}
                disabled={tier === "elite"}
                className="w-full py-3 rounded-[4px] text-sm font-bold font-body chrome-bar text-background disabled:opacity-50">
                {tier === "elite" ? "CURRENT PLAN" : "GO ELITE"}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* LIFETIME DEAL */}
          <motion.div variants={fadeUp} className="max-w-lg mx-auto mb-20">
            <div className="terminal-card !p-8 text-center" style={{ border: "1px solid rgba(192,192,192,0.25)" }}>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Diamond className="w-5 h-5" />
                <span className="font-display text-lg font-bold tracking-wider">LIFETIME ACCESS</span>
              </div>
              <h3 className="text-4xl font-black font-display chrome-text mb-1">${STRIPE_TIERS.lifetime.price}</h3>
              <p className="text-sm text-muted-foreground font-body mb-4">one time, forever</p>

              {/* Progress bar */}
              <div className="w-full h-3 bg-secondary rounded-full overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(counters.lifetime / counters.lifetimeMax) * 100}%` }}
                  className="h-full chrome-bar rounded-full"
                />
              </div>
              <p className="text-xs text-muted-foreground font-mono mb-4">
                {lifetimeRemaining}/{counters.lifetimeMax} remaining
              </p>

              <motion.button whileTap={{ scale: 0.97 }}
                onClick={() => !lifetimeSoldOut && handleCheckout(STRIPE_TIERS.lifetime.price_id, "payment")}
                disabled={lifetimeSoldOut}
                className="w-full py-3 rounded-[4px] bg-foreground text-background text-sm font-bold font-body disabled:opacity-50 flex items-center justify-center gap-2">
                {lifetimeSoldOut ? "SOLD OUT — JOIN WAITLIST" : (
                  <>CLAIM LIFETIME ACCESS <ArrowRight className="w-4 h-4" /></>
                )}
              </motion.button>
              <p className="text-[10px] text-muted-foreground font-body mt-2 flex items-center justify-center gap-1">
                <Zap className="w-3 h-3" /> Includes all future Pro features
              </p>
            </div>
          </motion.div>

          {/* Feature comparison */}
          <motion.div variants={fadeUp} className="mb-20">
            <h2 className="text-2xl font-black font-display chrome-text text-center mb-8">FEATURE COMPARISON</h2>
            <div className="terminal-card !p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-body font-semibold text-foreground">Feature</th>
                      <th className="p-4 font-body font-semibold text-muted-foreground text-center">Free</th>
                      <th className="p-4 font-body font-semibold text-foreground text-center">Pro</th>
                      <th className="p-4 font-body font-semibold text-foreground text-center">Elite</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row, i) => (
                      <tr key={row.feature} className={i % 2 === 0 ? "bg-card" : "bg-secondary/30"}>
                        <td className="p-4 font-body text-foreground">{row.feature}</td>
                        {[row.free, row.pro, row.elite].map((val, j) => (
                          <td key={j} className="p-4 text-center font-body">
                            {val === "✓" ? (
                              <Check className="w-4 h-4 text-foreground mx-auto" />
                            ) : val === "—" ? (
                              <Minus className="w-4 h-4 text-muted-foreground mx-auto" />
                            ) : (
                              <span className="text-muted-foreground text-xs">{val}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div variants={fadeUp} className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-black font-display chrome-text text-center mb-8">FAQ</h2>
            <div className="space-y-2">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="terminal-card !p-0 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="text-sm font-semibold font-body text-foreground">{item.q}</span>
                    {openFaq === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-sm text-muted-foreground font-body">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ULogo size={24} />
            <span className="text-xs text-muted-foreground font-body">© 2026 BULLETPROOFFIT</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate("/")} className="text-xs text-muted-foreground hover:text-foreground font-body transition-colors">Home</button>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground font-body transition-colors">Privacy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground font-body transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
