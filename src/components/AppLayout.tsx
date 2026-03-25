import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

const AppLayout = () => {
  // Force dark theme on all app routes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
    root.classList.remove("light");
    return () => {
      // Restore saved theme when leaving app routes
      const saved = localStorage.getItem("theme");
      if (saved === "light") {
        root.classList.add("light");
        root.classList.remove("dark");
      }
    };
  }, []);

  return (
    <div className="min-h-screen pb-[calc(60px+env(safe-area-inset-bottom))]" style={{ backgroundColor: '#080808' }}>
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default AppLayout;
