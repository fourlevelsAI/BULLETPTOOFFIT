import { useState, useEffect } from "react";

export interface OnboardingData {
  goal: "lose_weight" | "gain_muscle" | "maintain" | null;
  age: number | null;
  weight: number | null;
  height: number | null;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active" | null;
  dietaryPreferences: string[];
}

const STORAGE_KEY = "bulletprooffit_onboarding";
const COMPLETED_KEY = "bulletprooffit_onboarding_completed";

const defaultData: OnboardingData = {
  goal: null,
  age: null,
  weight: null,
  height: null,
  activityLevel: null,
  dietaryPreferences: [],
};

export function useOnboarding() {
  const [data, setData] = useState<OnboardingData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultData;
  });

  const [completed, setCompleted] = useState(() => {
    return localStorage.getItem(COMPLETED_KEY) === "true";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const completeOnboarding = () => {
    localStorage.setItem(COMPLETED_KEY, "true");
    setCompleted(true);
  };

  const resetOnboarding = () => {
    localStorage.removeItem(COMPLETED_KEY);
    localStorage.removeItem(STORAGE_KEY);
    setCompleted(false);
    setData(defaultData);
  };

  return { data, setData, completed, completeOnboarding, resetOnboarding };
}
