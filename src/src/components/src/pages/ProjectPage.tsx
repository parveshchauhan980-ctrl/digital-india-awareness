import { useEffect, useState } from "react";
import {
  BookMarked,
  Check,
  ClipboardCheck,
  ExternalLink,
  Pencil,
  RotateCcw,
  Users,
  X,
} from "lucide-react";
import {
  OFFICIAL_SOURCES,
  PROJECT_DETAILS,
  PROJECT_TAGLINE,
  type ProjectDetails,
} from "@/data/project";
import { useProjectDetails } from "@/hooks/useProjectDetails";
import { Container, PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { Button, LinkButton } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/Field";
import { Alert } from "@/components/ui/Feedback";
import { CollegeLogo } from "@/components/CollegeLogo";

const EMPTY: ProjectDetails = PROJECT_DETAILS;

export function ProjectPage() {
  const { details: stored, setDetails: setStored } = useProjectDetails();
  const [draft, setDraft] = useState<ProjectDetails>(stored);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(stored);
  }, [stored]);

  const update = (key: keyof ProjectDetails, value: string) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const updateTeamMember = (
    index: 0 | 1 | 2,
    field: "name" | "rollNumber",
    value: string,
  ) =>
    setDraft((prev) => {
      const team = [...prev.team] as ProjectDetails["team"];
      team[index] = { ...team[index], [field]: value };
      return { ...prev, team };
    });

  const save = () => {
    setStored(draft);
    setEditing(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 4000);
  };

  const cancel = () => {
    setDraft(stored);
    setEditing(false);
  };

  const reset = () => {
    setStored(EMPTY);
    setDraft(EMPTY);
  };

  const display = editing ? draft : stored;

  const rows: { key: keyof ProjectDetails; label: string; editable: boolean }[] = [
    { key: "projectTitle", label: "Project", editable: false },
    { key: "projectType", label: "Project Type", editable: false },
    { key: "course", label: "Course", editable: true },
    { key: "college", label: "College", editable: true },
    { key: "facultyGuide", label: "Faculty Guide", editable: true },
    { key: "academicYear", label: "Academic Year", editable: true },
  ];

  const teamSource = editing ? draft.team : stored.team;

  return (
    <>
      <PageHeader
        eyebrow="Project information"
        eyebrowIcon={BookMarked}
        title="Project Details"
        description="Official information about this Community Engagement Project. The personal fields are intentionally left blank — use the Edit button to fill in your own details, which are saved on this device."
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-4xl">
            {saved ? (
              <Alert tone="success" title="Details saved" className="mb-6">
                Your project details have been stored in this browser and will be
                shown every time you open the portal.
              </Alert>
            ) : null}

            {/* College identity crest */}
            <div className="reveal mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-red-50 shadow-soft dark:border-white/10 dark:from-white/[0.03] dark:via-white/[0.03] dark:to-red-500/5">
              <div className="flex flex-col items-center gap-5 p-6 text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left sm:p-7">
                <div className="shrink-0 rounded-2xl bg-white p-3 shadow-soft ring-1 ring-slate-200">
                  <CollegeLogo className="h-24 w-24 sm:h-28 sm:w-28" />
                </div>
                <div className="min-w-0">
                  <p className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-red-700">
                    Sainath Education Trust
                  </p>
                  <h2 className="mt-2 font-display text-xl font-extrabold leading-tight text-slate-900 sm:text-2xl dark:text-white">
                    Rajiv Gandhi College
                  </h2>
                  <p className="text-[13.5px] font-semibold text-slate-600 dark:text-slate-300">
                    of Arts, Commerce &amp; Science · Vashi, Navi Mumbai
                  </p>
                  <p className="mt-2 italic text-[12.5px] text-green-700 dark:text-green-400">
                    “Trust Transforms Life”
                  </p>
                </div>
              </div>
            </div>

            <div className="reveal overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex flex-col gap-4 border-b border-slate-200 bg-gradient-to-r from-brand-700 to-brand-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7 dark:border-white/10">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-1 shadow-soft ring-1 ring-white/25">
                    <CollegeLogo className="h-12 w-12" />
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-extrabold leading-snug sm:text-xl">
                      {display.projectTitle}
                    </h2>
                    <p className="mt-1 text-[12.5px] text-brand-100">
                      {display.projectType}
                    </p>
                  </div>
                </div>
                {!editing ? (
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => setEditing(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-4 py-2.5 text-[13px] font-bold text-white ring-1 ring-white/25 transition hover:bg-white/25"
                    >
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                      Edit details
                    </button>
                  </div>
                ) : null}
              </div>

              <div className="p-6 sm:p-7">
                <dl className="grid gap-5 sm:grid-cols-2">
                  {rows.map((row) => {
                    const value = String(draft[row.key] ?? "");
                    const savedValue = String(stored[row.key] ?? "");
                    return editing && row.editable ? (
                      <div key={row.key} className="sm:col-span-1">
                        <TextInput
                          id={`pd-${row.key}`}
                          label={row.label}
                          value={value}
                          placeholder={
                            row.key === "academicYear"
                              ? "e.g. 2025 – 2026"
                              : `Enter ${row.label.toLowerCase()}`
                          }
                          onChange={(event) => update(row.key, event.target.value)}
                        />
                      </div>
                    ) : (
                      <div
                        key={row.key}
                        className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.02]"
                      >
                        <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
                          {row.label}
                        </dt>
                        <dd className="mt-1.5 text-[14.5px] font-semibold leading-relaxed text-slate-800 dark:text-slate-100">
                          {savedValue || (
                            <span className="font-normal italic text-slate-400 dark:text-slate-500">
                              Not filled in yet — click “Edit details” to add this.
                            </span>
                          )}
                        </dd>
                      </div>
                    );
                  })}
                </dl>

                {editing ? (
                  <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row dark:border-white/10">
                    <Button onClick={save}>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      Save details
                    </Button>
                    <Button variant="outline" onClick={cancel}>
                      <X className="h-4 w-4" aria-hidden="true" />
                      Cancel
                    </Button>
                    <Button variant="ghost" onClick={reset}>
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      Reset to blank
                    </Button>
                  </div>
                ) : null}
              </div>

              <div className="border-t border-slate-200 bg-slate-50/70 px-6 py-5 sm:px-7 dark:border-white/10 dark:bg-white/[0.02]">
                <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Project tagline
                </p>
                <p className="mt-1.5 font-display text-[15px] font-extrabold text-slate-800 dark:text-slate-100">
                  {PROJECT_TAGLINE}
                </p>
              </div>
            </div>

            {/* Team Members */}
            <div className="reveal mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-start gap-4 border-b border-slate-200 bg-gradient-to-r from-saffron-500 to-brand-700 p-6 text-white sm:p-7 dark:border-white/10">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                  <Users className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-display text-lg font-extrabold leading-snug sm:text-xl">
                    Project team members
                  </h2>
                  <p className="mt-1 text-[12.5px] text-white/85">
                    Three students who prepared this Community Engagement Project
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                {editing ? (
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {teamSource.map((member, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.02]"
                      >
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
                          Student {index + 1}
                        </p>
                        <div className="space-y-3">
                          <TextInput
                            id={`team-${index}-name`}
                            label="Full name"
                            value={member.name}
                            placeholder="e.g. Chauhan Kashish"
                            onChange={(event) =>
                              updateTeamMember(
                                index as 0 | 1 | 2,
                                "name",
                                event.target.value,
                              )
                            }
                          />
                          <TextInput
                            id={`team-${index}-roll`}
                            label="Roll number"
                            value={member.rollNumber}
                            placeholder="Enter roll number"
                            onChange={(event) =>
                              updateTeamMember(
                                index as 0 | 1 | 2,
                                "rollNumber",
                                event.target.value,
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {teamSource.map((member, index) => (
                      <article
                        key={index}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift dark:border-white/10 dark:bg-white/[0.03]"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-50 transition group-hover:scale-110 dark:bg-brand-500/10"
                        />
                        <div className="relative flex items-center gap-3">
                          <span
                            className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-extrabold text-white shadow-soft ${
                              index === 0
                                ? "bg-gradient-to-br from-saffron-500 to-saffron-600"
                                : index === 1
                                  ? "bg-gradient-to-br from-brand-600 to-brand-800"
                                  : "bg-gradient-to-br from-indiagreen-600 to-indiagreen-700"
                            }`}
                            aria-hidden="true"
                          >
                            {member.name
                              ? member.name
                                  .split(" ")
                                  .filter(Boolean)
                                  .slice(0, 2)
                                  .map((word) => word[0]?.toUpperCase())
                                  .join("")
                              : "?"}
                          </span>
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
                              Student {index + 1}
                            </p>
                            <p className="mt-0.5 truncate font-display text-[15.5px] font-extrabold text-slate-900 dark:text-white">
                              {member.name || (
                                <span className="font-normal italic text-slate-400 dark:text-slate-500">
                                  Not filled in yet
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="relative mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-3 dark:border-white/10 dark:bg-white/[0.02]">
                          <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                            Roll number
                          </p>
                          <p className="mt-0.5 font-mono text-[13.5px] font-bold text-slate-800 dark:text-slate-100">
                            {member.rollNumber || (
                              <span className="font-sans font-normal italic text-slate-400 dark:text-slate-500">
                                Add roll number
                              </span>
                            )}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {!editing ? (
                  <p className="mt-5 text-[12.5px] text-slate-500 dark:text-slate-400">
                    Click <span className="font-semibold">“Edit details”</span> above
                    to update the team members' names and roll numbers.
                  </p>
                ) : null}
              </div>
            </div>

            {/* Declaration */}
            <div className="reveal mt-6">
              <SectionHeading
                align="left"
                eyebrow="Declaration"
                eyebrowIcon={ClipboardCheck}
                title="How this project was"
                highlight="prepared"
              />
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 text-[13.5px] leading-relaxed text-slate-600 shadow-soft dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300">
                <p>
                  This portal was developed as part of the Community Engagement
                  Project to spread awareness about Digital India initiatives among
                  students and the local community. The content is explanatory and
                  educational. All factual information has been referred from
                  official Government of India portals, and no statistics, schemes
                  or claims have been invented. Links to the official sources are
                  provided so that every statement can be verified independently.
                </p>
              </div>
            </div>

            {/* Official sources */}
            <div className="reveal mt-10">
              <SectionHeading
                align="left"
                eyebrow="References"
                eyebrowIcon={BookMarked}
                title="Official sources"
                highlight="used"
                description="All information in this portal is based on publicly available content from these Government of India portals."
              />
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {OFFICIAL_SOURCES.map((source) => (
                  <li key={source.name}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer external"
                      className="group flex h-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift dark:border-white/10 dark:bg-white/[0.03]"
                    >
                      <ExternalLink
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 transition group-hover:text-brand-800 dark:text-brand-400"
                        aria-hidden="true"
                      />
                      <span className="min-w-0">
                        <span className="block font-display text-[14px] font-extrabold text-slate-900 dark:text-white">
                          {source.name}
                        </span>
                        <span className="block text-[12.5px] text-slate-500 dark:text-slate-400">
                          {source.purpose}
                        </span>
                        <span className="mt-1 block truncate text-[12px] font-semibold text-brand-700 dark:text-brand-300">
                          {source.url.replace(/^https?:\/\//, "")}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="#/contact" size="md">
                  Send feedback about this project
                </LinkButton>
                <LinkButton href="#/about" variant="outline" size="md">
                  Back to About Digital India
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
