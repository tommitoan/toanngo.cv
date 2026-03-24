# Features

## Shipped

### Layout and structure
- Responsive single-page application
- Sticky top navigation with smooth anchor scroll
- All personal content centralised in `src/content/portfolio.ts`

### Visual system
- Dark ink background (`#050816`) with purple-blue glow accents
- Full-page three-layer twinkling starfield (CSS only, no canvas)
- Animated space background with astronaut scene
- Section reveal animations with configurable stagger delays
- Accent-colored skill chip grid per skill group

### Hero section
- Split-screen layout: freeform intro on the left, orbit showcase on the right
- Two circular orbit rings (inner and outer) with shared center anchor
- Animated planet nodes orbiting continuously via Framer Motion
- Hover/focus reveals a projected HUD-style skill label anchored to the live planet position
- Idle showcase loop: all skill HUDs boot-flicker in, hold, then fade out, then repeat
- Entering the orbit interaction zone immediately cancels the showcase and hides all HUDs
- Leaving the orbit zone restarts the idle cycle after a short delay
- Orbit speed, radius, direction, tooltip distance, and per-node styling all configurable from `src/components/hero-showcase/config.ts`
- Reduced-motion fallback: layout preserved, continuous orbit animation removed

### Content
- Real biography, skills, experience, and project data
- AWS Certified SAA + B.Sc. Computer Science education entries
- Direct resume download via `public/ToanNgo-resume.pdf`
- Contact section with email, GitHub, and LinkedIn links

---

## Remaining upgrades

- Replace the `TN` avatar placeholder with a real portrait
- Replace project preview placeholders with real screenshots
- Add deeper project detail views or case-study pages
- Add a contact form backend
- Add favicon and social preview (`og:image`) metadata
