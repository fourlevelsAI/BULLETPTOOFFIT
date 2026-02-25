import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Search,
  Plus,
  Clock,
  Flame,
  ChevronRight,
  Zap,
  Heart,
  Target,
} from "lucide-react";

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

const workoutPlans = [
  { name: "Push Day", exercises: 6, duration: "45 min", difficulty: "Intermediate" },
  { name: "Full Body Beginner", exercises: 8, duration: "30 min", difficulty: "Beginner" },
  { name: "HIIT Blast", exercises: 10, duration: "20 min", difficulty: "Advanced" },
];

const WorkoutPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExercises = exercises.filter((ex) => {
    const matchesCategory = selectedCategory === "All" || ex.type === selectedCategory;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Workout</h1>
          <p className="text-sm text-muted-foreground mt-1">Log exercises and track progress</p>
        </div>
        <button className="gradient-lime px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold text-primary-foreground">
          <Plus className="w-4 h-4" /> Start
        </button>
      </div>

      {/* AI Plans */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Workout Plans</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {workoutPlans.map((plan) => (
            <motion.button
              key={plan.name}
              whileHover={{ scale: 1.02 }}
              className="glass-card-hover p-4 min-w-[180px] text-left flex-shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{plan.name}</h3>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs text-muted-foreground">{plan.exercises} exercises</span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">{plan.duration}</span>
              </div>
              <span className={`text-xs mt-2 inline-block px-2 py-0.5 rounded-full ${
                plan.difficulty === "Beginner"
                  ? "bg-success/10 text-success"
                  : plan.difficulty === "Intermediate"
                  ? "bg-warning/10 text-warning"
                  : "bg-destructive/10 text-destructive"
              }`}>
                {plan.difficulty}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-card border border-glass-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "gradient-lime text-primary-foreground"
                : "glass-card text-muted-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Exercise List */}
      <div className="space-y-2">
        {filteredExercises.map((ex) => (
          <motion.button
            key={ex.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full glass-card-hover p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <span className="text-sm font-medium text-foreground">{ex.name}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{ex.muscle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                {ex.type}
              </span>
              <Plus className="w-4 h-4 text-primary" />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default WorkoutPage;
