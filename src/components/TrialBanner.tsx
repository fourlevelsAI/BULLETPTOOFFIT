import { motion } from "framer-motion";
import { Zap, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TrialBannerProps {
  trialEnd: string | null;
  subscriptionStatus: string | null;
}

const TrialBanner = ({ trialEnd, subscriptionStatus }: TrialBannerProps) => {
  const navigate = useNavigate();

  if (subscriptionStatus !== "trialing" || !trialEnd) return null;

  const now = new Date();
  const end = new Date(trialEnd);
  const daysLeft = Math.max(0, Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  if (daysLeft <= 0) return null;

  const urgent = daysLeft <= 1;
  const warning = daysLeft <= 3;

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`w-full px-4 py-2.5 flex items-center justify-between gap-3 text-sm font-body ${
        urgent
          ? "bg-destructive/20 border-b border-destructive/30"
          : warning
          ? "bg-[hsl(40,80%,15%)] border-b border-[hsl(40,80%,25%)]"
          : "bg-accent border-b border-border"
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        {urgent ? (
          <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
        ) : (
          <Zap className="w-4 h-4 text-foreground shrink-0" />
        )}
        <span className={`text-xs font-medium truncate ${urgent ? "text-destructive" : warning ? "text-[hsl(40,80%,65%)]" : "text-foreground"}`}>
          {urgent
            ? "⚠️ TRIAL ENDS TOMORROW — Don't lose your progress"
            : warning
            ? `⚡ TRIAL ENDS IN ${daysLeft} DAYS — Lock in Pro access from $39.99/year`
            : `⚡ FREE TRIAL — ${daysLeft} days remaining`}
        </span>
      </div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/pricing")}
        className={`shrink-0 px-3 py-1 rounded-[3px] text-[11px] font-bold ${
          urgent
            ? "bg-destructive text-destructive-foreground"
            : "bg-foreground text-background"
        }`}
      >
        UPGRADE NOW
      </motion.button>
    </motion.div>
  );
};

export default TrialBanner;
