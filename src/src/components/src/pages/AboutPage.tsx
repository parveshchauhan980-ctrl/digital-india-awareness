import {
  BadgeCheck,
  FileCheck2,
  Landmark,
  MonitorSmartphone,
  ScrollText,
  UserRound,
} from "lucide-react";
import { ABOUT_CARDS, OBJECTIVE_PILLARS, TIMELINE } from "@/data/about";
import { TRANSFORMATION_STEPS } from "@/data/guides";
import { Container, PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { Alert } from "@/components/ui/Feedback";

const STEP_ICONS = [UserRound, MonitorSmartphone, FileCheck2, BadgeCheck];

export function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the programme"
        eyebrowIcon={ScrollText}
        title="Understanding Digital India"
        description="What the Digital India programme is, why it matters, what it aims to achieve, and how technology has changed the way citizens reach public services."
      />

      {/* Explanation cards */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Core explanation"
            eyebrowIcon={ScrollText}
            title="Digital India, explained"
            highlight="clearly"
            description="These six points answer the questions most people ask about the programme — in plain language, without jargon."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ABOUT_CARDS.map((card, index) => (
              <article
                key={card.id}
                className="reveal group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift dark:border-white/10 dark:bg-white/[0.03]"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span
                  aria-hidden="true"
                  className="absolute right-5 top-4 font-display text-4xl font-extrabold text-brand-100 transition group-hover:text-brand-200 dark:text-white/5"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="relative font-display text-lg font-extrabold text-slate-900 dark:text-white">
                  {card.title}
                </h3>
                <p className="relative mt-2.5 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Vision pillars */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Three vision areas"
            eyebrowIcon={Landmark}
            title="What Digital India aims to"
            highlight="achieve"
            description="The programme is organised around three vision areas that guide its projects and services."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {OBJECTIVE_PILLARS.map((pillar, index) => (
              <article
                key={pillar.title}
                className="reveal relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-6 text-white shadow-lift"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10"
                />
                <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]">
                  Vision {index + 1}
                </span>
                <h3 className="relative mt-4 font-display text-lg font-extrabold leading-snug">
                  {pillar.title}
                </h3>
                <p className="relative mt-2.5 text-[13.5px] leading-relaxed text-brand-100">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Visual process */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Visual process"
            eyebrowIcon={MonitorSmartphone}
            title="How a citizen reaches a"
            highlight="digital service"
            description="The same four steps apply whether the service is a document, a payment or a certificate."
          />

          <ol className="relative mx-auto mt-10 flex max-w-4xl flex-col items-center gap-3">
            {TRANSFORMATION_STEPS.map((step, index) => {
              const Icon = STEP_ICONS[index];
              const isLast = index === TRANSFORMATION_STEPS.length - 1;
              return (
                <li key={step.title} className="w-full">
                  <div
                    className={`reveal flex items-center gap-4 rounded-2xl border p-4 shadow-soft sm:p-5 ${
                      isLast
                        ? "border-indiagreen-200 bg-gradient-to-r from-indiagreen-50 to-white dark:border-indiagreen-400/30 dark:from-indiagreen-500/10 dark:to-transparent"
                        : "border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]"
                    }`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <span
                      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${
                        isLast
                          ? "from-indiagreen-600 to-indiagreen-700"
                          : "from-brand-600 to-brand-800"
                      } text-white shadow-soft`}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-base font-extrabold text-slate-900 sm:text-lg dark:text-white">
                          {step.title}
                        </h3>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-slate-500 dark:bg-white/10 dark:text-slate-300">
                          Step {index + 1}
                        </span>
                      </div>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                        {step.detail}
                      </p>
                    </div>
                  </div>

                  {!isLast ? (
                    <div
                      aria-hidden="true"
                      className="flex justify-center py-1.5"
                    >
                      <svg
                        viewBox="0 0 24 40"
                        className="h-9 w-5 text-brand-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      >
                        <path d="M12 4v26" />
                        <path d="M5 24l7 8 7-8" />
                      </svg>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      {/* Timeline */}
      <Section tone="brand">
        <Container>
          <SectionHeading
            eyebrow="Timeline"
            eyebrowIcon={ScrollText}
            title="The journey of Digital"
            highlight="India"
            description="Key milestones in the development of India's digital public infrastructure, compiled from official Government of India portals."
          />

          <div className="relative mx-auto mt-12 max-w-3xl">
            <span
              aria-hidden="true"
              className="absolute left-[15px] top-2 h-[calc(100%-1rem)] w-0.5 bg-gradient-to-b from-saffron-400 via-slate-200 to-indiagreen-500 sm:left-1/2 sm:-translate-x-1/2 dark:via-white/15"
            />
            <ol className="space-y-7">
              {TIMELINE.map((item, index) => {
                const alignRight = index % 2 === 1;
                return (
                  <li
                    key={item.period}
                    className="reveal relative pl-11 sm:pl-0"
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1.5 inline-flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-brand-700 shadow-soft sm:left-1/2 sm:-translate-x-1/2 dark:border-ink-950"
                    >
                      <span className="h-2 w-2 rounded-full bg-white" />
                    </span>
                    <div
                      className={`sm:w-[calc(50%-2.25rem)] ${
                        alignRight
                          ? "sm:ml-auto"
                          : "sm:mr-auto sm:text-right"
                      }`}
                    >
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift dark:border-white/10 dark:bg-white/[0.04]">
                        <p className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                          {item.period}
                        </p>
                        <h3 className="mt-3 font-display text-base font-extrabold text-slate-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <Alert tone="info" className="mt-10" title="About the information on this page">
            The explanation above has been compiled from publicly available
            information published on official Government of India portals, such
            as digitalindia.gov.in, mygov.in, npci.org.in and uidai.gov.in. No
            statistics or claims have been invented. Please refer to those
            portals for the latest and most detailed information.
          </Alert>
        </Container>
      </Section>
    </>
  );
}
