import { sendBrevoEmail } from "@/lib/email/brevo";
import { getRecipients, markYesNotified } from "@/lib/email/recipients";
import { herYesEmailHtml, yourYesEmailHtml } from "@/lib/email/templates";

export type SendYesResult =
  | { ok: true; alreadySent?: boolean }
  | { ok: false; error: string };

let inFlight = false;

export async function sendYesNotificationEmails(): Promise<SendYesResult> {
  if (inFlight) {
    return { ok: false, error: "A notification is already being sent. Please wait." };
  }

  const recipients = await getRecipients();

  if (!recipients.yourEmail || !recipients.herEmail) {
    return {
      ok: false,
      error: "Recipient emails are missing. Configure them in /admin or environment variables.",
    };
  }

  if (recipients.yesNotifiedAt) {
    return { ok: true, alreadySent: true };
  }

  inFlight = true;
  try {
    const [yours, hers] = await Promise.all([
      sendBrevoEmail({
        to: recipients.yourEmail,
        subject: "She Said YES! ❤️",
        html: yourYesEmailHtml(),
      }),
      sendBrevoEmail({
        to: recipients.herEmail,
        subject: "A Little Something to Remember ❤️",
        html: herYesEmailHtml(),
      }),
    ]);

    if (!yours.ok || !hers.ok) {
      return {
        ok: false,
        error: (!yours.ok && yours.error) || (!hers.ok && hers.error) || "Failed to send emails.",
      };
    }

    try {
      await markYesNotified();
    } catch {
      // Emails already sent — ignore persistence failure
    }

    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error while sending emails.";
    return { ok: false, error: message };
  } finally {
    inFlight = false;
  }
}
