# Frontend SPA Architecture

## Goal

Build a lean personal portfolio SPA inspired by the structure and polish of the reference site without copying its implementation details or heavier visual stack.

## Chosen stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

## Why this stack

- `React + Vite`: fast local iteration and minimal overhead for a static one-page portfolio
- `TypeScript`: keeps the content model and section props explicit as the site grows
- `Tailwind CSS`: quick responsive layout and reliable utility-based styling
- `Framer Motion`: enough animation capability for section reveals and subtle interaction polish

## Intentional exclusions for v1

- No `three.js` or `@react-three/fiber`
- No slider library
- No router
- No contact form integration

These stay out of the first version to keep the codebase small and the first delivery easy to maintain.

## Source of truth

Portfolio content is centralized in `src/content/portfolio.ts`.

That file controls:

- navigation labels
- hero copy
- about text
- skill groups
- experience timeline entries
- project cards
- contact links

## Layout sections

- Hero
- About
- Skills
- Experience
- Projects
- Contact

## Upgrade path

Future iterations can add:

- richer motion choreography
- a custom cursor or hover system
- a premium hero treatment
- case-study pages
- CMS or markdown content
- contact form handling

