"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import type { ScreenProps } from "@/lib/types";

type SurveyAnswers = {
  day: string;
  ready: string;
  thoughts: string;
};

const DAY_OPTIONS = ["Pretty good!", "It's okay.", "Could be better."] as const;
const READY_OPTIONS = ["Yes", "I guess?", "Why am I here? HAHAHA"] as const;

function ProgressBar({ value }: { value: number }) {
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-[#e8eaed]"
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Survey progress"
    >
      <motion.div
        className="h-full rounded-full bg-[#673ab7]"
        initial={false}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function QuestionCard({
  number,
  title,
  required,
  children,
}: {
  number: number;
  title: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.section
      className="rounded-xl border border-[#dadce0] bg-white p-5 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * number, duration: 0.4 }}
      aria-labelledby={`q${number}-title`}
    >
      <h2 id={`q${number}-title`} className="text-base font-medium text-[#202124] sm:text-[1.05rem]">
        {title}
        {required && (
          <span className="ml-1 text-[#d93025]" aria-hidden>
            *
          </span>
        )}
      </h2>
      <div className="mt-4">{children}</div>
    </motion.section>
  );
}

function RadioOption({
  name,
  value,
  checked,
  onChange,
  label,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
}) {
  const id = `${name}-${value.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 transition-colors ${
        checked ? "bg-[#f3e8ff]/70" : "hover:bg-[#f8f9fa]"
      }`}
    >
      <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          className="peer absolute inset-0 cursor-pointer opacity-0"
        />
        <span className="h-5 w-5 rounded-full border-2 border-[#5f6368] peer-checked:border-[#673ab7] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#673ab7]" />
        <span className="pointer-events-none absolute h-2.5 w-2.5 scale-0 rounded-full bg-[#673ab7] transition-transform peer-checked:scale-100" />
      </span>
      <span className="text-sm text-[#3c4043] sm:text-[0.95rem]">{label}</span>
    </label>
  );
}

export function WelcomeScreen({ onNext }: ScreenProps) {
  const [answers, setAnswers] = useState<SurveyAnswers>({
    day: "",
    ready: "",
    thoughts: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);

  const progress = useMemo(() => {
    let filled = 0;
    if (answers.day) filled += 1;
    if (answers.ready) filled += 1;
    if (answers.thoughts.trim()) filled += 1;
    return (filled / 3) * 100;
  }, [answers]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!answers.day || !answers.ready) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-xl px-1 sm:px-0">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="survey"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header card */}
            <div className="overflow-hidden rounded-xl border border-[#dadce0] bg-white shadow-sm">
              <div className="h-2.5 bg-[#673ab7]" aria-hidden />
              <div className="px-5 py-6 sm:px-7 sm:py-7">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#673ab7]">
                  Personal questionnaire
                </p>
                <h1 className="mt-2 font-sans text-2xl font-normal tracking-tight text-[#202124] sm:text-3xl">
                  A Little Survey
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-[#5f6368] sm:text-[0.95rem]">
                  Hi! I have a few questions for you. Please answer honestly. This won&apos;t take
                  much of your time.
                </p>
                <div className="mt-5">
                  <div className="mb-1.5 flex items-center justify-between text-xs text-[#5f6368]">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <ProgressBar value={progress} />
                </div>
              </div>
            </div>

            <form className="mt-3 space-y-3" onSubmit={handleSubmit} noValidate>
              <QuestionCard number={1} title="How's your day going?" required>
                <fieldset>
                  <legend className="sr-only">How&apos;s your day going?</legend>
                  <div className="space-y-1">
                    {DAY_OPTIONS.map((option) => (
                      <RadioOption
                        key={option}
                        name="day"
                        value={option}
                        label={option}
                        checked={answers.day === option}
                        onChange={(value) => {
                          setAnswers((prev) => ({ ...prev, day: value }));
                          setShowError(false);
                        }}
                      />
                    ))}
                  </div>
                </fieldset>
              </QuestionCard>

              <QuestionCard
                number={2}
                title="Are you ready for a few unexpected questions?"
                required
              >
                <fieldset>
                  <legend className="sr-only">
                    Are you ready for a few unexpected questions?
                  </legend>
                  <div className="space-y-1">
                    {READY_OPTIONS.map((option) => (
                      <RadioOption
                        key={option}
                        name="ready"
                        value={option}
                        label={option}
                        checked={answers.ready === option}
                        onChange={(value) => {
                          setAnswers((prev) => ({ ...prev, ready: value }));
                          setShowError(false);
                        }}
                      />
                    ))}
                  </div>
                </fieldset>
              </QuestionCard>

              <QuestionCard number={3} title="Any final thoughts before proceeding?">
                <label htmlFor="thoughts" className="sr-only">
                  Any final thoughts before proceeding?
                </label>
                <input
                  id="thoughts"
                  type="text"
                  value={answers.thoughts}
                  onChange={(event) =>
                    setAnswers((prev) => ({ ...prev, thoughts: event.target.value }))
                  }
                  placeholder="Your answer"
                  className="w-full border-0 border-b border-[#dadce0] bg-transparent px-1 py-2 text-sm text-[#202124] outline-none transition-colors placeholder:text-[#9aa0a6] focus:border-[#673ab7] sm:text-[0.95rem]"
                />
              </QuestionCard>

              <AnimatePresence>
                {showError && (
                  <motion.p
                    className="rounded-lg bg-[#fce8e6] px-3 py-2 text-sm text-[#d93025]"
                    role="alert"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Please answer the required questions before submitting.
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between gap-3 pt-2 pb-4">
                <motion.button
                  type="submit"
                  className="rounded-md bg-[#673ab7] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#5e35b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#673ab7]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Responses
                </motion.button>
                <p className="text-xs text-[#80868b]">* Required</p>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            className="overflow-hidden rounded-xl border border-[#dadce0] bg-white shadow-sm"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-2.5 bg-[#673ab7]" aria-hidden />
            <div className="px-5 py-8 text-center sm:px-8 sm:py-10">
              <div
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f0fe] text-[#1a73e8]"
                aria-hidden
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h2 className="text-2xl font-normal text-[#202124]">Thank you for answering!</h2>
              <p className="mt-2 text-sm text-[#5f6368] sm:text-[0.95rem]">
                Your responses have been recorded successfully.
              </p>

              <div className="mx-auto mt-7 max-w-sm border-t border-[#e8eaed] pt-6">
                <p className="text-base font-medium text-[#202124]">
                  Actually, there&apos;s one more thing...
                </p>
                <motion.button
                  type="button"
                  className="mt-5 rounded-md bg-[#673ab7] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#5e35b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#673ab7]"
                  onClick={onNext}
                  aria-label="Continue"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Continue →
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
