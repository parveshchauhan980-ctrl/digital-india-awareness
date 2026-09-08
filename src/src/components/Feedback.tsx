import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Info, ShieldAlert } from "lucide-react";
import { cn } from "@/utils/cn";

type Tone = "success" | "error" | "warning" | "info" | "danger";

const TONES: Record<Tone, string> = {
  success:
    "border-indiagreen-200 bg-indiagreen-50 text-indiagreen-700 dark:border-indiagreen-400/30 dark:bg-indiagreen-500/10 dark:text-indiagreen-400",
  error:
    "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-300",
  warning:
    "border-saffron-200 bg-saffron-50 text-saffron-600 dark:border-saffron-400/30 dark:bg-saffron-500/10 dark:text-saffron-300",
  danger:
    "border-rose-300 bg-gradient-to-br from-rose-50 to-white text-rose-700 dark:border-rose-400/40 dark:from-rose-500/10 dark:to-transparent dark:text-rose-200",
  info: "border-brand-200 bg-brand-50 text-brand-800 dark:border-brand-400/30 dark:bg-brand-500/10 dark:text-brand-200",
};

const ICONS = {
  success: CheckCircle2,
  error: AlertTriangle,
  warning: AlertTriangle,
  info: Info,
  danger: ShieldAlert,
} as const;

export function Alert({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: Tone;
  title?: string;
  children?: ReactNode;
  className?: string;
}) {
  const Icon = ICONS[tone];
  return (
    <div
      role={tone === "danger" || tone === "warning" ? "alert" : "status"}
      className={cn(
        "flex gap-3 rounded-2xl border p-4 sm:p-5",
        TONES[tone],
        className,
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        {title ? (
          <p className="font-display text-[15px] font-bold leading-snug">{title}</p>
        ) : null}
        {children ? (
          <div className="mt-1 text-[13.5px] leading-relaxed">{children}</div>
        ) : null}
      </div>
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-14 text-center dark:border-white/15 dark:bg-white/[0.02]">
      <div className="mb-3 text-brand-500 dark:text-brand-300">{icon}</div>
      <p className="font-display text-lg font-bold text-slate-900 dark:text-white">
        {title}
      </p>
      <p className="mt-1.5 max-w-md text-[14px] text-slate-600 dark:text-slate-300">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent",
        className,
      )}
    />
  );
}
