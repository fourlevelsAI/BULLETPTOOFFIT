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

  const stepLabels = ["Goal", "Stats", "Activity", "Diet", "Targets"];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="px-6 pt-6">
        <p className="code-label mb-4">Code 0{step + 1}: {stepLabels[step]}</p>
        <div className="flex gap-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${i <= step ? "bg-foreground" : "bg-muted"}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 pt-8 pb-4 max-w-lg mx-auto w-full overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <StepWrapper key="goal">
              <h1 className="text-2xl font-bold text-foreground mb-2">What's Your Goal?</h1>
              <p className="text-muted-foreground text-sm mb-8 font-body">We'll personalize your experience.</p>
              <div className="space-y-3">
                {goals.map(({ value, label, icon: Icon, desc }) => (
                  <button key={value} onClick={() => update({ goal: value })}
                    className={`w-full glass-card-hover p-5 flex items-center gap-4 text-left transition-all ${state.goal === value ? "border-foreground ring-1 ring-foreground" : ""}`}>
                    <div className={`w-12 h-12 rounded-md flex items-center justify-center border ${state.goal === value ? "bg-foreground border-foreground" : "bg-muted border-border"}`}>
                      <Icon className={`w-6 h-6 ${state.goal === value ? "text-background" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1">
                      <span className="text-foreground font-semibold font-body">{label}</span>
                      <p className="text-muted-foreground text-xs mt-0.5 font-body">{desc}</p>
                    </div>
                    {state.goal === value && <Check className="w-5 h-5 text-foreground" />}
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {step === 1 && (
            <StepWrapper key="stats">
              <h1 className="text-2xl font-bold text-foreground mb-2">Body Stats</h1>
              <p className="text-muted-foreground text-sm mb-8 font-body">Helps us calculate your daily targets.</p>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {sexOptions.map(({ value, label }) => (
                    <button key={value} onClick={() => update({ sex: value })}
                      className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all font-body ${state.sex === value ? "bg-foreground text-background" : "glass-card text-muted-foreground"}`}>
                      {label}
                    </button>
                  ))}
                </div>
                <FieldRow label="Age" suffix="years">
                  <input type="number" inputMode="numeric" value={state.age ?? ""} onChange={(e) => update({ age: e.target.value ? Number(e.target.value) : null })}
                    className="bg-transparent text-foreground text-right text-lg font-semibold w-20 outline-none font-body" placeholder="—" min={13} max={120} />
                </FieldRow>
                <FieldRow label="Weight" suffix="kg">
                  <input type="number" inputMode="decimal" value={state.weight ?? ""} onChange={(e) => update({ weight: e.target.value ? Number(e.target.value) : null })}
                    className="bg-transparent text-foreground text-right text-lg font-semibold w-20 outline-none font-body" placeholder="—" min={20} max={500} />
                </FieldRow>
                <FieldRow label="Height" suffix="cm">
                  <input type="number" inputMode="numeric" value={state.height ?? ""} onChange={(e) => update({ height: e.target.value ? Number(e.target.value) : null })}
                    className="bg-transparent text-foreground text-right text-lg font-semibold w-20 outline-none font-body" placeholder="—" min={100} max={300} />
                </FieldRow>
              </div>
            </StepWrapper>
          )}

          {step === 2 && (
            <StepWrapper key="activity">
              <h1 className="text-2xl font-bold text-foreground mb-2">Activity Level</h1>
              <p className="text-muted-foreground text-sm mb-8 font-body">How active are you on a typical week?</p>
              <div className="space-y-2">
                {activityLevels.map(({ value, label, desc }) => (
                  <button key={value} onClick={() => update({ activityLevel: value })}
                    className={`w-full glass-card-hover p-3.5 flex items-center justify-between text-left ${state.activityLevel === value ? "border-foreground ring-1 ring-foreground" : ""}`}>
                    <div>
                      <span className="text-sm font-medium text-foreground font-body">{label}</span>
                      <p className="text-xs text-muted-foreground font-body">{desc}</p>
                    </div>
                    {state.activityLevel === value && <Check className="w-4 h-4 text-foreground shrink-0" />}
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {step === 3 && (
            <StepWrapper key="diet">
              <h1 className="text-2xl font-bold text-foreground mb-2">Dietary Preferences</h1>
              <p className="text-muted-foreground text-sm mb-8 font-body">Select all that apply. Change anytime.</p>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((d) => (
                  <button key={d} onClick={() => toggleDiet(d)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all font-body ${state.dietaryPreferences.includes(d) ? "bg-foreground text-background" : "border border-border text-muted-foreground hover:text-foreground"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {step === 4 && (
            <StepWrapper key="preview">
              <h1 className="text-2xl font-bold text-foreground mb-2">Your Daily Targets</h1>
              <p className="text-muted-foreground text-sm mb-8 font-body">Based on your stats and goals.</p>
              <div className="glass-card p-6 space-y-6">
                <div className="text-center">
                  <span className="text-5xl font-black text-foreground font-heading">{macros.calories}</span>
                  <p className="text-muted-foreground text-sm mt-1 font-body">calories per day</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <MacroPreview label="P" value={`${macros.protein}g`} />
                  <MacroPreview label="C" value={`${macros.carbs}g`} />
                  <MacroPreview label="F" value={`${macros.fat}g`} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4 font-body">You can adjust these anytime in settings.</p>
            </StepWrapper>
          )}
        </AnimatePresence>
      </div>

      <div className="px-6 pb-8 max-w-lg mx-auto w-full flex gap-3">
        {step > 0 && (
          <button onClick={back} className="border border-border px-5 py-3.5 rounded-lg flex items-center gap-1 text-muted-foreground text-sm font-medium font-body hover:text-foreground transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        )}
        <button onClick={next} disabled={!canAdvance() || saving}
          className="flex-1 bg-foreground text-background py-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity font-body">
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
    <span className="text-sm text-muted-foreground font-body">{label}</span>
    <div className="flex items-center gap-1">
      {children}
      <span className="text-xs text-muted-foreground font-body">{suffix}</span>
    </div>
  </div>
);

const MacroPreview = ({ label, value }: { label: string; value: string }) => (
  <div className="text-center">
    <div className="w-3 h-3 rounded-full bg-foreground mx-auto mb-2" />
    <span className="text-lg font-bold text-foreground font-heading">{value}</span>
    <p className="text-xs text-muted-foreground font-body">{label}</p>
  </div>
);

export default OnboardingPage;
