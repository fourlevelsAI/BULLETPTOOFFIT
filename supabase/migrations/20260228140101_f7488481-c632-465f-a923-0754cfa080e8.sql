
-- Add goal-related columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS water_goal integer DEFAULT 8,
ADD COLUMN IF NOT EXISTS steps_goal integer DEFAULT 10000,
ADD COLUMN IF NOT EXISTS active_minutes_goal integer DEFAULT 30,
ADD COLUMN IF NOT EXISTS weekly_workouts_goal integer DEFAULT 4,
ADD COLUMN IF NOT EXISTS weekly_cardio_goal integer DEFAULT 2,
ADD COLUMN IF NOT EXISTS weekly_calorie_deficit integer DEFAULT 3500,
ADD COLUMN IF NOT EXISTS weekly_weight_change numeric DEFAULT -0.5,
ADD COLUMN IF NOT EXISTS target_weight numeric,
ADD COLUMN IF NOT EXISTS target_body_fat numeric,
ADD COLUMN IF NOT EXISTS monthly_workouts_goal integer DEFAULT 16,
ADD COLUMN IF NOT EXISTS monthly_prs_goal integer DEFAULT 3,
ADD COLUMN IF NOT EXISTS long_term_goal text DEFAULT 'lose_fat';

-- Create weekly_plans table for AI-generated plans
CREATE TABLE public.weekly_plans (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  week_start date NOT NULL,
  plan_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, week_start)
);

ALTER TABLE public.weekly_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own plans" ON public.weekly_plans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own plans" ON public.weekly_plans FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own plans" ON public.weekly_plans FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own plans" ON public.weekly_plans FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_weekly_plans_updated_at
BEFORE UPDATE ON public.weekly_plans
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
