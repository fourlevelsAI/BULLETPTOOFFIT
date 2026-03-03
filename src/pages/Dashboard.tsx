import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import "react-circular-progressbar/dist/styles.css";
import {
  Flame, Droplets, Plus, Minus, ChevronRight, Scan, Camera, Mic, Search, Dumbbell, Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TrialBanner from "@/components/TrialBanner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";
import type { FoodItem } from "@/lib/foodDatabase";

import CameraOverlay from "@/components/meals/CameraOverlay";
import BarcodeOverlay from "@/components/meals/BarcodeOverlay";
import FoodConfirmation, { type DetectedFood } from "@/components/meals/FoodConfirmation";
import AriaOverlay from "@/components/dashboard/AriaOverlay";
import DashboardSearch from "@/components/dashboard/DashboardSearch";
import MealTypeSheet, { getDefaultMeal } from "@/components/dashboard/MealTypeSheet";

function useCountUp(target: number, duration = 1000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 400, damping: 20 } },
};

interface FoodLog { id: string; food_name: string; calories: number | null; protein: number | null; carbs: number | null; fat: number | null; meal_type: string; logged_at: string; }
interface WorkoutSession { id: string; name: string; duration_minutes: number | null; calories_burned: number | null; logged_at: string; }
interface WaterLog { id: string; amount_ml: number; }

type Overlay = "camera" | "barcode" | "voice" | null;

