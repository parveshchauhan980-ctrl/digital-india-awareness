import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { RouterProvider, useLocation } from "@/hooks/useRouter";
import { useReveal } from "@/hooks/useReveal";
import { useTheme } from "@/hooks/useTheme";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { ProjectPage } from "@/pages/ProjectPage";
import { InitiativesPage } from "@/pages/InitiativesPage";
import { BenefitsPage } from "@/pages/BenefitsPage";
import { HowItWorksPage } from "@/pages/HowItWorksPage";
import { DigitalSafetyPage } from "@/pages/DigitalSafetyPage";
import { QuizPage } from "@/pages/QuizPage";
import { SurveyPage } from "@/pages/SurveyPage";
import { ContactPage } from "@/pages/ContactPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

const PAGE_TITLES: Record<string, string> = {
  home: "Awareness Program on Digital India Initiatives",
  about: "About Digital India",
  project: "Project Details",
  initiatives: "Digital India Initiatives",
  benefits: "Benefits of Digital Services",
  "how-it-works": "How It Works — Step-by-step Guides",
  "digital-safety": "Stay Safe Online",
  quiz: "Digital India Awareness Quiz",
  survey: "Digital India Awareness Survey",
  contact: "Contact & Feedback",
};

function Routes() {
  const { route } = useLocation();
  useReveal();

  useEffect(() => {
    const suffix = " | Digital India Awareness Portal";
    document.title = route
      ? `${PAGE_TITLES[route] ?? "Awareness Program on Digital India Initiatives"}${suffix}`
      : `Page not found${suffix}`;
  }, [route]);

  switch (route) {
    case "home":
      return <HomePage />;
    case "about":
      return <AboutPage />;
    case "project":
      return <ProjectPage />;
    case "initiatives":
      return <InitiativesPage />;
    case "benefits":
      return <BenefitsPage />;
    case "how-it-works":
      return <HowItWorksPage />;
    case "digital-safety":
      return <DigitalSafetyPage />;
    case "quiz":
      return <QuizPage />;
    case "survey":
      return <SurveyPage />;
    case "contact":
      return <ContactPage />;
    default:
      return <NotFoundPage />;
  }
}

function Shell() {
  const { isDark, toggleTheme } = useTheme();
  const { route } = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f9fd] transition-colors duration-300 dark:bg-[#070c17]">
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
      <main id="main-content" key={route ?? "not-found"} className="flex-1">
        <Routes />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <Shell />
    </RouterProvider>
  );
}
