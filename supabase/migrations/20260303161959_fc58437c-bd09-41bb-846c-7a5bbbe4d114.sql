
-- Add trial and subscription status columns to profiles
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS trial_started boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS trial_end timestamptz DEFAULT null,
  ADD COLUMN IF NOT EXISTS subscription_status text DEFAULT 'inactive';
