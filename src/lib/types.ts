export type Screen =
  | "welcome"
  | "intro"
  | "context"
  | "thoughts"
  | "intent"
  | "ready"
  | "confirm"
  | "history"
  | "note"
  | "moments"
  | "closing"
  | "thanks";

export const SCREEN_ORDER: Screen[] = [
  "welcome",
  "intro",
  "context",
  "thoughts",
  "intent",
  "ready",
  "confirm",
  "history",
  "note",
  "moments",
  "closing",
  "thanks",
];

const LEGACY_SCREEN_MAP: Record<string, Screen> = {
  listening: "intro",
  courtingIntro: "intro",
  whyThis: "context",
  howIFeel: "thoughts",
  courtIntention: "intent",
  beforeCourtAsk: "ready",
  courtship: "confirm",
  story: "history",
  message: "note",
  beforeAsk: "moments",
  preGirlfriend: "closing",
  girlfriend: "closing",
  celebration: "closing",
};

export function isScreen(value: string | null | undefined): value is Screen {
  if (!value) return false;
  if (SCREEN_ORDER.includes(value as Screen)) return true;
  return value in LEGACY_SCREEN_MAP;
}

export function resolveScreen(value: string | null | undefined): Screen {
  if (!value) return "welcome";
  if (SCREEN_ORDER.includes(value as Screen)) return value as Screen;
  if (value in LEGACY_SCREEN_MAP) return LEGACY_SCREEN_MAP[value];
  return "welcome";
}

export function getPreviousScreen(screen: Screen): Screen | null {
  const index = SCREEN_ORDER.indexOf(screen);
  if (index <= 0) return null;
  return SCREEN_ORDER[index - 1] ?? null;
}

export type ScreenProps = {
  onNext: () => void;
  onReplay?: () => void;
  onBack?: () => void;
};
