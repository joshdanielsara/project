"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type TypewriterTextProps = {
  text: string;
  className?: string;
  speedMs?: number;
  delayMs?: number;
  as?: "p" | "span" | "h2";
};

export function TypewriterText({
  text,
  className = "",
  speedMs = 22,
  delayMs = 200,
  as: Tag = "p",
}: TypewriterTextProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [displayed, setDisplayed] = useState(reducedMotion ? text : "");
  const done = displayed.length >= text.length;

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(text);
      return;
    }

    setDisplayed("");
    let index = 0;
    let intervalId: number | undefined;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length && intervalId) {
          window.clearInterval(intervalId);
        }
      }, speedMs);
    }, delayMs);

    return () => {
      window.clearTimeout(startId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [text, speedMs, delayMs, reducedMotion]);

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden>{displayed}</span>
      {!done && (
        <span
          className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-0.5 bg-rose-400 align-baseline"
          aria-hidden
        />
      )}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
