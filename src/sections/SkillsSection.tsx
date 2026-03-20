import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { portfolio } from "../content/portfolio";

const ACCENT_MAP: Record<string, { border: string; bg: string; glow: string; text: string }> = {
  violet: {
    border: "border-violet/30",
    bg: "bg-violet/8",
    glow: "hover:shadow-[0_0_20px_rgba(145,94,255,0.25)]",
    text: "text-violet",
  },
  cyan: {
    border: "border-cyan-400/30",
    bg: "bg-cyan-400/8",
    glow: "hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]",
    text: "text-cyan-400",
  },
  pink: {
    border: "border-pink-400/30",
    bg: "bg-pink-400/8",
    glow: "hover:shadow-[0_0_20px_rgba(244,114,182,0.25)]",
    text: "text-pink-400",
  },
};

export function SkillsSection() {
  return (
    <section id="skills" className="section-shell">
      <Reveal>
        <SectionHeading
          eyebrow="Technical proficiencies"
          title={<span className="gradient-text-blue-purple">Skills.</span>}
          description="Core technologies and tools I use to build, ship, and operate production systems."
        />
      </Reveal>

      <div className="mx-auto mt-12 max-w-4xl space-y-6">
        {portfolio.skills.map((group, groupIndex) => {
          const accent = ACCENT_MAP[group.accent] ?? ACCENT_MAP.violet;

          return (
            <Reveal key={group.title} delay={0.08 * (groupIndex + 1)}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                {/* Group label */}
                <h3 className={`shrink-0 text-sm font-semibold uppercase tracking-[0.22em] ${accent.text} sm:w-32 sm:text-right`}>
                  {group.title}
                </h3>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className={`
                        skill-chip group flex items-center gap-2.5 rounded-xl border
                        ${accent.border} ${accent.bg} ${accent.glow}
                        px-3.5 py-2.5 transition-all duration-300 hover:-translate-y-0.5
                      `}
                    >
                      {item.icon ? (
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="h-6 w-6 object-contain"
                          draggable="false"
                        />
                      ) : (
                        <span className={`flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold ${accent.text} ${accent.bg}`}>
                          ✦
                        </span>
                      )}
                      <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
