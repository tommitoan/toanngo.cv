# Implementation Status

## Current state

Production-ready static SPA deployed at [toanngo.cv](https://toanngo.cv/).

Includes real content, a premium orbit-motion hero, space background, and structured documentation.

---

## File map

### Content
| File | Purpose |
|------|---------|
| `src/content/portfolio.ts` | Single source of truth for all page content |

### Sections
| File | Section |
|------|---------|
| `src/sections/HeroSection.tsx` | Hero split-screen layout |
| `src/sections/AboutSection.tsx` | About / intro |
| `src/sections/SkillsSection.tsx` | Skill chip grid |
| `src/sections/ExperienceSection.tsx` | Work history timeline |
| `src/sections/ProjectsSection.tsx` | Project cards |
| `src/sections/EducationSection.tsx` | Education and certifications |
| `src/sections/ContactSection.tsx` | Contact links |

### Hero orbit system
| File | Purpose |
|------|---------|
| `src/components/hero-showcase/config.ts` | All layout, orbit, and node configuration |
| `src/components/hero-showcase/types.ts` | TypeScript types for the orbit system |
| `src/components/hero-showcase/HeroShowcaseScene.tsx` | Top-level scene compositor |
| `src/components/hero-showcase/OrbitLayer.tsx` | Renders one orbit ring + its nodes |
| `src/components/hero-showcase/OrbitSkillNode.tsx` | Single animated planet node with HUD label |
| `src/components/hero-showcase/useHeroShowcaseCycle.ts` | Idle showcase state machine |
| `src/components/HeroOrbitScene.tsx` | Thin export wrapper consumed by HeroSection |

### Shared components
| File | Purpose |
|------|---------|
| `src/components/Reveal.tsx` | Scroll-triggered reveal animation wrapper |
| `src/components/SectionHeading.tsx` | Eyebrow + title + description heading block |
| `src/components/SpaceBackgroundAstronaut.tsx` | Animated space background scene |
| `src/components/StarsBackground.tsx` | Three-layer CSS starfield |
| `src/components/SiteHeader.tsx` | Sticky navigation bar |
| `src/components/ImageLightbox.tsx` | Lightbox for project images |

### Styles
| File | Purpose |
|------|---------|
| `src/index.css` | Global CSS variables, Tailwind layers, all component classes |
| `tailwind.config.ts` | Tailwind theme extensions |

---

## Technical notes

- The hero orbit uses **Framer Motion only** — no Three.js/WebGL in the final implementation
- Orbit ring tracks, moving planets, and the center icon share one explicit center anchor to prevent drift
- HUD labels derive their position from the live animated planet position — hover never shifts the orbit node
- The idle showcase is a state machine: `off → booting → visible → fading → off`
- Entering the orbit interaction zone cancels showcase timers; leaving restarts them
- The orbit stage allows `overflow: visible` so projected HUD labels are never clipped
- Reduced-motion users get the full layout with continuous orbit motion removed
- The starfield is three CSS `background-image` layers with independent twinkle/drift animations — no canvas or JS

---

## Verification

```bash
pnpm build
```

Expected: TypeScript compile passes, Vite produces a clean `dist/` bundle with no errors.
