import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Target, Flame, Dumbbell, Droplets, Footprints, Timer, TrendingDown, Scale, Percent, Trophy } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const longTermGoals = [
  { value: "lose_fat", label: "LOSE FAT" },
  { value: "build_muscle", label: "BUILD MUSCLE" },
  { value: "maintain", label: "MAINTAIN" },
  { value: "improve_endurance", label: "ENDURANCE" },
  { value: "increase_strength", label: "STRENGTH" },
  { value: "recomp", label: "RECOMP" },
];

interface GoalRowProps {
  icon: React.ElementType;
  label: string;
  value: number | string;
  unit: string;
  field: string;
  type?: string;
  step?: number;
  onUpdate: (field: string, value: any) => void;
}

const GoalRow = ({ icon: Icon, label, value, unit, field, type = "number", step = 1, onUpdate }: GoalRowProps) => {
  const [localVal, setLocalVal] = useState(String(value ?? ""));
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => { setLocalVal(String(value ?? "")); }, [value]);

  const handleChange = (newVal: string) => {
    setLocalVal(newVal);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const parsed = type === "number" ? parseInt(newVal) || 0 : parseFloat(newVal) || 0;
      onUpdate(field, parsed);
    }, 500);
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-foreground font-body">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          inputMode="decimal"
          step={step}
          value={localVal}
          onChange={(e) => handleChange(e.target.value)}
          className="w-20 bg-card border border-border rounded px-2 py-1.5 text-sm text-foreground text-right font-mono focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <span className="text-xs text-muted-foreground font-mono w-12">{unit}</span>
      </div>
    </div>
  );
};

const GoalsPage = () => {
  const { profile, updateProfile } = useProfile();
  const [selectedGoal, setSelectedGoal] = useState(profile?.long_term_goal || "lose_fat");

  useEffect(() => {
    if (profile?.long_term_goal) setSelectedGoal(profile.long_term_goal);
  }, [profile?.long_term_goal]);

  const handleUpdate = useCallback(async (field: string, value: any) => {
    const { error } = await updateProfile({ [field]: value } as any);
    if (error) toast.error("Failed to save");
  }, [updateProfile]);

  const handleGoalSelect = async (goal: string) => {
    setSelectedGoal(goal);
    const { error } = await updateProfile({ long_term_goal: goal } as any);
    if (error) toast.error("Failed to save goal");
  };

  if (!profile) return null;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-6">
      <motion.div variants={fadeUp}>
        <p className="code-label mb-1">SYS:05 Goal Protocol</p>
        <h1 className="text-2xl font-bold font-display text-foreground tracking-wide">DEFINE YOUR TARGETS</h1>
        <p className="text-sm text-muted-foreground mt-1 font-body">Set and track your fitness goals</p>
      </motion.div>

      {/* Long Term Goal */}
      <motion.div variants={fadeUp} className="bracket-card space-y-3">
        <h2 className="section-label">Long Term Goal</h2>
        <div className="grid grid-cols-3 gap-2">
          {longTermGoals.map((g) => (
            <motion.button key={g.value} whileTap={{ scale: 0.97 }}
              onClick={() => handleGoalSelect(g.value)}
              className={`px-2 py-2.5 rounded-md text-xs font-semibold font-body transition-all ${
                selectedGoal === g.value
                  ? "bg-foreground text-background chrome-text"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}>
              {g.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Daily Targets */}
      <motion.div variants={fadeUp} className="bracket-card">
        <h2 className="section-label mb-2">Daily Targets</h2>
        <GoalRow icon={Flame} label="Calorie Goal" value={profile.calorie_goal || 2000} unit="kcal" field="calorie_goal" onUpdate={handleUpdate} />
        <GoalRow icon={Target} label="Protein Goal" value={profile.protein_goal || 150} unit="g" field="protein_goal" onUpdate={handleUpdate} />
        <GoalRow icon={Target} label="Carbs Goal" value={profile.carbs_goal || 250} unit="g" field="carbs_goal" onUpdate={handleUpdate} />
        <GoalRow icon={Target} label="Fat Goal" value={profile.fat_goal || 65} unit="g" field="fat_goal" onUpdate={handleUpdate} />
        <GoalRow icon={Droplets} label="Water Goal" value={(profile as any).water_goal || 8} unit="glasses" field="water_goal" onUpdate={handleUpdate} />
        <GoalRow icon={Footprints} label="Steps Goal" value={(profile as any).steps_goal || 10000} unit="steps" field="steps_goal" onUpdate={handleUpdate} />
        <GoalRow icon={Timer} label="Active Minutes" value={(profile as any).active_minutes_goal || 30} unit="min" field="active_minutes_goal" onUpdate={handleUpdate} />
      </motion.div>

      {/* Weekly Targets */}
      <motion.div variants={fadeUp} className="bracket-card">
        <h2 className="section-label mb-2">Weekly Targets</h2>
        <GoalRow icon={Dumbbell} label="Workout Sessions" value={(profile as any).weekly_workouts_goal || 4} unit="/week" field="weekly_workouts_goal" onUpdate={handleUpdate} />
        <GoalRow icon={Dumbbell} label="Cardio Sessions" value={(profile as any).weekly_cardio_goal || 2} unit="/week" field="weekly_cardio_goal" onUpdate={handleUpdate} />
        <GoalRow icon={TrendingDown} label="Calorie Deficit" value={(profile as any).weekly_calorie_deficit || 3500} unit="kcal/wk" field="weekly_calorie_deficit" onUpdate={handleUpdate} />
        <GoalRow icon={Scale} label="Weight Change" value={(profile as any).weekly_weight_change || -0.5} unit="kg/wk" field="weekly_weight_change" step={0.1} onUpdate={handleUpdate} />
      </motion.div>

      {/* Monthly Targets */}
      <motion.div variants={fadeUp} className="bracket-card">
        <h2 className="section-label mb-2">Monthly Targets</h2>
        <GoalRow icon={Scale} label="Target Weight" value={(profile as any).target_weight || (profile.weight || 70)} unit="kg" field="target_weight" onUpdate={handleUpdate} />
        <GoalRow icon={Percent} label="Body Fat Target" value={(profile as any).target_body_fat || 18} unit="%" field="target_body_fat" onUpdate={handleUpdate} />
        <GoalRow icon={Dumbbell} label="Total Workouts" value={(profile as any).monthly_workouts_goal || 16} unit="" field="monthly_workouts_goal" onUpdate={handleUpdate} />
        <GoalRow icon={Trophy} label="Personal Records" value={(profile as any).monthly_prs_goal || 3} unit="" field="monthly_prs_goal" onUpdate={handleUpdate} />
      </motion.div>
    </motion.div>
  );
};

export default GoalsPage;
