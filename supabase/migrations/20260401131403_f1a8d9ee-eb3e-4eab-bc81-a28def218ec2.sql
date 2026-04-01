
-- 1. Fix profiles SELECT policy: require authentication
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- 2. Restrict profiles UPDATE to prevent subscription field manipulation
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND subscription_tier IS NOT DISTINCT FROM (SELECT p.subscription_tier FROM public.profiles p WHERE p.user_id = auth.uid())
    AND subscription_status IS NOT DISTINCT FROM (SELECT p.subscription_status FROM public.profiles p WHERE p.user_id = auth.uid())
    AND subscription_end IS NOT DISTINCT FROM (SELECT p.subscription_end FROM public.profiles p WHERE p.user_id = auth.uid())
    AND trial_started IS NOT DISTINCT FROM (SELECT p.trial_started FROM public.profiles p WHERE p.user_id = auth.uid())
    AND trial_end IS NOT DISTINCT FROM (SELECT p.trial_end FROM public.profiles p WHERE p.user_id = auth.uid())
    AND is_pro IS NOT DISTINCT FROM (SELECT p.is_pro FROM public.profiles p WHERE p.user_id = auth.uid())
    AND is_lifetime IS NOT DISTINCT FROM (SELECT p.is_lifetime FROM public.profiles p WHERE p.user_id = auth.uid())
    AND stripe_customer_id IS NOT DISTINCT FROM (SELECT p.stripe_customer_id FROM public.profiles p WHERE p.user_id = auth.uid())
  );
