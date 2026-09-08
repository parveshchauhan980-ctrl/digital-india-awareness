import { useState } from "react";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Landmark,
  MonitorSmartphone,
  ScanLine,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { GUIDES } from "@/data/guides";
import { Container, PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { Alert } from "@/components/ui/Feedback";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const GUIDE_ICONS: Record<string, typeof Workflow> = {
  MonitorSmartphone,
  Landmark,
  ScanLine,
};

export function HowItWorksPage() {
  const [activeId, setActiveId] = useState(GUIDES[0].id);
  const [stepIndex, setStepIndex] = useState(0);

  const guide = GUIDES.find((item) => item.id === activeId) ?? GUIDES[0];
  const Icon = GUIDE_ICONS[guide.icon] ?? Workflow;
  const step = guide.steps[stepIndex];
  const progress = ((stepIndex + 1) / guide.steps.length) * 100;

  const selectGuide = (id: string) => {
    setActiveId(id);
    setStepIndex(0);
  };

  return (
    <>
      <PageHeader
        eyebrow="How it works"
        eyebrowIcon={Workflow}
        title="Step-by-step guides for everyday digital services"
        description="Follow each guide at your own pace. These are the same steps you can use to help a family member set up a digital service for the first time."
      />

      <Section>
        <Container>
          {/* Guide selector */}
          <div
            className="flex flex-wrap gap-3"
            role="tablist"
            aria-label="Choose a step-by-step guide"
          >
            {GUIDES.map((item) => {
              const GuideIcon = GUIDE_ICONS[item.icon] ?? Workflow;
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectGuide(item.id)}
                  className={cn(
                    "inline-flex items-center gap-2.5 rounded-2xl border px-5 py-3 text-[14px] font-bold transition",
                    isActive
                      ? "border-brand-600 bg-brand-600 text-white shadow-lift"
                      : "border-slate-300 bg-white text-slate-700 hover:border-brand-400 hover:bg-brand-50 dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-brand-400/60",
                  )}
                >
                  <GuideIcon className="h-4.5 w-4.5" aria-hidden="true" />
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Active guide */}
          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            {/* Step list */}
            <ol className="space-y-3 lg:col-span-5">
              {guide.steps.map((item, index) => {
                const isActive = index === stepIndex;
                const isDone = index < stepIndex;
                return (
                  <li key={item.title}>
                    <button
                      type="button"
                      onClick={() => setStepIndex(index)}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                        "reveal flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition",
                        isActive
                          ? "border-brand-300 bg-white shadow-lift dark:border-brand-400/40 dark:bg-white/[0.05]"
                          : "border-slate-200 bg-white/70 hover:border-brand-200 dark:border-white/10 dark:bg-white/[0.02]",
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[13px] font-extrabold transition",
                          isActive
                            ? `bg-gradient-to-br ${guide.accent} text-white`
                            : isDone
                              ? "bg-indiagreen-100 text-indiagreen-700 dark:bg-indiagreen-500/15 dark:text-indiagreen-400"
                              : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-300",
                        )}
                      >
                        {isDone ? "✓" : index + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display text-[14.5px] font-extrabold text-slate-900 dark:text-white">
                          Step {index + 1} — {item.title}
                        </span>
                        <span className="mt-1 block text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
                          {item.detail}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Step detail card */}
            <div className="lg:col-span-7">
              <div className="reveal sticky top-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
                <div
                  className={`flex items-start gap-4 bg-gradient-to-r ${guide.accent} p-6 text-white`}
                >
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/25">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-white/80">
                      {guide.name} guide
                    </p>
                    <h2 className="mt-1 font-display text-xl font-extrabold leading-snug">
                      {step.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-200">
                    {step.detail}
                  </p>

                  <div className="mt-6">
                    <div className="flex items-center justify-between text-[12px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      <span>
                        Step {stepIndex + 1} of {guide.steps.length}
                      </span>
                      <span>{Math.round(progress)}% complete</span>
                    </div>
                    <div
                      className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
                      role="progressbar"
                      aria-valuenow={Math.round(progress)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${guide.name} guide progress`}
                    >
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${guide.accent} transition-all duration-500`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                      disabled={stepIndex === 0}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2.5 text-[13.5px] font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                      Previous
                    </button>

                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      {guide.steps.map((item, index) => (
                        <span
                          key={item.title}
                          className={cn(
                            "h-2 rounded-full transition-all",
                            index === stepIndex
                              ? "w-6 bg-brand-600"
                              : "w-2 bg-slate-300 dark:bg-white/20",
                          )}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setStepIndex((prev) =>
                          Math.min(guide.steps.length - 1, prev + 1),
                        )
                      }
                      disabled={stepIndex === guide.steps.length - 1}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-brand-700 px-4 py-2.5 text-[13.5px] font-bold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-white/[0.02]">
                  <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
                    <span className="font-bold text-slate-800 dark:text-white">
                      Remember:{" "}
                    </span>
                    screens and wording can change slightly between app versions.
                    Follow the official instructions shown inside the app or on the
                    official website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Payment safety"
            eyebrowIcon={ShieldCheck}
            title="Before you make any digital"
            highlight="payment"
            description="A payment can be reversed only with your bank's help, so a few seconds of checking is always worth it."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <Alert
              tone="danger"
              className="lg:col-span-2"
              title="Never share your OTP, UPI PIN or password with anyone."
            >
              Entering a UPI PIN always means money is going <em>out</em> of your
              account. You never need a UPI PIN to <em>receive</em> money. If a
              caller, message or website asks for these details, it is fraud — stop
              immediately and report it.
            </Alert>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
              <h3 className="flex items-center gap-2 font-display text-[15px] font-extrabold text-slate-900 dark:text-white">
                <AlertTriangle
                  className="h-4 w-4 text-saffron-500"
                  aria-hidden="true"
                />
                Quick checklist
              </h3>
              <ul className="mt-3 space-y-2 text-[13px] text-slate-600 dark:text-slate-300">
                <li>• Payee name matches the person or shop you know</li>
                <li>• Amount typed is exactly what you agreed</li>
                <li>• QR code belongs to the shop in front of you</li>
                <li>• You are on your own internet, not public Wi-Fi</li>
              </ul>
              <LinkButton
                href="#/digital-safety"
                variant="outline"
                size="sm"
                className="mt-4"
                fullWidth
              >
                Open Digital Safety
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
