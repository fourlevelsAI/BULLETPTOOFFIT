import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (isSignUp) {
      const { error } = await signUp(email, password, displayName);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Check your email to confirm your account!");
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message);
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-8"
      >
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl gradient-lime flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">BULLETPROOFFIT</h1>
          <p className="text-muted-foreground text-sm">
            {isSignUp ? "Create your account" : "Welcome back"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-glass-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 bg-card border border-glass-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full pl-10 pr-10 py-3 bg-card border border-glass-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Eye className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full gradient-lime text-primary-foreground py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity"
          >
            {submitting ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-sm text-muted-foreground">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary font-medium hover:underline"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
