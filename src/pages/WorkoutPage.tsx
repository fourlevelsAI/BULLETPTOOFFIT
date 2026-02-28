import { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Search, Plus, Clock, Flame, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

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
      user_id: user.id,
      name: ex.name,
      workout_type: ex.type,
      duration_minutes: duration,
      calories_burned: caloriesBurned,
      logged_at: today,
    });
    setSaving(false);
    if (error) {
      toast.error("Failed to log workout");
    } else {
      toast.success(`${ex.name} logged — ${caloriesBurned} cal burned`);
      setLogging(null);
      setDuration(30);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-5">
      <div>
        <p className="section-label mb-1">Code 03: Training</p>
        <h1 className="text-2xl font-bold text-foreground">Workout</h1>
        <p className="text-sm text-muted-foreground mt-1 font-body">Log exercises and track progress</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search exercises..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-card border border-white/10 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground font-body" />
      </div>

      {/* Category */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all font-body ${
              selectedCategory === cat ? "bg-foreground text-background" : "border border-white/10 text-muted-foreground"
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Exercise List */}
      <div className="space-y-2">
        {filteredExercises.map((ex) => (
          <div key={ex.name}>
            <button onClick={() => setLogging(logging === ex.name ? null : ex.name)}
              className="w-full glass-card-hover p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-foreground" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-medium text-foreground font-body">{ex.name}</span>
                  <p className="text-xs text-muted-foreground mt-0.5 font-body">{ex.muscle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded border border-white/10 text-muted-foreground font-body">{ex.type}</span>
                <Plus className="w-4 h-4 text-foreground" />
              </div>
            </button>
            {logging === ex.name && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="glass-card p-4 mt-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground font-body">Duration (min)</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setDuration(Math.max(5, duration - 5))} className="w-7 h-7 rounded border border-white/10 flex items-center justify-center text-muted-foreground text-xs">−</button>
                    <span className="text-sm font-semibold text-foreground font-body w-8 text-center">{duration}</span>
                    <button onClick={() => setDuration(duration + 5)} className="w-7 h-7 rounded border border-white/10 flex items-center justify-center text-muted-foreground text-xs">+</button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground font-body">
                  <span>Est. calories burned</span>
                  <span className="text-foreground font-semibold">{Math.round(ex.met * 3.5 * 70 / 200 * duration)} cal</span>
                </div>
                <button onClick={() => logWorkout(ex)} disabled={saving}
                  className="w-full bg-foreground text-background py-2.5 rounded-md text-sm font-semibold disabled:opacity-50 font-body">
                  {saving ? "Saving..." : "Log Workout"}
                </button>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WorkoutPage;
