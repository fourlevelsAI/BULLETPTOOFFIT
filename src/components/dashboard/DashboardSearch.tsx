import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, UtensilsCrossed, Dumbbell, Layout } from "lucide-react";
import { localFoodDatabase, searchOpenFoodFacts, type FoodItem } from "@/lib/foodDatabase";
import { exercises } from "@/lib/exerciseDatabase";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  onFoodLogged: () => void;
  onSelectMealType: (food: FoodItem) => void;
}

const appSections = [
  { name: "Progress & Analytics", route: "/progress" },
  { name: "Goals & Targets", route: "/profile/goals" },
  { name: "Log Meals", route: "/meals" },
  { name: "Workout Library", route: "/workout" },
  { name: "Profile & Settings", route: "/profile" },
];

const DashboardSearch = ({ open, onClose, onFoodLogged, onSelectMealType }: Props) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [foodResults, setFoodResults] = useState<FoodItem[]>([]);
  const [apiResults, setApiResults] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setFoodResults([]);
      setApiResults([]);
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setFoodResults([]);
      setApiResults([]);
      return;
    }

    const q = query.toLowerCase();
    const localMatches = localFoodDatabase.filter((f) => f.name.toLowerCase().includes(q)).slice(0, 5);
    setFoodResults(localMatches);

    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        setLoading(true);
        const results = await searchOpenFoodFacts(query);
        setApiResults(results.slice(0, 5));
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const q = query.toLowerCase();
  const exerciseResults = query.length >= 1
    ? exercises.filter((e) => e.name.toLowerCase().includes(q)).slice(0, 4)
    : [];
  const sectionResults = query.length >= 1
    ? appSections.filter((s) => s.name.toLowerCase().includes(q))
    : [];

  const allFoods = [...foodResults, ...apiResults.filter((a) => !foodResults.some((f) => f.name === a.name))];
  const hasResults = allFoods.length > 0 || exerciseResults.length > 0 || sectionResults.length > 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="terminal-card !p-3 mt-3">
            {/* Search input */}
            <div className="flex items-center gap-2 px-2 py-1.5 bg-accent rounded-md border border-border">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search foods, exercises, app..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-body"
              />
              {query && (
                <button onClick={() => setQuery("")} className="shrink-0">
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Results */}
            {query.trim() && (
              <div className="mt-2 max-h-[50vh] overflow-y-auto space-y-3">
                {/* Foods */}
                {allFoods.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 px-1 mb-1.5">
                      <UtensilsCrossed className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[10px] font-mono text-muted-foreground tracking-[0.2em] uppercase">Foods</span>
                    </div>
                    {allFoods.map((food, i) => (
                      <button
                        key={`${food.name}-${i}`}
                        onClick={() => onSelectMealType(food)}
                        className="w-full flex items-center justify-between px-2 py-2 rounded-md hover:bg-accent transition-colors text-left"
                      >
                        <div>
                          <span className="text-sm text-foreground font-body">{food.name}</span>
                          <span className="text-xs text-muted-foreground ml-2 font-mono">{food.serving}</span>
                        </div>
                        <span className="text-xs text-foreground font-mono">{food.calories} cal</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Exercises */}
                {exerciseResults.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 px-1 mb-1.5">
                      <Dumbbell className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[10px] font-mono text-muted-foreground tracking-[0.2em] uppercase">Exercises</span>
                    </div>
                    {exerciseResults.map((ex) => (
                      <button
                        key={ex.name}
                        onClick={() => { onClose(); navigate("/workout"); }}
                        className="w-full flex items-center justify-between px-2 py-2 rounded-md hover:bg-accent transition-colors text-left"
                      >
                        <div>
                          <span className="text-sm text-foreground font-body">{ex.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">{ex.muscle}</span>
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">{ex.type}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* App Sections */}
                {sectionResults.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 px-1 mb-1.5">
                      <Layout className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[10px] font-mono text-muted-foreground tracking-[0.2em] uppercase">App Sections</span>
                    </div>
                    {sectionResults.map((section) => (
                      <button
                        key={section.route}
                        onClick={() => { onClose(); navigate(section.route); }}
                        className="w-full flex items-center justify-between px-2 py-2 rounded-md hover:bg-accent transition-colors text-left"
                      >
                        <span className="text-sm text-foreground font-body">{section.name}</span>
                        <span className="text-xs text-muted-foreground">→</span>
                      </button>
                    ))}
                  </div>
                )}

                {!hasResults && !loading && (
                  <p className="text-center text-xs text-muted-foreground py-4 font-body">No results found</p>
                )}

                {loading && (
                  <p className="text-center text-xs text-muted-foreground py-2 font-mono">Searching...</p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DashboardSearch;
