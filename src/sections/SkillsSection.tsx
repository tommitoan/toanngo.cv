import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { portfolio } from "../content/portfolio";

export function SkillsSection() {
  return (
    <section id="skills" className="section-shell py-12 md:py-16">
      <Reveal>
        <SectionHeading
          eyebrow="Technical proficiencies"
          title="Skills."
          description="The reference uses a visual skill wall. This adaptation keeps the grouped feel with lighter-weight hex cards instead of importing a heavy interaction layer."
        />
      </Reveal>

      <div className="mt-12 space-y-12">
        {portfolio.skills.map((group, index) => (
          <Reveal key={group.title} delay={0.08 * (index + 1)}>
            <div className="mx-auto max-w-5xl">
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="text-xl font-medium text-violet">{group.label}</p>
                <h3 className="text-right text-lg font-medium uppercase tracking-[0.22em] text-slate-500">
                  {group.title}
                </h3>
              </div>

              <div className="flex flex-wrap justify-center gap-4 md:gap-5">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="skill-hex flex h-28 w-28 items-center justify-center p-4 text-center text-sm font-semibold text-white transition hover:-translate-y-1 hover:shadow-glow md:h-32 md:w-32 md:text-base"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
