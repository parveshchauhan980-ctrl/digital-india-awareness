import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Lightbulb,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import {
  QUIZ_QUESTIONS,
  getPerformanceMessage,
  type QuizResult,
} from "@/data/quiz";
import { STORAGE_KEYS } from "@/data/project";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Container, PageHeader, Section } from "@/components/ui/Section";
import { Button, LinkButton } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Feedback";
import { cn } from "@/utils/cn";

type Phase = "intro" | "playing" | "result";

const TONE_STYLES: Record<string, string> = {
  excellent: "from-indiagreen-600 to-indiagreen-700",
  good: "from-brand-600 to-brand-800",
  average: "from-saffron-500 to-saffron-600",
  low: "from-rose-600 to-rose-700",
};

export function QuizPage() {
  const [latest, setLatest] = useLocalStorage<QuizResult | null>(
    STORAGE_KEYS.quizScore,
    null,
  );

  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);

  const question = QUIZ_QUESTIONS[index];
  const total = QUIZ_QUESTIONS.length;
  const score = useMemo(
    () =>
      answers.reduce(
        (sum, answer, i) =>
          answer === QUIZ_QUESTIONS[i].answerIndex ? sum + 1 : sum,
        0,
      ),
    [answers],
  );

  const startQuiz = useCallback(() => {
    setPhase("playing");
    setIndex(0);
    setSelected(null);
    setAnswers([]);
  }, []);

  const reveal = selected !== null;

  const choose = (optionIndex: number) => {
    if (reveal) return;
    setSelected(optionIndex);
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optionIndex;
      return next;
    });
  };

  const goNext = () => {
    if (index === total - 1) {
      const finalAnswers = QUIZ_QUESTIONS.map((_, i) =>
        answers[i] ?? (i === index ? selected : -1),
      );
      const finalScore = finalAnswers.reduce(
        (sum, answer, i) => (answer === QUIZ_QUESTIONS[i].answerIndex ? sum + 1 : sum),
        0,
      );
      setLatest({
        score: finalScore,
        total,
        percentage: Math.round((finalScore / total) * 100),
        date: new Date().toLocaleString(),
      });
      setPhase("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setIndex((prev) => prev + 1);
    setSelected(null);
  };

  const goPrevious = () => {
    if (index === 0) return;
    setIndex((prev) => prev - 1);
    setSelected(answers[index - 1] ?? null);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (phase !== "playing") return;
      const number = Number(event.key);
      if (number >= 1 && number <= 4 && !reveal) choose(number - 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, reveal, index]);

  const performance = getPerformanceMessage(
    total > 0 ? Math.round((score / total) * 100) : 0,
  );

  return (
    <>
      <PageHeader
        eyebrow="Interactive quiz"
        eyebrowIcon={Lightbulb}
        title="Digital India Awareness Quiz"
        description="Ten multiple-choice questions on Digital India initiatives, digital payments and online safety. Choose an answer, see instant feedback, and get your final score."
      />

      <Section>
        <Container>
          {phase === "intro" ? (
            <div className="mx-auto max-w-3xl">
              <div className="reveal overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
                <div className="bg-gradient-to-br from-brand-700 to-brand-900 p-7 text-white sm:p-9">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                    <Lightbulb className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-extrabold sm:text-3xl">
                    Ready to test your awareness?
                  </h2>
                  <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-brand-100">
                    {total} questions • one question per screen • instant feedback
                    after every answer • your latest score is saved on this device
                    only.
                  </p>
                </div>

                <div className="p-7 sm:p-9">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Covers initiatives, payments and cyber safety",
                      "Progress indicator and previous button",
                      "Correct answer feedback with explanation",
                      "Percentage and performance message at the end",
                    ].map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-[13.5px] text-slate-700 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-200"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-indiagreen-600 dark:text-indiagreen-400"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {latest ? (
                    <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-brand-400/25 dark:bg-brand-500/10">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
                          Your latest saved score
                        </p>
                        <p className="mt-1 font-display text-lg font-extrabold text-slate-900 dark:text-white">
                          {latest.score}/{latest.total} ({latest.percentage}%)
                        </p>
                        <p className="text-[12px] text-slate-500 dark:text-slate-400">
                          Attempted on {latest.date}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={startQuiz}>
                        <RotateCcw className="h-4 w-4" aria-hidden="true" />
                        Try again
                      </Button>
                    </div>
                  ) : null}

                  <Button size="lg" fullWidth className="mt-6" onClick={startQuiz}>
                    Start Quiz
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
          ) : null}

          {phase === "playing" ? (
            <div className="mx-auto max-w-3xl">
              {/* Progress */}
              <div className="reveal">
                <div className="flex items-center justify-between text-[12.5px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <span>
                    Question {index + 1} of {total}
                  </span>
                  <span>Answered: {Object.keys(answers).length}</span>
                </div>
                <div
                  className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
                  role="progressbar"
                  aria-valuenow={Math.round(((index + 1) / total) * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Quiz progress"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-800 transition-all duration-500"
                    style={{ width: `${((index + 1) / total) * 100}%` }}
                  />
                </div>
              </div>

              <div
                key={question.id}
                className="animate-fade-up mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-5 dark:border-white/10 dark:bg-white/[0.02]">
                  <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
                    Question {index + 1}
                  </p>
                  <h2 className="mt-2 font-display text-lg font-extrabold leading-snug text-slate-900 sm:text-xl dark:text-white">
                    {question.question}
                  </h2>
                </div>

                <div className="p-6">
                  <div className="grid gap-3">
                    {question.options.map((option, optionIndex) => {
                      const isCorrect = optionIndex === question.answerIndex;
                      const isChosen = selected === optionIndex;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => choose(optionIndex)}
                          disabled={reveal}
                          aria-pressed={isChosen}
                          className={cn(
                            "flex items-center gap-3.5 rounded-2xl border p-4 text-left text-[14px] font-semibold transition",
                            !reveal &&
                              "border-slate-300 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-50 dark:border-white/15 dark:bg-white/[0.03] dark:text-slate-100 dark:hover:border-brand-400/60 dark:hover:bg-white/5",
                            reveal &&
                              isCorrect &&
                              "border-indiagreen-500 bg-indiagreen-50 text-indiagreen-700 dark:border-indiagreen-400/50 dark:bg-indiagreen-500/10 dark:text-indiagreen-400",
                            reveal &&
                              isChosen &&
                              !isCorrect &&
                              "border-rose-500 bg-rose-50 text-rose-700 dark:border-rose-400/50 dark:bg-rose-500/10 dark:text-rose-300",
                            reveal &&
                              !isCorrect &&
                              !isChosen &&
                              "border-slate-200 bg-white text-slate-400 dark:border-white/10 dark:bg-transparent dark:text-slate-500",
                          )}
                        >
                          <span
                            className={cn(
                              "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[13px] font-extrabold",
                              reveal && isCorrect
                                ? "bg-indiagreen-600 text-white"
                                : reveal && isChosen
                                  ? "bg-rose-600 text-white"
                                  : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-200",
                            )}
                          >
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          <span className="flex-1">{option}</span>
                          {reveal && isCorrect ? (
                            <CheckCircle2
                              className="h-5 w-5 shrink-0 text-indiagreen-600 dark:text-indiagreen-400"
                              aria-label="Correct answer"
                            />
                          ) : null}
                          {reveal && isChosen && !isCorrect ? (
                            <XCircle
                              className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400"
                              aria-label="Your incorrect answer"
                            />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>

                  {reveal ? (
                    <Alert
                      tone={selected === question.answerIndex ? "success" : "error"}
                      className="mt-5"
                      title={
                        selected === question.answerIndex
                          ? "Correct!"
                          : "Not quite — here is the correct answer"
                      }
                    >
                      {question.explanation}
                    </Alert>
                  ) : (
                    <p className="mt-4 text-[12.5px] text-slate-500 dark:text-slate-400">
                      Tip: you can also press keys 1–4 to choose an option.
                    </p>
                  )}

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <Button
                      variant="outline"
                      size="md"
                      onClick={goPrevious}
                      disabled={index === 0}
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                      Previous
                    </Button>

                    <Button
                      size="md"
                      onClick={goNext}
                      disabled={!reveal}
                      title={
                        reveal
                          ? undefined
                          : "Select an answer to continue"
                      }
                    >
                      {index === total - 1 ? "See my score" : "Next"}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {phase === "result" ? (
            <div className="mx-auto max-w-3xl">
              <div className="reveal overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
                <div
                  className={cn(
                    "bg-gradient-to-br p-8 text-center text-white sm:p-10",
                    TONE_STYLES[performance.tone],
                  )}
                >
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30">
                    <Trophy className="h-8 w-8" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.18em] text-white/80">
                    Quiz complete
                  </p>
                  <p className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
                    Your Score: {score}/{total}
                  </p>
                  <p className="mt-2 text-lg font-bold text-white/90">
                    {Math.round((score / total) * 100)}% correct
                  </p>
                  <p className="mx-auto mt-4 max-w-lg font-display text-lg font-extrabold">
                    {performance.title}
                  </p>
                </div>

                <div className="p-7 sm:p-9">
                  <p className="text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                    {performance.message}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Correct", value: score, tone: "text-indiagreen-600" },
                      {
                        label: "Incorrect",
                        value: total - score,
                        tone: "text-rose-600",
                      },
                      {
                        label: "Percentage",
                        value: `${Math.round((score / total) * 100)}%`,
                        tone: "text-brand-600",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-center dark:border-white/10 dark:bg-white/[0.02]"
                      >
                        <p
                          className={cn(
                            "font-display text-2xl font-extrabold",
                            item.tone,
                          )}
                        >
                          {item.value}
                        </p>
                        <p className="text-[11.5px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 space-y-2">
                    <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                      Answer review
                    </p>
                    {QUIZ_QUESTIONS.map((q, i) => {
                      const correct = answers[i] === q.answerIndex;
                      return (
                        <div
                          key={q.id}
                          className="flex items-start gap-3 rounded-xl border border-slate-200 p-3.5 dark:border-white/10"
                        >
                          {correct ? (
                            <CheckCircle2
                              className="mt-0.5 h-4.5 w-4.5 shrink-0 text-indiagreen-600 dark:text-indiagreen-400"
                              aria-hidden="true"
                            />
                          ) : (
                            <XCircle
                              className="mt-0.5 h-4.5 w-4.5 shrink-0 text-rose-500"
                              aria-hidden="true"
                            />
                          )}
                          <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
                            <span className="font-bold text-slate-800 dark:text-white">
                              Q{i + 1}. {q.question}
                            </span>
                            <span className="mt-1 block">
                              Correct answer: {q.options[q.answerIndex]}
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Button size="md" onClick={startQuiz} fullWidth>
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      Restart Quiz
                    </Button>
                    <LinkButton
                      href="#/digital-safety"
                      variant="outline"
                      size="md"
                      fullWidth
                    >
                      Revise Digital Safety
                    </LinkButton>
                  </div>

                  {latest ? (
                    <p className="mt-4 text-center text-[12.5px] text-slate-500 dark:text-slate-400">
                      Saved on this device: {latest.score}/{latest.total} (
                      {latest.percentage}%) • {latest.date}
                    </p>
                  ) : null}

                  <div className="mt-5 flex flex-wrap justify-center gap-3">
                    <LinkButton href="#/survey" variant="secondary" size="sm">
                      Share your views in the survey
                    </LinkButton>
                    <LinkButton href="#/initiatives" variant="ghost" size="sm">
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      Back to initiatives
                    </LinkButton>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
