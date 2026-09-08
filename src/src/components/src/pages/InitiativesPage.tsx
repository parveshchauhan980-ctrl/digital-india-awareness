import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  X,
} from "lucide-react";
import {
  INITIATIVES,
  INITIATIVE_CATEGORIES,
  type Initiative,
} from "@/data/initiatives";
import { Container, PageHeader, Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Alert, EmptyState } from "@/components/ui/Feedback";
import { cn } from "@/utils/cn";

export function InitiativesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<Initiative | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INITIATIVES.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery =
        q.length === 0 ||
        [item.name, item.tagline, item.description, item.category, item.keyBenefit]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <PageHeader
        eyebrow="Initiatives"
        eyebrowIcon={Sparkles}
        title="Key Digital India Initiatives"
        description="Nine important platforms that make documents, services, payments, identity, education and healthcare available digitally. Open any card to see what it is, how it works and how to use it safely."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-sm">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search initiatives, e.g. UPI, documents, health"
              aria-label="Search initiatives"
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-9 text-sm text-slate-900 shadow-soft transition placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 dark:border-white/15 dark:bg-white/[0.04] dark:text-white"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-slate-700 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
          <p className="text-[13px] font-semibold text-slate-500 dark:text-slate-400">
            Showing {results.length} of {INITIATIVES.length} initiatives
          </p>
        </div>
      </PageHeader>

      <Section>
        <Container>
          {/* Category filter */}
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter initiatives by category"
          >
            {INITIATIVE_CATEGORIES.map((item) => {
              const isActive = category === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-full border px-4 py-2 text-[13px] font-semibold transition",
                    isActive
                      ? "border-brand-600 bg-brand-600 text-white shadow-soft"
                      : "border-slate-300 bg-white text-slate-700 hover:border-brand-400 hover:bg-brand-50 dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-brand-400/60",
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Cards */}
          {results.length === 0 ? (
            <div className="mt-8">
              <EmptyState
                icon={<Search className="h-10 w-10" />}
                title="No initiative matches your search"
                description={`Nothing found for “${query}” in the ${category} category. Try a different word, or reset the filters to see all nine initiatives.`}
                action={
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setCategory("All");
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
                  >
                    Reset filters
                  </button>
                }
              />
            </div>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.id}
                    className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-lift dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-brand-400/40"
                    style={{ transitionDelay: `${(index % 6) * 50}ms` }}
                  >
                    <div
                      className={`flex items-center gap-3 bg-gradient-to-r ${item.accent} px-5 py-4`}
                    >
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-white ring-1 ring-white/25">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <h2 className="truncate font-display text-[16px] font-extrabold text-white">
                          {item.name}
                        </h2>
                        <p className="truncate text-[11.5px] font-semibold uppercase tracking-wider text-white/80">
                          {item.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <p className="font-display text-[13px] font-bold text-brand-700 dark:text-brand-300">
                        {item.tagline}
                      </p>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                        {item.description}
                      </p>

                      <div className="mt-4 space-y-3 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 dark:border-white/10 dark:bg-white/[0.03]">
                        <div>
                          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                            <Target className="h-3.5 w-3.5" aria-hidden="true" />
                            Purpose
                          </p>
                          <p className="mt-1 text-[13px] leading-relaxed text-slate-700 dark:text-slate-200">
                            {item.purpose}
                          </p>
                        </div>
                        <div>
                          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                            <CheckCircle2
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                            Key benefit
                          </p>
                          <p className="mt-1 text-[13px] leading-relaxed text-slate-700 dark:text-slate-200">
                            {item.keyBenefit}
                          </p>
                        </div>
                      </div>

                      <div className="mt-auto flex items-center gap-2 pt-5">
                        <button
                          type="button"
                          onClick={() => setActive(item)}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-700 px-4 py-2.5 text-[13.5px] font-bold text-white transition hover:bg-brand-800"
                        >
                          Learn More
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer external"
                          aria-label={`Open the official ${item.name} website in a new tab`}
                          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-brand-300 hover:text-brand-700 dark:border-white/15 dark:text-slate-300"
                        >
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <Alert tone="info" className="mt-10" title="Accuracy note">
            Every description in this section has been written using publicly
            available information from the official Government of India portal of
            the respective initiative. No statistics or claims have been invented.
            Always use the official website or the official app store listing.
          </Alert>
        </Container>
      </Section>

      {/* ================= DETAIL MODAL ================= */}
      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={active ? `${active.name} — full details` : ""}
        subtitle={active?.tagline}
        footer={
          active ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[12.5px] text-slate-500 dark:text-slate-400">
                Official source:{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {active.websiteLabel}
                </span>
              </p>
              <LinkButton href={active.website} external size="md">
                Official Website
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
            </div>
          ) : null
        }
      >
        {active ? (
          <div className="space-y-6">
            <div
              className={`flex items-center gap-3 rounded-2xl bg-gradient-to-r ${active.accent} p-4 text-white`}
            >
              <active.icon className="h-7 w-7 shrink-0" aria-hidden="true" />
              <p className="text-[14px] font-semibold leading-snug">
                {active.keyBenefit}
              </p>
            </div>

            <ModalBlock
              icon={<Lightbulb className="h-4 w-4" />}
              title="What is it?"
            >
              <p>{active.what}</p>
            </ModalBlock>

            <ModalBlock
              icon={<Sparkles className="h-4 w-4" />}
              title="Main features"
              list={active.features}
            />

            <ModalBlock
              icon={<CheckCircle2 className="h-4 w-4" />}
              title="Benefits"
              list={active.benefits}
              tone="green"
            />

            <ModalBlock
              icon={<Workflow className="h-4 w-4" />}
              title="How it works"
              list={active.how}
              numbered
            />

            <ModalBlock
              icon={<ShieldCheck className="h-4 w-4" />}
              title="Safety tips"
              list={active.safety}
              tone="amber"
            />
          </div>
        ) : null}
      </Modal>
    </>
  );
}

function ModalBlock({
  icon,
  title,
  children,
  list,
  numbered,
  tone = "blue",
}: {
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  list?: string[];
  numbered?: boolean;
  tone?: "blue" | "green" | "amber";
}) {
  const accent =
    tone === "green"
      ? "bg-indiagreen-100 text-indiagreen-700 dark:bg-indiagreen-500/15 dark:text-indiagreen-400"
      : tone === "amber"
        ? "bg-saffron-100 text-saffron-600 dark:bg-saffron-500/15 dark:text-saffron-300"
        : "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300";

  return (
    <section>
      <h3 className="flex items-center gap-2.5 font-display text-[15px] font-extrabold text-slate-900 dark:text-white">
        <span
          className={cn(
            "inline-flex h-7 w-7 items-center justify-center rounded-lg",
            accent,
          )}
        >
          {icon}
        </span>
        {title}
      </h3>

      {children ? (
        <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
          {children}
        </p>
      ) : null}

      {list ? (
        <ul className="mt-3 space-y-2">
          {list.map((entry, index) => (
            <li key={entry} className="flex items-start gap-2.5">
              <span
                className={cn(
                  "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold",
                  accent,
                )}
              >
                {numbered ? index + 1 : "✓"}
              </span>
              <span className="text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                {entry}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
