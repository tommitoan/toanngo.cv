import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { portfolio } from "../content/portfolio";

export function SkillsSection() {
  return (
    <section id="skills" className="section-shell">
      <Reveal>
        <SectionHeading
          eyebrow="Technical proficiencies"
          title="Skills."
          description="A visual honeycomb representing my core technologies and toolset."
        />
      </Reveal>

      <div className="mt-12 space-y-16">
        {portfolio.skills.map((group, index) => (
          <Reveal key={group.title} delay={0.08 * (index + 1)}>
            <div className="mx-auto max-w-5xl">
              <div className="mb-8 flex items-center justify-between gap-4 border-b border-white/5 pb-4">
                <p className="text-xl font-medium text-violet">{group.label}</p>
                <h3 className="text-right text-lg font-medium uppercase tracking-[0.22em] text-slate-500">
                  {group.title}
                </h3>
              </div>

              <div className="honeycomb-grid">
                <div className="honeycomb-row">
                  {group.items.slice(0, 3).map((item) => (
                    <div
                      key={item.name}
                      title={item.name}
                      className="hexagon"
                    >
                      {item.icon ? (
                        <img
                          src={item.icon}
                          alt={item.name}
                          draggable="false"
                        />
                      ) : (
                        <span className="relative z-20 text-sm font-semibold text-white">{item.name}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="honeycomb-row staggered-row">
                  {group.items.slice(3, 5).map((item) => (
                    <div
                      key={item.name}
                      title={item.name}
                      className="hexagon"
                    >
                      {item.icon ? (
                        <img
                          src={item.icon}
                          alt={item.name}
                          draggable="false"
                        />
                      ) : (
                        <span className="relative z-20 text-sm font-semibold text-white">{item.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
