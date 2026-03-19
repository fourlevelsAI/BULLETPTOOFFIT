

## Create Privacy Policy Page for App Store Submission

The screenshot shows App Store Connect requiring a Privacy Policy URL for the BULLETPROOFFIT iOS app. I'll create a `/privacy` page with a proper privacy policy and add the route so you can paste the published URL (e.g. `https://smart-fit-log.lovable.app/privacy`).

### What will be built

1. **Create `src/pages/PrivacyPolicyPage.tsx`** — A clean, readable privacy policy page covering:
   - Data collected (email, health/fitness data, usage analytics)
   - How data is used and stored (via Lovable Cloud)
   - Third-party services (Stripe for payments)
   - Data retention and deletion (account deletion removes data)
   - Contact information
   - Styled with the existing dark theme

2. **Add route in `src/App.tsx`** — Add `/privacy` as a public route accessible to all users (logged in or not), in all route groups.

### After implementation

You'll paste this URL into App Store Connect:
`https://smart-fit-log.lovable.app/privacy`

