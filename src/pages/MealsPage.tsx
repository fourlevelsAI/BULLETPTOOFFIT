import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Scan,
  Camera,
  Mic,
  Plus,
  ChevronRight,
  X,
  Clock,
} from "lucide-react";

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

const recentFoods = [
  { name: "Oatmeal", calories: 150, serving: "1 cup (240g)", protein: 5, carbs: 27, fat: 3 },
  { name: "Banana", calories: 105, serving: "1 medium", protein: 1, carbs: 27, fat: 0 },
  { name: "Grilled Chicken Breast", calories: 165, serving: "100g", protein: 31, carbs: 0, fat: 4 },
  { name: "Brown Rice", calories: 216, serving: "1 cup cooked", protein: 5, carbs: 45, fat: 2 },
  { name: "Greek Yogurt", calories: 100, serving: "170g", protein: 17, carbs: 6, fat: 1 },
  { name: "Almond Butter", calories: 98, serving: "1 tbsp", protein: 3, carbs: 3, fat: 9 },
  { name: "Mixed Berries", calories: 70, serving: "1 cup", protein: 1, carbs: 17, fat: 0 },
  { name: "Quinoa", calories: 222, serving: "1 cup cooked", protein: 8, carbs: 39, fat: 4 },
];

const searchResults = [
  { name: "Avocado Toast", calories: 280, serving: "1 slice", protein: 7, carbs: 26, fat: 18 },
  { name: "Protein Shake", calories: 200, serving: "1 scoop + water", protein: 25, carbs: 8, fat: 3 },
  { name: "Salmon Fillet", calories: 208, serving: "100g", protein: 20, carbs: 0, fat: 13 },
];

const MealsPage = () => {
  const [selectedMeal, setSelectedMeal] = useState("Lunch");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const displayFoods = searchQuery.length > 0 ? searchResults : recentFoods;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-5"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Log Meal</h1>
        <p className="text-sm text-muted-foreground mt-1">Track what you eat today</p>
      </div>

      {/* Meal Type Selector */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {mealTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedMeal(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedMeal === type
                ? "gradient-lime text-primary-foreground"
                : "glass-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search foods..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSearch(true)}
          className="w-full pl-10 pr-10 py-3 bg-card border border-glass-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Scan, label: "Scan Barcode" },
          { icon: Camera, label: "Photo AI" },
          { icon: Mic, label: "Voice Log" },
        ].map(({ icon: Icon, label }) => (
          <button key={label} className="glass-card-hover flex flex-col items-center gap-2 py-4">
            <Icon className="w-5 h-5 text-primary" />
            <span className="text-xs text-muted-foreground">{label}</span>
          </button>
        ))}
      </div>

      {/* Food List */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">
            {searchQuery ? "Search Results" : "Recent Foods"}
          </h2>
        </div>
        <div className="space-y-2">
          {displayFoods.map((food) => (
            <motion.button
              key={food.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full glass-card-hover p-4 flex items-center justify-between"
            >
              <div className="text-left flex-1">
                <span className="text-sm font-medium text-foreground">{food.name}</span>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground">{food.serving}</span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-protein">P:{food.protein}g</span>
                    <span className="text-carbs">C:{food.carbs}g</span>
                    <span className="text-fat">F:{food.fat}g</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-calories">{food.calories}</span>
                <Plus className="w-4 h-4 text-primary" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Custom Entry */}
      <button className="w-full glass-card-hover p-4 flex items-center justify-center gap-2">
        <Plus className="w-4 h-4 text-primary" />
        <span className="text-sm text-primary font-medium">Create Custom Food</span>
      </button>
    </motion.div>
  );
};

export default MealsPage;
