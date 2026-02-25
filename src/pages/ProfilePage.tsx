import { motion } from "framer-motion";
import {
  User,
  Settings,
  Bell,
  Shield,
  CreditCard,
  Watch,
  Moon,
  HelpCircle,
  LogOut,
  ChevronRight,
  Target,
  Flame,
  TrendingUp,
} from "lucide-react";

const profileStats = [
  { label: "Days Active", value: "47", icon: Flame },
  { label: "Workouts", value: "38", icon: TrendingUp },
  { label: "Goal Progress", value: "72%", icon: Target },
];

const menuSections = [
  {
    title: "Preferences",
    items: [
      { icon: Target, label: "Goals & Targets", subtitle: "Lose weight · 2,200 cal/day" },
      { icon: Watch, label: "Connected Devices", subtitle: "Apple Watch, Garmin" },
      { icon: Bell, label: "Notifications", subtitle: "Reminders, insights" },
    ],
  },
  {
    title: "Account",
    items: [
      { icon: CreditCard, label: "Subscription", subtitle: "Free Plan" },
      { icon: Shield, label: "Privacy & Data", subtitle: "Your data is safe" },
      { icon: Settings, label: "Settings", subtitle: "Units, language" },
      { icon: HelpCircle, label: "Help & Support", subtitle: "FAQ, contact us" },
    ],
  },
];

const ProfilePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-6"
    >
      {/* Profile Header */}
      <div className="glass-card p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full gradient-lime flex items-center justify-center">
          <User className="w-8 h-8 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground">Maya Johnson</h1>
          <p className="text-sm text-muted-foreground">Lose weight · 28 years old</p>
          <p className="text-xs text-primary mt-1">Free Plan</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {profileStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card p-3 text-center">
              <Icon className="w-4 h-4 text-primary mx-auto mb-1" />
              <span className="text-lg font-bold text-foreground block">{stat.value}</span>
              <span className="text-[10px] text-muted-foreground">{stat.label}</span>
            </div>
          );
        })}
      </div>

      {/* Upgrade Banner */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        className="w-full gradient-lime rounded-xl p-4 text-left"
      >
        <h3 className="text-sm font-bold text-primary-foreground">Upgrade to Premium</h3>
        <p className="text-xs text-primary-foreground/80 mt-1">
          Unlock AI insights, unlimited photo portions, and 65+ micronutrients
        </p>
        <span className="text-xs font-semibold text-primary-foreground mt-2 inline-block">
          $9.99/month →
        </span>
      </motion.button>

      {/* Menu Sections */}
      {menuSections.map((section) => (
        <div key={section.title}>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            {section.title}
          </h2>
          <div className="glass-card overflow-hidden divide-y divide-glass-border">
            {section.items.map(({ icon: Icon, label, subtitle }) => (
              <button
                key={label}
                className="w-full flex items-center gap-3 p-4 hover:bg-glass-hover transition-colors"
              >
                <Icon className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1 text-left">
                  <span className="text-sm font-medium text-foreground">{label}</span>
                  <p className="text-xs text-muted-foreground">{subtitle}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <button className="w-full glass-card p-4 flex items-center justify-center gap-2 text-destructive hover:bg-glass-hover transition-colors">
        <LogOut className="w-4 h-4" />
        <span className="text-sm font-medium">Log Out</span>
      </button>
    </motion.div>
  );
};

export default ProfilePage;
