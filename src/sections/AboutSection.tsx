import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { portfolio } from "../content/portfolio";

export function AboutSection() {
  return (
    <section id="about" className="section-shell py-12 md:py-16">
      <Reveal>
        <SectionHeading
          eyebrow="Introduction"
          title="Overview."
          description={portfolio.about.intro}
        />
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal className="flex flex-col items-center">
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-violet/20 bg-gradient-to-br from-violet/30 via-[#171c3b] to-[#0b1027] shadow-glow">
            <div className="absolute inset-[14px] rounded-full bg-[#d7dce6]" />
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-b from-slate-200 to-slate-300 text-6xl font-bold text-[#161616]">
              TN
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {portfolio.about.actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target={action.href.startsWith("http") ? "_blank" : undefined}
                rel={action.href.startsWith("http") ? "noreferrer" : undefined}
                className={action.variant === "primary" ? "gradient-button" : "ghost-button"}
              >
                {action.label}
              </a>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-5">
          <Reveal className="panel rounded-[1.75rem] p-6 md:p-8">
            <div className="space-y-5">
              {portfolio.about.points.map((point, index) => (
                <div key={point} className="flex gap-4">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-violet/20 bg-violet/10 text-sm font-semibold text-violet">
                    {index + 1}
                  </span>
                  <p className="text-lg leading-8 text-slate-300">{point}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {portfolio.about.principles.map((principle, index) => (
            <Reveal
              key={principle.title}
              className="panel rounded-[1.5rem] p-6"
              delay={0.08 * (index + 1)}
            >
              <p className="soft-caption">Core strength</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{principle.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-300">{principle.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
