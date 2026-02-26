import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "@/hooks/useProfile";
import {
  Target,
  Dumbbell,
  Scale,
  ChevronRight,
  ChevronLeft,
  Check,
  Flame,
  Heart,
} from "lucide-react";
import { toast } from "sonner";

const goals = [
  { value: "lose_weight", label: "Lose Fat", icon: Flame, desc: "Burn fat & get lean" },
  { value: "gain_muscle", label: "Build Muscle", icon: Dumbbell, desc: "Build strength & size" },
  { value: "maintain", label: "Maintain", icon: Scale, desc: "Stay balanced & healthy" },
  { value: "improve_health", label: "Improve Health", icon: Heart, desc: "Feel your best every day" },
];

const activityLevels = [
  { value: "sedentary", label: "Sedentary", desc: "Little or no exercise" },
  { value: "light", label: "Lightly Active", desc: "1–3 days/week" },
  { value: "moderate", label: "Moderately Active", desc: "3–5 days/week" },
  { value: "active", label: "Active", desc: "6–7 days/week" },
  { value: "very_active", label: "Very Active", desc: "Intense daily training" },
];

const dietaryOptions = [
  "No Restrictions", "Vegetarian", "Vegan", "Keto", "Paleo",
  "Gluten-Free", "Dairy-Free", "Halal", "Kosher",
];

const sexOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const TOTAL_STEPS = 5;

interface OnboardingState {
  goal: string | null;
  age: number | null;
  weight: number | null;
  height: number | null;
  sex: string | null;
  activityLevel: string | null;
  dietaryPreferences: string[];
}

function calculateMacros(state: OnboardingState) {
  const { weight, height, age, sex, activityLevel, goal } = state;
  if (!weight || !height || !age || !sex || !activityLevel) {
    return { calories: 2000, protein: 150, carbs: 250, fat: 65 };
  }

  // Mifflin-St Jeor
  let bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age);
  bmr += sex === "male" ? 5 : -161;

  const multipliers: Record<string, number> = {
    sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9,
  };
  let tdee = Math.round(bmr * (multipliers[activityLevel] || 1.55));

  if (goal === "lose_weight") tdee -= 500;
  else if (goal === "gain_muscle") tdee += 300;

  const protein = Math.round(Number(weight) * 2);
  const fat = Math.round((tdee * 0.25) / 9);
  const carbs = Math.round((tdee - protein * 4 - fat * 9) / 4);

  return { calories: tdee, protein, carbs, fat };
}

