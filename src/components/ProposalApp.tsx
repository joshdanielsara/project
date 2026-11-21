"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { WelcomeScreen } from "@/components/screens/WelcomeScreen";
import { ListeningScreen } from "@/components/screens/ListeningScreen";
import { CourtshipScreen } from "@/components/screens/CourtshipScreen";
import { OurLittleStoryScreen } from "@/components/screens/OurLittleStoryScreen";
import { HeartfeltMessageScreen } from "@/components/screens/HeartfeltMessageScreen";
import { BeforeAskScreen } from "@/components/screens/BeforeAskScreen";
import { PreGirlfriendScreen } from "@/components/screens/PreGirlfriendScreen";
import { GirlfriendQuestionScreen } from "@/components/screens/GirlfriendQuestionScreen";
import { CelebrationScreen } from "@/components/screens/CelebrationScreen";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { BackButton } from "@/components/ui/BackButton";
import { useMusic } from "@/hooks/useMusic";
import {
  getPreviousScreen,
  isScreen,
  type Screen,
} from "@/lib/types";

const pageVariants = {
  initial: { opacity: 0, y: 28, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -20, filter: "blur(4px)" },
};

export function ProposalApp() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isPlaying, toggle } = useMusic();

  const screen: Screen = useMemo(() => {
    const step = searchParams.get("step");
    return isScreen(step) ? step : "welcome";
  }, [searchParams]);

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
              <WelcomeScreen onNext={() => goTo("listening")} />
            )}
            {screen === "listening" && (
              <ListeningScreen onNext={() => goTo("courtship")} onBack={goBack} />
            )}
            {screen === "courtship" && (
              <CourtshipScreen onNext={() => goTo("story")} onBack={goBack} />
            )}
            {screen === "story" && (
              <OurLittleStoryScreen onNext={() => goTo("message")} onBack={goBack} />
            )}
            {screen === "message" && (
              <HeartfeltMessageScreen onNext={() => goTo("beforeAsk")} onBack={goBack} />
            )}
            {screen === "beforeAsk" && (
              <BeforeAskScreen onNext={() => goTo("preGirlfriend")} onBack={goBack} />
            )}
            {screen === "preGirlfriend" && (
              <PreGirlfriendScreen onNext={() => goTo("girlfriend")} onBack={goBack} />
            )}
            {screen === "girlfriend" && (
              <GirlfriendQuestionScreen
                onNext={() => goTo("celebration")}
                onBack={goBack}
              />
            )}
            {screen === "celebration" && <CelebrationScreen />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
