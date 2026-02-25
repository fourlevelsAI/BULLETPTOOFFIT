import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Flame,
  Droplets,
  Zap,
  Plus,
  ChevronRight,
  Scan,
  Camera,
  Mic,
  Search,
  Dumbbell,
  Clock,
  TrendingUp,
} from "lucide-react";

const caloriesConsumed = 1420;
const caloriesGoal = 2200;
const caloriesRemaining = caloriesGoal - caloriesConsumed;
const caloriePercent = Math.round((caloriesConsumed / caloriesGoal) * 100);

const macros = [
  { label: "Protein", current: 82, goal: 150, color: "bg-protein", unit: "g" },
  { label: "Carbs", current: 145, goal: 250, color: "bg-carbs", unit: "g" },
  { label: "Fat", current: 48, goal: 73, color: "bg-fat", unit: "g" },
];

const meals = [
  { name: "Breakfast", calories: 420, time: "8:30 AM", items: "Oatmeal, banana, almond butter" },
  { name: "Lunch", calories: 650, time: "12:45 PM", items: "Grilled chicken salad, quinoa" },
  { name: "Snack", calories: 350, time: "3:30 PM", items: "Greek yogurt, mixed berries" },
];

const quickActions = [
  { icon: Search, label: "Search", color: "text-primary" },
  { icon: Scan, label: "Scan", color: "text-primary" },
  { icon: Camera, label: "Photo AI", color: "text-primary" },
  { icon: Mic, label: "Voice", color: "text-primary" },
];

const recentWorkouts = [
  { name: "Upper Body", duration: "45 min", calories: 320, date: "Today" },
  { name: "Morning Run", duration: "32 min", calories: 280, date: "Yesterday" },
];

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">Good afternoon</p>
          <h1 className="text-2xl font-bold text-foreground">FitTrack Pro</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 glass-card px-3 py-1.5 text-sm">
            <Flame className="w-4 h-4 text-calories" />
            <span className="text-calories font-semibold">12</span>
            <span className="text-muted-foreground">day streak</span>
          </div>
        </div>
      </div>

      {/* Calorie Ring */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 relative">
            <CircularProgressbar
              value={caloriePercent}
              styles={buildStyles({
                pathColor: "hsl(84, 81%, 44%)",
                trailColor: "hsl(222, 30%, 18%)",
                textSize: "0px",
              })}
              strokeWidth={8}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{caloriesRemaining}</span>
              <span className="text-xs text-muted-foreground">remaining</span>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Eaten</span>
              <span className="text-foreground font-semibold">{caloriesConsumed} cal</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Goal</span>
              <span className="text-foreground font-semibold">{caloriesGoal} cal</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Burned</span>
              <span className="text-success font-semibold">320 cal</span>
            </div>
          </div>
        </div>

        {/* Macro Bars */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {macros.map((macro) => (
            <div key={macro.label} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{macro.label}</span>
                <span className="text-xs text-foreground font-medium">
                  {macro.current}/{macro.goal}{macro.unit}
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${macro.color} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min((macro.current / macro.goal) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Log Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">Quick Log</h2>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              className="glass-card-hover flex flex-col items-center gap-2 py-4"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <span className="text-xs text-muted-foreground">{label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Today's Meals */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">Today's Meals</h2>
          <button className="flex items-center gap-1 text-primary text-xs font-medium">
            <Plus className="w-3.5 h-3.5" /> Add Meal
          </button>
        </div>
        <div className="space-y-2">
          {meals.map((meal) => (
            <button
              key={meal.name}
              className="w-full glass-card-hover p-4 flex items-center justify-between"
            >
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{meal.name}</span>
                  <span className="text-xs text-muted-foreground">{meal.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{meal.items}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-calories">{meal.calories} cal</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Recent Workouts */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">Recent Workouts</h2>
          <button className="flex items-center gap-1 text-primary text-xs font-medium">
            <Plus className="w-3.5 h-3.5" /> Log Workout
          </button>
        </div>
        <div className="space-y-2">
          {recentWorkouts.map((workout) => (
            <div key={workout.name} className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">{workout.name}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{workout.duration}</span>
                    <Flame className="w-3 h-3 text-calories" />
                    <span className="text-xs text-muted-foreground">{workout.calories} cal</span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{workout.date}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Water Intake */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-protein/10 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-protein" />
            </div>
            <div>
              <span className="text-sm font-medium text-foreground">Water Intake</span>
              <p className="text-xs text-muted-foreground">5 of 8 glasses</p>
            </div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-6 rounded-full ${
                  i < 5 ? "bg-protein" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
