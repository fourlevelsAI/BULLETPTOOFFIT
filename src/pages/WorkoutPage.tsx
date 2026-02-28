import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Search, Plus, Check, X, Minus } from "lucide-react";
import { exercises, categories, type Exercise } from "@/lib/exerciseDatabase";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };

const WorkoutPage = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [logging, setLogging] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [logged, setLogged] = useState<Set<string>>(new Set());

  // Strength state
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState("");

  // Cardio state
  const [duration, setDuration] = useState(30);
  const [distance, setDistance] = useState("");

  // HIIT state
  const [rounds, setRounds] = useState(5);
  const [workSec, setWorkSec] = useState(30);
  const [restSec, setRestSec] = useState(15);

  const filteredExercises = exercises.filter((ex) => {
    const matchesCategory = selectedCategory === "All" || ex.category === selectedCategory;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.muscle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const resetForm = () => {
    setSets(3); setReps(10); setWeight("");
    setDuration(30); setDistance("");
    setRounds(5); setWorkSec(30); setRestSec(15);
  };

  const logWorkout = async (ex: Exercise) => {
    if (!user) return;
    setSaving(true);

    let caloriesBurned = 0;
    let durationMin = 0;

    if (ex.type === "Strength") {
      durationMin = sets * reps * 4 / 60; // rough estimate
      caloriesBurned = Math.round(ex.met * 3.5 * 70 / 200 * Math.max(durationMin, 5));
    } else if (ex.type === "Cardio") {
      durationMin = duration;
      caloriesBurned = Math.round(ex.met * 3.5 * 70 / 200 * duration);
    } else if (ex.type === "HIIT") {
      durationMin = Math.round(rounds * (workSec + restSec) / 60);
      caloriesBurned = Math.round(ex.met * 3.5 * 70 / 200 * durationMin);
    } else {
      durationMin = duration;
      caloriesBurned = Math.round(ex.met * 3.5 * 70 / 200 * duration);
    }

    const today = new Date().toISOString().split("T")[0];
    const { error } = await supabase.from("workout_sessions").insert({
      user_id: user.id, name: ex.name, workout_type: ex.type,
      duration_minutes: Math.max(Math.round(durationMin), 1),
      calories_burned: caloriesBurned, logged_at: today,
      notes: ex.type === "Strength" ? `${sets}×${reps} @ ${weight || "BW"}` : undefined,
    });

    setSaving(false);
    if (error) { toast.error("Failed to log workout"); }
    else {
      toast.success(`SYS: ${ex.name.toUpperCase()} LOGGED — ${caloriesBurned} cal`);
      setLogged((prev) => new Set(prev).add(ex.name));
      setLogging(null);
      resetForm();
    }
  };

  const Stepper = ({ value, onChange, min = 1, max = 999 }: { value: number; onChange: (v: number) => void; min?: number; max?: number }) => (
    <div className="flex items-center gap-2">
      <button onClick={() => onChange(Math.max(min, value - 1))}
        className="w-7 h-7 rounded border border-border flex items-center justify-center text-muted-foreground active:scale-95">
        <Minus className="w-3 h-3" />
      </button>
      <span className="text-sm font-semibold text-foreground font-mono w-8 text-center">{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))}
        className="w-7 h-7 rounded border border-border flex items-center justify-center text-muted-foreground active:scale-95">
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );

  const renderLogForm = (ex: Exercise) => {
    if (ex.type === "Strength") {
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-body">Sets</span>
            <Stepper value={sets} onChange={setSets} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-body">Reps</span>
            <Stepper value={reps} onChange={setReps} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-body">Weight</span>
            <div className="flex items-center gap-2">
              <input type="number" inputMode="decimal" placeholder="BW" value={weight} onChange={(e) => setWeight(e.target.value)}
                className="w-20 bg-card border border-border rounded px-2 py-1.5 text-sm text-foreground text-center font-mono focus:outline-none focus:ring-1 focus:ring-ring" />
              <span className="text-xs text-muted-foreground">kg</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground font-body pt-1 border-t border-border">
            <span>Est. calories</span>
            <span className="text-foreground font-semibold font-mono">
              {Math.round(ex.met * 3.5 * 70 / 200 * Math.max(sets * reps * 4 / 60, 5))} cal
            </span>
          </div>
        </div>
      );
    }

    if (ex.type === "Cardio" || ex.type === "Flexibility") {
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-body">Duration (min)</span>
            <Stepper value={duration} onChange={setDuration} min={1} max={300} />
          </div>
          {ex.type === "Cardio" && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-body">Distance (km)</span>
              <input type="number" inputMode="decimal" placeholder="—" value={distance} onChange={(e) => setDistance(e.target.value)}
                className="w-20 bg-card border border-border rounded px-2 py-1.5 text-sm text-foreground text-center font-mono focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>
          )}
          <div className="flex items-center justify-between text-xs text-muted-foreground font-body pt-1 border-t border-border">
            <span>Est. calories</span>
            <span className="text-foreground font-semibold font-mono">
              {Math.round(ex.met * 3.5 * 70 / 200 * duration)} cal
            </span>
          </div>
        </div>
      );
    }

    // HIIT
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-body">Rounds</span>
          <Stepper value={rounds} onChange={setRounds} max={50} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-body">Work (sec)</span>
          <Stepper value={workSec} onChange={setWorkSec} min={5} max={120} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-body">Rest (sec)</span>
          <Stepper value={restSec} onChange={setRestSec} min={5} max={120} />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground font-body pt-1 border-t border-border">
          <span>Total time</span>
          <span className="text-foreground font-semibold font-mono">
            {Math.round(rounds * (workSec + restSec) / 60)} min
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground font-body">
          <span>Est. calories</span>
          <span className="text-foreground font-semibold font-mono">
            {Math.round(ex.met * 3.5 * 70 / 200 * rounds * (workSec + restSec) / 60)} cal
          </span>
        </div>
      </div>
    );
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

      {/* Category Tabs */}
      <motion.div variants={fadeUp} className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {categories.map((cat) => (
          <motion.button key={cat} whileTap={{ scale: 0.97 }} onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all font-body ${
              selectedCategory === cat ? "bg-foreground text-background" : "border border-border text-muted-foreground"
            }`}>
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* Exercise count */}
      <motion.p variants={fadeUp} className="text-xs text-muted-foreground font-mono">
        {filteredExercises.length} exercises
      </motion.p>

      {/* Exercise List */}
      <motion.div variants={fadeUp} className="space-y-2">
        {filteredExercises.map((ex) => {
          const isLogged = logged.has(ex.name);
          return (
            <div key={ex.name}>
              <motion.button whileTap={{ scale: 0.97 }} whileHover={{ y: -1 }}
                onClick={() => { setLogging(logging === ex.name ? null : ex.name); resetForm(); }}
                className="w-full bracket-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-md border border-border flex items-center justify-center ${isLogged ? "bg-foreground" : "bg-accent"}`}>
                    {isLogged ? <Check className="w-5 h-5 text-background" /> : <Dumbbell className="w-5 h-5 text-foreground" />}
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-medium text-foreground font-body">{ex.name}</span>
                    <p className="text-xs text-muted-foreground mt-0.5 font-body">{ex.muscle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground font-mono">{ex.type}</span>
                  {!isLogged && <Plus className="w-4 h-4 text-foreground" />}
                </div>
              </motion.button>

              <AnimatePresence>
                {logging === ex.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bracket-card mt-1 space-y-3">
                      {renderLogForm(ex)}
                      <div className="flex gap-2">
                        <motion.button whileTap={{ scale: 0.97 }} onClick={() => logWorkout(ex)} disabled={saving}
                          className="flex-1 bg-foreground text-background py-2.5 rounded-md text-sm font-semibold disabled:opacity-50 font-body">
                          {saving ? "Saving..." : "Log Workout"}
                        </motion.button>
                        <motion.button whileTap={{ scale: 0.97 }} onClick={() => setLogging(null)}
                          className="px-3 py-2.5 rounded-md border border-border text-muted-foreground">
                          <X className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default WorkoutPage;
