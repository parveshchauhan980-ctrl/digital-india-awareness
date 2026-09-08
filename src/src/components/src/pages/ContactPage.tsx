import { useState } from "react";
import {
  BookOpenCheck,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquareHeart,
  Send,
  UserRound,
} from "lucide-react";
import { OFFICIAL_SOURCES, STORAGE_KEYS } from "@/data/project";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useProjectDetails } from "@/hooks/useProjectDetails";
import { Container, PageHeader, Section, SectionHeading } from "@/components/ui/Section";
import { Button, LinkButton } from "@/components/ui/Button";
import { TextArea, TextInput } from "@/components/ui/Field";
import { Alert, Spinner } from "@/components/ui/Feedback";
import { CollegeLogo } from "@/components/CollegeLogo";

type FeedbackRecord = {
  id: string;
  submittedAt: string;
  name: string;
  email: string;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export function ContactPage() {
  const { details: project } = useProjectDetails();
  const [records, setRecords] = useLocalStorage<FeedbackRecord[]>(
    STORAGE_KEYS.feedback,
    [],
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 3)
      next.name = "Please enter your name (at least 3 characters).";
    if (!EMAIL_PATTERN.test(email.trim()))
      next.email = "Please enter a valid e-mail address.";
    if (message.trim().length < 10)
      next.message = "Please write at least 10 characters so your feedback is useful.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    window.setTimeout(() => {
      setRecords((prev) =>
        [
          {
            id: `FB-${Date.now().toString(36).toUpperCase()}`,
            submittedAt: new Date().toLocaleString(),
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
          },
          ...prev,
        ].slice(0, 30),
      );
      setSent(true);
      setSending(false);
      setName("");
      setEmail("");
      setMessage("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 700);
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact & feedback"
        eyebrowIcon={BookOpenCheck}
        title="Send us your feedback"
        description="Did this portal help you understand Digital India initiatives better? Tell us what worked, what was unclear, and what should be added."
      />

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Info column */}
            <aside className="lg:col-span-5">
              <div className="reveal overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-start gap-4 bg-gradient-to-br from-brand-700 to-brand-900 p-6 text-white">
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-soft ring-1 ring-white/25">
                    <CollegeLogo className="h-11 w-11" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-display text-lg font-extrabold leading-tight">
                      Project contact
                    </h2>
                    <p className="mt-1 text-[12.5px] text-brand-100">
                      Rajiv Gandhi College · Vashi · Sainath Education Trust
                    </p>
                  </div>
                </div>
                <ul className="divide-y divide-slate-100 dark:divide-white/5">
                  <li className="flex gap-3.5 p-5">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                      <UserRound className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                        Project team ({project.team.length} students)
                      </p>
                      <ul className="mt-1.5 space-y-1.5">
                        {project.team.map((member, index) => (
                          <li
                            key={index}
                            className="flex items-baseline gap-2 text-[13.5px] text-slate-800 dark:text-slate-100"
                          >
                            <span className="font-bold text-brand-700 dark:text-brand-300">
                              {index + 1}.
                            </span>
                            <span className="flex-1 font-semibold">
                              {member.name || (
                                <span className="font-normal italic text-slate-400 dark:text-slate-500">
                                  Add name in Project Details
                                </span>
                              )}
                            </span>
                            {member.rollNumber ? (
                              <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11.5px] font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                                {member.rollNumber}
                              </span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                  <li className="flex gap-3.5 p-5">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                        E-mail
                      </p>
                      <p className="mt-0.5 break-all text-[14px] font-semibold text-slate-800 dark:text-slate-100">
                        {project.contactEmail || (
                          <span className="font-normal italic text-slate-400 dark:text-slate-500">
                            Add your e-mail in Project Details
                          </span>
                        )}
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3.5 p-5">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                      <GraduationCap className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                        Course
                      </p>
                      <p className="mt-0.5 text-[14px] font-semibold text-slate-800 dark:text-slate-100">
                        {project.course}
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3.5 p-5">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                        College
                      </p>
                      <p className="mt-0.5 text-[14px] font-semibold leading-relaxed text-slate-800 dark:text-slate-100">
                        {project.college}
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="border-t border-slate-200 p-5 dark:border-white/10">
                  <LinkButton href="#/project" variant="outline" size="sm" fullWidth>
                    Edit project details
                  </LinkButton>
                </div>
              </div>

              <div className="reveal mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
                <h2 className="font-display text-[15px] font-extrabold text-slate-900 dark:text-white">
                  Official sources
                </h2>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
                  For any doubt about a digital service, always confirm on the
                  official portal:
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {OFFICIAL_SOURCES.slice(0, 6).map((source) => (
                    <li key={source.name}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer external"
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12px] font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
                      >
                        {source.name}
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Form column */}
            <div className="lg:col-span-7">
              {sent ? (
                <div className="animate-fade-up overflow-hidden rounded-3xl border border-indiagreen-200 bg-white shadow-soft dark:border-indiagreen-400/25 dark:bg-white/[0.03]">
                  <div className="bg-gradient-to-br from-indiagreen-600 to-indiagreen-700 p-8 text-center text-white">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30">
                      <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <h2 className="mt-4 font-display text-2xl font-extrabold">
                      Feedback sent successfully
                    </h2>
                    <p className="mx-auto mt-2.5 max-w-md text-[14px] leading-relaxed text-indiagreen-50">
                      Thank you for taking the time to share your feedback. It has
                      been saved on this device and will be reviewed as part of this
                      Community Engagement Project.
                    </p>
                  </div>
                  <div className="p-6">
                    <Button onClick={() => setSent(false)} fullWidth>
                      <MessageSquareHeart className="h-4 w-4" aria-hidden="true" />
                      Send another message
                    </Button>
                    {records.length > 0 ? (
                      <p className="mt-4 text-center text-[12.5px] text-slate-500 dark:text-slate-400">
                        {records.length} feedback message
                        {records.length > 1 ? "s" : ""} saved on this device.
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="reveal rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-7 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <h2 className="font-display text-xl font-extrabold text-slate-900 dark:text-white">
                    Send Feedback
                  </h2>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                    All three fields are required. Your message stays in this browser
                    only.
                  </p>

                  <div className="mt-6 grid gap-5">
                    <TextInput
                      id="contact-name"
                      label="Student / Sender Name"
                      required
                      placeholder="Enter your name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      error={errors.name}
                      success={name.trim().length >= 3 ? "Looks good" : undefined}
                    />
                    <TextInput
                      id="contact-email"
                      label="Email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      error={errors.email}
                      help="Used only to reply to your feedback."
                    />
                    <div>
                      <TextArea
                        id="contact-message"
                        label="Message"
                        required
                        placeholder="Write your feedback, question or suggestion here…"
                        value={message}
                        maxLength={800}
                        onChange={(event) => setMessage(event.target.value)}
                        error={errors.message}
                      />
                      <p className="mt-1.5 text-right text-[11.5px] text-slate-400 dark:text-slate-500">
                        {message.length}/800 characters
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="mt-6"
                    fullWidth
                    disabled={sending}
                  >
                    {sending ? (
                      <>
                        <Spinner />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        Send Feedback
                      </>
                    )}
                  </Button>

                  {Object.keys(errors).length > 0 ? (
                    <Alert tone="error" className="mt-4" title="Please check the form">
                      Some fields need your attention before this message can be sent.
                    </Alert>
                  ) : null}
                </form>
              )}
            </div>
          </div>

          <div className="mt-10">
            <SectionHeading
              eyebrow="Thank you"
              eyebrowIcon={MessageSquareHeart}
              title="Awareness Program on Digital India"
              highlight="Initiatives"
              description="Digital Awareness • Digital Empowerment • Digital India"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
