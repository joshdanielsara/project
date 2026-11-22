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
    number: "01",
    title: "Where It All Started",
    paragraphs: [
      "It all started with a simple message from you. I honestly didn't know that something as small as that would eventually lead us here. What started as an ordinary conversation slowly became something I looked forward to every day.",
      "Little by little, we found ourselves talking more, sharing random thoughts, and getting comfortable with each other. Looking back, I'm really glad you made that first move because it gave us the chance to start something beautiful.",
    ],
  },
  {
    date: "October 30",
    number: "02",
    title: "Under the Same Sky",
    paragraphs: [
      "This was the first time we finally got to see each other in person. I won't lie, it was a little awkward at first HAHAHA, but that's what made it even more memorable.",
      "What made that day extra special was seeing my very first shooting star, and having you right there with me. I never imagined that my first time witnessing something like that would happen during our first meeting. It's one of those moments I know I'll always remember, not just because of the shooting star, but because I experienced it with you.",
    ],
  },
  {
    date: "November 1",
    number: "03",
    title: "Beyond the Little Conversations",
    paragraphs: [
      "As we spent more time talking, our conversations slowly became deeper and more meaningful. We started opening up about ourselves, sharing our thoughts, experiences, and things we probably wouldn't tell just anyone.",
      "I got to understand you a little more, appreciate the way you think, and discover the little things that make you who you are. It wasn't just about having someone to talk to anymore. It became about genuinely wanting to understand each other and being comfortable enough to be ourselves.",
    ],
  },
  {
    date: "November 2",
    number: "04",
    title: "When Feelings Became More Obvious",
    paragraphs: [
      "Eventually, we became more comfortable showing our affection for each other. The little sweet gestures, the way we talk, and how we express how much we care started becoming part of our everyday moments.",
      "I guess this was when things started feeling a little more special between us. It made me realize how much I appreciate what we have and how happy I am that we've reached this point. And honestly, it makes me excited for all the moments we haven't experienced yet.",
    ],
  },
] as const;

function TimelineItem({
  date,
  number,
  title,
  paragraphs,
  index,
  isLast,
}: {
  date: string;
  number: string;
  title: string;
  paragraphs: readonly string[];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <li ref={ref} className="relative pl-12 sm:pl-14">
      {!isLast && (
        <span
          className="absolute left-[0.95rem] top-8 h-[calc(100%-0.5rem)] w-0.5 bg-gradient-to-b from-rose-300 via-rose-200 to-rose-100 sm:left-[1.05rem]"
          aria-hidden
        />
      )}

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
          <span className="text-rose-400">{number}</span>
          <span className="mx-1.5 text-rose-300">—</span>
          {title}
        </h3>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-soft sm:text-[0.95rem] sm:leading-7">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
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
              key={item.number}
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
