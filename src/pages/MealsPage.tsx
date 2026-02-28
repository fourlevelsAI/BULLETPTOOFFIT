import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, X, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

const foodDatabase = [
  { name: "Oatmeal", calories: 150, serving: "1 cup (240g)", protein: 5, carbs: 27, fat: 3 },
  { name: "Banana", calories: 105, serving: "1 medium", protein: 1, carbs: 27, fat: 0 },
  { name: "Grilled Chicken Breast", calories: 165, serving: "100g", protein: 31, carbs: 0, fat: 4 },
  { name: "Brown Rice", calories: 216, serving: "1 cup cooked", protein: 5, carbs: 45, fat: 2 },
  { name: "Greek Yogurt", calories: 100, serving: "170g", protein: 17, carbs: 6, fat: 1 },
  { name: "Almond Butter", calories: 98, serving: "1 tbsp", protein: 3, carbs: 3, fat: 9 },
  { name: "Mixed Berries", calories: 70, serving: "1 cup", protein: 1, carbs: 17, fat: 0 },
  { name: "Quinoa", calories: 222, serving: "1 cup cooked", protein: 8, carbs: 39, fat: 4 },
  { name: "Avocado Toast", calories: 280, serving: "1 slice", protein: 7, carbs: 26, fat: 18 },
  { name: "Protein Shake", calories: 200, serving: "1 scoop + water", protein: 25, carbs: 8, fat: 3 },
  { name: "Salmon Fillet", calories: 208, serving: "100g", protein: 20, carbs: 0, fat: 13 },
  { name: "Eggs (2 large)", calories: 143, serving: "2 large", protein: 13, carbs: 1, fat: 10 },
  { name: "Sweet Potato", calories: 103, serving: "1 medium", protein: 2, carbs: 24, fat: 0 },
  { name: "Broccoli", calories: 55, serving: "1 cup", protein: 4, carbs: 11, fat: 1 },
  { name: "Whole Wheat Bread", calories: 69, serving: "1 slice", protein: 4, carbs: 12, fat: 1 },
  { name: "Turkey Breast", calories: 135, serving: "100g", protein: 30, carbs: 0, fat: 1 },
  { name: "Cottage Cheese", calories: 206, serving: "1 cup", protein: 28, carbs: 6, fat: 9 },
  { name: "Apple", calories: 95, serving: "1 medium", protein: 0, carbs: 25, fat: 0 },
  { name: "Peanut Butter", calories: 94, serving: "1 tbsp", protein: 4, carbs: 3, fat: 8 },
  { name: "Rice Cakes", calories: 35, serving: "1 cake", protein: 1, carbs: 7, fat: 0 },
];

const MealsPage = () => {
  const { user } = useAuth();
  const [selectedMeal, setSelectedMeal] = useState("Lunch");
  const [searchQuery, setSearchQuery] = useState("");
  const [saving, setSaving] = useState<string | null>(null);
  const [servings, setServings] = useState<Record<string, number>>({});

  const filteredFoods = searchQuery.length > 0
    ? foodDatabase.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : foodDatabase.slice(0, 10);

  const getServings = (name: string) => servings[name] || 1;

  const addFood = async (food: typeof foodDatabase[0]) => {
    if (!user) return;
    setSaving(food.name);
    const mult = getServings(food.name);
    const today = new Date().toISOString().split("T")[0];
    const { error } = await supabase.from("food_logs").insert({
      user_id: user.id, food_name: food.name,
      calories: Math.round(food.calories * mult), protein: Math.round(food.protein * mult),
      carbs: Math.round(food.carbs * mult), fat: Math.round(food.fat * mult),
      meal_type: selectedMeal, serving_size: `${mult}x ${food.serving}`, logged_at: today,
    });
    setSaving(null);
    if (error) { toast.error("Failed to log food"); }
    else { toast.success(`${food.name} added to ${selectedMeal}`); setServings((prev) => ({ ...prev, [food.name]: 1 })); }
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-5">
      <motion.div variants={fadeUp}>
        <p className="code-label mb-1">SYS:02 Nutrition</p>
        <h1 className="text-2xl font-bold text-foreground">Log Meal</h1>
        <p className="text-sm text-muted-foreground mt-1 font-body">Track what you eat today</p>
      </motion.div>

      {/* Meal Type */}
      <motion.div variants={fadeUp} className="flex gap-2 overflow-x-auto scrollbar-hide">
        {mealTypes.map((type) => (
          <motion.button key={type} whileTap={{ scale: 0.97 }} onClick={() => setSelectedMeal(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all font-body ${
              selectedMeal === type ? "bg-foreground text-background" : "border border-border text-muted-foreground hover:text-foreground"
            }`}>
            {type}
          </motion.button>
        ))}
      </motion.div>

      {/* Search */}
      <motion.div variants={fadeUp} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search foods..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring font-body" />
        {searchQuery && (
          <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </motion.div>

      {/* Food List */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h2 className="section-label">{searchQuery ? "Search Results" : "Popular Foods"}</h2>
        </div>
        {filteredFoods.length === 0 ? (
          <div className="bracket-card !p-8 text-center">
            <p className="text-muted-foreground text-sm font-body">No foods found for "{searchQuery}"</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFoods.map((food) => {
              const mult = getServings(food.name);
              return (
                <motion.div key={food.name} whileHover={{ y: -2 }} className="bracket-card">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 text-left">
                      <span className="text-sm font-medium text-foreground font-body">{food.name}</span>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground font-body">{food.serving}</span>
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <span className="text-muted-foreground">P:{Math.round(food.protein * mult)}g</span>
                          <span className="text-muted-foreground">C:{Math.round(food.carbs * mult)}g</span>
                          <span className="text-muted-foreground">F:{Math.round(food.fat * mult)}g</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-foreground font-mono mr-3">{Math.round(food.calories * mult)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setServings((p) => ({ ...p, [food.name]: Math.max(0.5, (p[food.name] || 1) - 0.5) }))}
                        className="w-7 h-7 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-foreground text-xs font-body active:scale-95">−</button>
                      <span className="text-sm font-medium text-foreground font-mono w-8 text-center">{mult}</span>
                      <button onClick={() => setServings((p) => ({ ...p, [food.name]: (p[food.name] || 1) + 0.5 }))}
                        className="w-7 h-7 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-foreground text-xs font-body active:scale-95">+</button>
                      <span className="text-xs text-muted-foreground font-body">servings</span>
                    </div>
                    <motion.button whileTap={{ scale: 0.97 }} onClick={() => addFood(food)} disabled={saving === food.name}
                      className="bg-foreground text-background px-4 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 disabled:opacity-50 font-body">
                      {saving === food.name ? "..." : <><Plus className="w-3 h-3" /> Add</>}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MealsPage;
