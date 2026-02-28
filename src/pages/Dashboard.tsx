import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Flame, Droplets, Plus, ChevronRight, Scan, Camera, Mic, Search, Dumbbell, Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

// --- Animated count-up hook ---
function useCountUp(target: number, duration = 1000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
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

// --- Animation variants ---
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 400, damping: 17 } },
};

interface FoodLog { id: string; food_name: string; calories: number | null; protein: number | null; carbs: number | null; fat: number | null; meal_type: string; logged_at: string; }
interface WorkoutSession { id: string; name: string; duration_minutes: number | null; calories_burned: number | null; logged_at: string; }
interface WaterLog { id: string; amount_ml: number; }

const quickActions = [
  { icon: Search, label: "Search" },
  { icon: Scan, label: "Scan" },
  { icon: Camera, label: "Photo AI" },
  { icon: Mic, label: "Voice" },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [waterLogs, setWaterLogs] = useState<WaterLog[]>([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [foodRes, workoutRes, waterRes] = await Promise.all([
        supabase.from("food_logs").select("*").eq("user_id", user.id).eq("logged_at", today).order("created_at", { ascending: true }),
        supabase.from("workout_sessions").select("*").eq("user_id", user.id).eq("logged_at", today).order("created_at", { ascending: false }),
        supabase.from("water_logs").select("*").eq("user_id", user.id).eq("logged_at", today),
      ]);
      setFoodLogs((foodRes.data as FoodLog[]) || []);
      setWorkouts((workoutRes.data as WorkoutSession[]) || []);
      setWaterLogs((waterRes.data as WaterLog[]) || []);
      setLoading(false);
    };
    fetchData();
  }, [user, today]);

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
    { label: "P", current: Math.round(totals.protein), goal: proteinGoal, unit: "g" },
    { label: "C", current: Math.round(totals.carbs), goal: carbsGoal, unit: "g" },
    { label: "F", current: Math.round(totals.fat), goal: fatGoal, unit: "g" },
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

  if (loading) {
    return (
      <div className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-shimmer h-24 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div>
          <p className="code-label mb-1">SYS:01 Dashboard</p>
          <h1 className="text-2xl font-bold text-foreground">
            {profile?.display_name ? `Hey, ${profile.display_name}` : "BULLETPROOFFIT"}
          </h1>
        </div>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center gap-1.5 border border-border rounded-md px-3 py-1.5 text-sm"
        >
          <Flame className="w-4 h-4 text-foreground" />
          <span className="text-foreground font-semibold font-mono">{foodLogs.length > 0 ? "🔥" : "—"}</span>
        </motion.div>
      </motion.div>

      {/* Calorie Ring */}
      <motion.div variants={fadeUp} className="bracket-card !p-6">
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 relative">
            <CircularProgressbar
              value={caloriePercent}
              styles={buildStyles({
                pathColor: "hsl(var(--foreground))",
                trailColor: "hsl(var(--muted))",
                textSize: "0px",
                pathTransitionDuration: 1.2,
              })}
              strokeWidth={8}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground font-mono">{animatedRemaining}</span>
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
                <span className="text-muted-foreground">{row.label}</span>
                <span className="text-foreground font-semibold font-mono">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Macro Bars */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {macros.map((macro, i) => (
            <div key={macro.label} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-body">{macro.label}</span>
                <span className="text-xs text-foreground font-medium font-mono">{macro.current}/{macro.goal}{macro.unit}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((macro.current / macro.goal) * 100, 100)}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                  className="h-full bg-foreground rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Log */}
      <motion.div variants={fadeUp}>
        <h2 className="section-label mb-3">Quick Log</h2>
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-4 gap-3">
          {quickActions.map(({ icon: Icon, label }) => (
            <motion.button
              key={label}
              variants={scaleIn}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -2 }}
              onClick={() => navigate("/meals")}
              className="bracket-card !p-0 flex flex-col items-center gap-2 py-4"
            >
              <div className="w-10 h-10 rounded-md bg-accent border border-border flex items-center justify-center">
                <Icon className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-xs text-muted-foreground font-body">{label}</span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Today's Meals */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-label">Today's Meals</h2>
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate("/meals")}
            className="flex items-center gap-1 text-foreground text-xs font-medium font-body border border-border rounded-md px-2.5 py-1">
            <Plus className="w-3.5 h-3.5" /> Add
          </motion.button>
        </div>
        {Object.keys(mealsByType).length === 0 ? (
          <div className="bracket-card !p-8 text-center">
            <p className="text-muted-foreground text-sm font-body">No meals logged yet today.</p>
            <button onClick={() => navigate("/meals")} className="mt-3 text-foreground text-sm font-medium font-body underline">Log your first meal →</button>
          </div>
        ) : (
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-2">
            {Object.entries(mealsByType).map(([type, logs]) => (
              <motion.button
                key={type}
                variants={fadeUp}
                whileTap={{ scale: 0.97 }}
                whileHover={{ y: -2 }}
                onClick={() => navigate("/meals")}
                className="w-full bracket-card !p-4 flex items-center justify-between"
              >
                <div className="text-left">
                  <span className="text-sm font-medium text-foreground font-body">{type}</span>
                  <p className="text-xs text-muted-foreground mt-0.5 font-body">{logs.map((l) => l.food_name).join(", ")}</p>
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
            className="flex items-center gap-1 text-foreground text-xs font-medium font-body border border-border rounded-md px-2.5 py-1">
            <Plus className="w-3.5 h-3.5" /> Log
          </motion.button>
        </div>
        {workouts.length === 0 ? (
          <div className="bracket-card !p-8 text-center">
            <p className="text-muted-foreground text-sm font-body">No workouts logged today.</p>
            <button onClick={() => navigate("/workout")} className="mt-3 text-foreground text-sm font-medium font-body underline">Log a workout →</button>
          </div>
        ) : (
          <div className="space-y-2">
            {workouts.map((workout) => (
              <motion.div key={workout.id} variants={fadeUp} whileHover={{ y: -2 }} className="bracket-card !p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-accent border border-border flex items-center justify-center">
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
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Water */}
      <motion.div variants={fadeUp} className="bracket-card !p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={addWater}
              className="w-10 h-10 rounded-md bg-accent border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <Droplets className="w-5 h-5 text-foreground" />
            </motion.button>
            <div>
              <span className="text-sm font-medium text-foreground font-body">Water Intake</span>
              <p className="text-xs text-muted-foreground font-body">{waterGlasses} of 8 glasses · Tap icon to add</p>
            </div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05, type: "spring", stiffness: 400, damping: 17 }}
                className={`w-2.5 h-6 rounded-full ${i < waterGlasses ? "bg-foreground" : "bg-muted"}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
