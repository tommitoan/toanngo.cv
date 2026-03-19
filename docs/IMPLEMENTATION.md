# Implementation Status

## Current state

The project has moved beyond the initial lean portfolio scaffold.

It now includes:

- real biography, skills, projects, links, and experience data
- a reference-inspired premium visual direction
- a premium orbit-motion hero based on the `tommi-team/me` split hero layout
- structured documentation under `docs/`

## Premium hero implementation

Files involved:

- `src/components/HeroOrbitScene.tsx`
- `src/components/hero-showcase/HeroShowcaseScene.tsx`
- `src/components/hero-showcase/OrbitLayer.tsx`
- `src/components/hero-showcase/OrbitSkillNode.tsx`
- `src/components/hero-showcase/useHeroShowcaseCycle.ts`
- `src/components/hero-showcase/config.ts`
- `src/components/hero-showcase/types.ts`
- `src/sections/HeroSection.tsx`
- `src/index.css`

Technical notes:

- the final hero uses Framer Motion only
- `HeroOrbitScene.tsx` is now only a thin export wrapper, and the real scene is split into a config, a cycle hook, orbit layers, and orbit nodes
- the right-side scene now uses circular orbit trajectories instead of ellipses
- the rings, moving planets, and center icon now share one explicit center anchor to avoid drift between layers
- each orbit item keeps only a visible planet marker by default and reveals a timed projected HUD label on hover or focus
- the projected HUD line and card now derive from the live animated planet position so hover never shifts the orbit node
- after a short idle period, the hero enters a looped all-skills showcase state machine: boot flicker, visible hold, fade out, then idle delay again
- entering the orbit zone cancels the showcase timers completely, and leaving the orbit zone is what restarts the idle cycle
- the orbit zone is now an explicit interaction surface, and entering it force-hides any current showcase HUDs without waiting for an exit animation
- the hero orbit stage now allows overflow so projected labels are not clipped by the original scene box
- the center visual was reduced to a mathematically centered icon and glow only so it no longer masks nearby orbit motion
- reduced-motion users get the same layout with the continuous orbit motion removed
- the left side uses the earlier freeform intro composition instead of a boxed hero shell
- the global background now includes three lightweight twinkling star layers implemented in CSS
- the right hero column width, system offset, stage sizing, and core sizing now come from `heroShowcaseConfig.layout`
- orbit radius, duration, direction, track color, node count, tooltip behavior, and per-node styling now come from `heroShowcaseConfig.orbits`

## Content implementation

Real content is sourced from the existing portfolio project at `/home/ngominhtoan/tommi-team/me`.

The main content file for this SPA remains:

- `src/content/portfolio.ts`

## Verification

After major feature work, the expected verification command is:

```bash
pnpm build
```

## Next likely implementation step

- import real imagery into the overview and projects sections
- optionally add a third orbit or icon-driven tooltips now that the hero scene is modular
