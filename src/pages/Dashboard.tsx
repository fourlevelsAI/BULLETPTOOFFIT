import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Flame,
  Droplets,
  Plus,
  ChevronRight,
  Scan,
  Camera,
  Mic,
  Search,
  Dumbbell,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

interface FoodLog {
  id: string;
  food_name: string;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  meal_type: string;
  logged_at: string;
}

interface WorkoutSession {
  id: string;
  name: string;
  duration_minutes: number | null;
  calories_burned: number | null;
  logged_at: string;
}

interface WaterLog {
  id: string;
  amount_ml: number;
}

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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="section-label mb-1">Code 01: Dashboard</p>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            {profile?.display_name ? `Hey, ${profile.display_name}` : "BULLETPROOFFIT"}
          </h1>
        </div>
        <div className="flex items-center gap-1.5 border border-white/10 rounded-md px-3 py-1.5 text-sm">
          <Flame className="w-4 h-4 text-foreground" />
          <span className="text-foreground font-semibold font-body">{foodLogs.length > 0 ? "🔥" : "—"}</span>
        </div>
      </div>

      {/* Calorie Ring */}
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-6">
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 relative">
            <CircularProgressbar
              value={caloriePercent}
              styles={buildStyles({ pathColor: "hsl(0, 0%, 100%)", trailColor: "hsl(0, 0%, 20%)", textSize: "0px" })}
              strokeWidth={8}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground font-heading">{caloriesRemaining}</span>
              <span className="text-xs text-muted-foreground font-body">remaining</span>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between text-sm font-body">
              <span className="text-muted-foreground">Eaten</span>
              <span className="text-foreground font-semibold">{totals.eaten} cal</span>
            </div>
            <div className="flex items-center justify-between text-sm font-body">
              <span className="text-muted-foreground">Goal</span>
              <span className="text-foreground font-semibold">{caloriesGoal} cal</span>
            </div>
            <div className="flex items-center justify-between text-sm font-body">
              <span className="text-muted-foreground">Burned</span>
              <span className="text-foreground font-semibold">{totals.burned} cal</span>
            </div>
          </div>
        </div>
        {/* Macro Bars */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {macros.map((macro) => (
            <div key={macro.label} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-body">{macro.label}</span>
                <span className="text-xs text-foreground font-medium font-body">{macro.current}/{macro.goal}{macro.unit}</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-foreground rounded-full transition-all duration-500" style={{ width: `${Math.min((macro.current / macro.goal) * 100, 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Log */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <h2 className="section-label mb-3">Quick Log</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map(({ icon: Icon, label }) => (
            <button key={label} onClick={() => navigate("/meals")} className="glass-card-hover flex flex-col items-center gap-2 py-4">
              <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-xs text-muted-foreground font-body">{label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Today's Meals */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-label">Today's Meals</h2>
          <button onClick={() => navigate("/meals")} className="flex items-center gap-1 text-foreground text-xs font-medium font-body border border-white/10 rounded-md px-2.5 py-1">
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
        {Object.keys(mealsByType).length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="text-muted-foreground text-sm font-body">No meals logged yet today.</p>
            <button onClick={() => navigate("/meals")} className="mt-3 text-foreground text-sm font-medium font-body underline">Log your first meal →</button>
          </div>
        ) : (
          <div className="space-y-2">
            {Object.entries(mealsByType).map(([type, logs]) => (
              <button key={type} onClick={() => navigate("/meals")} className="w-full glass-card-hover p-4 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-sm font-medium text-foreground font-body">{type}</span>
                  <p className="text-xs text-muted-foreground mt-0.5 font-body">{logs.map((l) => l.food_name).join(", ")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground font-body">{logs.reduce((s, l) => s + (l.calories || 0), 0)} cal</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Recent Workouts */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-label">Today's Workouts</h2>
          <button onClick={() => navigate("/workout")} className="flex items-center gap-1 text-foreground text-xs font-medium font-body border border-white/10 rounded-md px-2.5 py-1">
            <Plus className="w-3.5 h-3.5" /> Log
          </button>
        </div>
        {workouts.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="text-muted-foreground text-sm font-body">No workouts logged today.</p>
            <button onClick={() => navigate("/workout")} className="mt-3 text-foreground text-sm font-medium font-body underline">Log a workout →</button>
          </div>
        ) : (
          <div className="space-y-2">
            {workouts.map((workout) => (
              <div key={workout.id} className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground font-body">{workout.name}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      {workout.duration_minutes && <><Clock className="w-3 h-3 text-muted-foreground" /><span className="text-xs text-muted-foreground font-body">{workout.duration_minutes} min</span></>}
                      {workout.calories_burned && <><Flame className="w-3 h-3 text-muted-foreground" /><span className="text-xs text-muted-foreground font-body">{workout.calories_burned} cal</span></>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Water */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={addWater} className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Droplets className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <span className="text-sm font-medium text-foreground font-body">Water Intake</span>
              <p className="text-xs text-muted-foreground font-body">{waterGlasses} of 8 glasses · Tap icon to add</p>
            </div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={`w-2.5 h-6 rounded-full ${i < waterGlasses ? "bg-foreground" : "bg-white/10"}`} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
