import { promises as fs } from "fs";
import path from "path";
import {
  DEFAULT_RECIPIENTS,
  type RecipientConfig,
} from "@/lib/email/types";

const DATA_PATH = path.join(process.cwd(), "data", "recipients.json");

function fromEnv(): RecipientConfig {
  return {
    yourEmail: process.env.YOUR_EMAIL?.trim() || "",
    herEmail: process.env.HER_EMAIL?.trim() || "",
    yesNotifiedAt: null,
  };
}

export async function getRecipients(): Promise<RecipientConfig> {
  const envConfig = fromEnv();

  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<RecipientConfig>;
    return {
      yourEmail: (parsed.yourEmail || envConfig.yourEmail).trim(),
      herEmail: (parsed.herEmail || envConfig.herEmail).trim(),
      yesNotifiedAt: parsed.yesNotifiedAt ?? null,
    };
  } catch {
    return { ...DEFAULT_RECIPIENTS, ...envConfig };
  }
}

export async function saveRecipients(
  next: Pick<RecipientConfig, "yourEmail" | "herEmail">,
): Promise<RecipientConfig> {
  const current = await getRecipients();
  const updated: RecipientConfig = {
    yourEmail: next.yourEmail.trim(),
    herEmail: next.herEmail.trim(),
    yesNotifiedAt: current.yesNotifiedAt,
  };

  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(updated, null, 2), "utf8");
  return updated;
}

export async function markYesNotified(): Promise<void> {
  const current = await getRecipients();
  const updated: RecipientConfig = {
    ...current,
    yesNotifiedAt: new Date().toISOString(),
  };
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(updated, null, 2), "utf8");
}

export async function clearYesNotified(): Promise<RecipientConfig> {
  const current = await getRecipients();
  const updated: RecipientConfig = {
    ...current,
    yesNotifiedAt: null,
  };
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(updated, null, 2), "utf8");
  return updated;
}
