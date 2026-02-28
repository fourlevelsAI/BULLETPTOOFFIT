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

const caloriesConsumed = 1420;
const caloriesGoal = 2200;
const caloriesRemaining = caloriesGoal - caloriesConsumed;
const caloriePercent = Math.round((caloriesConsumed / caloriesGoal) * 100);

const macros = [
  { label: "P", current: 82, goal: 150, unit: "g" },
  { label: "C", current: 145, goal: 250, unit: "g" },
  { label: "F", current: 48, goal: 73, unit: "g" },
];

const meals = [
  { name: "Breakfast", calories: 420, time: "8:30 AM", items: "Oatmeal, banana, almond butter" },
  { name: "Lunch", calories: 650, time: "12:45 PM", items: "Grilled chicken salad, quinoa" },
  { name: "Snack", calories: 350, time: "3:30 PM", items: "Greek yogurt, mixed berries" },
];

const quickActions = [
  { icon: Search, label: "Search" },
  { icon: Scan, label: "Scan" },
  { icon: Camera, label: "Photo AI" },
  { icon: Mic, label: "Voice" },
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
          <p className="section-label mb-1">Code 01: Dashboard</p>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            BF<sup className="text-[8px] align-super ml-0.5">®</sup>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 border border-white/10 rounded-md px-3 py-1.5 text-sm">
            <Flame className="w-4 h-4 text-foreground" />
            <span className="text-foreground font-semibold font-body">12</span>
            <span className="text-muted-foreground font-body">day streak</span>
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
                pathColor: "hsl(0, 0%, 100%)",
                trailColor: "hsl(0, 0%, 20%)",
                textSize: "0px",
              })}
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
              <span className="text-foreground font-semibold">{caloriesConsumed} cal</span>
            </div>
            <div className="flex items-center justify-between text-sm font-body">
              <span className="text-muted-foreground">Goal</span>
              <span className="text-foreground font-semibold">{caloriesGoal} cal</span>
            </div>
            <div className="flex items-center justify-between text-sm font-body">
              <span className="text-muted-foreground">Burned</span>
              <span className="text-foreground font-semibold">320 cal</span>
            </div>
          </div>
        </div>

        {/* Macro Bars */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {macros.map((macro) => (
            <div key={macro.label} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-body">{macro.label}</span>
                <span className="text-xs text-foreground font-medium font-body">
                  {macro.current}/{macro.goal}{macro.unit}
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground rounded-full transition-all duration-500"
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
          <h2 className="section-label">Quick Log</h2>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="glass-card-hover flex flex-col items-center gap-2 py-4"
            >
              <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-xs text-muted-foreground font-body">{label}</span>
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
          <h2 className="section-label">Today's Meals</h2>
          <button className="flex items-center gap-1 text-foreground text-xs font-medium font-body border border-white/10 rounded-md px-2.5 py-1">
            <Plus className="w-3.5 h-3.5" /> Add
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
                  <span className="text-sm font-medium text-foreground font-body">{meal.name}</span>
                  <span className="text-xs text-muted-foreground font-body">{meal.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 font-body">{meal.items}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground font-body">{meal.calories} cal</span>
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
          <h2 className="section-label">Recent Workouts</h2>
          <button className="flex items-center gap-1 text-foreground text-xs font-medium font-body border border-white/10 rounded-md px-2.5 py-1">
            <Plus className="w-3.5 h-3.5" /> Log
          </button>
        </div>
        <div className="space-y-2">
          {recentWorkouts.map((workout) => (
            <div key={workout.name} className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground font-body">{workout.name}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-body">{workout.duration}</span>
                    <Flame className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-body">{workout.calories} cal</span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground font-body">{workout.date}</span>
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
            <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <span className="text-sm font-medium text-foreground font-body">Water Intake</span>
              <p className="text-xs text-muted-foreground font-body">5 of 8 glasses</p>
            </div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-6 rounded-full ${
                  i < 5 ? "bg-foreground" : "bg-white/10"
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
