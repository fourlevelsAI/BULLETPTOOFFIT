import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Diamond, ArrowRight, RefreshCw } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";
import ULogo from "@/components/ULogo";
import { openExternal } from "@/lib/openExternal";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const WelcomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { profile, refetch } = useProfile();
  const [starting, setStarting] = useState(false);
  const [restoring, setRestoring] = useState(false);

  const expired = searchParams.get("expired") === "true";

  const handleStartTrial = async () => {
    if (!user) return;
    setStarting(true);
    try {
      const session = await supabase.auth.getSession();
      const { data, error } = await supabase.functions.invoke("start-trial", {
        headers: { Authorization: `Bearer ${session.data.session?.access_token}` },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast.success("Free trial activated! 14 days of Pro access.");
      await refetch();
      window.location.href = profile?.onboarding_completed ? "/" : "/onboarding";
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message === "Trial already used" ? "You've already used your free trial." : "Failed to start trial. Please try again.");
    } finally {
      setStarting(false);
    }
  };

  const handleSubscribe = async () => {
    if (!user) return;
    // Open Stripe checkout externally (works in native webview)
    try {
      const session = await supabase.auth.getSession();
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId: "price_1T5nAvANI7dNLF2nfrTQrCCe", mode: "subscription" },
        headers: { Authorization: `Bearer ${session.data.session?.access_token}` },
      });
      if (error) throw error;
      if (data?.url) openExternal(data.url);
    } catch {
      toast.error("Could not open checkout. Try again.");
    }
  };

  const handleRestore = async () => {
    if (!user) return;
    setRestoring(true);
    try {
      const { data, error } = await supabase.functions.invoke("check-subscription", {
        headers: { Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}` },
      });
      if (error) throw error;
      await refetch();
      if (data?.subscribed) {
        toast.success("Subscription restored!");
        navigate("/");
      } else {
        toast.info("No active subscription found.");
      }
    } catch {
      toast.error("Could not verify subscription.");
    } finally {
      setRestoring(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-md w-full space-y-8 text-center">
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-3">
          <ULogo size={56} className="text-foreground" />
          <h1 className="font-display text-xl font-bold tracking-wider text-foreground">BULLETPROOFFIT</h1>
        </motion.div>

        <motion.div variants={fadeUp}>
          <p className="code-label mb-2">
            {expired ? "SYS: TRIAL EXPIRED" : "SYS: ACCOUNT CREATED"}
          </p>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            {expired ? (
              <>Your 14-day free trial has ended. Your data is safe — subscribe to keep your progress.</>
            ) : (
              <>Welcome{profile?.display_name ? `, ${profile.display_name}` : ""}. Choose how you want to start.</>
            )}
          </p>
        </motion.div>

        {!expired && (
          <motion.div variants={fadeUp} className="terminal-card !p-6 text-left space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-foreground" />
              <span className="font-display text-sm font-bold tracking-wider text-foreground">START FREE 14-DAY TRIAL</span>
            </div>
            <p className="text-sm text-muted-foreground font-body">
              Full Pro access. No credit card required. Cancel any time.
            </p>
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleStartTrial} disabled={starting}
              className="w-full py-3 rounded-[4px] bg-foreground text-background text-sm font-bold font-body flex items-center justify-center gap-2 disabled:opacity-50">
              {starting ? "Activating..." : <>BEGIN FREE TRIAL <ArrowRight className="w-4 h-4" /></>}
            </motion.button>
          </motion.div>
        )}

        <motion.div variants={fadeUp} className="terminal-card !p-6 text-left space-y-3">
          <div className="flex items-center gap-2">
            <Diamond className="w-5 h-5 text-foreground" />
            <span className="font-display text-sm font-bold tracking-wider text-foreground">SUBSCRIBE NOW</span>
          </div>
          <div className="text-sm text-muted-foreground font-body space-y-1">
            <p>Pro: $9.99/mo or $39.99/yr</p>
            <p>Elite: $14.99/mo</p>
            <p>Lifetime: $79.99 once</p>
          </div>
          <motion.button whileTap={{ scale: 0.97 }} onClick={handleSubscribe}
            className="w-full py-3 rounded-[4px] border border-border text-foreground text-sm font-bold font-body flex items-center justify-center gap-2 hover:bg-accent transition-colors">
            {expired ? <>SUBSCRIBE NOW — FROM $9.99/mo <ArrowRight className="w-4 h-4" /></> : <>SUBSCRIBE <ArrowRight className="w-4 h-4" /></>}
          </motion.button>
        </motion.div>

        <motion.div variants={fadeUp}>
          <button onClick={handleRestore} disabled={restoring}
            className="text-xs text-muted-foreground font-body hover:text-foreground transition-colors flex items-center gap-1.5 mx-auto disabled:opacity-50">
            <RefreshCw className={`w-3 h-3 ${restoring ? "animate-spin" : ""}`} />
            {restoring ? "Checking..." : "Already have a subscription? Restore Purchase"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