const OnboardingPage = () => {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<OnboardingState>({
    goal: null, age: null, weight: null, height: null, sex: null,
    activityLevel: null, dietaryPreferences: [],
  });
  const [saving, setSaving] = useState(false);
  const { updateProfile } = useProfile();
  const navigate = useNavigate();

  const update = (partial: Partial<OnboardingState>) =>
    setState((prev) => ({ ...prev, ...partial }));

  const canAdvance = () => {
    if (step === 0) return state.goal !== null;
    if (step === 1) return state.age && state.weight && state.height && state.sex;
    if (step === 2) return state.activityLevel !== null;
    if (step === 3) return true;
    if (step === 4) return true;
    return false;
  };

  const macros = calculateMacros(state);

  const next = async () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      setSaving(true);
      const { error } = await updateProfile({
        goal: state.goal,
        age: state.age,
        weight: state.weight,
        height: state.height,
        sex: state.sex,
        activity_level: state.activityLevel,
        dietary_preferences: state.dietaryPreferences,
        calorie_goal: macros.calories,
        protein_goal: macros.protein,
        carbs_goal: macros.carbs,
        fat_goal: macros.fat,
        onboarding_completed: true,
      } as any);
      setSaving(false);
      if (error) {
        toast.error("Failed to save. Please try again.");
      } else {
        navigate("/", { replace: true });
        window.location.reload();
      }
    }
  };

  const back = () => { if (step > 0) setStep(step - 1); };

  const toggleDiet = (d: string) => {
    const prefs = state.dietaryPreferences;
    if (d === "No Restrictions") {
      update({ dietaryPreferences: prefs.includes(d) ? [] : ["No Restrictions"] });
    } else {
      const without = prefs.filter((p) => p !== "No Restrictions");
      update({
        dietaryPreferences: without.includes(d) ? without.filter((p) => p !== d) : [...without, d],
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="px-6 pt-6">
        <div className="flex gap-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 pt-8 pb-4 max-w-lg mx-auto w-full overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <StepWrapper key="goal">
              <h1 className="text-2xl font-bold text-foreground mb-2">What's your goal?</h1>
              <p className="text-muted-foreground text-sm mb-8">We'll personalize your experience.</p>
              <div className="space-y-3">
                {goals.map(({ value, label, icon: Icon, desc }) => (
                  <button key={value} onClick={() => update({ goal: value })}
                    className={`w-full glass-card-hover p-5 flex items-center gap-4 text-left transition-all ${state.goal === value ? "border-primary ring-1 ring-primary" : ""}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${state.goal === value ? "bg-primary/20" : "bg-muted"}`}>
                      <Icon className={`w-6 h-6 ${state.goal === value ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1">
                      <span className="text-foreground font-semibold">{label}</span>
                      <p className="text-muted-foreground text-xs mt-0.5">{desc}</p>
                    </div>
                    {state.goal === value && <Check className="w-5 h-5 text-primary" />}
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {step === 1 && (
            <StepWrapper key="stats">
              <h1 className="text-2xl font-bold text-foreground mb-2">Body Stats</h1>
              <p className="text-muted-foreground text-sm mb-8">Helps us calculate your daily targets.</p>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {sexOptions.map(({ value, label }) => (
                    <button key={value} onClick={() => update({ sex: value })}
                      className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${state.sex === value ? "gradient-lime text-primary-foreground" : "glass-card text-muted-foreground"}`}>
                      {label}
                    </button>
                  ))}
                </div>
                <FieldRow label="Age" suffix="years">
                  <input type="number" inputMode="numeric" value={state.age ?? ""} onChange={(e) => update({ age: e.target.value ? Number(e.target.value) : null })}
                    className="bg-transparent text-foreground text-right text-lg font-semibold w-20 outline-none" placeholder="—" min={13} max={120} />
                </FieldRow>
                <FieldRow label="Weight" suffix="kg">
                  <input type="number" inputMode="decimal" value={state.weight ?? ""} onChange={(e) => update({ weight: e.target.value ? Number(e.target.value) : null })}
                    className="bg-transparent text-foreground text-right text-lg font-semibold w-20 outline-none" placeholder="—" min={20} max={500} />
                </FieldRow>
                <FieldRow label="Height" suffix="cm">
                  <input type="number" inputMode="numeric" value={state.height ?? ""} onChange={(e) => update({ height: e.target.value ? Number(e.target.value) : null })}
                    className="bg-transparent text-foreground text-right text-lg font-semibold w-20 outline-none" placeholder="—" min={100} max={300} />
                </FieldRow>
              </div>
            </StepWrapper>
          )}

          {step === 2 && (
            <StepWrapper key="activity">
              <h1 className="text-2xl font-bold text-foreground mb-2">Activity Level</h1>
              <p className="text-muted-foreground text-sm mb-8">How active are you on a typical week?</p>
              <div className="space-y-2">
                {activityLevels.map(({ value, label, desc }) => (
                  <button key={value} onClick={() => update({ activityLevel: value })}
                    className={`w-full glass-card-hover p-3.5 flex items-center justify-between text-left ${state.activityLevel === value ? "border-primary ring-1 ring-primary" : ""}`}>
                    <div>
                      <span className="text-sm font-medium text-foreground">{label}</span>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    {state.activityLevel === value && <Check className="w-4 h-4 text-primary shrink-0" />}
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {step === 3 && (
            <StepWrapper key="diet">
              <h1 className="text-2xl font-bold text-foreground mb-2">Dietary Preferences</h1>
              <p className="text-muted-foreground text-sm mb-8">Select all that apply. Change anytime.</p>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((d) => (
                  <button key={d} onClick={() => toggleDiet(d)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${state.dietaryPreferences.includes(d) ? "bg-primary text-primary-foreground" : "glass-card-hover text-muted-foreground"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {step === 4 && (
            <StepWrapper key="preview">
              <h1 className="text-2xl font-bold text-foreground mb-2">Your Daily Targets</h1>
              <p className="text-muted-foreground text-sm mb-8">Based on your stats and goals.</p>
              <div className="glass-card p-6 space-y-6">
                <div className="text-center">
                  <span className="text-5xl font-bold text-foreground">{macros.calories}</span>
                  <p className="text-muted-foreground text-sm mt-1">calories per day</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <MacroPreview label="Protein" value={`${macros.protein}g`} color="bg-protein" />
                  <MacroPreview label="Carbs" value={`${macros.carbs}g`} color="bg-carbs" />
                  <MacroPreview label="Fat" value={`${macros.fat}g`} color="bg-fat" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">You can adjust these anytime in settings.</p>
            </StepWrapper>
          )}
        </AnimatePresence>
      </div>

      <div className="px-6 pb-8 max-w-lg mx-auto w-full flex gap-3">
        {step > 0 && (
          <button onClick={back} className="glass-card-hover px-5 py-3.5 rounded-xl flex items-center gap-1 text-muted-foreground text-sm font-medium">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        )}
        <button onClick={next} disabled={!canAdvance() || saving}
          className="flex-1 gradient-lime text-primary-foreground py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity">
          {saving ? "Saving..." : step === TOTAL_STEPS - 1 ? "Let's Go!" : "Continue"}
          {step < TOTAL_STEPS - 1 && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

const StepWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
    {children}
  </motion.div>
);

const FieldRow = ({ label, suffix, children }: { label: string; suffix: string; children: React.ReactNode }) => (
  <div className="glass-card p-4 flex items-center justify-between">
    <span className="text-sm text-muted-foreground">{label}</span>
    <div className="flex items-center gap-1">
      {children}
      <span className="text-xs text-muted-foreground">{suffix}</span>
    </div>
  </div>
);

const MacroPreview = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className="text-center">
    <div className={`w-3 h-3 rounded-full ${color} mx-auto mb-2`} />
    <span className="text-lg font-bold text-foreground">{value}</span>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

export default OnboardingPage;
