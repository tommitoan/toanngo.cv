# ToanNgo.cv

Lean personal portfolio SPA built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

This project is the first implementation pass of a static one-page portfolio inspired by the structure and polish of modern engineer portfolios, while staying intentionally lightweight and easy to maintain.

## Project goals

- build a clean and responsive personal portfolio SPA
- keep the first version simple and performant
- make content updates easy from a single source file
- leave room for richer motion and premium visual upgrades later

## Current stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

## Current sections

- Hero
- About
- Skills
- Experience
- Projects
- Contact

## What is included in this first version

- sticky top navigation with anchor links
- responsive one-page layout
- custom visual direction with dark ink background and accent lighting
- light reveal animations
- centralized content in one file
- structured project documentation under `docs/`

## What is intentionally not included yet

- 3D hero or `three.js`
- project detail pages
- CMS integration
- contact form backend
- advanced interaction effects

## Getting started

### Requirements

- Node.js 20+
- pnpm 10+

### Install dependencies

```bash
pnpm install
```

### Start local development

```bash
pnpm dev
```

### Build for production

```bash
pnpm build
```

### Preview the production build

```bash
pnpm preview
```

## Project structure

```text
toanngo.cv/
├── docs/
│   ├── architecture/
│   ├── changes/
│   └── roadmap/
├── src/
│   ├── components/
│   ├── content/
│   ├── sections/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Where to edit

### Update personal content

Edit:

- `src/content/portfolio.ts`

This file controls:

- navigation labels
- hero text
- about content
- skill groups
- experience entries
- project cards
- contact links
- footer text

### Update the design

Edit:

- `src/index.css`
- `src/App.tsx`
- `src/sections/`

Use `src/index.css` for global look and feel, and `src/sections/` for section-specific layout decisions.

## Documentation

Detailed notes live under `docs/` so implementation history and next steps do not clutter the root.

Start here:

- `docs/README.md`
- `docs/architecture/frontend-spa.md`
- `docs/changes/2026-03-19-lean-spa-v1.md`
- `docs/roadmap/next-steps.md`

## Deployment

This project is suitable for static hosting on:

- Vercel
- Netlify
- Cloudflare Pages

Basic deployment flow:

1. install dependencies
2. run `pnpm build`
3. deploy the generated `dist/` folder

## Status

The initial lean SPA version has been scaffolded and verified with:

```bash
pnpm build
```

## Next iteration ideas

- replace placeholder content with real biography and project data
- add resume download link
- refine spacing and copy after real content is added
- improve hero art direction
- add premium motion or interactive visual treatment

## Notes

This project is meant to evolve in layers:

1. get the structure right
2. add real content
3. improve visual identity
4. add higher-end interactions only where they actually help

