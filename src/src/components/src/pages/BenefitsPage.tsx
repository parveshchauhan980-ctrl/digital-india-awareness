import { HandCoins, Quote, Users } from "lucide-react";
import { BENEFITS } from "@/data/benefits";
import { Container, PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Feedback";

const COMMUNITY_IMPACT = [
  {
    title: "For students",
    points: [
      "Digital documents for admissions and scholarship applications",
      "Online learning material through national education platforms",
      "Safe digital payments for daily expenses",
    ],
  },
  {
    title: "For families",
    points: [
      "Utility payments and bookings without standing in queues",
      "Health-related teleconsultation without travelling to a city",
      "Assisted service centres for members who need extra help",
    ],
  },
  {
    title: "For the community",
    points: [
      "Local shopkeepers can accept payments using a simple QR code",
      "Awareness reduces the chances of online fraud in the neighbourhood",
      "Information reaches people in their own language",
    ],
  },
];

export function BenefitsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Benefits"
        eyebrowIcon={HandCoins}
        title="Benefits of digital services for citizens"
        description="Digitalisation is useful only when people can see what it actually saves them. These nine benefits describe the everyday difference that digital services make."
      />

      <Section>
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <article
                  key={benefit.title}
                  className="reveal group relative flex gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-lift dark:border-white/10 dark:bg-white/[0.03]"
                  style={{ transitionDelay: `${(index % 6) * 50}ms` }}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${benefit.accent}`}
                  />
                  <span
                    className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${benefit.accent} text-white shadow-soft transition group-hover:scale-105`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-display text-[16px] font-extrabold text-slate-900 dark:text-white">
                      {benefit.title}
                    </h2>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                      {benefit.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Why awareness matters"
            eyebrowIcon={Users}
            title="Who benefits in the"
            highlight="community"
            description="The purpose of this Community Engagement Project is to pass these benefits on to people who may not have used a digital service yet."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {COMMUNITY_IMPACT.map((group, index) => (
              <article
                key={group.title}
                className="reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/[0.03]"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <h3 className="font-display text-lg font-extrabold text-slate-900 dark:text-white">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300"
                    >
                      <Quote
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-400"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <Alert tone="warning" className="mt-8" title="Benefits come with responsibility">
            Digital services reduce paperwork and waiting time, but they also
            require careful handling of passwords, OTPs and personal details.
            Read the Digital Safety section before helping someone use a digital
            service for the first time.
          </Alert>

          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="#/digital-safety" size="md">
              Go to Digital Safety
            </LinkButton>
            <LinkButton href="#/how-it-works" variant="outline" size="md">
              See how to use these services
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
