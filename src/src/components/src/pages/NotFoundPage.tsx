import { Compass, Home, Search } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { NAV_ITEMS } from "@/data/navigation";
import { useLocation } from "@/hooks/useRouter";

export function NotFoundPage() {
  const { path, navigate } = useLocation();

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-16">
      <div className="w-full max-w-2xl text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
          <Compass className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="mt-6 font-display text-[72px] font-extrabold leading-none text-gradient-brand sm:text-[92px]">
          404
        </p>
        <h1 className="mt-3 font-display text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
          This page could not be found
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-300">
          The address{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] font-semibold text-brand-700 dark:bg-white/10 dark:text-brand-300">
            #/{path}
          </code>{" "}
          is not part of this portal. Choose a section below to continue exploring
          the Awareness Program on Digital India Initiatives.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <LinkButton href="#/home" size="md">
            <Home className="h-4 w-4" aria-hidden="true" />
            Go to Home
          </LinkButton>
          <LinkButton href="#/initiatives" variant="outline" size="md">
            <Search className="h-4 w-4" aria-hidden="true" />
            Browse initiatives
          </LinkButton>
        </div>

        <nav aria-label="Available pages" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <button
                  type="button"
                  onClick={() => navigate(item.path)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-brand-400/60"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Container>
  );
}
