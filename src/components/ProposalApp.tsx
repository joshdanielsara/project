"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { PrefaceScreen } from "@/components/screens/PrefaceScreen";
import { WelcomeScreen } from "@/components/screens/WelcomeScreen";
import { StoryBeatScreen } from "@/components/screens/StoryBeatScreen";
import { CourtshipScreen } from "@/components/screens/CourtshipScreen";
import { OurLittleStoryScreen } from "@/components/screens/OurLittleStoryScreen";
import { HeartfeltMessageScreen } from "@/components/screens/HeartfeltMessageScreen";
import { BeforeAskScreen } from "@/components/screens/BeforeAskScreen";
import { PreGirlfriendScreen } from "@/components/screens/PreGirlfriendScreen";
import { ClosingNoteScreen } from "@/components/screens/ClosingNoteScreen";
import { EnhancedExperience } from "@/components/extras/EnhancedExperience";
import { SectionIntermission } from "@/components/ui/SectionIntermission";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { BackButton } from "@/components/ui/BackButton";
import { useMusic } from "@/hooks/useMusic";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  pageTransition,
  pageTransitionReduced,
} from "@/lib/motion";
import {
  SCREEN_ORDER,
  getPreviousScreen,
  isEnhancedExperience,
  resolveScreen,
  type Screen,
} from "@/lib/types";

const INTERMISSION_BEFORE: Screen[] = [
  "confirm",
  "history",
  "note",
  "closing",
  "thanks",
];

export function ProposalApp() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isPlaying, toggle } = useMusic();
  const reducedMotion = usePrefersReducedMotion();
  const [intermission, setIntermission] = useState(false);
  const navigatingRef = useRef(false);

  const screen: Screen = useMemo(
    () => resolveScreen(searchParams.get("step")),
    [searchParams],
  );

  const navigate = useCallback(
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

  const goTo = useCallback(
    (next: Screen) => {
      if (navigatingRef.current) return;

      const fromIndex = SCREEN_ORDER.indexOf(screen);
      const toIndex = SCREEN_ORDER.indexOf(next);
      const movingForward = toIndex > fromIndex;
      const needsIntermission =
        movingForward &&
        !reducedMotion &&
        INTERMISSION_BEFORE.includes(next);

      if (!needsIntermission) {
        navigate(next);
        return;
      }

      navigatingRef.current = true;
      setIntermission(true);
      window.setTimeout(() => {
        navigate(next);
        setIntermission(false);
        navigatingRef.current = false;
      }, 850);
    },
    [navigate, reducedMotion, screen],
  );

  const goBack = useCallback(() => {
    const previous = getPreviousScreen(screen);
    if (previous) {
      navigate(previous);
    }
  }, [navigate, screen]);

  const isSurvey = screen === "welcome";
  const showExtras = isEnhancedExperience(screen);
  const canGoBack = getPreviousScreen(screen) !== null;
  const showMusic = !isSurvey;
  const variants = reducedMotion ? pageTransitionReduced : pageTransition;

  return (
    <div
      className={`relative flex min-h-dvh flex-1 flex-col overflow-x-hidden transition-[background] duration-700 ${
        isSurvey ? "intro-bg" : "romantic-bg"
      } ${showExtras ? "enhanced-stage" : ""}`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      {showExtras && <EnhancedExperience />}

      <AnimatePresence>{intermission && <SectionIntermission />}</AnimatePresence>

      {canGoBack && <BackButton onBack={goBack} neutral={isSurvey} />}
      {showMusic && <MusicToggle isPlaying={isPlaying} onToggle={toggle} />}

      <main
        id="main-content"
        className={`relative z-10 flex flex-1 flex-col items-center overflow-y-auto px-4 sm:px-6 ${
          isSurvey ? "justify-start py-8 sm:py-12" : "justify-center py-6 sm:py-14"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            className="flex w-full justify-center"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: reducedMotion ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] }}
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
                onNext={() => goTo("preface")}
              />
            )}
            {screen === "preface" && (
              <PrefaceScreen onNext={() => goTo("context")} />
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
