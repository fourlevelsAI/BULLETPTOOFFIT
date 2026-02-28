import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize theme from localStorage or system preference
const saved = localStorage.getItem("theme");
if (saved === "light") {
  document.documentElement.classList.add("light");
  document.documentElement.classList.remove("dark");
} else if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.classList.add("dark");
  document.documentElement.classList.remove("light");
}

createRoot(document.getElementById("root")!).render(<App />);
