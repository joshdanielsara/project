import { NextResponse } from "next/server";
import { sendYesNotificationEmails } from "@/lib/email/send-yes-emails";

export async function POST() {
  const result = await sendYesNotificationEmails();

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    alreadySent: result.alreadySent ?? false,
  });
}
