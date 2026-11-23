import { NextRequest, NextResponse } from "next/server";
import { INITIAL_USER_SUBSCRIPTION } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({
    success: true,
    subscription: INITIAL_USER_SUBSCRIPTION,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, amount, plan } = body;

    if (action === "refill") {
      return NextResponse.json({
        success: true,
        message: `Successfully added ${amount || 100} credits to your account.`,
        creditsAdded: amount || 100,
      });
    }

    if (action === "upgrade") {
      return NextResponse.json({
        success: true,
        message: `Upgraded to ${plan || "Pro"} plan successfully!`,
        plan: plan || "Pro",
        newCredits: 1000,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Operation failed" }, { status: 500 });
  }
}
