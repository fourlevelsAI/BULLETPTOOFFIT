import { NavLink, useLocation } from "react-router-dom";
import { Home, Utensils, Dumbbell, TrendingUp, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/meals", icon: Utensils, label: "Meals" },
  { to: "/workout", icon: Dumbbell, label: "Workout" },
  { to: "/progress", icon: TrendingUp, label: "Progress" },
  { to: "/profile", icon: User, label: "Profile" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="flex items-center justify-around h-[60px] max-w-lg mx-auto px-2">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className="relative flex flex-col items-center justify-center gap-0.5 w-16 h-full"
            >
              {isActive && (
                <motion.div
                  layoutId="bottomnav-pill"
                  className="absolute inset-x-2 inset-y-1.5 rounded-lg bg-foreground/10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div
                whileTap={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Icon
                  className={`w-5 h-5 transition-colors relative z-10 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                />
              </motion.div>
              <span
                className={`text-[10px] font-medium transition-colors font-body relative z-10 ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
