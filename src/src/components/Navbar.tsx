import { useEffect, useRef, useState } from "react";
import { Menu, MessageSquareHeart, Moon, Sun, X } from "lucide-react";
import { NAV_ITEMS } from "@/data/navigation";
import { useLocation } from "@/hooks/useRouter";
import { CollegeBadge, Logo, LogoMark } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export function Navbar({
  isDark,
  onToggleTheme,
}: {
  isDark: boolean;
  onToggleTheme: () => void;
}) {
  const { path, route, navigate } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const go = (target: string) => {
    setOpen(false);
    navigate(target);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[120] focus:rounded-lg focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          scrolled
            ? "border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/85"
            : "border-transparent bg-white/70 backdrop-blur-md dark:bg-ink-950/60",
        )}
      >
        <div className="tricolour-bar h-[3px] w-full" aria-hidden="true" />

        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 lg:h-[70px]">
          <button
            type="button"
            onClick={() => go("home")}
            className="flex items-center rounded-xl py-1 pr-2 text-left"
            aria-label="Digital India Awareness — go to home"
          >
            <Logo />
          </button>

          {/* Desktop navigation */}
          <nav aria-label="Main navigation" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const active = route === item.path;
                return (
                  <li key={item.path}>
                    <button
                      type="button"
                      onClick={() => go(item.path)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-lg px-2.5 py-2 text-[13.5px] font-semibold transition-colors lg:px-3",
                        active
                          ? "text-brand-700 dark:text-brand-300"
                          : "text-slate-600 hover:text-brand-700 dark:text-slate-300 dark:hover:text-white",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-brand-600 transition-all duration-300 dark:bg-brand-400",
                          active ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <CollegeBadge className="hidden sm:inline-flex" />

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Light mode" : "Dark mode"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-brand-300 hover:text-brand-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-brand-400/60 dark:hover:text-white"
            >
              {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </button>

            <LinkButton
              href="#/survey"
              size="sm"
              className="hidden sm:inline-flex"
              ariaLabel="Take the Digital India awareness survey"
            >
              <MessageSquareHeart className="h-4 w-4" aria-hidden="true" />
              Take Survey
            </LinkButton>

            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-brand-300 hover:text-brand-700 xl:hidden dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-[60] xl:hidden" id="mobile-menu">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            className="animate-pop absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-white shadow-2xl dark:bg-ink-950"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3.5 dark:border-white/10">
              <div className="flex items-center gap-2">
                <LogoMark className="h-9 w-9" />
                <span className="font-display text-sm font-extrabold text-slate-900 dark:text-white">
                  Digital India Awareness
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex-1 p-3">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const active = route === item.path;
                  return (
                    <li key={item.path}>
                      <button
                        type="button"
                        onClick={() => go(item.path)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[14.5px] font-semibold transition",
                          active
                            ? "bg-brand-50 text-brand-800 dark:bg-brand-500/15 dark:text-brand-200"
                            : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5",
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-[18px] w-[18px] shrink-0",
                            active
                              ? "text-brand-600 dark:text-brand-300"
                              : "text-slate-400 dark:text-slate-500",
                          )}
                          aria-hidden="true"
                        />
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="border-t border-slate-200 p-4 dark:border-white/10">
              <LinkButton href="#/survey" fullWidth size="md">
                <MessageSquareHeart className="h-4 w-4" aria-hidden="true" />
                Take Survey
              </LinkButton>
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/[0.03]">
                <CollegeBadge />
                <p className="min-w-0 text-[11px] font-semibold leading-tight text-slate-600 dark:text-slate-300">
                  <span className="block font-bold text-slate-900 dark:text-white">
                    Rajiv Gandhi College
                  </span>
                  Arts, Commerce &amp; Science · Vashi
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
