-- Tighten profiles UPDATE policy to also protect referral / founding / earned-rewards columns
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id
  AND NOT (subscription_tier IS DISTINCT FROM (SELECT p.subscription_tier FROM profiles p WHERE p.user_id = auth.uid()))
  AND NOT (subscription_status IS DISTINCT FROM (SELECT p.subscription_status FROM profiles p WHERE p.user_id = auth.uid()))
  AND NOT (subscription_end IS DISTINCT FROM (SELECT p.subscription_end FROM profiles p WHERE p.user_id = auth.uid()))
  AND NOT (trial_started IS DISTINCT FROM (SELECT p.trial_started FROM profiles p WHERE p.user_id = auth.uid()))
  AND NOT (trial_end IS DISTINCT FROM (SELECT p.trial_end FROM profiles p WHERE p.user_id = auth.uid()))
  AND NOT (is_pro IS DISTINCT FROM (SELECT p.is_pro FROM profiles p WHERE p.user_id = auth.uid()))
  AND NOT (is_lifetime IS DISTINCT FROM (SELECT p.is_lifetime FROM profiles p WHERE p.user_id = auth.uid()))
  AND NOT (stripe_customer_id IS DISTINCT FROM (SELECT p.stripe_customer_id FROM profiles p WHERE p.user_id = auth.uid()))
  AND NOT (is_founding_member IS DISTINCT FROM (SELECT p.is_founding_member FROM profiles p WHERE p.user_id = auth.uid()))
  AND NOT (referral_count IS DISTINCT FROM (SELECT p.referral_count FROM profiles p WHERE p.user_id = auth.uid()))
  AND NOT (free_months_earned IS DISTINCT FROM (SELECT p.free_months_earned FROM profiles p WHERE p.user_id = auth.uid()))
  AND NOT (referral_code IS DISTINCT FROM (SELECT p.referral_code FROM profiles p WHERE p.user_id = auth.uid()))
);

-- Lock down SECURITY DEFINER functions: revoke EXECUTE from anon/authenticated
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.generate_referral_code() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public;