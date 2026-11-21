export type Screen =
  | "welcome"
  | "listening"
  | "courtship"
  | "story"
  | "message"
  | "beforeAsk"
  | "preGirlfriend"
  | "girlfriend"
  | "celebration";

export const SCREEN_ORDER: Screen[] = [
  "welcome",
  "listening",
  "courtship",
  "story",
  "message",
  "beforeAsk",
  "preGirlfriend",
  "girlfriend",
  "celebration",
];

export function isScreen(value: string | null | undefined): value is Screen {
  return !!value && SCREEN_ORDER.includes(value as Screen);
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
