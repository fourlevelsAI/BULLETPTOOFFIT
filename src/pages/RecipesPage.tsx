import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Clock, Flame, Users, Sparkles, ArrowLeft, ChevronRight, Loader2, UtensilsCrossed, Beef, Salad, Egg } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } };
const stagger = { animate: { transition: { staggerChildren: 0.06 } } };

interface Recipe {
  name: string;
  description: string;
  prep_time_minutes: number;
  cook_time_minutes: number;
  servings: number;
  difficulty: string;
  meal_type: string;
  calories_per_serving: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

const CATEGORIES = [
  { id: "high-protein", label: "High Protein", icon: Beef, color: "from-red-500/20 to-red-600/10" },
  { id: "low-carb", label: "Low Carb", icon: Salad, color: "from-green-500/20 to-green-600/10" },
  { id: "meal-prep", label: "Meal Prep", icon: UtensilsCrossed, color: "from-amber-500/20 to-amber-600/10" },
  { id: "breakfast", label: "Breakfast", icon: Egg, color: "from-yellow-500/20 to-yellow-600/10" },
];

const RecipesPage = () => {
  const { session } = useAuth();
  const { profile } = useProfile();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const generateRecipes = async (category: string) => {
    if (!session?.access_token) return;
    setLoading(true);
    setActiveCategory(category);
    setRecipes([]);

    try {
      const { data, error } = await supabase.functions.invoke("generate-recipe", {
        body: {
          category,
          goal: profile?.goal || profile?.long_term_goal || "balanced",
          dietary_preferences: profile?.dietary_preferences || [],
          calorie_target: profile?.calorie_goal ? Math.round(profile.calorie_goal / 3) : 500,
        },
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (error) throw error;
      setRecipes(data?.recipes || []);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to generate recipes");
    } finally {
      setLoading(false);
    }
  };

  const logRecipe = async (recipe: Recipe) => {
    if (!session?.access_token) return;
    try {
      const { error } = await supabase.from("food_logs").insert({
        user_id: (await supabase.auth.getUser()).data.user!.id,
        food_name: recipe.name,
        calories: recipe.calories_per_serving,
        protein: recipe.protein_g,
        carbs: recipe.carbs_g,
        fat: recipe.fat_g,
        fiber: recipe.fiber_g,
        serving_size: `1 serving (${recipe.servings} total)`,
        meal_type: recipe.meal_type,
      });
      if (error) throw error;
      toast.success(`${recipe.name} logged to ${recipe.meal_type}!`);
    } catch {
      toast.error("Failed to log meal");
    }
  };

  // Recipe detail view
  if (selectedRecipe) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-lg border-b border-[rgba(192,192,192,0.08)]">
          <div className="flex items-center gap-3 px-4 py-3">
            <button onClick={() => setSelectedRecipe(null)} className="p-2 -ml-2 rounded-lg hover:bg-white/5">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <h1 className="text-lg font-display font-bold truncate">{selectedRecipe.name}</h1>
          </div>
        </div>

        <motion.div className="px-4 py-4 space-y-5" {...fadeUp}>
          {/* Hero stats */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Cal", value: selectedRecipe.calories_per_serving, color: "text-amber-400" },
              { label: "Protein", value: `${selectedRecipe.protein_g}g`, color: "text-emerald-400" },
              { label: "Carbs", value: `${selectedRecipe.carbs_g}g`, color: "text-blue-400" },
              { label: "Fat", value: `${selectedRecipe.fat_g}g`, color: "text-rose-400" },
            ].map((s) => (
              <div key={s.label} className="bg-[rgba(192,192,192,0.04)] border border-[rgba(192,192,192,0.08)] rounded-xl p-3 text-center">
                <p className={`text-lg font-mono font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{selectedRecipe.prep_time_minutes + selectedRecipe.cook_time_minutes} min</span>
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{selectedRecipe.servings} servings</span>
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">{selectedRecipe.difficulty}</span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{selectedRecipe.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {selectedRecipe.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>

          {/* Ingredients */}
          <div>
            <h2 className="text-sm font-display font-bold uppercase tracking-widest mb-3">Ingredients</h2>
            <div className="space-y-1.5">
              {selectedRecipe.ingredients.map((ing, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5 flex-shrink-0" />
                  <span className="text-foreground/80">{ing}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-sm font-display font-bold uppercase tracking-widest mb-3">Instructions</h2>
            <div className="space-y-3">
              {selectedRecipe.instructions.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground/80 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Log button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => logRecipe(selectedRecipe)}
            className="w-full py-3.5 rounded-xl font-display font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-white/10 to-white/5 border border-white/10 hover:border-white/20 transition-colors"
          >
            Log This Meal
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <motion.div {...fadeUp}>
          <div className="flex items-center gap-2 mb-1">
            <ChefHat className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-display font-bold">Recipes</h1>
          </div>
          <p className="text-xs text-muted-foreground">AI-generated meals tailored to your goals</p>
        </motion.div>
      </div>

      {/* Categories */}
      <motion.div className="px-4 grid grid-cols-2 gap-2.5 mb-6" variants={stagger} initial="initial" animate="animate">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              variants={fadeUp}
              whileTap={{ scale: 0.97 }}
              onClick={() => generateRecipes(cat.id)}
              disabled={loading}
              className={`relative overflow-hidden rounded-xl p-4 text-left border transition-all ${
                isActive
                  ? "border-white/20 bg-white/5"
                  : "border-[rgba(192,192,192,0.08)] bg-[rgba(192,192,192,0.03)] hover:bg-white/5"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-50`} />
              <div className="relative">
                <Icon className="w-5 h-5 mb-2" />
                <p className="text-sm font-display font-bold">{cat.label}</p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Generate custom */}
      <div className="px-4 mb-6">
        <motion.button
          {...fadeUp}
          whileTap={{ scale: 0.97 }}
          onClick={() => generateRecipes("surprise-me")}
          disabled={loading}
          className="w-full py-3 rounded-xl border border-dashed border-white/10 hover:border-white/20 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Surprise Me
        </motion.button>
      </div>

      {/* Loading */}
      <AnimatePresence>
        {loading && (
          <motion.div {...fadeUp} className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
            <p className="text-xs text-muted-foreground font-body">Generating recipes...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recipes grid */}
      {!loading && recipes.length > 0 && (
        <motion.div className="px-4 space-y-2.5" variants={stagger} initial="initial" animate="animate">
          {recipes.map((recipe, i) => (
            <motion.button
              key={i}
              variants={fadeUp}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRecipe(recipe)}
              className="w-full text-left rounded-xl border border-[rgba(192,192,192,0.08)] bg-[rgba(192,192,192,0.03)] hover:bg-white/5 p-4 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-sm truncate">{recipe.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{recipe.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-amber-400" />{recipe.calories_per_serving} cal</span>
                    <span className="text-emerald-400">P:{recipe.protein_g}g</span>
                    <span className="text-blue-400">C:{recipe.carbs_g}g</span>
                    <span className="text-rose-400">F:{recipe.fat_g}g</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{recipe.prep_time_minutes + recipe.cook_time_minutes}m</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Empty state */}
      {!loading && recipes.length === 0 && !activeCategory && (
        <motion.div {...fadeUp} className="text-center py-16 px-6">
          <ChefHat className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">Pick a category to generate AI-powered recipes matched to your nutrition goals</p>
        </motion.div>
      )}
    </div>
  );
};

export default RecipesPage;
