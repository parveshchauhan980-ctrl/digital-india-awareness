import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  GraduationCap,
  Lightbulb,
  MapPin,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { CollegeLogo } from "@/components/CollegeLogo";
import { HOME_INFO_CARDS, PORTAL_SECTIONS } from "@/data/home";
import {
  PROJECT_DETAILS,
  PROJECT_DESCRIPTION,
  PROJECT_TAGLINE,
} from "@/data/project";
import { useLocation } from "@/hooks/useRouter";
import { HeroIllustration } from "@/components/HeroIllustration";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Feedback";

const SECTION_ICON_MAP: Record<string, typeof Sparkles> = {
  Sparkles,
  Workflow,
  ShieldCheck,
  Lightbulb,
};

export function HomePage() {
  const { navigate } = useLocation();

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-saffron-50/70 dark:from-brand-950/60 dark:via-ink-950 dark:to-ink-950"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grid-pattern opacity-70 [mask-image:radial-gradient(ellipse_at_30%_20%,black,transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-300/25 blur-3xl dark:bg-brand-700/20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-saffron-300/25 blur-3xl dark:bg-saffron-600/10"
        />

        <Container className="relative py-12 sm:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex flex-wrap items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700 shadow-soft backdrop-blur dark:border-brand-400/25 dark:bg-white/5 dark:text-brand-300">
                  <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                  Community Engagement Project
                  <span className="hidden h-1 w-1 rounded-full bg-brand-400 sm:block" />
                  <span className="hidden sm:inline">B.Sc. Computer Science</span>
                </span>
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 py-1 pl-1 pr-3 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/[0.06]"
                  title="Rajiv Gandhi College of Arts, Commerce & Science — Sainath Education Trust"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white ring-1 ring-slate-200">
                    <CollegeLogo className="h-6 w-6" />
                  </span>
                  <span className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-slate-700 dark:text-slate-200">
                    Rajiv Gandhi College · Vashi
                  </span>
                </span>
              </div>

              <h1 className="mt-5 font-display text-[2.05rem] font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem] dark:text-white">
                Awareness Program on{" "}
                <span className="text-gradient-brand">Digital India</span>{" "}
                Initiatives
              </h1>

              <p className="mt-4 font-display text-lg font-bold text-saffron-600 sm:text-xl dark:text-saffron-400">
                Empowering Citizens Through Digital Services, Technology &amp;
                Awareness
              </p>

              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                {PROJECT_DESCRIPTION}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <LinkButton
                  href="#/initiatives"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Explore Initiatives
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </LinkButton>
                <LinkButton
                  href="#/quiz"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Lightbulb className="h-4 w-4" aria-hidden="true" />
                  Take Awareness Quiz
                </LinkButton>
              </div>

              <dl className="mt-9 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Initiatives", value: "9", icon: Sparkles },
                  { label: "Step guides", value: "3", icon: Workflow },
                  { label: "Quiz questions", value: "10", icon: ClipboardList },
                  { label: "Safety checks", value: "12", icon: ShieldCheck },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-slate-200/80 bg-white/80 px-3.5 py-3 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
                    >
                      <Icon
                        className="h-4 w-4 text-brand-600 dark:text-brand-400"
                        aria-hidden="true"
                      />
                      <dt className="mt-1.5 font-display text-xl font-extrabold text-slate-900 dark:text-white">
                        {stat.value}
                      </dt>
                      <dd className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        {stat.label}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto flex max-w-md justify-center lg:max-w-none">
                <div className="animate-float-slow w-full">
                  <HeroIllustration />
                </div>
              </div>
            </div>
          </div>
        </Container>

        <div className="tricolour-bar h-[3px] w-full opacity-80" aria-hidden="true" />
      </section>

      {/* ============ FOUR INFORMATION CARDS ============ */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="What this program covers"
            eyebrowIcon={Sparkles}
            title="Four pillars of digital"
            highlight="awareness"
            description="Every part of this portal connects back to these four areas, so that citizens can move from simply hearing about digital services to using them confidently and safely."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HOME_INFO_CARDS.map((card, index) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-lift dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-brand-400/40"
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.accent}`}
                  />
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.accent} text-white shadow-soft`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-extrabold text-slate-900 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                    {card.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {card.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-[13px] text-slate-600 dark:text-slate-300"
                      >
                        <BadgeCheck
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indiagreen-600 dark:text-indiagreen-400"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => navigate(card.path)}
                    className="mt-5 inline-flex items-center gap-1.5 self-start text-[13px] font-bold text-brand-700 transition group-hover:gap-2.5 dark:text-brand-300"
                  >
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ============ PROJECT SNAPSHOT ============ */}
      <Section>
        <Container>
          <div className="reveal overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="p-6 sm:p-8">
                <h2 className="font-display text-2xl font-extrabold text-slate-900 sm:text-[1.7rem] dark:text-white">
                  About this Community Engagement Project
                </h2>
                <p className="mt-3 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                  This portal was prepared as a Community Engagement Project to
                  spread awareness about Digital India initiatives among
                  students, families and the local community. It explains what
                  each initiative does, how to use it step by step, and how to
                  stay safe while using it.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
                      Project type
                    </p>
                    <p className="mt-1.5 text-[14px] font-semibold text-slate-800 dark:text-slate-100">
                      {PROJECT_DETAILS.projectType}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
                      Course
                    </p>
                    <p className="mt-1.5 text-[14px] font-semibold text-slate-800 dark:text-slate-100">
                      {PROJECT_DETAILS.course}
                    </p>
                  </div>
                </div>
                <p className="mt-5 inline-flex items-start gap-2 text-[13px] text-slate-600 dark:text-slate-400">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400"
                    aria-hidden="true"
                  />
                  {PROJECT_DETAILS.college}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <LinkButton href="#/about" size="md">
                    Read about Digital India
                  </LinkButton>
                  <LinkButton href="#/project" variant="outline" size="md">
                    Project details
                  </LinkButton>
                  <LinkButton href="#/contact" variant="ghost" size="md">
                    Send feedback
                  </LinkButton>
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-brand-50 to-saffron-50/60 p-6 sm:p-8 dark:from-brand-950/40 dark:to-transparent">
                <h3 className="font-display text-[13px] font-extrabold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
                  Explore the portal
                </h3>
                <ul className="mt-5 space-y-3">
                  {PORTAL_SECTIONS.map((section) => {
                    const Icon = SECTION_ICON_MAP[section.icon] ?? Sparkles;
                    return (
                      <li key={section.title}>
                        <button
                          type="button"
                          onClick={() => navigate(section.path)}
                          className="group flex w-full items-start gap-3.5 rounded-2xl border border-white/70 bg-white/85 p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-brand-300 dark:border-white/10 dark:bg-white/[0.04]"
                        >
                          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-500/15 dark:text-brand-300">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-display text-[15px] font-extrabold text-slate-900 dark:text-white">
                              {section.title}
                            </span>
                            <span className="mt-0.5 block text-[13px] leading-snug text-slate-600 dark:text-slate-300">
                              {section.description}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ SAFETY CALLOUT ============ */}
      <Section tone="muted">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Alert tone="danger" title="Never share your OTP, UPI PIN or password with anyone.">
                No bank, government office or genuine company will ever call you
                and ask for these details. If someone does, it is fraud — end the
                call and report it. Learn the full do-and-do-not list in the
                Digital Safety section.
              </Alert>
            </div>
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
              <div>
                <p className="font-display text-[15px] font-extrabold text-slate-900 dark:text-white">
                  {PROJECT_TAGLINE}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
                  Take the 10-question awareness quiz and see how much you already
                  know. Your latest score is saved on this device.
                </p>
              </div>
              <LinkButton href="#/quiz" variant="secondary" size="md" fullWidth>
                <ScanLine className="h-4 w-4" aria-hidden="true" />
                Start the quiz
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
