import { CollegeLogo } from "@/components/CollegeLogo";
import { cn } from "@/utils/cn";

/** Small pill that shows the college crest — used inside the navbar. */
export function CollegeBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft dark:border-white/15 dark:bg-white/95",
        className,
      )}
      title="Rajiv Gandhi College of Arts, Commerce & Science"
      aria-hidden="true"
    >
      <CollegeLogo className="h-9 w-9" />
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-900 shadow-soft",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 40" className="h-6 w-6">
        <g
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.1"
          strokeLinecap="round"
        >
          <circle cx="20" cy="20" r="10.5" />
          <path d="M20 9.5v21M9.5 20h21M12.8 12.8l14.4 14.4M27.2 12.8L12.8 27.2" />
        </g>
        <circle cx="20" cy="20" r="2.6" fill="#fb923c" />
      </svg>
    </span>
  );
}

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="leading-tight">
        <span
          className={cn(
            "block font-display text-[15px] font-extrabold tracking-tight",
            onDark ? "text-white" : "text-slate-900 dark:text-white",
          )}
        >
          Digital India Awareness
        </span>
        <span
          className={cn(
            "block text-[10.5px] font-semibold uppercase tracking-[0.16em]",
            onDark ? "text-brand-200" : "text-brand-600 dark:text-brand-300",
          )}
        >
          Community Engagement Project
        </span>
      </span>
    </span>
  );
}
