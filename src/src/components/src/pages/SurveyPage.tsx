import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  MessageSquareHeart,
  RotateCcw,
  Save,
} from "lucide-react";
import {
  AGE_GROUPS,
  OCCUPATIONS,
  SURVEY_QUESTIONS,
  YES_NO_SOMETIMES,
  type SurveySubmission,
} from "@/data/survey";
import { GOOGLE_FORM_URL, STORAGE_KEYS } from "@/data/project";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Container, PageHeader, Section } from "@/components/ui/Section";
import { Button, LinkButton } from "@/components/ui/Button";
import {
  RadioGroup,
  SelectInput,
  TextArea,
  TextInput,
} from "@/components/ui/Field";
import { Alert, Spinner } from "@/components/ui/Feedback";

type Errors = Record<string, string>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export function SurveyPage() {
  const [submissions, setSubmissions] = useLocalStorage<SurveySubmission[]>(
    STORAGE_KEYS.surveyResponses,
    [],
  );

  const [fullName, setFullName] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [occupation, setOccupation] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<SurveySubmission | null>(null);

  const hasGoogleForm = GOOGLE_FORM_URL.trim().length > 0;

  const totalFields = useMemo(
    () => 4 + SURVEY_QUESTIONS.filter((q) => q.required).length,
    [],
  );
  const filledFields = useMemo(() => {
    const answerCount = SURVEY_QUESTIONS.filter(
      (q) => q.required && answers[q.id],
    ).length;
    return (
      answerCount +
      (fullName.trim() ? 1 : 0) +
      (ageGroup ? 1 : 0) +
      (occupation ? 1 : 0) +
      (email.trim() ? 1 : 0)
    );
  }, [answers, fullName, ageGroup, occupation, email]);

  const completion = Math.round((filledFields / totalFields) * 100);

  /** Records an answer and clears that field's error once it is filled. */
  const setAnswer = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (value) {
      setErrors((prev) => {
        if (!prev[id]) return prev;
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (fullName.trim().length < 3)
      next.fullName = "Please enter your full name (at least 3 characters).";
    if (!ageGroup) next.ageGroup = "Please select your age group.";
    if (!occupation) next.occupation = "Please select your occupation.";
    if (email.trim() && !EMAIL_PATTERN.test(email.trim()))
      next.email = "Please enter a valid e-mail address, or leave it blank.";
    SURVEY_QUESTIONS.forEach((question) => {
      if (question.required && !answers[question.id])
        next[question.id] = "Please choose an option.";
    });
    return next;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0];
      const element = document.getElementById(firstKey);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
      element?.focus({ preventScroll: true });
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      const record: SurveySubmission = {
        id: `SUR-${Date.now().toString(36).toUpperCase()}`,
        submittedAt: new Date().toLocaleString(),
        fullName: fullName.trim(),
        ageGroup,
        occupation,
        email: email.trim(),
        answers,
      };
      setSubmissions((prev) => [record, ...prev].slice(0, 50));
      setSubmitted(record);
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 700);
  };

  const clearError = (key: string) =>
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const resetForm = () => {
    setFullName("");
    setAgeGroup("");
    setOccupation("");
    setEmail("");
    setAnswers({});
    setErrors({});
    setSubmitted(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <PageHeader
        eyebrow="Survey"
        eyebrowIcon={MessageSquareHeart}
        title="Digital India Awareness Survey"
        description="Your responses help measure how aware people in our community are about Digital India services and online safety. All answers are stored only on your own device for this project."
      />

      <Section>
        <Container>
          {hasGoogleForm ? (
            <div className="reveal mb-8 overflow-hidden rounded-3xl border border-brand-200 bg-white shadow-soft dark:border-brand-400/25 dark:bg-white/[0.03]">
              <div className="grid gap-0 md:grid-cols-5">
                <div className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 p-6 text-white md:col-span-3 md:p-8">
                  <span
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-14 -left-6 h-40 w-40 rounded-full bg-saffron-400/20"
                  />
                  <span className="relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                    <MessageSquareHeart className="h-3.5 w-3.5" aria-hidden="true" />
                    Official survey form
                  </span>
                  <h2 className="relative mt-4 font-display text-2xl font-extrabold leading-tight sm:text-[1.7rem]">
                    Take the survey on Google Forms
                  </h2>
                  <p className="relative mt-3 max-w-lg text-[14px] leading-relaxed text-brand-100">
                    Your response is collected on the official Google Form linked
                    to this project. It only takes 2 – 3 minutes and every answer
                    helps measure Digital India awareness in our community.
                  </p>
                  <div className="relative mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <LinkButton
                      href={GOOGLE_FORM_URL}
                      external
                      variant="secondary"
                      size="lg"
                      ariaLabel="Open the Digital India awareness survey on Google Forms in a new tab"
                    >
                      Open the Google Form
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </LinkButton>
                    <p className="text-[12px] text-brand-100">
                      Opens in a new tab • docs.google.com
                    </p>
                  </div>
                </div>

                <div className="p-6 md:col-span-2 md:p-7">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
                    Why two versions?
                  </p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                    The Google Form is the primary survey submitted for this CEP.
                    The form on this page is a backup that saves your answers
                    locally, so you can still record a response if the internet is
                    slow or Google Forms is not available.
                  </p>
                  <ul className="mt-4 space-y-2 text-[13px] text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-indiagreen-600 dark:text-indiagreen-400"
                        aria-hidden="true"
                      />
                      Same 10 questions as below
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-indiagreen-600 dark:text-indiagreen-400"
                        aria-hidden="true"
                      />
                      Anonymous — no login required
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-indiagreen-600 dark:text-indiagreen-400"
                        aria-hidden="true"
                      />
                      Responses go directly to the project team
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : null}

          {submitted ? (
            <div className="mx-auto max-w-3xl">
              <div className="animate-fade-up overflow-hidden rounded-3xl border border-indiagreen-200 bg-white shadow-soft dark:border-indiagreen-400/25 dark:bg-white/[0.03]">
                <div className="bg-gradient-to-br from-indiagreen-600 to-indiagreen-700 p-8 text-center text-white sm:p-10">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30">
                    <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-extrabold sm:text-3xl">
                    Survey submitted successfully
                  </h2>
                  <p className="mx-auto mt-3 max-w-xl text-[14.5px] leading-relaxed text-indiagreen-50">
                    Thank you, {submitted.fullName}. Your response has been recorded
                    on this device and will be included in this Community Engagement
                    Project's awareness findings.
                  </p>
                </div>

                <div className="p-7 sm:p-9">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <DetailRow label="Reference number" value={submitted.id} />
                    <DetailRow label="Submitted on" value={submitted.submittedAt} />
                    <DetailRow label="Age group" value={submitted.ageGroup} />
                    <DetailRow label="Occupation" value={submitted.occupation} />
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-white/10 dark:bg-white/[0.02]">
                    <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                      Your responses
                    </p>
                    <ul className="mt-3 space-y-2">
                      {SURVEY_QUESTIONS.map((question) => (
                        <li
                          key={question.id}
                          className="flex flex-col gap-0.5 border-b border-slate-200 pb-2 last:border-0 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                        >
                          <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-200">
                            {question.label}
                          </span>
                          <span className="text-[13px] font-bold text-brand-700 dark:text-brand-300">
                            {submitted.answers[question.id] || "—"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button onClick={resetForm} fullWidth>
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      Fill another response
                    </Button>
                    <LinkButton href="#/contact" variant="outline" fullWidth>
                      Send project feedback
                    </LinkButton>
                  </div>

                  {submissions.length > 1 ? (
                    <p className="mt-4 text-center text-[12.5px] text-slate-500 dark:text-slate-400">
                      {submissions.length} responses saved on this device for this
                      project.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mx-auto max-w-3xl"
            >
              {/* Progress */}
              <div className="reveal mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center justify-between text-[12.5px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-2">
                    <ClipboardList className="h-4 w-4" aria-hidden="true" />
                    Form progress
                  </span>
                  <span>{completion}% complete</span>
                </div>
                <div
                  className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
                  role="progressbar"
                  aria-valuenow={completion}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Survey completion"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-600 to-indiagreen-600 transition-all duration-500"
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </div>

              {/* Respondent details */}
              <fieldset className="reveal rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-7 dark:border-white/10 dark:bg-white/[0.03]">
                <legend className="px-2 font-display text-[15px] font-extrabold text-slate-900 dark:text-white">
                  Respondent details
                </legend>
                <div className="mt-3 grid gap-5 sm:grid-cols-2">
                  <TextInput
                    id="fullName"
                    label="Full Name"
                    required
                    placeholder="Enter your full name"
                    value={fullName}
                    autoComplete="name"
                    onChange={(event) => {
                      setFullName(event.target.value);
                      if (event.target.value.trim().length >= 3)
                        clearError("fullName");
                    }}
                    error={errors.fullName}
                    success={fullName.trim().length >= 3 ? "Looks good" : undefined}
                  />
                  <SelectInput
                    id="ageGroup"
                    label="Age Group"
                    required
                    placeholder="Select your age group"
                    options={AGE_GROUPS}
                    value={ageGroup}
                    onChange={(event) => {
                      setAgeGroup(event.target.value);
                      if (event.target.value) clearError("ageGroup");
                    }}
                    error={errors.ageGroup}
                  />
                  <SelectInput
                    id="occupation"
                    label="Occupation"
                    required
                    placeholder="Select your occupation"
                    options={OCCUPATIONS}
                    value={occupation}
                    onChange={(event) => {
                      setOccupation(event.target.value);
                      if (event.target.value) clearError("occupation");
                    }}
                    error={errors.occupation}
                  />
                  <TextInput
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    autoComplete="email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (EMAIL_PATTERN.test(event.target.value.trim()))
                        clearError("email");
                    }}
                    error={errors.email}
                  />
                </div>
              </fieldset>

              {/* Questions */}
              <div className="mt-6 space-y-5">
                {SURVEY_QUESTIONS.map((question, index) => (
                  <div
                    key={question.id}
                    id={question.id}
                    tabIndex={-1}
                    className="reveal rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    {question.type === "choice" ? (
                      <RadioGroup
                        legend={question.label}
                        name={question.id}
                        required={question.required}
                        options={question.options ?? YES_NO_SOMETIMES}
                        value={answers[question.id] ?? ""}
                        onChange={(value) => setAnswer(question.id, value)}
                        error={errors[question.id]}
                      />
                    ) : (
                      <>
                        <TextArea
                          id={`q-${question.id}`}
                          label={question.label}
                          placeholder="Share your suggestions — for example, what would help people in your area use digital services confidently?"
                          value={answers[question.id] ?? ""}
                          maxLength={600}
                          onChange={(event) =>
                            setAnswers((prev) => ({
                              ...prev,
                              [question.id]: event.target.value,
                            }))
                          }
                        />
                        <p className="mt-1.5 text-right text-[11.5px] text-slate-400 dark:text-slate-500">
                          {(answers[question.id] ?? "").length}/600 characters
                        </p>
                      </>
                    )}
                    {index === 5 ? (
                      <p className="mt-4 rounded-xl bg-brand-50 p-3 text-[12.5px] leading-relaxed text-brand-800 dark:bg-brand-500/10 dark:text-brand-200">
                        Phishing means a fake message, e-mail or website that pretends
                        to be genuine in order to steal your details.
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="reveal mt-7 space-y-4">
                <Alert tone="info" title="Your privacy">
                  This form does not send data to any server. Responses are saved in
                  your browser's local storage so they can be shown during a project
                  demonstration. Clearing your browser data will remove them.
                </Alert>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Spinner />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" aria-hidden="true" />
                        Submit Survey
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={resetForm}
                    disabled={submitting}
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    Clear form
                  </Button>
                </div>

                {Object.keys(errors).length > 0 ? (
                  <Alert tone="error" title="Please complete the highlighted fields">
                    {Object.keys(errors).length} field
                    {Object.keys(errors).length > 1 ? "s" : ""} still need your
                    attention. Fields marked with * are required.
                  </Alert>
                ) : null}
              </div>
            </form>
          )}
        </Container>
      </Section>
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.02]">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-[14px] font-semibold text-slate-800 dark:text-slate-100">
        {value}
      </p>
    </div>
  );
}
