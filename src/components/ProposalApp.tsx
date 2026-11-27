"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { WelcomeScreen } from "@/components/screens/WelcomeScreen";
import { StoryBeatScreen } from "@/components/screens/StoryBeatScreen";
import { CourtshipScreen } from "@/components/screens/CourtshipScreen";
import { OurLittleStoryScreen } from "@/components/screens/OurLittleStoryScreen";
import { HeartfeltMessageScreen } from "@/components/screens/HeartfeltMessageScreen";
import { BeforeAskScreen } from "@/components/screens/BeforeAskScreen";
import { PreGirlfriendScreen } from "@/components/screens/PreGirlfriendScreen";
import { ClosingNoteScreen } from "@/components/screens/ClosingNoteScreen";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { BackButton } from "@/components/ui/BackButton";
import { useMusic } from "@/hooks/useMusic";
import {
  getPreviousScreen,
  resolveScreen,
  type Screen,
} from "@/lib/types";

const pageVariants = {
  initial: { opacity: 0, y: 22, filter: "blur(5px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -16, filter: "blur(4px)" },
};

export function ProposalApp() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isPlaying, toggle } = useMusic();

  const screen: Screen = useMemo(
    () => resolveScreen(searchParams.get("step")),
    [searchParams],
  );

  const goTo = useCallback(
    (next: Screen) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next === "welcome") {
        params.delete("step");
      } else {
        params.set("step", next);
      }
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router, searchParams],
  );

  const goBack = useCallback(() => {
    const previous = getPreviousScreen(screen);
    if (previous) {
      goTo(previous);
    }
  }, [goTo, screen]);

  const isIntro = screen === "welcome";
  const canGoBack = getPreviousScreen(screen) !== null;

  return (
    <div
      className={`relative flex min-h-dvh flex-1 flex-col overflow-x-hidden transition-[background] duration-700 ${
        isIntro ? "intro-bg" : "romantic-bg"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      {canGoBack && <BackButton onBack={goBack} neutral={isIntro} />}
      {!isIntro && <MusicToggle isPlaying={isPlaying} onToggle={toggle} />}

      <main
        id="main-content"
        className={`relative z-10 flex flex-1 flex-col items-center overflow-y-auto px-4 sm:px-6 ${
          isIntro ? "justify-start py-8 sm:py-12" : "justify-center py-6 sm:py-14"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            className="flex w-full justify-center"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {screen === "welcome" && (
              <WelcomeScreen onNext={() => goTo("intro")} />
            )}
            {screen === "intro" && (
              <StoryBeatScreen
                lines={[
                  "Well, mao to ang introduction HAHAHA.",
                  "Actually, naa pa koy something nga gusto i-share nimo.",
                ]}
                onNext={() => goTo("context")}
              />
            )}
            {screen === "context" && (
              <StoryBeatScreen
                lines={[
                  "I made this website kay gusto nako i-express properly ang akong intentions.",
                  "Bitaw, mas personal man unta ni kaysa usa ka plain message.",
                ]}
                onNext={() => goTo("thoughts")}
              />
            )}
            {screen === "thoughts" && (
              <StoryBeatScreen
                lines={[
                  "Kabalo ka, dugay-dugay na pud ni nako gihuna-hunaan.",
                  "I just want to be honest with you, kay I think you deserve that.",
                ]}
                onNext={() => goTo("intent")}
              />
            )}
            {screen === "intent" && (
              <StoryBeatScreen
                lines={[
                  "Ganahan ko nga i-pursue ka properly, dili lang casually.",
                  "I want to take this seriously, and show you nga sincere gyud ko.",
                ]}
                onNext={() => goTo("ready")}
              />
            )}
            {screen === "ready" && (
              <StoryBeatScreen
                lines={[
                  "And finally, naa koy something nga gusto unta nako i-share nimo.",
                ]}
                buttonLabel="Continue ♡"
                onNext={() => goTo("confirm")}
              />
            )}
            {screen === "confirm" && (
              <CourtshipScreen onNext={() => goTo("history")} onBack={goBack} />
            )}
            {screen === "history" && (
              <OurLittleStoryScreen onNext={() => goTo("note")} onBack={goBack} />
            )}
            {screen === "note" && (
              <HeartfeltMessageScreen onNext={() => goTo("moments")} onBack={goBack} />
            )}
            {screen === "moments" && (
              <BeforeAskScreen onNext={() => goTo("closing")} onBack={goBack} />
            )}
            {screen === "closing" && (
              <PreGirlfriendScreen onNext={() => goTo("thanks")} onBack={goBack} />
            )}
            {screen === "thanks" && (
              <ClosingNoteScreen onNext={() => {}} onBack={goBack} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
