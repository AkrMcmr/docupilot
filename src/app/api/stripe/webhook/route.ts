import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[DocuPilot] Stripe webhook signature failed:", message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log(`[DocuPilot] Stripe event: ${event.type}`);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const plan = session.metadata?.plan;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;
      const githubUserId = session.metadata?.github_user_id;
      const githubLogin = session.metadata?.github_login;
      console.log(
        `[DocuPilot] New subscription: customer=${customerId} plan=${plan} subscription=${subscriptionId} github=${githubLogin}`
      );
      // Store github_user_id on the Stripe customer for future lookups
      if (customerId && githubUserId) {
        await getStripe().customers.update(customerId, {
          metadata: {
            github_user_id: githubUserId,
            github_login: githubLogin || "",
            plan: plan || "",
          },
        });
      }
      break;
    }
    case "customer.subscription.updated": {
      const subscription = event.data.object;
      console.log(
        `[DocuPilot] Subscription updated: ${subscription.id} status=${subscription.status}`
      );
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      console.log(
        `[DocuPilot] Subscription cancelled: ${subscription.id}`
      );
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object;
      console.log(
        `[DocuPilot] Payment failed: customer=${invoice.customer} invoice=${invoice.id}`
      );
      break;
    }
  }

  return NextResponse.json({ received: true });
}
