import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-02-25.clover",
    });
  }
  return _stripe;
}

export function getPlan(plan: "starter" | "pro") {
  const plans = {
    starter: {
      name: "Starter",
      priceId: process.env.STRIPE_STARTER_PRICE_ID!,
      repos: 5,
    },
    pro: {
      name: "Pro",
      priceId: process.env.STRIPE_PRO_PRICE_ID!,
      repos: Infinity,
    },
  };
  return plans[plan];
}
