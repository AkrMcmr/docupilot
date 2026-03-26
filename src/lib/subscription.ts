import { getStripe } from "./stripe";

export interface UserSubscription {
  plan: "free" | "starter" | "pro";
  status: "active" | "past_due" | "canceled" | "none";
  currentPeriodEnd: string | null;
  stripeCustomerId: string | null;
  repoLimit: number;
}

const PLAN_REPO_LIMITS: Record<string, number> = {
  free: 1,
  starter: 5,
  pro: 999,
};

/**
 * Look up a user's subscription by querying Stripe customers with
 * github_user_id in metadata. Stripe is the source of truth — no database needed.
 */
export async function getUserSubscription(
  githubUserId: number
): Promise<UserSubscription> {
  const free: UserSubscription = {
    plan: "free",
    status: "none",
    currentPeriodEnd: null,
    stripeCustomerId: null,
    repoLimit: PLAN_REPO_LIMITS.free,
  };

  if (!process.env.STRIPE_SECRET_KEY) {
    return free;
  }

  try {
    const stripe = getStripe();

    // Search for customers with this GitHub user ID in metadata
    const customers = await stripe.customers.search({
      query: `metadata["github_user_id"]:"${githubUserId}"`,
      limit: 1,
    });

    if (customers.data.length === 0) {
      return free;
    }

    const customer = customers.data[0];

    // Get active subscriptions for this customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "all",
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return { ...free, stripeCustomerId: customer.id };
    }

    const sub = subscriptions.data[0];
    const plan = (sub.metadata?.plan as "starter" | "pro") || "starter";
    const status = sub.status === "active" || sub.status === "trialing"
      ? "active"
      : sub.status === "past_due"
        ? "past_due"
        : "canceled";

    // current_period_end is on subscription items in Stripe v20+
    const periodEnd = sub.items?.data?.[0]?.current_period_end;

    return {
      plan,
      status,
      currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      stripeCustomerId: customer.id,
      repoLimit: PLAN_REPO_LIMITS[plan] ?? PLAN_REPO_LIMITS.free,
    };
  } catch (err) {
    console.error("[DocuPilot] Stripe subscription lookup error:", err);
    return free;
  }
}
