import { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Search, Plus, Flame } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const categories = ["All", "Strength", "Cardio", "Flexibility", "HIIT"];

const exercises = [
  { name: "Barbell Squat", muscle: "Quads, Glutes", type: "Strength", met: 6.0 },
  { name: "Bench Press", muscle: "Chest, Triceps", type: "Strength", met: 5.0 },
  { name: "Deadlift", muscle: "Back, Hamstrings", type: "Strength", met: 6.0 },
  { name: "Running", muscle: "Full Body", type: "Cardio", met: 9.8 },
  { name: "Pull-ups", muscle: "Back, Biceps", type: "Strength", met: 8.0 },
  { name: "Plank", muscle: "Core", type: "Strength", met: 3.8 },
  { name: "Cycling", muscle: "Legs", type: "Cardio", met: 7.5 },
  { name: "Yoga Flow", muscle: "Full Body", type: "Flexibility", met: 3.0 },
  { name: "Burpees", muscle: "Full Body", type: "HIIT", met: 8.0 },
  { name: "Lat Pulldown", muscle: "Back, Biceps", type: "Strength", met: 5.0 },
];

const WorkoutPage = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [logging, setLogging] = useState<string | null>(null);
  const [duration, setDuration] = useState(30);
  const [saving, setSaving] = useState(false);

  const filteredExercises = exercises.filter((ex) => {
    const matchesCategory = selectedCategory === "All" || ex.type === selectedCategory;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const logWorkout = async (ex: typeof exercises[0]) => {
    if (!user) return;
    setSaving(true);
    const caloriesBurned = Math.round(ex.met * 3.5 * 70 / 200 * duration);
    const today = new Date().toISOString().split("T")[0];
    const { error } = await supabase.from("workout_sessions").insert({
      user_id: user.id, name: ex.name, workout_type: ex.type,
      duration_minutes: duration, calories_burned: caloriesBurned, logged_at: today,
    });
    setSaving(false);
    if (error) { toast.error("Failed to log workout"); }
    else { toast.success(`${ex.name} logged — ${caloriesBurned} cal burned`); setLogging(null); setDuration(30); }
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-5">
      <motion.div variants={fadeUp}>
        <p className="code-label mb-1">SYS:03 Training</p>
        <h1 className="text-2xl font-bold font-display text-foreground tracking-wide">WORKOUT</h1>
        <p className="text-sm text-muted-foreground mt-1 font-body">Log exercises and track progress</p>
      </motion.div>

      {/* Search */}
      <motion.div variants={fadeUp} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search exercises..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring font-body" />
      </motion.div>

      {/* Category */}
      <motion.div variants={fadeUp} className="flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <motion.button key={cat} whileTap={{ scale: 0.97 }} onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all font-body ${
              selectedCategory === cat ? "bg-foreground text-background" : "border border-border text-muted-foreground"
            }`}>
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* Exercise List */}
      <motion.div variants={fadeUp} className="space-y-2">
        {filteredExercises.map((ex) => (
          <div key={ex.name}>
            <motion.button whileTap={{ scale: 0.97 }} whileHover={{ y: -2 }}
              onClick={() => setLogging(logging === ex.name ? null : ex.name)}
              className="w-full bracket-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-accent border border-border flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-foreground" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-medium text-foreground font-body">{ex.name}</span>
                  <p className="text-xs text-muted-foreground mt-0.5 font-body">{ex.muscle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground font-mono">{ex.type}</span>
                <Plus className="w-4 h-4 text-foreground" />
              </div>
            </motion.button>
            {logging === ex.name && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="bracket-card mt-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground font-body">Duration (min)</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setDuration(Math.max(5, duration - 5))}
                      className="w-7 h-7 rounded border border-border flex items-center justify-center text-muted-foreground text-xs active:scale-95">−</button>
                    <span className="text-sm font-semibold text-foreground font-mono w-8 text-center">{duration}</span>
                    <button onClick={() => setDuration(duration + 5)}
                      className="w-7 h-7 rounded border border-border flex items-center justify-center text-muted-foreground text-xs active:scale-95">+</button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground font-body">
                  <span>Est. calories burned</span>
                  <span className="text-foreground font-semibold font-mono">{Math.round(ex.met * 3.5 * 70 / 200 * duration)} cal</span>
                </div>
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => logWorkout(ex)} disabled={saving}
                  className="w-full bg-foreground text-background py-2.5 rounded-md text-sm font-semibold disabled:opacity-50 font-body">
                  {saving ? "Saving..." : "Log Workout"}
                </motion.button>
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default WorkoutPage;
