import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  goal: string | null;
  age: number | null;
  weight: number | null;
  height: number | null;
  sex: string | null;
  activity_level: string | null;
  dietary_preferences: string[];
  calorie_goal: number;
  protein_goal: number;
  carbs_goal: number;
  fat_goal: number;
  unit_system: string;
  onboarding_completed: boolean;
  is_pro: boolean;
  subscription_tier: string;
  subscription_end: string | null;
  stripe_customer_id: string | null;
  referral_code: string | null;
  referred_by: string | null;
  referral_count: number;
  free_months_earned: number;
  is_founding_member: boolean;
  is_lifetime: boolean;
  water_goal: number;
  steps_goal: number;
  active_minutes_goal: number;
  weekly_workouts_goal: number;
  weekly_cardio_goal: number;
  weekly_calorie_deficit: number;
  weekly_weight_change: number;
  target_weight: number | null;
  target_body_fat: number | null;
  monthly_workouts_goal: number;
  monthly_prs_goal: number;
  long_term_goal: string;
  trial_started: boolean;
  trial_end: string | null;
  subscription_status: string;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!error && data) {
      setProfile(data as unknown as Profile);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error("Not authenticated") };
    const { error } = await supabase
      .from("profiles")
      .update(updates as any)
      .eq("user_id", user.id);

    if (!error) {
      setProfile((prev) => prev ? { ...prev, ...updates } : null);
    }
    return { error };
  };

  return { profile, loading, updateProfile, refetch: fetchProfile };
}
