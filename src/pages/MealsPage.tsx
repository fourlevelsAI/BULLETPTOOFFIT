import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Plus, X, Clock, Camera, Mic, ScanLine, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";
import CameraOverlay from "@/components/meals/CameraOverlay";
import VoiceOverlay from "@/components/meals/VoiceOverlay";
import BarcodeOverlay from "@/components/meals/BarcodeOverlay";
import FoodConfirmation, { type DetectedFood } from "@/components/meals/FoodConfirmation";
import {
  localFoodDatabase,
  searchOpenFoodFacts,
  lookupBarcode,
  getMealSuggestions,
  getMealGuidance,
  isPorkProduct,
  type FoodItem,
} from "@/lib/foodDatabase";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

type Overlay = "camera" | "voice" | "barcode" | null;

const MealsPage = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [selectedMeal, setSelectedMeal] = useState("Lunch");
  const [searchQuery, setSearchQuery] = useState("");
  const [saving, setSaving] = useState<string | null>(null);
  const [servings, setServings] = useState<Record<string, number>>({});
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [detectedFoods, setDetectedFoods] = useState<DetectedFood[] | null>(null);
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [searching, setSearching] = useState(false);
  const [todayTotals, setTodayTotals] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const debounceRef = useRef<NodeJS.Timeout>();

  // Fetch today's totals for the goal banner
  useEffect(() => {
    if (!user) return;
    const today = new Date().toISOString().split("T")[0];
    supabase
      .from("food_logs")
      .select("calories, protein, carbs, fat")
      .eq("user_id", user.id)
      .eq("logged_at", today)
      .then(({ data }) => {
        if (data) {
          setTodayTotals({
            calories: data.reduce((s, r) => s + (r.calories || 0), 0),
            protein: data.reduce((s, r) => s + (r.protein || 0), 0),
            carbs: data.reduce((s, r) => s + (r.carbs || 0), 0),
            fat: data.reduce((s, r) => s + (r.fat || 0), 0),
          });
        }
      });
  }, [user]);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      const localResults = localFoodDatabase.filter((f) =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(localResults);

      const apiResults = await searchOpenFoodFacts(searchQuery);
      setSearchResults((prev) => {
        const names = new Set(prev.map((f) => f.name.toLowerCase()));
        const unique = apiResults.filter((f) => !names.has(f.name.toLowerCase()));
        return [...prev, ...unique];
      });
      setSearching(false);

      try {
        const recent = JSON.parse(localStorage.getItem("recent_searches") || "[]") as string[];
        const updated = [searchQuery, ...recent.filter((s) => s !== searchQuery)].slice(0, 10);
        localStorage.setItem("recent_searches", JSON.stringify(updated));
      } catch {}
    }, 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchQuery]);

  // Meal-specific suggestions when not searching
  const mealSuggestions = getMealSuggestions(selectedMeal);
  const displayedFoods = searchQuery.trim() ? searchResults : mealSuggestions;

  // Goal guidance
  const guidance = getMealGuidance(profile?.goal || profile?.long_term_goal, selectedMeal);
  const remainingCal = (profile?.calorie_goal || 2000) - todayTotals.calories;
  const remainingP = (profile?.protein_goal || 150) - todayTotals.protein;
  const remainingC = (profile?.carbs_goal || 200) - todayTotals.carbs;
  const remainingF = (profile?.fat_goal || 65) - todayTotals.fat;

  const getServings = (name: string) => servings[name] || 1;

  const addFood = async (food: FoodItem) => {
    if (!user) return;
    setSaving(food.name);
    const mult = getServings(food.name);
    const today = new Date().toISOString().split("T")[0];
    const { error } = await supabase.from("food_logs").insert({
      user_id: user.id, food_name: food.name,
      calories: Math.round(food.calories * mult), protein: Math.round(food.protein * mult),
      carbs: Math.round(food.carbs * mult), fat: Math.round(food.fat * mult),
      meal_type: selectedMeal.toLowerCase(), serving_size: `${mult}x ${food.serving}`, logged_at: today,
    });
    setSaving(null);
    if (error) toast.error("Failed to log food");
    else {
      toast.success(`${food.name} added to ${selectedMeal}`);
      setServings((p) => ({ ...p, [food.name]: 1 }));
      setTodayTotals((prev) => ({
        calories: prev.calories + Math.round(food.calories * mult),
        protein: prev.protein + Math.round(food.protein * mult),
        carbs: prev.carbs + Math.round(food.carbs * mult),
        fat: prev.fat + Math.round(food.fat * mult),
      }));
    }
  };

  // AI handlers
  const handlePhotoCapture = useCallback(async (base64: string) => {
    setOverlay(null);
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("identify-food", {
        body: { type: "image", image_base64: base64 },
      });
      if (error) throw error;
      if (data?.foods?.length > 0) {
        const filtered = data.foods.filter((f: DetectedFood) => !isPorkProduct(f.name));
        if (filtered.length === 0) {
          toast.error("⚠️ Pork products detected and excluded. Try a different food.");
        } else {
          setDetectedFoods(filtered);
        }
      } else {
        toast.error("Couldn't identify food — try manual search instead");
      }
    } catch (e: any) {
      console.error(e);
      toast.error("Couldn't identify food — try manual search instead");
    }
    setAiLoading(false);
  }, []);

  const handleVoiceTranscript = useCallback(async (transcript: string) => {
    setOverlay(null);
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("identify-food", {
        body: { type: "voice", transcript },
      });
      if (error) throw error;
      if (data?.foods?.length > 0) {
        const filtered = data.foods.filter((f: DetectedFood) => !isPorkProduct(f.name));
        if (filtered.length === 0) {
          toast.error("⚠️ Pork products detected and excluded.");
        } else {
          setDetectedFoods(filtered);
        }
      } else {
        toast.error("Couldn't process — try manual search");
      }
    } catch (e: any) {
      console.error(e);
      toast.error("Couldn't process — try manual search");
    }
    setAiLoading(false);
  }, []);

  const handleBarcodeResult = useCallback(async (barcode: string) => {
    setOverlay(null);
    setAiLoading(true);
    const product = await lookupBarcode(barcode);
    if (product) {
      if (isPorkProduct(product.name)) {
        toast.error("⚠️ This product contains pork and has been excluded. Try an alternative.");
      } else {
        setDetectedFoods([{
          name: product.name,
          serving_size: product.serving,
          calories: product.calories,
          protein_g: product.protein,
          carbs_g: product.carbs,
          fat_g: product.fat,
        }]);
      }
    } else {
      toast.error("Product not found — search manually instead");
    }
    setAiLoading(false);
  }, []);

  const handleConfirmFoods = async (foods: DetectedFood[]) => {
    if (!user) return;
    const today = new Date().toISOString().split("T")[0];
    for (const food of foods) {
      const q = food.quantity || 1;
      await supabase.from("food_logs").insert({
        user_id: user.id, food_name: food.name,
        calories: Math.round(food.calories * q), protein: Math.round(food.protein_g * q),
        carbs: Math.round(food.carbs_g * q), fat: Math.round(food.fat_g * q),
        meal_type: selectedMeal.toLowerCase(), serving_size: `${q}x ${food.serving_size}`, logged_at: today,
      });
    }
    toast.success(`${foods.length} item${foods.length > 1 ? "s" : ""} added to ${selectedMeal}`);
    setDetectedFoods(null);
  };

  const categoryColor = (cat?: string) => {
    switch (cat) {
      case "protein": return "bg-[hsl(120,30%,12%)] border-[hsl(120,30%,18%)] text-[hsl(120,100%,65%)]";
      case "carb": return "bg-[hsl(50,30%,12%)] border-[hsl(50,30%,18%)] text-[hsl(50,100%,65%)]";
      case "fat": return "bg-[hsl(0,30%,12%)] border-[hsl(0,30%,18%)] text-[hsl(0,100%,65%)]";
      case "fruit": return "bg-[hsl(300,30%,12%)] border-[hsl(300,30%,18%)] text-[hsl(300,100%,65%)]";
      case "vegetable": return "bg-[hsl(180,30%,12%)] border-[hsl(180,30%,18%)] text-[hsl(180,100%,65%)]";
      default: return "bg-muted border-border text-muted-foreground";
    }
  };

  return (
    <>
      {overlay === "camera" && <CameraOverlay onCapture={handlePhotoCapture} onClose={() => setOverlay(null)} />}
      {overlay === "voice" && <VoiceOverlay onTranscript={handleVoiceTranscript} onClose={() => setOverlay(null)} />}
      {overlay === "barcode" && <BarcodeOverlay onResult={handleBarcodeResult} onClose={() => setOverlay(null)} />}
      {detectedFoods && (
        <FoodConfirmation foods={detectedFoods} mealType={selectedMeal} onConfirm={handleConfirmFoods} onCancel={() => setDetectedFoods(null)} />
      )}

      {aiLoading && (
        <div className="fixed inset-0 z-[9998] bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-muted-foreground font-body">Identifying food...</p>
        </div>
      )}

      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-5">
        <motion.div variants={fadeUp}>
          <p className="code-label mb-1">SYS:02 Nutrition</p>
          <h1 className="text-2xl font-bold font-display text-foreground tracking-wide">LOG MEAL</h1>
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

        {/* Goal-Based Banner */}
        <motion.div variants={fadeUp} className="bracket-card !p-4 space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-foreground" />
            <span className="code-label !mb-0">SYS: {selectedMeal.toUpperCase()} TARGET</span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-lg font-bold font-mono text-foreground">{Math.max(0, remainingCal)}</p>
              <p className="text-[10px] text-muted-foreground font-body">cal left</p>
            </div>
            <div>
              <p className="text-lg font-bold font-mono text-calories-protein">{Math.max(0, remainingP)}g</p>
              <p className="text-[10px] text-muted-foreground font-body">protein</p>
            </div>
            <div>
              <p className="text-lg font-bold font-mono text-calories-carbs">{Math.max(0, remainingC)}g</p>
              <p className="text-[10px] text-muted-foreground font-body">carbs</p>
            </div>
            <div>
              <p className="text-lg font-bold font-mono text-calories-fat">{Math.max(0, remainingF)}g</p>
              <p className="text-[10px] text-muted-foreground font-body">fat</p>
            </div>
          </div>
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground font-body">
              <span className="text-foreground font-medium">💡 Ideal {selectedMeal.toLowerCase()}: </span>
              {guidance.calRange}
            </p>
            <p className="text-[11px] text-muted-foreground font-body mt-0.5">"{guidance.tip}"</p>
          </div>
        </motion.div>

        {/* AI Tools */}
        <motion.div variants={fadeUp} className="grid grid-cols-3 gap-2">
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setOverlay("camera")}
            className="flex flex-col items-center gap-1.5 py-3 rounded-lg border border-border hover:bg-accent transition-colors">
            <Camera className="w-5 h-5 text-foreground" />
            <span className="text-[11px] font-medium font-body text-muted-foreground">Photo AI</span>
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setOverlay("voice")}
            className="flex flex-col items-center gap-1.5 py-3 rounded-lg border border-border hover:bg-accent transition-colors">
            <Mic className="w-5 h-5 text-foreground" />
            <span className="text-[11px] font-medium font-body text-muted-foreground">Voice Log</span>
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setOverlay("barcode")}
            className="flex flex-col items-center gap-1.5 py-3 rounded-lg border border-border hover:bg-accent transition-colors">
            <ScanLine className="w-5 h-5 text-foreground" />
            <span className="text-[11px] font-medium font-body text-muted-foreground">Scan</span>
          </motion.button>
        </motion.div>

        {/* Search */}
        <motion.div variants={fadeUp} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search foods..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring font-body" />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </motion.div>

        {/* Food List */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h2 className="section-label">
              {searchQuery ? (searching ? "Searching..." : "Search Results") : `Popular ${selectedMeal} Foods`}
            </h2>
          </div>
          {displayedFoods.length === 0 ? (
            <div className="bracket-card !p-8 text-center">
              <p className="text-muted-foreground text-sm font-body">
                {searching ? "Searching..." : `No foods found for "${searchQuery}"`}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {displayedFoods.map((food) => {
                const mult = getServings(food.name);
                return (
                  <motion.div key={food.name + (food.brand || "")} whileHover={{ y: -2 }}
                    className="bg-card border border-border rounded-lg p-3 relative">
                    {/* Category tag */}
                    {food.category && (
                      <span className={`absolute top-2 right-2 text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase tracking-wider ${categoryColor(food.category)}`}>
                        {food.category}
                      </span>
                    )}
                    <div className="flex items-start justify-between pr-16">
                      <div className="flex-1 min-w-0">
                        <span className="text-[15px] font-semibold text-foreground font-body block truncate">{food.name}</span>
                        {food.brand && <span className="text-[10px] text-muted-foreground font-body">{food.brand}</span>}
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs text-muted-foreground font-body">{food.serving}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[hsl(120,30%,12%)] text-[hsl(120,100%,65%)]">Protein: {Math.round(food.protein * mult)}g</span>
                            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[hsl(50,30%,12%)] text-[hsl(50,100%,65%)]">Carbs: {Math.round(food.carbs * mult)}g</span>
                            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[hsl(0,30%,12%)] text-[hsl(0,100%,65%)]">Fat: {Math.round(food.fat * mult)}g</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-foreground font-mono ml-2 shrink-0">{Math.round(food.calories * mult)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setServings((p) => ({ ...p, [food.name]: Math.max(0.5, (p[food.name] || 1) - 0.5) }))}
                          className="w-8 h-8 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-foreground text-xs font-body active:scale-95">−</button>
                        <span className="text-sm font-medium text-foreground font-mono w-8 text-center">{mult}</span>
                        <button onClick={() => setServings((p) => ({ ...p, [food.name]: (p[food.name] || 1) + 0.5 }))}
                          className="w-8 h-8 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-foreground text-xs font-body active:scale-95">+</button>
                        <span className="text-xs text-muted-foreground font-body">servings</span>
                      </div>
                      <motion.button whileTap={{ scale: 0.97 }} onClick={() => addFood(food)} disabled={saving === food.name}
                        className="bg-foreground text-background px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-1 disabled:opacity-50 font-body min-h-[36px]">
                        {saving === food.name ? "..." : <><Plus className="w-3 h-3" /> ADD</>}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default MealsPage;
