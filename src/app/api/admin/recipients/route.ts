import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/email/admin-auth";
import {
  clearYesNotified,
  getRecipients,
  saveRecipients,
} from "@/lib/email/recipients";

const updateSchema = z.object({
  yourEmail: z.email("Enter a valid email for yourself."),
  herEmail: z.email("Enter a valid email for her."),
});

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const recipients = await getRecipients();
  return NextResponse.json({
    yourEmail: recipients.yourEmail,
    herEmail: recipients.herEmail,
    yesNotifiedAt: recipients.yesNotifiedAt,
  });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid email addresses." },
      { status: 400 },
    );
  }

  try {
    const saved = await saveRecipients(parsed.data);
    return NextResponse.json({
      ok: true,
      yourEmail: saved.yourEmail,
      herEmail: saved.herEmail,
      yesNotifiedAt: saved.yesNotifiedAt,
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Could not save recipients. On serverless hosts, set YOUR_EMAIL and HER_EMAIL in environment variables instead.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const saved = await clearYesNotified();
    return NextResponse.json({
      ok: true,
      yourEmail: saved.yourEmail,
      herEmail: saved.herEmail,
      yesNotifiedAt: saved.yesNotifiedAt,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reset the notification flag." },
      { status: 500 },
    );
  }
}
