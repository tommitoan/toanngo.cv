import { portfolio } from "./content/portfolio";
import { SiteHeader } from "./components/SiteHeader";
import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";

function App() {
  return (
    <div className="min-h-screen bg-midnight text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="starfield starfield-far" />
        <div className="starfield starfield-mid" />
        <div className="starfield starfield-near" />
        <div className="wave-field wave-field-left" />
        <div className="wave-field wave-field-right" />
        <div className="absolute left-1/2 top-[-10rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-violet/10 blur-[140px]" />
      </div>

      <SiteHeader items={portfolio.navigation} />

      <main className="flex flex-col gap-16 pb-16 pt-20 md:gap-24 md:pt-22">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <footer className="section-shell border-t border-white/10 py-8 text-sm text-slate-400">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>{portfolio.footer.note}</p>
          <p>{portfolio.footer.meta}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
