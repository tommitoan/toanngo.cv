import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { portfolio } from "../content/portfolio";

export function ProjectsSection() {
  return (
    <section id="projects" className="section-shell py-12 md:py-16">
      <Reveal>
        <SectionHeading
          eyebrow="Innovative creations"
          title="Projects."
          description="The card composition now follows the reference more closely: darker preview blocks, stronger titles, and a clearer visual hierarchy inside each project."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {portfolio.projects.map((project, index) => (
          <Reveal
            key={project.name}
            className="panel group flex h-full flex-col rounded-[1.5rem] p-5 transition hover:border-violet/40 hover:shadow-glow"
            delay={0.08 * (index + 1)}
          >
            <div className="project-preview relative overflow-hidden rounded-[1.2rem] p-5">
              <div className="absolute inset-x-6 top-4 h-2 rounded-full bg-white/5" />
              <div className="mt-8 rounded-[1rem] border border-violet/10 bg-[#0b1021]/90 p-5">
                <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Project 0{index + 1}</div>
                <div className="mt-3 text-2xl font-bold leading-tight text-white">{project.name}</div>
                <div className="mt-3 text-sm text-violet">{project.stack.join(" • ")}</div>
              </div>
            </div>

            <h3 className="mt-6 text-3xl font-bold leading-tight text-white">{project.name}</h3>
            <p className="mt-4 text-base leading-7 text-slate-300">{project.summary}</p>
            <p className="mt-4 text-base leading-7 text-slate-200">{project.impact}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="pill">
                  {item}
                </span>
              ))}
            </div>

            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-fit rounded-lg bg-black/70 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5"
            >
              Live Project
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
