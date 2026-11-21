export default function Loading() {
  return (
    <div className="romantic-bg flex min-h-dvh flex-1 items-center justify-center">
      <div
        className="flex flex-col items-center gap-3"
        role="status"
        aria-live="polite"
        aria-label="Loading"
      >
        <div className="h-10 w-10 animate-pulse rounded-full bg-rose-300/80" />
        <p className="font-display text-sm font-medium text-ink-soft">
          Preparing something special...
        </p>
      </div>
    </div>
  );
}
