# Features

## Live features

- reference-inspired dark visual system with purple-blue glow accents
- responsive one-page portfolio structure
- premium split-screen hero with an open intro layout and orbit-style motion layer
- hero showcase is now config-driven, so each orbit can be tuned without editing one large scene file
- reduced-motion fallback for hero animations
- staggered motion, circular orbital tracks, interactive planet nodes, and timed hover labels
- projected HUD-style skill callouts that extend away from the active planet
- shared orbital center alignment for both rings and moving planets
- looped idle showcase mode that flickers all skill HUDs on, holds briefly, then fades them back out
- any in-progress showcase effect is force-hidden immediately when the cursor enters the orbit zone, and the loop only resumes after leaving that zone
- full-page starfield background layered behind the entire site
- overview, skills, journey, projects, and contact sections
- real portfolio content migrated from `tommi-team/me`
- direct resume download link via `public/ToanNgo-resume.pdf`

## Current premium hero details

- orbit-style visual showcase modeled on the `tommi-team/me` hero reference
- icon-only center point with circular orbits and persistent planet markers
- inner and outer orbits are split into reusable layer and node components with a shared cycle hook
- skill labels stay hidden until hover/focus, then appear briefly as a projected higher-tech HUD panel linked to the live planet position
- when idle, every skill panel goes through a staged boot-up flicker before reaching full opacity, then fades back out
- orbit speed, radius, direction, node count, tooltip distance, and showcase placement are configurable from `src/components/hero-showcase/config.ts`
- restored freer intro composition on the left without the boxed hero shell
- full-page starfield and blink effect to keep the background from feeling empty
- no Three.js dependency in the final implementation

## Remaining upgrades

- replace the `TN` avatar placeholder with a real portrait
- replace project preview placeholders with real screenshots
- add deeper project detail views if needed
- add a contact form backend if desired
