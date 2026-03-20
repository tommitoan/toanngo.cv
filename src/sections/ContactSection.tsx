import { Reveal } from "../components/Reveal";
import { portfolio } from "../content/portfolio";

export function ContactSection() {
  return (
    <section id="contact" className="section-shell">
      <Reveal className="panel-strong rounded-[2rem] px-6 py-10 md:px-10 md:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="eyebrow">Contact</span>
            <h2 className="section-title mt-2">
              Let's build something{" "}
              <span className="gradient-text-primary">reliable</span>
            </h2>
            <p className="section-copy mt-4">
              Based in Ho Chi Minh City, focused on backend engineering,
              cloud infrastructure, and product-oriented system design.
              If you want to discuss a role or a project, these are the fastest ways to reach me.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {portfolio.contact.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="group rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-5 py-5 text-left transition hover:border-violet/40 hover:bg-white/[0.06]"
              >
                <p className="soft-caption">{link.label}</p>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <span className="text-base text-white md:text-lg">{link.value}</span>
                  <span className="text-sm text-violet transition group-hover:translate-x-1">Open</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
