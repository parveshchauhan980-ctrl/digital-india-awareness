import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/utils/cn";

const baseControl =
  "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 transition placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 disabled:opacity-60 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500";

const okBorder =
  "border-indiagreen-400 dark:border-indiagreen-400/50";
const errBorder =
  "border-rose-400 focus-visible:ring-rose-400/60 dark:border-rose-400/60";
const neutralBorder =
  "border-slate-300 hover:border-brand-300 dark:border-white/15 dark:hover:border-brand-400/50";

export function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor?: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-[13px] font-semibold text-slate-700 dark:text-slate-200"
    >
      {children}
      {required ? (
        <span className="ml-1 text-rose-500" aria-hidden="true">
          *
        </span>
      ) : (
        <span className="ml-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
          optional
        </span>
      )}
    </label>
  );
}

export function HelpText({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "error" | "success";
}) {
  if (!children) return null;
  return (
    <p
      role={tone === "error" ? "alert" : undefined}
      className={cn(
        "mt-1.5 flex items-start gap-1.5 text-[12.5px] leading-snug",
        tone === "error" && "font-medium text-rose-600 dark:text-rose-400",
        tone === "success" &&
          "font-medium text-indiagreen-700 dark:text-indiagreen-400",
        tone === "neutral" && "text-slate-500 dark:text-slate-400",
      )}
    >
      {tone === "error" ? <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" /> : null}
      {tone === "success" ? (
        <CheckCircle2 className="mt-px h-3.5 w-3.5 shrink-0" />
      ) : null}
      {children}
    </p>
  );
}

export function TextInput({
  id,
  label,
  error,
  success,
  help,
  required,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  success?: string;
  help?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          baseControl,
          error ? errBorder : success ? okBorder : neutralBorder,
        )}
        {...props}
      />
      {error ? (
        <HelpText tone="error">{error}</HelpText>
      ) : success ? (
        <HelpText tone="success">{success}</HelpText>
      ) : (
        <HelpText>{help}</HelpText>
      )}
    </div>
  );
}

export function SelectInput({
  id,
  label,
  error,
  required,
  placeholder,
  options,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  options: string[];
}) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <select
        id={id}
        aria-invalid={Boolean(error)}
        className={cn(
          baseControl,
          "appearance-none bg-[length:18px] bg-[right_0.9rem_center] bg-no-repeat pr-10",
          error ? errBorder : neutralBorder,
        )}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        }}
        {...props}
      >
        {placeholder ? (
          <option value="">{placeholder}</option>
        ) : null}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <HelpText tone="error">{error}</HelpText> : null}
    </div>
  );
}

export function TextArea({
  id,
  label,
  error,
  required,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <textarea
        id={id}
        aria-invalid={Boolean(error)}
        className={cn(
          baseControl,
          "min-h-[120px] resize-y leading-relaxed",
          error ? errBorder : neutralBorder,
        )}
        {...props}
      />
      {error ? <HelpText tone="error">{error}</HelpText> : null}
    </div>
  );
}

export function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  required,
}: {
  legend: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <fieldset>
      <legend className="mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-200">
        {legend}
        {required ? (
          <span className="ml-1 text-rose-500" aria-hidden="true">
            *
          </span>
        ) : null}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option;
          return (
            <label
              key={option}
              className={cn(
                "cursor-pointer rounded-xl border px-4 py-2 text-[13px] font-semibold transition",
                active
                  ? "border-brand-600 bg-brand-600 text-white shadow-soft"
                  : "border-slate-300 bg-white text-slate-700 hover:border-brand-400 hover:bg-brand-50 dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-brand-400/60 dark:hover:bg-white/10",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={active}
                onChange={() => onChange(option)}
                className="sr-only"
              />
              {option}
            </label>
          );
        })}
      </div>
      {error ? <HelpText tone="error">{error}</HelpText> : null}
    </fieldset>
  );
}
