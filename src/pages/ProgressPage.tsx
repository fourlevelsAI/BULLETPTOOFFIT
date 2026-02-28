import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Target, Flame, Dumbbell, Droplets, Sparkles, ChevronRight, RefreshCw } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const GoalRing = ({ label, current, target, size = 64 }: { label: string; current: number; target: number; size?: number }) => {
  const pct = Math.min((current / target) * 100, 100);
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (pct / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--border))" strokeWidth={4} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--foreground))" strokeWidth={4}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-700" />
      </svg>
      <span className="text-xs font-mono text-foreground">{Math.round(pct)}%</span>
      <span className="text-[10px] text-muted-foreground font-body">{label}</span>
    </div>
  );
};

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const loadingMessages = [
  "SYS: ANALYZING PROFILE...",
  "SYS: CALCULATING MACROS...",
  "SYS: BUILDING WORKOUT SPLIT...",
  "SYS: OPTIMIZING MEAL TIMING...",
  "SYS: PROTOCOL READY",
];

const ProgressPage = () => {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const [weightData, setWeightData] = useState<{ date: string; weight: number }[]>([]);
  const [newWeight, setNewWeight] = useState("");
  const [saving, setSaving] = useState(false);

  // Daily totals
  const [todayCalories, setTodayCalories] = useState(0);
  const [todayProtein, setTodayProtein] = useState(0);
  const [todayWater, setTodayWater] = useState(0);
  const [weekWorkouts, setWeekWorkouts] = useState(0);

  // Streak calendar
  const [streakDays, setStreakDays] = useState<Record<string, number>>({});

  // AI Plan
  const [plan, setPlan] = useState<any>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!user) return;
    const fetchAll = async () => {
      // Weight data
      const { data: wd } = await supabase
        .from("body_measurements").select("measured_at, weight")
        .eq("user_id", user.id).not("weight", "is", null)
        .order("measured_at", { ascending: true }).limit(30);
      if (wd) setWeightData(wd.map((d) => ({
        date: new Date(d.measured_at).toLocaleDateString("en", { month: "short", day: "numeric" }),
        weight: Number(d.weight),
      })));

      // Today's food
      const { data: food } = await supabase.from("food_logs").select("calories, protein")
        .eq("user_id", user.id).eq("logged_at", today);
      if (food) {
        setTodayCalories(food.reduce((s, f) => s + (f.calories || 0), 0));
        setTodayProtein(food.reduce((s, f) => s + Number(f.protein || 0), 0));
      }

      // Today's water
      const { data: water } = await supabase.from("water_logs").select("amount_ml")
        .eq("user_id", user.id).eq("logged_at", today);
      if (water) setTodayWater(Math.round(water.reduce((s, w) => s + w.amount_ml, 0) / 250));

      // This week's workouts
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
      const { data: wk } = await supabase.from("workout_sessions").select("id")
        .eq("user_id", user.id).gte("logged_at", weekStart.toISOString().split("T")[0]);
      if (wk) setWeekWorkouts(wk.length);

      // Streak: last 30 days
      const thirtyAgo = new Date();
      thirtyAgo.setDate(thirtyAgo.getDate() - 29);
      const [{ data: fl }, { data: ws }] = await Promise.all([
        supabase.from("food_logs").select("logged_at").eq("user_id", user.id)
          .gte("logged_at", thirtyAgo.toISOString().split("T")[0]),
        supabase.from("workout_sessions").select("logged_at").eq("user_id", user.id)
          .gte("logged_at", thirtyAgo.toISOString().split("T")[0]),
      ]);
      const days: Record<string, number> = {};
      fl?.forEach((f) => { days[f.logged_at] = (days[f.logged_at] || 0) + 1; });
      ws?.forEach((w) => { days[w.logged_at] = (days[w.logged_at] || 0) + 2; });
      setStreakDays(days);

      // Load saved plan
      const mondayDate = new Date();
      mondayDate.setDate(mondayDate.getDate() - ((mondayDate.getDay() + 6) % 7));
      const { data: savedPlan } = await supabase.from("weekly_plans").select("plan_data")
        .eq("user_id", user.id).eq("week_start", mondayDate.toISOString().split("T")[0]).maybeSingle();
      if (savedPlan) setPlan(savedPlan.plan_data);
    };
    fetchAll();
  }, [user]);

  const logWeight = async () => {
    if (!user || !newWeight) return;
    const w = parseFloat(newWeight);
    if (isNaN(w) || w <= 0 || w > 500) { toast.error("Enter a valid weight"); return; }
    setSaving(true);
    const { error } = await supabase.from("body_measurements").insert({ user_id: user.id, weight: w, measured_at: today });
    if (!error) {
      setWeightData((prev) => [...prev, { date: new Date().toLocaleDateString("en", { month: "short", day: "numeric" }), weight: w }]);
      await updateProfile({ weight: w } as any);
      toast.success("Weight logged!");
      setNewWeight("");
    } else toast.error("Failed to save weight");
    setSaving(false);
  };

  const generatePlan = async () => {
    if (!user || !profile) return;
    setGenerating(true);
    setLoadingStep(0);

    // Animate loading messages
    const interval = setInterval(() => {
      setLoadingStep((p) => Math.min(p + 1, loadingMessages.length - 1));
    }, 800);

    try {
      const { data, error } = await supabase.functions.invoke("generate-weekly-plan", {
        body: {
          goal: (profile as any).long_term_goal || profile.goal || "lose_fat",
          calories: profile.calorie_goal || 2000,
          protein: profile.protein_goal || 150,
          carbs: profile.carbs_goal || 200,
          fat: profile.fat_goal || 65,
          workouts_per_week: (profile as any).weekly_workouts_goal || 4,
          activity_level: profile.activity_level || "moderate",
          dietary_preferences: profile.dietary_preferences || [],
          current_weight: profile.weight || 80,
          target_weight: (profile as any).target_weight || 75,
        },
      });

      clearInterval(interval);

      if (error) throw error;
      setPlan(data);
      setSelectedDay(0);

      // Save to DB
      const mondayDate = new Date();
      mondayDate.setDate(mondayDate.getDate() - ((mondayDate.getDay() + 6) % 7));
      await supabase.from("weekly_plans").upsert({
        user_id: user.id,
        week_start: mondayDate.toISOString().split("T")[0],
        plan_data: data,
      }, { onConflict: "user_id,week_start" });

      toast.success("SYS: WEEKLY PROTOCOL GENERATED");
    } catch (e: any) {
      clearInterval(interval);
      toast.error(e.message || "Failed to generate plan");
    }
    setGenerating(false);
  };

  const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  const tooltipStyle = {
    backgroundColor: isDark ? "hsl(0, 0%, 7%)" : "hsl(0, 0%, 100%)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "hsl(0, 0%, 88%)"}`,
    borderRadius: "8px", color: isDark ? "hsl(0, 0%, 96%)" : "hsl(0, 0%, 5%)",
    fontSize: "12px", fontFamily: "'JetBrains Mono', monospace",
  };

  // Streak calendar cells
  const streakCells = useMemo(() => {
    const cells = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      const score = streakDays[key] || 0;
      cells.push({ date: key, score, day: d.getDate() });
    }
    return cells;
  }, [streakDays]);

  const selectedDayData = plan?.days?.[selectedDay];

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-6">
      <motion.div variants={fadeUp}>
        <p className="code-label mb-1">SYS:04 Analytics</p>
        <h1 className="text-2xl font-bold font-display text-foreground tracking-wide">PROGRESS</h1>
        <p className="text-sm text-muted-foreground mt-1 font-body">Your fitness journey at a glance</p>
      </motion.div>

      {/* Goal Rings */}
      <motion.div variants={fadeUp} className="bracket-card">
        <h2 className="section-label mb-4">Daily Progress</h2>
        <div className="flex justify-around">
          <GoalRing label="Calories" current={todayCalories} target={profile?.calorie_goal || 2000} />
          <GoalRing label="Protein" current={todayProtein} target={profile?.protein_goal || 150} />
          <GoalRing label="Water" current={todayWater} target={(profile as any)?.water_goal || 8} />
          <GoalRing label="Workouts" current={weekWorkouts} target={(profile as any)?.weekly_workouts_goal || 4} />
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
        {[
          { label: "Current Weight", value: profile?.weight ? `${profile.weight} kg` : "—", icon: Scale },
          { label: "Calorie Goal", value: `${profile?.calorie_goal || 2000} cal`, icon: Target },
          { label: "Goal", value: profile?.goal?.replace("_", " ") || "—", icon: Flame },
          { label: "Activity", value: profile?.activity_level?.replace("_", " ") || "—", icon: Dumbbell },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} whileHover={{ y: -2 }} className="bracket-card">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-foreground" />
                <span className="text-xs text-muted-foreground font-body">{stat.label}</span>
              </div>
              <span className="text-lg font-bold text-foreground font-mono capitalize">{stat.value}</span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Log Weight */}
      <motion.div variants={fadeUp} className="bracket-card space-y-3">
        <h2 className="section-label">Log Weight</h2>
        <div className="flex gap-2">
          <input type="number" inputMode="decimal" placeholder="e.g. 75" value={newWeight} onChange={(e) => setNewWeight(e.target.value)}
            className="flex-1 bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono" />
          <motion.button whileTap={{ scale: 0.97 }} onClick={logWeight} disabled={saving}
            className="bg-foreground text-background px-4 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50 font-body">
            {saving ? "..." : "Log"}
          </motion.button>
        </div>
      </motion.div>

      {/* Weight Chart */}
      <motion.div variants={fadeUp} className="bracket-card">
        <h2 className="section-label mb-4">Weight Trend</h2>
        {weightData.length === 0 ? (
          <div className="h-[180px] flex items-center justify-center">
            <p className="text-muted-foreground text-sm font-body">No weight data yet.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={weightData}>
              <defs>
                <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontFamily: "'JetBrains Mono'" }} axisLine={false} tickLine={false} />
              <YAxis domain={["auto", "auto"]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontFamily: "'JetBrains Mono'" }} axisLine={false} tickLine={false} width={35} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="weight" stroke="hsl(var(--foreground))" fill="url(#weightGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </motion.div>

      {/* Streak Calendar */}
      <motion.div variants={fadeUp} className="bracket-card">
        <h2 className="section-label mb-3">30-Day Streak</h2>
        <div className="grid grid-cols-10 gap-1">
          {streakCells.map((c) => {
            const opacity = c.score === 0 ? 0.1 : c.score === 1 ? 0.3 : c.score >= 3 ? 1 : 0.6;
            return (
              <div key={c.date} title={`${c.date}: ${c.score} activities`}
                className="aspect-square rounded-sm transition-colors"
                style={{ backgroundColor: `hsl(var(--foreground) / ${opacity})` }} />
            );
          })}
        </div>
        <p className="text-[10px] text-muted-foreground font-mono mt-2 text-right">← 30 days ago &nbsp; today →</p>
      </motion.div>

      {/* AI Weekly Protocol */}
      <motion.div variants={fadeUp} className="bracket-card space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-foreground" />
          <h2 className="section-label">AI Weekly Protocol</h2>
        </div>

        {!plan && !generating && (
          <div className="space-y-3">
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground font-body">
                Goal: <span className="text-foreground font-semibold capitalize">{((profile as any)?.long_term_goal || profile?.goal || "lose_fat").replace("_", " ")}</span>
              </p>
              <p className="text-muted-foreground font-body">
                Calories: <span className="text-foreground font-semibold">{profile?.calorie_goal || 2000}/day</span>
              </p>
              <p className="text-muted-foreground font-body">
                Training: <span className="text-foreground font-semibold">{(profile as any)?.weekly_workouts_goal || 4}×/week</span>
              </p>
            </div>
            <motion.button whileTap={{ scale: 0.97 }} onClick={generatePlan}
              className="w-full bg-foreground text-background py-3 rounded-md text-sm font-semibold font-body flex items-center justify-center gap-2">
              GENERATE MY WEEK <ChevronRight className="w-4 h-4" />
            </motion.button>
            <p className="text-xs text-muted-foreground text-center font-body">Custom training + diet plan built around your exact goals</p>
          </div>
        )}

        {generating && (
          <div className="space-y-2 py-4">
            {loadingMessages.map((msg, i) => (
              <motion.p key={msg}
                initial={{ opacity: 0, x: -10 }}
                animate={i <= loadingStep ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0, duration: 0.3 }}
                className={`text-xs font-mono ${i <= loadingStep ? "text-foreground" : "text-transparent"}`}>
                {msg}
              </motion.p>
            ))}
          </div>
        )}

        {plan && !generating && (
          <div className="space-y-4">
            {plan.week_summary && (
              <p className="text-xs text-muted-foreground font-body italic">{plan.week_summary}</p>
            )}

            {/* Day tabs */}
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {dayLabels.map((d, i) => {
                const dayData = plan.days?.[i];
                const isRest = dayData?.type === "Rest" || dayData?.type === "Active Recovery";
                return (
                  <button key={d} onClick={() => setSelectedDay(i)}
                    className={`px-2 py-1.5 rounded text-xs font-mono whitespace-nowrap transition-all ${
                      selectedDay === i
                        ? "bg-foreground text-background"
                        : isRest
                        ? "border border-border text-muted-foreground/50"
                        : "border border-border text-muted-foreground"
                    }`}>
                    {d}
                  </button>
                );
              })}
            </div>

            {selectedDayData && (
              <AnimatePresence mode="wait">
                <motion.div key={selectedDay} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                  {/* Type badge */}
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                      selectedDayData.type === "Rest" ? "bg-muted text-muted-foreground" : "bg-foreground text-background"
                    }`}>
                      {selectedDayData.type}
                    </span>
                  </div>

                  {/* Workout */}
                  {selectedDayData.workout && (
                    <div className="border border-border rounded-md p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground font-body">{selectedDayData.workout.name}</span>
                        <span className="text-xs text-muted-foreground font-mono">{selectedDayData.workout.duration} min</span>
                      </div>
                      {selectedDayData.workout.exercises?.map((ex: any, j: number) => (
                        <div key={j} className="flex items-center justify-between py-1 border-t border-border">
                          <span className="text-xs text-foreground font-body">{ex.name}</span>
                          <span className="text-xs text-muted-foreground font-mono">{ex.sets}×{ex.reps} · {ex.rest}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Meals */}
                  {selectedDayData.meals && (
                    <div className="border border-border rounded-md p-3 space-y-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-foreground font-mono">
                          {selectedDayData.daily_totals?.calories || "—"} CAL
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          P:{selectedDayData.daily_totals?.protein} C:{selectedDayData.daily_totals?.carbs} F:{selectedDayData.daily_totals?.fat}
                        </span>
                      </div>
                      {(["breakfast", "lunch", "dinner", "snack"] as const).map((meal) => {
                        const m = selectedDayData.meals[meal];
                        if (!m) return null;
                        const emoji = meal === "breakfast" ? "🌅" : meal === "lunch" ? "☀️" : meal === "dinner" ? "🌙" : "🍎";
                        return (
                          <div key={meal} className="py-1.5 border-t border-border">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-foreground font-body">{emoji} {m.name}</span>
                              <span className="text-[10px] text-muted-foreground font-mono">{m.calories} cal · P:{m.protein}g</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Tip */}
                  {selectedDayData.tip && (
                    <div className="bg-accent border border-border rounded-md p-3">
                      <p className="text-xs text-foreground font-body">💡 {selectedDayData.tip}</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            <motion.button whileTap={{ scale: 0.97 }} onClick={generatePlan}
              className="w-full border border-border text-muted-foreground py-2 rounded-md text-xs font-body flex items-center justify-center gap-2 hover:text-foreground transition-colors">
              <RefreshCw className="w-3 h-3" /> Regenerate Plan
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProgressPage;
