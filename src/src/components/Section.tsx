import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  tone = "plain",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "plain" | "muted" | "brand";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-14 sm:py-18 lg:py-20",
        tone === "muted" &&
          "bg-white dark:bg-white/[0.02]",
        tone === "brand" &&
          "bg-gradient-to-b from-brand-50/70 to-transparent dark:from-brand-950/40",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  icon: Icon,
}: {
  children: ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-brand-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700 dark:border-brand-400/25 dark:bg-brand-500/10 dark:text-brand-300">
      {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  eyebrowIcon,
  title,
  highlight,
  description,
  align = "center",
}: {
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "reveal flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
      )}
    >
      {eyebrow ? (
        <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>
      ) : null}
      <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}{" "}
        {highlight ? <span className="text-gradient-brand">{highlight}</span> : null}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-3xl text-[15px] leading-relaxed text-slate-600 sm:text-base dark:text-slate-300",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  eyebrowIcon,
  title,
  description,
  children,
}: {
  eyebrow: string;
  eyebrowIcon?: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-br from-brand-50 via-white to-saffron-50/50 py-12 sm:py-16 dark:border-white/10 dark:from-brand-950/50 dark:via-ink-950 dark:to-ink-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]"
      />
      <Container className="relative">
        <div className="max-w-3xl">
          <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-3xl font-extrabold leading-[1.12] text-slate-900 sm:text-4xl lg:text-[2.75rem] dark:text-white">
            {title}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            {description}
          </p>
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
      </Container>
    </header>
  );
}

export function TricolourRule({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("tricolour-bar h-1 w-24 rounded-full", className)}
    />
  );
}
