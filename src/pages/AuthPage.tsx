import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import ULogo from "@/components/ULogo";

type AuthView = "login" | "signup" | "forgot";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

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
      if (error) { toast.error(error.message); }
      else { toast.success("Password reset email sent. Check your inbox."); setView("login"); }
      setSubmitting(false);
      return;
    }

    if (view === "signup") {
      if (password.length < 6) { toast.error("Password must be at least 6 characters"); setSubmitting(false); return; }
      const { error } = await signUp(email, password, displayName);
      if (error) { toast.error(error.message); }
      else { toast.success("Check your email to confirm your account!"); }
    } else {
      const { error } = await signIn(email, password);
      if (error) { toast.error(error.message); }
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="w-full max-w-sm space-y-8"
      >
        {/* Logo */}
        <motion.div variants={fadeUp} className="text-center space-y-4">
          <ULogo size={80} animated className="mx-auto" />
          <p className="code-label tracking-[0.3em]">BULLETPROOFFIT</p>
          <p className="section-label mt-2">
            {view === "forgot" ? "Password Recovery" : view === "signup" ? "Create Account" : "Welcome Back"}
          </p>
        </motion.div>

        {/* Form */}
        <motion.form variants={fadeUp} onSubmit={handleSubmit} className="space-y-4">
          {view === "signup" && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring font-body" />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring font-body" />
          </div>

          {view !== "forgot" && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                className="w-full pl-10 pr-10 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring font-body" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
              </button>
            </div>
          )}

          {view === "login" && (
            <button type="button" onClick={() => setView("forgot")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">
              Forgot password?
            </button>
          )}

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={submitting}
            className="w-full bg-foreground text-background py-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity font-body"
          >
            {submitting ? "Please wait..." : view === "forgot" ? "Send Reset Email" : view === "signup" ? "Create Account" : "Sign In"}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.form>

        {/* Toggle */}
        <motion.div variants={fadeUp} className="text-center space-y-2">
          {view === "forgot" ? (
            <button onClick={() => setView("login")}
              className="text-sm text-muted-foreground hover:text-foreground font-body flex items-center gap-1 mx-auto">
              <ArrowLeft className="w-3 h-3" /> Back to sign in
            </button>
          ) : (
            <p className="text-sm text-muted-foreground font-body">
              {view === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
              <button onClick={() => setView(view === "signup" ? "login" : "signup")}
                className="text-foreground font-medium hover:underline">
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
