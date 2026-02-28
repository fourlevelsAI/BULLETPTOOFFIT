
-- Add subscription tracking columns to profiles
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS subscription_tier text DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS subscription_end timestamp with time zone,
  ADD COLUMN IF NOT EXISTS stripe_customer_id text,
  ADD COLUMN IF NOT EXISTS referral_code text UNIQUE,
  ADD COLUMN IF NOT EXISTS referred_by text,
  ADD COLUMN IF NOT EXISTS referral_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS free_months_earned integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_founding_member boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_lifetime boolean DEFAULT false;

-- Create app_counters table for founding member and lifetime counters
CREATE TABLE IF NOT EXISTS public.app_counters (
  id text PRIMARY KEY,
  count integer NOT NULL DEFAULT 0,
  max_count integer NOT NULL DEFAULT 0,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.app_counters ENABLE ROW LEVEL SECURITY;

-- Everyone can read counters
CREATE POLICY "Anyone can view counters"
  ON public.app_counters FOR SELECT
  USING (true);

-- Only service role can update (via edge functions)
-- No insert/update/delete policies for anon users

-- Seed the counters
INSERT INTO public.app_counters (id, count, max_count) VALUES
  ('founding_members', 0, 10000),
  ('lifetime_deals', 0, 500)
ON CONFLICT (id) DO NOTHING;

-- Generate referral code for existing users
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := upper(substr(md5(random()::text), 1, 8));
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_referral_code
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_referral_code();
