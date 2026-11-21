type BrevoSendInput = {
  to: string;
  subject: string;
  html: string;
};

type BrevoSendResult = { ok: true; messageId?: string } | { ok: false; error: string };

function parseSender() {
  const raw = process.env.EMAIL_FROM?.trim() || "";
  const named = raw.match(/^(.+?)\s*<([^>]+)>$/);
  if (named) {
    return {
      name: named[1]?.replace(/^["']|["']$/g, "").trim() || "Our Little Story",
      email: named[2]?.trim() || "",
    };
  }

  return {
    name: process.env.EMAIL_FROM_NAME?.trim() || "Our Little Story",
    email: raw,
  };
}

export async function sendBrevoEmail(input: BrevoSendInput): Promise<BrevoSendResult> {
  const apiKey = process.env.BREVO_API_KEY;
  const sender = parseSender();

  if (!apiKey) {
    return { ok: false, error: "BREVO_API_KEY is not configured." };
  }
  if (!sender.email) {
    return {
      ok: false,
      error: "EMAIL_FROM is not configured. Use a verified Brevo sender address.",
    };
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender,
      to: [{ email: input.to }],
      subject: input.subject,
      htmlContent: input.html,
    }),
  });

  const payload = (await response.json().catch(() => null)) as
    | { messageId?: string; message?: string; code?: string }
    | null;

  if (!response.ok) {
    return {
      ok: false,
      error: payload?.message || `Brevo request failed (${response.status}).`,
    };
  }

  return { ok: true, messageId: payload?.messageId };
}
