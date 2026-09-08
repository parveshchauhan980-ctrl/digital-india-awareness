import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand-700 text-white shadow-soft hover:bg-brand-800 hover:shadow-lift active:bg-brand-900",
  secondary:
    "bg-saffron-500 text-white shadow-soft hover:bg-saffron-600 active:bg-saffron-600",
  outline:
    "border border-brand-200 bg-white text-brand-800 hover:border-brand-400 hover:bg-brand-50 dark:border-white/15 dark:bg-white/5 dark:text-brand-100 dark:hover:border-brand-400/60 dark:hover:bg-white/10",
  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-brand-800 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
  success: "bg-indiagreen-600 text-white hover:bg-indiagreen-700",
};

const SIZES: Record<Size, string> = {
  sm: "px-3.5 py-2 text-[13px] gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-[15px] gap-2.5",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children?: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", fullWidth, className, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold tracking-tight transition-all duration-200",
        "disabled:cursor-not-allowed disabled:opacity-55",
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
};

export function LinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
  fullWidth,
  ariaLabel,
}: LinkButtonProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold tracking-tight transition-all duration-200",
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full",
        className,
      )}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer external" }
        : {})}
    >
      {children}
    </a>
  );
}
