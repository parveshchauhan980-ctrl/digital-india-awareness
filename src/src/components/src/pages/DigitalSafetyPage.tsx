import {
  Check,
  Fingerprint,
  Globe,
  LifeBuoy,
  Mail,
  MessageSquareWarning,
  PhoneOff,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Users,
  X,
} from "lucide-react";
import {
  COMMON_SCAMS,
  REPORTING_STEPS,
  SAFETY_DO,
  SAFETY_DONT,
} from "@/data/safety";
import { Container, PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";

const SCAM_ICONS: Record<string, typeof Globe> = {
  Mail,
  Globe,
  MessageSquareWarning,
  Smartphone,
  PhoneOff,
  Fingerprint,
  Users,
};

export function DigitalSafetyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Digital safety"
        eyebrowIcon={ShieldCheck}
        title="Stay Safe Online"
        description="Most online fraud succeeds because of one small mistake. Learn what to do, what never to do, and how to recognise the scams that are most common in India."
      />

      {/* DO / DON'T */}
      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* DO */}
            <div className="reveal overflow-hidden rounded-3xl border border-indiagreen-200 bg-white shadow-soft dark:border-indiagreen-400/25 dark:bg-white/[0.03]">
              <div className="flex items-center gap-3 bg-gradient-to-r from-indiagreen-600 to-indiagreen-700 px-6 py-5 text-white">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/25">
                  <Check className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-extrabold">DO</h2>
                  <p className="text-[12.5px] text-indiagreen-50">
                    Habits that keep your accounts and money safe
                  </p>
                </div>
              </div>
              <ul className="divide-y divide-slate-100 dark:divide-white/5">
                {SAFETY_DO.map((point) => (
                  <li key={point.text} className="flex gap-3.5 p-5">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indiagreen-100 text-indiagreen-700 dark:bg-indiagreen-500/15 dark:text-indiagreen-400">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-display text-[14.5px] font-extrabold text-slate-900 dark:text-white">
                        {point.text}
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
                        {point.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* DON'T */}
            <div className="reveal overflow-hidden rounded-3xl border border-rose-200 bg-white shadow-soft dark:border-rose-400/25 dark:bg-white/[0.03]">
              <div className="flex items-center gap-3 bg-gradient-to-r from-rose-600 to-rose-700 px-6 py-5 text-white">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/25">
                  <X className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-extrabold">DON'T</h2>
                  <p className="text-[12.5px] text-rose-50">
                    Mistakes that lead to data theft and money loss
                  </p>
                </div>
              </div>
              <ul className="divide-y divide-slate-100 dark:divide-white/5">
                {SAFETY_DONT.map((point) => (
                  <li key={point.text} className="flex gap-3.5 p-5">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400">
                      <X className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-display text-[14.5px] font-extrabold text-slate-900 dark:text-white">
                        {point.text}
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
                        {point.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stay alert card */}
          <div className="reveal mt-6 overflow-hidden rounded-3xl border border-rose-300 bg-gradient-to-br from-rose-50 via-white to-saffron-50 p-6 shadow-soft sm:p-8 dark:border-rose-400/30 dark:from-rose-500/10 dark:via-transparent dark:to-saffron-500/5">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-lift">
                <ShieldAlert className="h-7 w-7" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-xl font-extrabold text-rose-700 sm:text-2xl dark:text-rose-300">
                  Stay Alert
                </h2>
                <p className="mt-2 max-w-3xl text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-200">
                  Fraud messages create urgency: “your account will be blocked”,
                  “KYC expired”, “you have won a prize”, “verify your details
                  today”. That pressure is the warning sign itself. Stop, do not
                  click, and verify the information yourself using the number
                  printed on the official website or your bank passbook.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <LinkButton
                    href="https://www.cybercrime.gov.in/"
                    external
                    size="md"
                  >
                    Report on cybercrime.gov.in
                  </LinkButton>
                  <LinkButton href="#/quiz" variant="outline" size="md">
                    Test your safety knowledge
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Common scams */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Know the tricks"
            eyebrowIcon={ShieldAlert}
            title="Common online"
            highlight="scams"
            description="Each card explains how the scam works and the warning sign you can look out for."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COMMON_SCAMS.map((scam, index) => {
              const Icon = SCAM_ICONS[scam.icon] ?? ShieldAlert;
              return (
                <article
                  key={scam.name}
                  className="reveal flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-rose-200 hover:shadow-lift dark:border-white/10 dark:bg-white/[0.03]"
                  style={{ transitionDelay: `${(index % 6) * 50}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400">
                      <Icon className="h-5.5 w-5.5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-[16px] font-extrabold text-slate-900 dark:text-white">
                      {scam.name}
                    </h3>
                  </div>
                  <p className="mt-3.5 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
                    <span className="font-bold text-slate-800 dark:text-white">
                      How it works:{" "}
                    </span>
                    {scam.howItWorks}
                  </p>
                  <p className="mt-2.5 rounded-xl bg-saffron-50 p-3 text-[13px] leading-relaxed text-saffron-600 dark:bg-saffron-500/10 dark:text-saffron-300">
                    <span className="font-bold">Warning sign: </span>
                    {scam.warningSign}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Reporting */}
      <Section>
        <Container>
          <div className="reveal overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
            <div className="grid lg:grid-cols-12">
              <div className="bg-gradient-to-br from-brand-700 to-brand-900 p-7 text-white lg:col-span-5">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                  <LifeBuoy className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-display text-2xl font-extrabold leading-snug">
                  What to do if you are already a victim
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-brand-100">
                  Acting in the first few hours gives the best chance of stopping
                  the money. Do not feel embarrassed — report it immediately.
                </p>
              </div>

              <div className="p-7 lg:col-span-7">
                <ol className="space-y-4">
                  {REPORTING_STEPS.map((text, index) => (
                    <li key={text} className="flex gap-3.5">
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-[12.5px] font-extrabold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                        {index + 1}
                      </span>
                      <p className="text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                        {text}
                      </p>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 flex flex-wrap gap-3">
                  <LinkButton
                    href="https://www.cybercrime.gov.in/"
                    external
                    size="md"
                  >
                    National Cyber Crime Reporting Portal
                  </LinkButton>
                  <LinkButton
                    href="https://sancharsaathi.gov.in/"
                    external
                    variant="outline"
                    size="md"
                  >
                    Sanchar Saathi
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
