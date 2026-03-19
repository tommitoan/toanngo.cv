# 2026-03-19 Hero Showcase Refactor

## What changed

- extracted the premium hero scene into a dedicated `src/components/hero-showcase/` module
- moved the idle showcase cycle and orbit-zone interaction rules into `useHeroShowcaseCycle.ts`
- moved orbit rendering into `OrbitLayer.tsx`
- moved planet animation and HUD rendering into `OrbitSkillNode.tsx`
- converted the scene into a config-driven composition through `config.ts` and `types.ts`
- replaced hardcoded hero frame width in `HeroSection.tsx` with config-driven sizing
- changed hero CSS to read scene dimensions, offsets, scaling, ghost ring size, and core sizing from CSS variables
- added a dedicated customization guide under `docs/customization/hero-showcase.md`

## Why this refactor

The old scene placed the two orbits, timing, tooltip behavior, and layout geometry in one file. That made later visual tuning expensive and easy to break. The new structure separates:

- configuration
- cycle state
- orbit rendering
- node rendering
- outer scene composition

This makes the first and second orbit easy to tune independently without editing the whole hero.

## Verification

- run `pnpm build`
