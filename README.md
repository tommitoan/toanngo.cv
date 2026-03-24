# toanngo.cv

Personal portfolio of **Toan Ngo** — Go backend engineer.

**Live site: [toanngo.cv](https://toanngo.cv/)**

> 100% vibe-coded with [OpenCode](https://opencode.ai) AI coding agent.

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| 3D (reference only) | Three.js / React Three Fiber |
| Package manager | pnpm |

---

## Sections

- **Hero** — split-screen layout with animated orbit skill showcase
- **About** — intro, engineering principles, and action links
- **Skills** — grouped accent-colored chip grid
- **Experience** — Mercury Studio and GTG Software timeline
- **Projects** — bazica open-source library and homelab GitOps setup
- **Education** — AWS Certified SAA + B.Sc. Computer Science
- **Contact** — email, GitHub, LinkedIn

---

## Getting started

**Requirements:** Node.js 20+, pnpm 10+

```bash
pnpm install       # install dependencies
pnpm dev           # start local dev server
pnpm build         # production build → dist/
pnpm preview       # preview production build locally
```

---

## Project structure

```
toanngo.cv/
├── public/                  # static assets (resume PDF, images)
├── src/
│   ├── components/
│   │   ├── hero-showcase/   # orbit scene — config, layers, nodes, cycle hook
│   │   └── ...              # shared UI components
│   ├── content/
│   │   └── portfolio.ts     # single source of truth for all content
│   ├── sections/            # one file per page section
│   ├── App.tsx
│   ├── index.css            # global styles + Tailwind layers
│   └── main.tsx
├── docs/                    # architecture notes, change logs, roadmap
├── index.html
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## Updating content

All personal content lives in one file:

```
src/content/portfolio.ts
```

It controls: navigation labels, hero text, about copy, skill groups, experience entries, project cards, education items, contact links, and footer text.

---

## Updating the design

| What to change | Where |
|----------------|-------|
| Global colors, typography, component classes | `src/index.css` |
| Section layout and markup | `src/sections/` |
| Hero orbit behavior and sizing | `src/components/hero-showcase/config.ts` |

---

## Deployment

Static site — deploy the `dist/` folder to any static host:

- [Cloudflare Pages](https://pages.cloudflare.com)
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)

```bash
pnpm build
# upload dist/ to your host
```

---

## Documentation

Detailed notes live under `docs/` — see [`docs/README.md`](docs/README.md) for the full index.

---

## About this project

Built and iterated entirely through AI-assisted development using **OpenCode** — from initial scaffold through visual design, orbit animation architecture, content migration, and refinement. Every line of code in this repository was written in an OpenCode session.

---

## License

[MIT](./LICENSE) © 2026 Toan Ngo
