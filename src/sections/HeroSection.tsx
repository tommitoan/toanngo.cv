import { portfolio } from "../content/portfolio";
import { Reveal } from "../components/Reveal";

export function HeroSection() {
  return (
    <section id="home" className="section-shell pb-14 pt-4 md:pb-20 md:pt-10">
      <div className="grid min-h-[calc(100vh-9rem)] gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <Reveal className="relative pl-8 md:pl-14">
          <div className="absolute left-0 top-6 h-[18rem] w-px bg-gradient-to-b from-violet via-violet/50 to-transparent md:left-4" />
          <div className="absolute left-[-7px] top-0 h-4 w-4 rounded-full bg-violet shadow-glow md:left-0" />

          <span className="eyebrow">{portfolio.hero.eyebrow}</span>
          <h1 className="mt-4 text-6xl font-extrabold leading-[0.9] tracking-[-0.06em] text-white sm:text-7xl md:text-[6.5rem]">
            {portfolio.hero.lead} <span className="accent-text">{portfolio.hero.name}</span>
          </h1>
          <p className="mt-5 max-w-3xl text-2xl font-semibold leading-tight text-slate-200 md:text-[2rem]">
            {portfolio.hero.role}
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{portfolio.hero.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {portfolio.hero.highlights.map((highlight) => (
              <span key={highlight} className="pill">
                {highlight}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            {portfolio.hero.ctas.map((cta) => (
              <a
                key={cta.label}
                href={cta.href}
                target={cta.href.startsWith("http") ? "_blank" : undefined}
                rel={cta.href.startsWith("http") ? "noreferrer" : undefined}
                className={cta.variant === "primary" ? "gradient-button" : "ghost-button"}
              >
                {cta.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal className="grid gap-4 lg:pl-8" delay={0.1}>
          {portfolio.hero.metrics.map((metric, index) => (
            <article
              key={metric.label}
              className="panel rounded-[1.75rem] px-6 py-5 transition hover:border-violet/40 hover:shadow-glow"
            >
              <p className="soft-caption">Highlight 0{index + 1}</p>
              <div className="mt-3 text-4xl font-bold leading-none text-white">{metric.value}</div>
              <p className="mt-4 text-base leading-7 text-slate-300">{metric.label}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
