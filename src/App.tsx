import { portfolio } from "./content/portfolio";
import { SiteHeader } from "./components/SiteHeader";
import { StarsBackground } from "./components/StarsBackground";
import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";


function App() {
  return (
    <div className="min-h-screen text-slate-100">
      {/* Background image layer — below the stars */}
      <div 
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/bg.png)' }}
      />
      
      {/* Stars only — Three.js canvas positions itself as fixed 100vw/100vh */}
      <StarsBackground />


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
