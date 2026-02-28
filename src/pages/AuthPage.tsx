import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import ULogo from "@/components/ULogo";

type AuthView = "login" | "signup" | "forgot";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

const AuthPage = () => {
  const [view, setView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { signUp, signIn, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    if (view === "forgot") {
      const { error } = await resetPassword(email);
      if (error) { toast.error(error.message); } else { toast.success("Password reset email sent."); setView("login"); }
      setSubmitting(false); return;
    }
    if (view === "signup") {
      if (password.length < 6) { toast.error("Password must be at least 6 characters"); setSubmitting(false); return; }
      const { error } = await signUp(email, password, displayName);
      if (error) { toast.error(error.message); } else { toast.success("Check your email to confirm your account!"); }
    } else {
      const { error } = await signIn(email, password);
      if (error) { toast.error(error.message); }
    }
    setSubmitting(false);
  };

  const inputClass = "w-full pl-10 pr-4 py-3 bg-card border border-border rounded-[4px] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring font-body";

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative scanlines">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(to right, rgba(192,192,192,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(192,192,192,0.02) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      <motion.div variants={stagger} initial="hidden" animate="show" className="w-full max-w-sm space-y-8 relative z-10">
        <motion.div variants={fadeUp} className="text-center space-y-4">
          <ULogo size={56} className="mx-auto text-white" />
          <p className="font-display text-sm font-bold tracking-[0.3em] text-foreground">BULLETPROOFFIT</p>
          <p className="code-label mt-2">
            {view === "forgot" ? "SYS: PASSWORD RECOVERY" : view === "signup" ? "SYS: CREATE ACCOUNT" : "SYS: AUTHENTICATE"}
          </p>
        </motion.div>

        <motion.form variants={fadeUp} onSubmit={handleSubmit} className="space-y-4">
          {view === "signup" && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className={inputClass} />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
          </div>
          {view !== "forgot" && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                className={`${inputClass} !pr-10`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
              </button>
            </div>
          )}
          {view === "login" && (
            <button type="button" onClick={() => setView("forgot")} className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">
              Forgot password?
            </button>
          )}
          <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={submitting}
            className="w-full bg-foreground text-background py-3.5 rounded-[4px] font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 font-body btn-chrome-shimmer transition-all">
            {submitting ? "Please wait..." : view === "forgot" ? "Send Reset Email" : view === "signup" ? "Create Account" : "Sign In"}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.form>

        <motion.div variants={fadeUp} className="text-center space-y-2">
          {view === "forgot" ? (
            <button onClick={() => setView("login")} className="text-sm text-muted-foreground hover:text-foreground font-body flex items-center gap-1 mx-auto">
              <ArrowLeft className="w-3 h-3" /> Back to sign in
            </button>
          ) : (
            <p className="text-sm text-muted-foreground font-body">
              {view === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
              <button onClick={() => setView(view === "signup" ? "login" : "signup")} className="text-foreground font-medium hover:underline">
                {view === "signup" ? "Sign in" : "Sign up"}
              </button>
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
