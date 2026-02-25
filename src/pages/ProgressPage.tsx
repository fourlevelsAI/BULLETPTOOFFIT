import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Calendar, Target, Flame, Dumbbell } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const weightData = [
  { date: "Jan", weight: 185 },
  { date: "Feb", weight: 183 },
  { date: "Mar", weight: 181 },
  { date: "Apr", weight: 180 },
  { date: "May", weight: 178 },
  { date: "Jun", weight: 176 },
  { date: "Jul", weight: 175 },
];

const calorieWeekData = [
  { day: "Mon", consumed: 2100, burned: 450 },
  { day: "Tue", consumed: 1950, burned: 320 },
  { day: "Wed", consumed: 2200, burned: 580 },
  { day: "Thu", consumed: 1800, burned: 290 },
  { day: "Fri", consumed: 2300, burned: 150 },
  { day: "Sat", consumed: 2000, burned: 620 },
  { day: "Sun", consumed: 1900, burned: 400 },
];

const workoutFrequency = [
  { week: "W1", sessions: 4 },
  { week: "W2", sessions: 5 },
  { week: "W3", sessions: 3 },
  { week: "W4", sessions: 6 },
];

const stats = [
  { label: "Current Weight", value: "175 lbs", change: "-10 lbs", trend: "down", icon: Target },
  { label: "Avg Daily Calories", value: "2,036", change: "-164", trend: "down", icon: Flame },
  { label: "Workouts This Month", value: "18", change: "+3", trend: "up", icon: Dumbbell },
  { label: "Streak", value: "12 days", change: "+4", trend: "up", icon: Calendar },
];

const ProgressPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground">Progress</h1>
        <p className="text-sm text-muted-foreground mt-1">Your fitness journey at a glance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <span className="text-xl font-bold text-foreground">{stat.value}</span>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 text-success" />
                ) : stat.trend === "down" ? (
                  <TrendingDown className="w-3 h-3 text-success" />
                ) : (
                  <Minus className="w-3 h-3 text-muted-foreground" />
                )}
                <span className="text-xs text-success">{stat.change}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Weight Chart */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4"
      >
        <h2 className="text-sm font-semibold text-foreground mb-4">Weight Trend</h2>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={weightData}>
            <defs>
              <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(84, 81%, 44%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(84, 81%, 44%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={["auto", "auto"]} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 41%, 10%)",
                border: "1px solid hsl(222, 30%, 22%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 96%)",
                fontSize: "12px",
              }}
            />
            <Area type="monotone" dataKey="weight" stroke="hsl(84, 81%, 44%)" fill="url(#weightGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Calorie Chart */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-4"
      >
        <h2 className="text-sm font-semibold text-foreground mb-4">Weekly Calories</h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={calorieWeekData}>
            <XAxis dataKey="day" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 41%, 10%)",
                border: "1px solid hsl(222, 30%, 22%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 96%)",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="consumed" fill="hsl(24, 95%, 53%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="burned" fill="hsl(84, 81%, 44%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-calories" />
            <span className="text-xs text-muted-foreground">Consumed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Burned</span>
          </div>
        </div>
      </motion.div>

      {/* Workout Frequency */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-4"
      >
        <h2 className="text-sm font-semibold text-foreground mb-4">Workout Frequency</h2>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={workoutFrequency}>
            <XAxis dataKey="week" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} width={20} />
            <Bar dataKey="sessions" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default ProgressPage;
