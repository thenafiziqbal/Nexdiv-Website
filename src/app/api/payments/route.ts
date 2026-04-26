import { NextRequest, NextResponse } from "next/server";

function generateOrderId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NXD-${ts}-${rnd}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const required = ["name", "email", "phone", "method", "trxId", "amount"];
    for (const k of required) {
      if (!body?.[k]) return NextResponse.json({ error: `Missing ${k}` }, { status: 400 });
    }

    const orderId = generateOrderId();
    console.log("[payment] new submission", {
      orderId,
      ...body,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, orderId, status: "pending_verification" });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