const Dashboard = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [waterLogs, setWaterLogs] = useState<WaterLog[]>([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split("T")[0];

  // Overlay states
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [detectedFoods, setDetectedFoods] = useState<DetectedFood[] | null>(null);
  const [mealSheetOpen, setMealSheetOpen] = useState(false);
  const [pendingFood, setPendingFood] = useState<FoodItem | null>(null);

  const fetchData = useCallback(async () => {
    if (!user) return;
    const [foodRes, workoutRes, waterRes] = await Promise.all([
      supabase.from("food_logs").select("*").eq("user_id", user.id).eq("logged_at", today).order("created_at", { ascending: true }),
      supabase.from("workout_sessions").select("*").eq("user_id", user.id).eq("logged_at", today).order("created_at", { ascending: false }),
      supabase.from("water_logs").select("*").eq("user_id", user.id).eq("logged_at", today),
    ]);
    setFoodLogs((foodRes.data as FoodLog[]) || []);
    setWorkouts((workoutRes.data as WorkoutSession[]) || []);
    setWaterLogs((waterRes.data as WaterLog[]) || []);
    setLoading(false);
  }, [user, today]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const caloriesGoal = profile?.calorie_goal || 2000;
  const proteinGoal = profile?.protein_goal || 150;
  const carbsGoal = profile?.carbs_goal || 250;
  const fatGoal = profile?.fat_goal || 65;

  const totals = useMemo(() => {
    const eaten = foodLogs.reduce((s, f) => s + (f.calories || 0), 0);
    const protein = foodLogs.reduce((s, f) => s + (f.protein || 0), 0);
    const carbs = foodLogs.reduce((s, f) => s + (f.carbs || 0), 0);
    const fat = foodLogs.reduce((s, f) => s + (f.fat || 0), 0);
    const burned = workouts.reduce((s, w) => s + (w.calories_burned || 0), 0);
    return { eaten, protein, carbs, fat, burned };
  }, [foodLogs, workouts]);

  const caloriesRemaining = Math.max(0, caloriesGoal - totals.eaten + totals.burned);
  const caloriePercent = Math.min(Math.round((totals.eaten / caloriesGoal) * 100), 100);
  const animatedRemaining = useCountUp(caloriesRemaining);

  const macros = [
    { label: "PROTEIN", current: Math.round(totals.protein), goal: proteinGoal, unit: "g", color: "text-[hsl(120,100%,65%)]" },
    { label: "CARBS", current: Math.round(totals.carbs), goal: carbsGoal, unit: "g", color: "text-[hsl(50,100%,65%)]" },
    { label: "FAT", current: Math.round(totals.fat), goal: fatGoal, unit: "g", color: "text-[hsl(0,100%,65%)]" },
  ];

  const mealsByType = useMemo(() => {
    const grouped: Record<string, FoodLog[]> = {};
    for (const log of foodLogs) {
      const type = log.meal_type || "Snack";
      if (!grouped[type]) grouped[type] = [];
      grouped[type].push(log);
    }
    return grouped;
  }, [foodLogs]);

  const waterGlasses = Math.floor(waterLogs.reduce((s, w) => s + w.amount_ml, 0) / 250);

  const addWater = async () => {
    if (!user) return;
    const { data } = await supabase.from("water_logs").insert({ user_id: user.id, amount_ml: 250, logged_at: today }).select().single();
    if (data) setWaterLogs((prev) => [...prev, data as WaterLog]);
  };

  const removeWater = async () => {
    if (!user || waterLogs.length === 0) return;
    const lastLog = waterLogs[waterLogs.length - 1];
    const { error } = await supabase.from("water_logs").delete().eq("id", lastLog.id);
    if (!error) setWaterLogs((prev) => prev.slice(0, -1));
  };

  // --- Photo AI handler ---
  const handlePhotoCapture = async (base64: string) => {
    setOverlay(null);
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("identify-food", {
        body: { type: "image", image_base64: base64 },
      });
      if (error) throw error;
      if (data?.foods?.length) {
        setDetectedFoods(data.foods);
      } else {
        toast.error("Couldn't identify foods in the image");
      }
    } catch {
      toast.error("AI analysis failed");
    } finally {
      setAiLoading(false);
    }
  };

  // --- Barcode handler ---
  const handleBarcodeResult = async (barcode: string) => {
    setOverlay(null);
    setAiLoading(true);
    try {
      const { lookupBarcode } = await import("@/lib/foodDatabase");
      const food = await lookupBarcode(barcode);
      if (food) {
        setDetectedFoods([{
          name: food.name,
          serving_size: food.serving,
          calories: food.calories,
          protein_g: food.protein,
          carbs_g: food.carbs,
          fat_g: food.fat,
        }]);
      } else {
        toast.error("Product not found");
      }
    } catch {
      toast.error("Barcode lookup failed");
    } finally {
      setAiLoading(false);
    }
  };

  // --- Confirm detected foods ---
  const handleConfirmFoods = async (foods: DetectedFood[]) => {
    if (!user) return;
    const mealType = getDefaultMeal().toLowerCase();
    for (const food of foods) {
      const qty = food.quantity || 1;
      await supabase.from("food_logs").insert({
        user_id: user.id,
        food_name: food.name,
        calories: Math.round((food.calories || 0) * qty),
        protein: Math.round((food.protein_g || 0) * qty),
        carbs: Math.round((food.carbs_g || 0) * qty),
        fat: Math.round((food.fat_g || 0) * qty),
        serving_size: food.serving_size || "1 serving",
        meal_type: mealType,
        logged_at: today,
      });
    }
    toast.success(`Logged ${foods.length} item(s) to ${mealType}`);
    setDetectedFoods(null);
    fetchData();
  };

  // --- Search food → meal type sheet ---
  const handleSearchFoodSelect = (food: FoodItem) => {
    setPendingFood(food);
    setMealSheetOpen(true);
    setSearchOpen(false);
  };

  const handleMealTypeSelect = async (mealType: string) => {
    setMealSheetOpen(false);
    if (!pendingFood || !user) return;
    await supabase.from("food_logs").insert({
      user_id: user.id,
      food_name: pendingFood.name,
      calories: pendingFood.calories,
      protein: pendingFood.protein,
      carbs: pendingFood.carbs,
      fat: pendingFood.fat,
      serving_size: pendingFood.serving,
      meal_type: mealType.toLowerCase(),
      logged_at: today,
    });
    toast.success(`Added ${pendingFood.name} to ${mealType}`);
    setPendingFood(null);
    fetchData();
  };

  // --- ARIA context string ---
  const ariaContext = useMemo(() => {
    const workoutsThisWeek = workouts.length; // simplified
    return `- Calories today: ${totals.eaten}/${caloriesGoal} kcal, remaining: ${caloriesRemaining}
- Protein: ${Math.round(totals.protein)}/${proteinGoal}g
- Carbs: ${Math.round(totals.carbs)}/${carbsGoal}g
- Fat: ${Math.round(totals.fat)}/${fatGoal}g
- Water intake: ${waterGlasses}/${profile?.water_goal || 8} glasses
- Workouts today: ${workouts.length}
- Current weight: ${profile?.weight || "unknown"}
- Goal: ${profile?.goal || profile?.long_term_goal || "general fitness"}`;
  }, [totals, caloriesGoal, caloriesRemaining, proteinGoal, carbsGoal, fatGoal, waterGlasses, workouts, profile]);

  // Quick action handlers
  const quickActions = [
    { icon: Search, label: "Search", action: () => setSearchOpen((prev) => !prev) },
    { icon: Scan, label: "Scan", action: () => setOverlay("barcode") },
    { icon: Camera, label: "Photo AI", action: () => setOverlay("camera") },
    { icon: Mic, label: "Voice", action: () => setOverlay("voice") },
  ];

  if (loading) {
    return (
      <div className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-6">
        {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton-shimmer h-24 rounded-[4px]" />)}
      </div>
    );
  }

  return (
    <>
      <TrialBanner trialEnd={profile?.trial_end || null} subscriptionStatus={profile?.subscription_status || null} />
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-6">
        {/* Header */}
        <motion.div variants={fadeUp} className="flex items-center justify-between">
          <div>
            <p className="code-label mb-1">SYS:01 Dashboard</p>
            <h1 className="text-2xl font-bold font-display text-foreground tracking-wide">
              {profile?.display_name ? `HEY, ${profile.display_name.toUpperCase()}` : "BULLETPROOFFIT"}
            </h1>
          </div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex items-center gap-1.5 terminal-card !p-0 px-3 py-1.5 text-sm"
          >
            <Flame className="w-4 h-4 text-foreground" />
            <span className="text-foreground font-semibold font-mono">{foodLogs.length > 0 ? "🔥" : "—"}</span>
          </motion.div>
        </motion.div>

        {/* Calorie Ring + Stats */}
        <motion.div variants={fadeUp} className="terminal-card !p-6 cursor-pointer" onClick={() => navigate("/meals")}>
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 relative">
              <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90" style={{ filter: 'drop-shadow(0 0 8px rgba(192,192,192,0.2))' }}>
                <defs>
                  <linearGradient id="calRingGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#404040" />
                    <stop offset="35%" stopColor="#C0C0C0" />
                    <stop offset="65%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#C0C0C0" />
                  </linearGradient>
                </defs>
                <circle cx="64" cy="64" r="56" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                <motion.circle
                  cx="64" cy="64" r="56" fill="none"
                  stroke="url(#calRingGrad)" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${(caloriePercent / 100) * 351.86} ${351.86}`}
                  initial={{ strokeDashoffset: 351.86 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground font-display">{animatedRemaining}</span>
                <span className="text-xs text-muted-foreground font-body">remaining</span>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              {[
                { label: "Eaten", value: `${totals.eaten} cal` },
                { label: "Goal", value: `${caloriesGoal} cal` },
                { label: "Burned", value: `${totals.burned} cal` },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between text-sm font-body">
                  <span className="text-muted-foreground uppercase text-xs">{row.label}</span>
                  <span className="text-foreground font-semibold font-mono">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 mt-5">
            {macros.map((macro, i) => {
              const pct = Math.min((macro.current / macro.goal) * 100, 100);
              return (
                <div key={macro.label} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-body uppercase tracking-wider ${macro.color}`}>{macro.label}</span>
                    <span className="text-xs text-foreground font-mono">{macro.current}/{macro.goal}{macro.unit} <span className="text-muted-foreground ml-1">{Math.round(pct)}%</span></span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                      className="h-full chrome-bar rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Log */}
        <motion.div variants={fadeUp}>
          <h2 className="section-label mb-3">Quick Log</h2>
          <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-4 gap-3">
            {quickActions.map(({ icon: Icon, label, action }) => (
              <motion.button key={label} variants={scaleIn} whileTap={{ scale: 0.97 }}
                whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(0,0,0,0.8), 0 0 0 1px rgba(192,192,192,0.15)' }}
                onClick={action}
                className="terminal-card !p-0 flex flex-col items-center gap-2 py-4">
                <div className="w-10 h-10 rounded-[4px] bg-accent border border-border flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <span className="text-xs text-muted-foreground font-body">{label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Inline Search Panel */}
          <DashboardSearch
            open={searchOpen}
            onClose={() => setSearchOpen(false)}
            onFoodLogged={fetchData}
            onSelectMealType={handleSearchFoodSelect}
          />
        </motion.div>

        {/* Today's Meals */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-label">Today's Meals</h2>
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate("/meals")}
              className="flex items-center gap-1 text-foreground text-xs font-medium font-body terminal-card !p-0 px-2.5 py-1">
              <Plus className="w-3.5 h-3.5" /> Add
            </motion.button>
          </div>
          {Object.keys(mealsByType).length === 0 ? (
            <div className="terminal-card !p-8 text-center">
              <p className="code-label mb-2">SYS: NO MEALS LOGGED TODAY</p>
              <button onClick={() => navigate("/meals")} className="text-foreground text-sm font-medium font-body underline">
                INITIATE FIRST LOG →
              </button>
            </div>
          ) : (
            <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-2">
              {Object.entries(mealsByType).map(([type, logs]) => (
                <motion.button key={type} variants={fadeUp} whileTap={{ scale: 0.97 }}
                  whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(0,0,0,0.8), 0 0 0 1px rgba(192,192,192,0.12)' }}
                  onClick={() => navigate("/meals")}
                  className="w-full terminal-card !p-4 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-xs font-heading text-muted-foreground uppercase tracking-wider">{type}</span>
                    <p className="text-sm text-foreground mt-0.5 font-body">{logs.map((l) => l.food_name).join(", ")}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground font-mono">{logs.reduce((s, l) => s + (l.calories || 0), 0)} cal</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Recent Workouts */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-label">Today's Workouts</h2>
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate("/workout")}
              className="flex items-center gap-1 text-foreground text-xs font-medium font-body terminal-card !p-0 px-2.5 py-1">
              <Plus className="w-3.5 h-3.5" /> Log
            </motion.button>
          </div>
          {workouts.length === 0 ? (
            <div className="terminal-card !p-8 text-center">
              <p className="code-label mb-2">SYS: NO WORKOUTS LOGGED</p>
              <button onClick={() => navigate("/workout")} className="text-foreground text-sm font-medium font-body underline">
                BEGIN TRAINING →
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {workouts.map((workout) => (
                <motion.button key={workout.id} variants={fadeUp} onClick={() => navigate("/workout")}
                  whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(0,0,0,0.8), 0 0 0 1px rgba(192,192,192,0.12)' }}
                  className="w-full terminal-card !p-4 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[4px] bg-accent border border-border flex items-center justify-center">
                      <Dumbbell className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground font-body">{workout.name}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        {workout.duration_minutes && <><Clock className="w-3 h-3 text-muted-foreground" /><span className="text-xs text-muted-foreground font-mono">{workout.duration_minutes} min</span></>}
                        {workout.calories_burned && <><Flame className="w-3 h-3 text-muted-foreground" /><span className="text-xs text-muted-foreground font-mono">{workout.calories_burned} cal</span></>}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Water */}
        <motion.div variants={fadeUp} className="terminal-card !p-4 cursor-pointer" onClick={() => navigate("/progress")}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[4px] bg-accent border border-border flex items-center justify-center">
                <Droplets className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <span className="text-sm font-medium text-foreground font-body">Water Intake</span>
                <p className="text-xs text-muted-foreground font-body">{waterGlasses} of 8 glasses</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); removeWater(); }}
                className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Minus className="w-4 h-4" />
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); addWater(); }}
                className="w-8 h-8 rounded-md bg-foreground text-background flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
          <div className="flex gap-1 mt-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05, type: "spring", stiffness: 400, damping: 17 }}
                className={`flex-1 h-2 rounded-full ${i < waterGlasses ? "chrome-bar" : "bg-muted"}`} />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Fullscreen Overlays */}
      {overlay === "camera" && (
        <CameraOverlay onCapture={handlePhotoCapture} onClose={() => setOverlay(null)} />
      )}
      {overlay === "barcode" && (
        <BarcodeOverlay onResult={handleBarcodeResult} onClose={() => setOverlay(null)} />
      )}

      {/* ARIA Voice AI */}
      <AriaOverlay
        open={overlay === "voice"}
        onClose={() => setOverlay(null)}
        context={ariaContext}
        onFoodLogged={fetchData}
        onWorkoutLogged={fetchData}
      />

      {/* AI Loading Overlay */}
      {aiLoading && (
        <div className="fixed inset-0 z-[9999] bg-background/90 flex flex-col items-center justify-center gap-4">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-10 h-10 border-2 border-muted border-t-foreground rounded-full" />
          <p className="text-sm text-muted-foreground font-body">Analyzing...</p>
        </div>
      )}

      {/* Food Confirmation */}
      {detectedFoods && (
        <FoodConfirmation
          foods={detectedFoods}
          mealType={getDefaultMeal()}
          onConfirm={handleConfirmFoods}
          onCancel={() => setDetectedFoods(null)}
        />
      )}

      {/* Meal Type Sheet */}
      <MealTypeSheet
        open={mealSheetOpen}
        onSelect={handleMealTypeSelect}
        onClose={() => { setMealSheetOpen(false); setPendingFood(null); }}
      />
    </>
  );
};

export default Dashboard;
