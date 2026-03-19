import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { portfolio } from "../content/portfolio";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-shell">
      <Reveal>
        <SectionHeading
          eyebrow="Professional path"
          title="Journey."
          description="The timeline keeps the same center-line energy as the reference screenshots, but stays simple enough to edit without bringing in a specialized timeline library."
        />
      </Reveal>

      <div className="relative mt-12 space-y-8">
        <div className="section-divider" />
        {portfolio.experience.map((item, index) => (
          <Reveal
            key={`${item.period}-${item.title}`}
            className="relative md:grid md:grid-cols-2 md:gap-8"
            delay={0.08 * (index + 1)}
          >
            <div
              className={`mb-4 flex items-center gap-4 md:mb-0 ${index % 2 === 0 ? "md:justify-end md:pr-10" : "md:order-2 md:pl-10"
                }`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-[#0f1430] text-sm font-semibold text-violet shadow-glow">
                {item.period}
              </span>
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
                Step {index + 1}
              </p>
            </div>

            <article
              className={`panel rounded-[1.75rem] border-b-2 border-b-slate-200/70 p-6 md:p-7 ${index % 2 === 0 ? "md:ml-10" : "md:mr-10 md:order-1"
                }`}
            >
              <p className="text-lg font-medium text-slate-300">{item.company}</p>
              <h3 className="mt-2 text-3xl font-bold leading-tight text-white">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-300">{item.summary}</p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
