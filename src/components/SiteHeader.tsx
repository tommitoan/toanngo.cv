import type { NavigationItem } from "../content/portfolio";

type SiteHeaderProps = {
  items: NavigationItem[];
};

export function SiteHeader({ items }: SiteHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="section-shell mt-4 border-b border-white/5 bg-[#070b19]/78 px-1 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <a href="#home" className="flex min-w-fit items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-violet/30 bg-gradient-to-br from-violet/70 to-cyan/40 shadow-glow">
              <img src="/avatar.png" alt="Toan Ngo" className="h-full w-full object-cover" />
            </span>
            <span className="brand-script text-[2rem] text-white">Toan Ngo</span>
          </a>

          <nav className="flex max-w-full items-center gap-1 overflow-x-auto text-base font-medium text-slate-300 md:gap-4">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-md px-3 py-2 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="/ToanNgo-resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="gradient-button hidden min-w-fit md:inline-flex"
          >
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}
