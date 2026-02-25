import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboarding, OnboardingData } from "@/hooks/useOnboarding";
import {
  Target,
  Dumbbell,
  Scale,
  ChevronRight,
  ChevronLeft,
  Check,
  Flame,
  Activity,
  Heart,
} from "lucide-react";

const goals = [
  { value: "lose_weight" as const, label: "Lose Weight", icon: Flame, desc: "Burn fat & get lean" },
  { value: "gain_muscle" as const, label: "Gain Muscle", icon: Dumbbell, desc: "Build strength & size" },
  { value: "maintain" as const, label: "Maintain", icon: Scale, desc: "Stay balanced & healthy" },
];

const activityLevels = [
  { value: "sedentary" as const, label: "Sedentary", desc: "Little or no exercise" },
  { value: "light" as const, label: "Lightly Active", desc: "1–3 days/week" },
  { value: "moderate" as const, label: "Moderately Active", desc: "3–5 days/week" },
  { value: "active" as const, label: "Active", desc: "6–7 days/week" },
  { value: "very_active" as const, label: "Very Active", desc: "Intense daily training" },
];

const dietaryOptions = [
  "No Restrictions", "Vegetarian", "Vegan", "Keto", "Paleo",
  "Gluten-Free", "Dairy-Free", "Halal", "Kosher",
];

const TOTAL_STEPS = 3;

const OnboardingPage = () => {
  const [step, setStep] = useState(0);
  const { data, setData, completeOnboarding } = useOnboarding();
  const navigate = useNavigate();

  const update = (partial: Partial<OnboardingData>) =>
    setData((prev) => ({ ...prev, ...partial }));

  const canAdvance = () => {
    if (step === 0) return data.goal !== null;
    if (step === 1) return data.age && data.weight && data.height && data.activityLevel;
    if (step === 2) return true;
    return false;
  };

  const next = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else {
      completeOnboarding();
      navigate("/", { replace: true });
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const toggleDiet = (d: string) => {
    const prefs = data.dietaryPreferences;
    if (d === "No Restrictions") {
      update({ dietaryPreferences: prefs.includes(d) ? [] : ["No Restrictions"] });
    } else {
      const without = prefs.filter((p) => p !== "No Restrictions");
      update({
        dietaryPreferences: without.includes(d)
          ? without.filter((p) => p !== d)
          : [...without, d],
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      <div className="px-6 pt-6">
        <div className="flex gap-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-8 pb-4 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <StepWrapper key="goal">
              <h1 className="text-2xl font-bold text-foreground mb-2">What's your goal?</h1>
              <p className="text-muted-foreground text-sm mb-8">
                We'll personalize your experience based on this.
              </p>
              <div className="space-y-3">
                {goals.map(({ value, label, icon: Icon, desc }) => (
                  <button
                    key={value}
                    onClick={() => update({ goal: value })}
                    className={`w-full glass-card-hover p-5 flex items-center gap-4 text-left transition-all ${
                      data.goal === value
                        ? "border-primary ring-1 ring-primary"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        data.goal === value ? "bg-primary/20" : "bg-muted"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          data.goal === value ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-foreground font-semibold">{label}</span>
                      <p className="text-muted-foreground text-xs mt-0.5">{desc}</p>
                    </div>
                    {data.goal === value && <Check className="w-5 h-5 text-primary" />}
                  </button>
                ))}
              </div>
            </StepWrapper>
          )}

          {step === 1 && (
            <StepWrapper key="stats">
              <h1 className="text-2xl font-bold text-foreground mb-2">Your Body Stats</h1>
              <p className="text-muted-foreground text-sm mb-8">
                Helps us calculate your daily targets.
              </p>
              <div className="space-y-5">
                <FieldRow label="Age" suffix="years">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={data.age ?? ""}
                    onChange={(e) => update({ age: e.target.value ? Number(e.target.value) : null })}
                    className="bg-transparent text-foreground text-right text-lg font-semibold w-20 outline-none"
                    placeholder="—"
                    min={13}
                    max={120}
                  />
                </FieldRow>
                <FieldRow label="Weight" suffix="kg">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={data.weight ?? ""}
                    onChange={(e) => update({ weight: e.target.value ? Number(e.target.value) : null })}
                    className="bg-transparent text-foreground text-right text-lg font-semibold w-20 outline-none"
                    placeholder="—"
                    min={20}
                    max={500}
                  />
                </FieldRow>
                <FieldRow label="Height" suffix="cm">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={data.height ?? ""}
                    onChange={(e) => update({ height: e.target.value ? Number(e.target.value) : null })}
                    className="bg-transparent text-foreground text-right text-lg font-semibold w-20 outline-none"
                    placeholder="—"
                    min={100}
                    max={300}
                  />
                </FieldRow>

                <div>
                  <span className="text-sm text-muted-foreground mb-3 block">Activity Level</span>
                  <div className="space-y-2">
                    {activityLevels.map(({ value, label, desc }) => (
                      <button
                        key={value}
                        onClick={() => update({ activityLevel: value })}
                        className={`w-full glass-card-hover p-3.5 flex items-center justify-between text-left ${
                          data.activityLevel === value
                            ? "border-primary ring-1 ring-primary"
                            : ""
                        }`}
                      >
                        <div>
                          <span className="text-sm font-medium text-foreground">{label}</span>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                        {data.activityLevel === value && (
                          <Check className="w-4 h-4 text-primary shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </StepWrapper>
          )}

          {step === 2 && (
            <StepWrapper key="diet">
              <h1 className="text-2xl font-bold text-foreground mb-2">Dietary Preferences</h1>
              <p className="text-muted-foreground text-sm mb-8">
                Select all that apply. You can change these later.
              </p>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((d) => {
                  const selected = data.dietaryPreferences.includes(d);
                  return (
                    <button
                      key={d}
                      onClick={() => toggleDiet(d)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        selected
                          ? "bg-primary text-primary-foreground"
                          : "glass-card-hover text-muted-foreground"
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </StepWrapper>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="px-6 pb-8 max-w-lg mx-auto w-full flex gap-3">
        {step > 0 && (
          <button
            onClick={back}
            className="glass-card-hover px-5 py-3.5 rounded-xl flex items-center gap-1 text-muted-foreground text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        )}
        <button
          onClick={next}
          disabled={!canAdvance()}
          className="flex-1 gradient-lime text-primary-foreground py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          {step === TOTAL_STEPS - 1 ? "Get Started" : "Continue"}
          {step < TOTAL_STEPS - 1 && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

/* ── helpers ── */

const StepWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.div>
);

const FieldRow = ({
  label,
  suffix,
  children,
}: {
  label: string;
  suffix: string;
  children: React.ReactNode;
}) => (
  <div className="glass-card p-4 flex items-center justify-between">
    <span className="text-sm text-muted-foreground">{label}</span>
    <div className="flex items-center gap-1">
      {children}
      <span className="text-xs text-muted-foreground">{suffix}</span>
    </div>
  </div>
);

export default OnboardingPage;
