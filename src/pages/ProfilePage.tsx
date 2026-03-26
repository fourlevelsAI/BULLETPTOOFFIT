import { useState } from "react";
import { motion } from "framer-motion";
import { User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Target, Flame, TrendingUp, Save, Crown, Diamond, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { profile, updateProfile } = useProfile();
  const { tier, isPro, openPortal } = useSubscription();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile?.display_name || "");
  const [age, setAge] = useState(profile?.age?.toString() || "");
  const [weight, setWeight] = useState(profile?.weight?.toString() || "");
  const [height, setHeight] = useState(profile?.height?.toString() || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await updateProfile({
      display_name: name || null, age: age ? Number(age) : null,
      weight: weight ? Number(weight) : null, height: height ? Number(height) : null,
    } as any);
    setSaving(false);
    if (error) { toast.error("Failed to save"); } else { toast.success("Profile updated"); setEditing(false); }
  };

  const handleLogout = async () => { await signOut(); };
  const goalLabel = profile?.goal?.replace(/_/g, " ") || "Not set";

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-6">
      <motion.div variants={fadeUp}>
        <p className="code-label">SYS:05 Profile</p>
      </motion.div>

      {/* Profile Header */}
      <motion.div variants={fadeUp} className="terminal-card !p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-md bg-foreground flex items-center justify-center">
          <span className="text-2xl font-black text-background font-heading">
            {(profile?.display_name || user?.email || "U")[0].toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground font-body">{profile?.display_name || user?.email?.split("@")[0] || "User"}</h1>
          <p className="text-sm text-muted-foreground font-body capitalize">{goalLabel} · {profile?.age || "—"} years old</p>
          <p className="text-xs text-muted-foreground mt-1 font-body flex items-center gap-1.5">
            {tier === "elite" && <><Diamond className="w-3 h-3" /> ELITE</>}
            {tier === "pro" && <><Crown className="w-3 h-3" /> PRO</>}
            {tier === "lifetime" && <><Diamond className="w-3 h-3" /> LIFETIME</>}
            {tier === "free" && "Free Plan"}
            {profile?.is_founding_member && <span className="text-[10px] chrome-text font-bold ml-1">FOUNDING MEMBER</span>}
          </p>
        </div>
      </motion.div>

      {/* Edit Profile */}
      {editing ? (
        <motion.div variants={fadeUp} className="bracket-card space-y-3">
          <h2 className="section-label mb-2">Edit Profile</h2>
          <input type="text" placeholder="Display name" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring font-body" />
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Age", val: age, set: setAge },
              { label: "Weight (kg)", val: weight, set: setWeight },
              { label: "Height (cm)", val: height, set: setHeight },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-xs text-muted-foreground font-body">{f.label}</label>
                <input type="number" value={f.val} onChange={(e) => f.set(e.target.value)}
                  className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground font-body" />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setEditing(false)} className="flex-1 border border-border py-2.5 rounded-lg text-sm text-muted-foreground font-body">Cancel</button>
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave} disabled={saving}
              className="flex-1 bg-foreground text-background py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50 font-body flex items-center justify-center gap-1">
              <Save className="w-3.5 h-3.5" /> {saving ? "Saving..." : "Save"}
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.button variants={fadeUp} whileTap={{ scale: 0.97 }} whileHover={{ y: -2 }}
          onClick={() => { setEditing(true); setName(profile?.display_name || ""); setAge(profile?.age?.toString() || ""); setWeight(profile?.weight?.toString() || ""); setHeight(profile?.height?.toString() || ""); }}
          className="w-full bracket-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground font-body">Edit Profile</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </motion.button>
      )}

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3">
        {[
          { label: "Goal", value: profile?.calorie_goal || 2000, unit: "cal", icon: Target, route: "/profile/goals" },
          { label: "Protein", value: profile?.protein_goal || 150, unit: "g", icon: Flame, route: "/profile/goals" },
          { label: "Weight", value: profile?.weight || "—", unit: "kg", icon: TrendingUp, route: "/progress" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.button key={stat.label} whileTap={{ scale: 0.97 }} onClick={() => navigate(stat.route)}
              className="bracket-card text-center cursor-pointer hover:bg-accent transition-colors">
              <Icon className="w-4 h-4 text-foreground mx-auto mb-1" />
              <span className="text-lg font-bold text-foreground font-mono block">{stat.value}</span>
              <span className="text-[10px] text-muted-foreground font-body">{stat.label} ({stat.unit})</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Subscription Management */}
      {isPro ? (
        <motion.button variants={fadeUp} whileTap={{ scale: 0.97 }} whileHover={{ y: -2 }}
          onClick={openPortal}
          className="w-full bracket-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground font-body">Manage Subscription</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </motion.button>
      ) : (
        <motion.div variants={fadeUp} whileHover={{ y: -2 }}
          onClick={handleUpgrade}
          className="bracket-card border-foreground/20 cursor-pointer">
          <h3 className="text-sm font-bold text-foreground font-body">Upgrade to Pro</h3>
          <p className="text-xs text-muted-foreground mt-1 font-body">
            Unlock AI nutrition coaching, smart meal plans, and advanced analytics
          </p>
          <span className="text-xs font-semibold text-foreground mt-2 inline-block font-body">$9.99/month</span>
        </motion.div>
      )}

      {/* Menu */}
      <motion.div variants={fadeUp} className="bracket-card !p-0 overflow-hidden divide-y divide-border">
        {[
          { icon: Target, label: "Goals & Targets", action: () => navigate("/profile/goals") },
          { icon: Bell, label: "Notifications", action: () => toast.info("Notifications settings coming soon") },
          { icon: Shield, label: "Privacy & Data", action: () => toast.info("Privacy settings coming soon") },
          { icon: HelpCircle, label: "Help & Support", action: () => toast.info("Help & support coming soon") },
        ].map(({ icon: Icon, label, action }) => (
          <button key={label} onClick={action} className="w-full flex items-center gap-3 p-4 hover:bg-accent transition-colors">
            <Icon className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground font-body flex-1 text-left">{label}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </motion.div>

      {/* Logout */}
      <motion.button variants={fadeUp} whileTap={{ scale: 0.97 }} onClick={handleLogout}
        className="w-full bracket-card flex items-center justify-center gap-2 text-destructive hover:bg-accent transition-colors">
        <LogOut className="w-4 h-4" />
        <span className="text-sm font-medium font-body">Log Out</span>
      </motion.button>
    </motion.div>
  );
};

export default ProfilePage;
