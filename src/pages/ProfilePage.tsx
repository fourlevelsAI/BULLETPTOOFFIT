import { useState } from "react";
import { motion } from "framer-motion";
import { User, Settings, Bell, Shield, CreditCard, Watch, HelpCircle, LogOut, ChevronRight, Target, Flame, TrendingUp, Save } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const { profile, updateProfile } = useProfile();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile?.display_name || "");
  const [age, setAge] = useState(profile?.age?.toString() || "");
  const [weight, setWeight] = useState(profile?.weight?.toString() || "");
  const [height, setHeight] = useState(profile?.height?.toString() || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await updateProfile({
      display_name: name || null,
      age: age ? Number(age) : null,
      weight: weight ? Number(weight) : null,
      height: height ? Number(height) : null,
    } as any);
    setSaving(false);
    if (error) {
      toast.error("Failed to save");
    } else {
      toast.success("Profile updated");
      setEditing(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  const goalLabel = profile?.goal?.replace(/_/g, " ") || "Not set";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-6">
      <p className="section-label">Code 05: Profile</p>

      {/* Profile Header */}
      <div className="glass-card p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-md bg-foreground flex items-center justify-center">
          <span className="text-2xl font-black text-background font-heading">
            {(profile?.display_name || user?.email || "U")[0].toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground font-body">{profile?.display_name || user?.email?.split("@")[0] || "User"}</h1>
          <p className="text-sm text-muted-foreground font-body capitalize">{goalLabel} · {profile?.age || "—"} years old</p>
          <p className="text-xs text-muted-foreground mt-1 font-body">{profile?.is_pro ? "Pro Plan" : "Free Plan"}</p>
        </div>
      </div>

      {/* Edit Profile */}
      {editing ? (
        <div className="glass-card p-4 space-y-3">
          <h2 className="section-label mb-2">Edit Profile</h2>
          <input type="text" placeholder="Display name" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full bg-card border border-white/10 rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground font-body" />
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-muted-foreground font-body">Age</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)}
                className="w-full bg-card border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground font-body" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-body">Weight (kg)</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-card border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground font-body" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-body">Height (cm)</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-card border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground font-body" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setEditing(false)} className="flex-1 border border-white/10 py-2.5 rounded-lg text-sm text-muted-foreground font-body">Cancel</button>
            <button onClick={handleSave} disabled={saving}
              className="flex-1 bg-foreground text-background py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50 font-body flex items-center justify-center gap-1">
              <Save className="w-3.5 h-3.5" /> {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => { setEditing(true); setName(profile?.display_name || ""); setAge(profile?.age?.toString() || ""); setWeight(profile?.weight?.toString() || ""); setHeight(profile?.height?.toString() || ""); }}
          className="w-full glass-card-hover p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground font-body">Edit Profile</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Goal", value: profile?.calorie_goal || 2000, unit: "cal", icon: Target },
          { label: "Protein", value: profile?.protein_goal || 150, unit: "g", icon: Flame },
          { label: "Weight", value: profile?.weight || "—", unit: "kg", icon: TrendingUp },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card p-3 text-center">
              <Icon className="w-4 h-4 text-foreground mx-auto mb-1" />
              <span className="text-lg font-bold text-foreground font-heading block">{stat.value}</span>
              <span className="text-[10px] text-muted-foreground font-body">{stat.label} ({stat.unit})</span>
            </div>
          );
        })}
      </div>

      {/* Pro Upgrade */}
      {!profile?.is_pro && (
        <div className="glass-card p-4 border-foreground/20">
          <h3 className="text-sm font-bold text-foreground font-body">Upgrade to Pro</h3>
          <p className="text-xs text-muted-foreground mt-1 font-body">
            Unlock AI nutrition coaching, smart meal plans, and advanced analytics
          </p>
          <span className="text-xs font-semibold text-foreground mt-2 inline-block font-body">$6.99/month →</span>
        </div>
      )}

      {/* Menu */}
      <div className="glass-card overflow-hidden divide-y divide-white/5">
        {[
          { icon: Target, label: "Goals & Targets" },
          { icon: Bell, label: "Notifications" },
          { icon: Shield, label: "Privacy & Data" },
          { icon: HelpCircle, label: "Help & Support" },
        ].map(({ icon: Icon, label }) => (
          <button key={label} className="w-full flex items-center gap-3 p-4 hover:bg-white/5 transition-colors">
            <Icon className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground font-body flex-1 text-left">{label}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button onClick={handleLogout} className="w-full glass-card p-4 flex items-center justify-center gap-2 text-destructive hover:bg-white/5 transition-colors">
        <LogOut className="w-4 h-4" />
        <span className="text-sm font-medium font-body">Log Out</span>
      </button>
    </motion.div>
  );
};

export default ProfilePage;
