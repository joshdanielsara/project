"use client";

import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";
import { useRef } from "react";
import { SoftCard } from "@/components/ui/SoftCard";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { BackgroundParticles } from "@/components/ui/BackgroundParticles";
import type { ScreenProps } from "@/lib/types";

const MILESTONES = [
  {
    date: "October 15",
    title: "Our First Chat",
    description: "The day our story started with a simple conversation.",
  },
  {
    date: "October 30",
    title: "Our First Meet",
    description:
      "From chatting through a screen to finally seeing each other in person.",
  },
  {
    date: "November 1",
    title: "Our Second Meet",
    description: "Another day, another memory together.",
  },
  {
    date: "November 2",
    title: "Another Special Day",
    description: "A little more time together, a little more to remember.",
  },
] as const;

function TimelineItem({
  date,
  title,
  description,
  index,
  isLast,
}: {
  date: string;
  title: string;
  description: string;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <li ref={ref} className="relative pl-12 sm:pl-14">
      {/* connector line */}
      {!isLast && (
        <span
          className="absolute left-[0.95rem] top-8 h-[calc(100%-0.5rem)] w-0.5 bg-gradient-to-b from-rose-300 via-rose-200 to-rose-100 sm:left-[1.05rem]"
          aria-hidden
        />
      )}

      {/* heart marker */}
      <motion.span
        className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-300 to-rose-500 shadow-[0_6px_16px_rgba(244,63,106,0.35)] sm:h-9 sm:w-9"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : undefined}
        transition={{ delay: 0.05, type: "spring", stiffness: 260, damping: 16 }}
        aria-hidden
      >
        <Heart className="h-3.5 w-3.5 fill-white text-white sm:h-4 sm:w-4" />
      </motion.span>

      <motion.article
        className="rounded-2xl border border-rose-100/80 bg-white/75 p-4 text-left shadow-[0_8px_24px_rgba(92,58,69,0.06)] backdrop-blur-sm sm:rounded-3xl sm:p-5"
        initial={{ opacity: 0, y: 28, x: 8 }}
        animate={inView ? { opacity: 1, y: 0, x: 0 } : undefined}
        transition={{
          delay: 0.08 + index * 0.04,
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-400 sm:text-[0.7rem]">
          {date}
        </p>
        <h3 className="font-display mt-1.5 text-lg font-bold text-ink sm:text-xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-[0.95rem]">
          {description}
        </p>
      </motion.article>
    </li>
  );
}

export function OurLittleStoryScreen({ onNext }: ScreenProps) {
  return (
    <div className="relative w-full max-w-lg">
      <BackgroundParticles />
      <FloatingHearts count={7} active />

      <SoftCard className="relative z-10 overflow-visible">
        <div className="text-center">
          <motion.div
            className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-500"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            aria-hidden
          >
            <Heart className="h-5 w-5 fill-rose-400" />
          </motion.div>

          <motion.h1
            className="font-display text-2xl font-bold text-ink sm:text-3xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
          >
            Our Little Story
          </motion.h1>
          <motion.p
            className="mt-2 text-sm text-ink-soft sm:text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
          >
            A few moments that already mean so much.
          </motion.p>
        </div>

        <ol className="mt-8 space-y-5 sm:mt-9 sm:space-y-6">
          {MILESTONES.map((item, index) => (
            <TimelineItem
              key={item.date + item.title}
              {...item}
              index={index}
              isLast={index === MILESTONES.length - 1}
            />
          ))}
        </ol>

        <motion.button
          type="button"
          className="btn-primary focus-ring mt-8 w-full rounded-full px-6 py-3.5 text-base font-semibold"
          onClick={onNext}
          aria-label="Continue to the next part of our story"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          Continue our story ♡
        </motion.button>
      </SoftCard>
    </div>
  );
}
