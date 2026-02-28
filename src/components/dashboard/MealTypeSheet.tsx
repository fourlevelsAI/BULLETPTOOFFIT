import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"] as const;

function getDefaultMeal(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 10) return "Breakfast";
  if (h >= 10 && h < 15) return "Lunch";
  if (h >= 15 && h < 19) return "Dinner";
  return "Snack";
}

interface Props {
  open: boolean;
  onSelect: (meal: string) => void;
  onClose: () => void;
}

const MealTypeSheet = ({ open, onSelect, onClose }: Props) => {
  const defaultMeal = getDefaultMeal();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/60" onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-[9999] bg-card border-t border-border rounded-t-2xl p-6"
            style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
          >
            <div className="w-12 h-1 rounded-full bg-muted mx-auto mb-4" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold font-body text-foreground uppercase tracking-wider">Select Meal</h3>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {mealTypes.map((meal) => (
                <motion.button
                  key={meal}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelect(meal)}
                  className={`py-3 rounded-lg text-xs font-semibold font-body transition-colors ${
                    meal === defaultMeal
                      ? "bg-foreground text-background"
                      : "bg-accent border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {meal}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MealTypeSheet;
export { getDefaultMeal };
