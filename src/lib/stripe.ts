// Stripe product & price mapping
export const STRIPE_TIERS = {
  pro_monthly: {
    product_id: "prod_U3v0cNqCxD8QJI",
    price_id: "price_1T5nAvANI7dNLF2nfrTQrCCe",
    name: "Bulletproof Pro",
    price: 9.99,
    interval: "month" as const,
  },
  pro_annual: {
    product_id: "prod_U3v1XKcfshfjup",
    price_id: "price_1T5nBAANI7dNLF2nttrQWzW3",
    name: "Bulletproof Pro Annual",
    price: 59.99,
    interval: "year" as const,
    founding_price: 39.99,
  },
  elite_monthly: {
    product_id: "prod_U3v1T1e3fTHTvM",
    price_id: "price_1T5nBQANI7dNLF2n59juyI42",
    name: "Bulletproof Elite",
    price: 14.99,
    interval: "month" as const,
  },
  elite_annual: {
    product_id: "prod_U3v1ZUAfkUfJQY",
    price_id: "price_1T5nBjANI7dNLF2nuyfboACR",
    name: "Bulletproof Elite Annual",
    price: 99.99,
    interval: "year" as const,
  },
  lifetime: {
    product_id: "prod_U3v2wPX3IYWwqv",
    price_id: "price_1T5nC0ANI7dNLF2n6LjhLudm",
    name: "Bulletproof Lifetime",
    price: 79.99,
    interval: "once" as const,
  },
} as const;

export type SubscriptionTier = "free" | "pro" | "elite" | "lifetime";
