import { ExternalLink, GraduationCap, Heart, MapPin } from "lucide-react";
import { FOOTER_LINKS, SECONDARY_ROUTES } from "@/data/navigation";
import { OFFICIAL_SOURCES, PROJECT_TAGLINE } from "@/data/project";
import { useLocation } from "@/hooks/useRouter";
import { useProjectDetails } from "@/hooks/useProjectDetails";
import { Container } from "@/components/ui/Section";
import { Logo } from "@/components/ui/Logo";
import { CollegeLogo } from "@/components/CollegeLogo";

export function Footer() {
  const { navigate } = useLocation();
  const { details } = useProjectDetails();

  const quickResources = OFFICIAL_SOURCES.slice(0, 6);

  return (
    <footer className="relative mt-4 overflow-hidden border-t border-slate-200 bg-gradient-to-b from-slate-50 to-brand-50/60 dark:border-white/10 dark:from-ink-950 dark:to-brand-950/50">
      <div className="tricolour-bar h-[3px] w-full" aria-hidden="true" />
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
              Awareness Program on Digital India Initiatives — a Community
              Engagement Project that explains government digital services,
              digital payments and online safety in simple language.
            </p>
            <p className="mt-4 inline-flex rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-brand-700 dark:border-brand-400/25 dark:bg-white/5 dark:text-brand-300">
              {PROJECT_TAGLINE}
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="lg:col-span-2"
          >
            <h2 className="font-display text-[13px] font-extrabold uppercase tracking-[0.14em] text-slate-900 dark:text-white">
              Portal
            </h2>
            <ul className="mt-4 space-y-2.5">
              {[...FOOTER_LINKS, ...SECONDARY_ROUTES].map((link) => (
                <li key={link.path}>
                  <button
                    type="button"
                    onClick={() => navigate(link.path)}
                    className="text-[13.5px] text-slate-600 transition hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-display text-[13px] font-extrabold uppercase tracking-[0.14em] text-slate-900 dark:text-white">
              Official resources
            </h2>
            <ul className="mt-4 space-y-2.5">
              {quickResources.map((source) => (
                <li key={source.name}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer external"
                    className="group inline-flex items-center gap-1.5 text-[13.5px] text-slate-600 transition hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-300"
                  >
                    {source.name}
                    <ExternalLink
                      className="h-3 w-3 opacity-0 transition group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-display text-[13px] font-extrabold uppercase tracking-[0.14em] text-slate-900 dark:text-white">
              Project
            </h2>

            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-soft dark:border-white/10 dark:bg-white/95">
              <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center">
                <CollegeLogo className="h-16 w-16" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-[12px] font-extrabold leading-tight text-slate-900">
                  Rajiv Gandhi College
                </p>
                <p className="text-[10.5px] font-semibold leading-snug text-slate-500">
                  of Arts, Commerce &amp; Science
                </p>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">
                  Sainath Education Trust
                </p>
              </div>
            </div>

            <ul className="mt-4 space-y-3 text-[13.5px] text-slate-600 dark:text-slate-300">
              <li className="flex gap-2.5">
                <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                <span>
                  {details.course}
                  <span className="block text-[12.5px] text-slate-500 dark:text-slate-400">
                    {details.projectType}
                  </span>
                </span>
              </li>
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                <span>Vashi, Navi Mumbai</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-center sm:flex-row sm:text-left dark:border-white/10">
          <p className="text-[12.5px] text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Awareness Program on Digital India
            Initiatives · Community Engagement Project.
          </p>
          <p className="inline-flex items-center gap-1.5 text-[12.5px] text-slate-500 dark:text-slate-400">
            Built for educational awareness
            <Heart className="h-3.5 w-3.5 text-rose-500" aria-hidden="true" />
            Facts sourced from official Government of India portals.
          </p>
        </div>
      </Container>
    </footer>
  );
}
