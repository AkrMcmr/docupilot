import { NextRequest, NextResponse } from "next/server";
import { getStripe, getPlan } from "@/lib/stripe";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const authSession = await getSession();
    if (!authSession) {
      return NextResponse.json({ error: "Please sign in first" }, { status: 401 });
    }

    const { plan } = (await request.json()) as { plan: "starter" | "pro" };
    const planConfig = getPlan(plan);

    if (!planConfig) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://docupilot-alpha.vercel.app";
    const { user } = authSession;

    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: planConfig.priceId, quantity: 1 }],
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      client_reference_id: String(user.id),
      customer_email: user.email || undefined,
      metadata: { plan, github_user_id: String(user.id), github_login: user.login },
      subscription_data: {
        metadata: { plan, github_user_id: String(user.id), github_login: user.login },
      },
      customer_creation: "always",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[DocuPilot] Stripe checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
