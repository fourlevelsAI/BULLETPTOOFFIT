import { NavLink, useLocation } from "react-router-dom";
import { Home, Utensils, Dumbbell, TrendingUp, User, ChefHat, BookOpen } from "lucide-react";
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
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#000000] border-t border-[rgba(192,192,192,0.1)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around h-[60px] max-w-lg mx-auto px-2">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink key={to} to={to} className="relative flex flex-col items-center justify-center gap-0.5 w-16 h-full">
              {/* Active chrome line above */}
              {isActive && (
                <motion.div
                  layoutId="bottomnav-line"
                  className="absolute top-0 inset-x-3 h-[2px]"
                  style={{ background: 'linear-gradient(90deg, #606060, #C0C0C0, #606060)' }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div whileTap={{ scale: 1.15 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                <Icon className={`w-5 h-5 transition-colors relative z-10 ${isActive ? "text-white" : "text-[#606060]"}`} />
              </motion.div>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-medium font-body relative z-10 text-white"
                >
                  {label}
                </motion.span>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
