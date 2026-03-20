# Revision 2 — Content & Layout Cleanup

**Date:** 2026-03-20

---

## Problems Identified & Fixed

### 1. Excessive Hashtags (Moderated)

**Before:** Nearly every paragraph had multiple `#Hashtag` spans — `#Backend`, `#CICD`, `#CleanArchitecture`, `#gRPC`, `#Observability`, `#React`, `#TypeScript`, `#Kubernetes`, `#GitOps`, `#Golang`, `#APIFirst`, `#UserNeeds`, `#BackendEngineering`, `#CloudInfrastructure`, `#Role`, `#Project`, `#Microservices`, `#Go`, `#AWS`, `#SystemDesign`, `#CoreTechnologies`, `#Cloud`, `#CloudNative`, `#GoLang`, `#DevOps`, `#OpenAPI`.

**After:** All `hashtag` classes removed. The `.hashtag` CSS class itself was deleted. Gradient accents are used sparingly — one or two per section description, only where they add real visual value.

**Affected files:**
- `src/sections/HeroSection.tsx` — removed 3 hashtags from description
- `src/sections/AboutSection.tsx` — removed 10+ hashtags from points and principles
- `src/sections/SkillsSection.tsx` — removed 3 hashtags from description
- `src/sections/ExperienceSection.tsx` — removed 4 hashtags from description
- `src/sections/ProjectsSection.tsx` — removed 4 hashtags from description
- `src/sections/ContactSection.tsx` — removed 4 hashtags from description
- `src/index.css` — deleted `.hashtag` and `.hashtag::before` rules

---

### 2. Missing Highlights on Key Labels

**Before:** Hero highlight pills (`Go and gRPC`, `AWS and Kubernetes`, `API-first backend`) used plain `.pill` styling. Project stack items (`oapi-codegen`, `Chi Router`, `PostgreSQL`, etc.) also used plain `.pill`.

**After:**

| Element | Old Class | New Class | Visual Effect |
|---------|-----------|-----------|---------------|
| Hero highlights | `.pill` | `.pill-gradient` | Purple-blue gradient border + glow |
| Project stack items | `.pill` | `.pill-tech` | Subtle violet tint + colored text |

**New CSS classes added to `src/index.css`:**

```css
.pill-gradient   /* Highlighted pill with gradient bg + glow border */
.pill-tech       /* Tech stack pill with subtle violet tint */
```

---

### 3. Avatar Placeholder

**Before:** About section showed a `TN` text circle. Navbar showed a `TN` text circle.

**After:** Both now use the real `public/avatar.png` image:
- **Navbar** — `<img src="/avatar.png">` inside the circular border
- **About section** — `<img src="/avatar.png">` fills the 64×64 avatar ring

**Affected files:**
- `src/components/SiteHeader.tsx` — replaced `TN` text with `<img>`
- `src/sections/AboutSection.tsx` — replaced two nested divs + `TN` text with `<img>`

---

### 4. Duplicate Buttons Resolved

**Problem:** "Contact" appeared twice (nav link + standalone gradient button). "Resume" appeared twice (hero CTA + about section actions).

**Solution — Navigation layout:**

| Location | Before | After | Reasoning |
|----------|--------|-------|-----------|
| Navbar right CTA | `Contact` (gradient-button) → `#contact` | `Resume` (gradient-button) → PDF download | Contact is already in the nav links; Resume is the most useful standalone CTA |
| Hero CTAs | `View Projects` + `Resume` | `View Projects` + `Contact Me` | Resume moved to navbar; hero now drives two key user actions |
| About actions | `Resume` + `LinkedIn` + `GitHub` | `LinkedIn` + `GitHub` | Resume removed (already in navbar); social proof links remain |

**Flow now:**
```
┌─────────────────────────────────────────────────────┐
│ Navbar: [TN Toan Ngo]  Overview Skills ... Contact  │  [Resume ↗]
├─────────────────────────────────────────────────────┤
│ Hero:   [View Projects]  [Contact Me]               │
├─────────────────────────────────────────────────────┤
│ About:  [LinkedIn]  [GitHub]                        │
└─────────────────────────────────────────────────────┘
```

No element is duplicated. Each CTA has a clear purpose.

**Affected files:**
- `src/components/SiteHeader.tsx` — CTA changed to Resume PDF link
- `src/content/portfolio.ts` — hero.ctas and about.actions updated

---

### 5. Full Content & Layout Audit

#### Section-by-Section Review

**Hero Section**
- ✅ Tagline: "Building **Scalable Systems** with **Precision & Passion**" — gradient accents on 2 key phrases only
- ✅ Description: plain text, no clutter
- ✅ Highlights: `pill-gradient` for `Go and gRPC`, `AWS and Kubernetes`, `API-first backend`
- ✅ CTAs: `View Projects` (primary) + `Contact Me` (ghost) — no duplicate Resume

**About / Overview Section**
- ✅ Heading: "**Overview.**" in primary gradient
- ✅ Description: 2 gradient phrases — `Golang services` (cyan-blue) + `product thinking` (purple-pink)
- ✅ Avatar: real photo, not placeholder text
- ✅ Actions: LinkedIn + GitHub only — no duplicate Resume
- ✅ Points: plain text from portfolio.ts data — no inline hashtags
- ✅ Core strengths: gradient titles only (`Backend Engineering`, `Cloud and Delivery`, `Product Mindset`)

**Skills Section**
- ✅ Heading: "**Skills.**" in blue-purple gradient
- ✅ Description: one clean sentence, no hashtags

**Experience / Journey Section**
- ✅ Heading: "**Journey.**" in purple-pink gradient
- ✅ Description: 1 gradient phrase — `cloud-native platforms` (cyan-blue)
- ✅ Timeline cards: plain text, clean layout

**Projects Section**
- ✅ Heading: "**Projects.**" in cyan-blue gradient
- ✅ Description: 1 gradient phrase — `production systems` (primary)
- ✅ Stack pills: `pill-tech` class with violet tint — highlights `oapi-codegen`, `Chi Router`, `PostgreSQL`, etc.
- ✅ Project names in preview cards: rotating gradient colors
- ✅ Impact labels: gradient-colored
- ✅ Link text: "View Source →" (more accurate than "Live Project")

**Contact Section**
- ✅ Heading: "Let's build something **reliable**" — 1 gradient word
- ✅ Description: plain text, no hashtags

**Footer**
- ✅ No changes needed — already clean

---

## Summary of Files Changed

| File | Changes |
|------|---------|
| `src/index.css` | Added `.pill-gradient`, `.pill-tech`; removed `.hashtag` |
| `src/components/SiteHeader.tsx` | Avatar image; Resume CTA replaces Contact CTA |
| `src/components/SectionHeading.tsx` | No changes (already supports ReactNode) |
| `src/content/portfolio.ts` | Hero CTAs updated; About actions trimmed |
| `src/sections/HeroSection.tsx` | Removed hashtags; `pill` → `pill-gradient` |
| `src/sections/AboutSection.tsx` | Avatar image; removed all hashtags; data-driven points |
| `src/sections/SkillsSection.tsx` | Clean description, no hashtags |
| `src/sections/ExperienceSection.tsx` | Clean description, 1 gradient phrase |
| `src/sections/ProjectsSection.tsx` | `pill` → `pill-tech`; removed hashtags; fixed duplicate closing tags |
| `src/sections/ContactSection.tsx` | Clean description, no hashtags |

---

## Gradient Usage Summary (Final State)

| Section | Gradient Title | Gradient Phrases in Body | Hashtags |
|---------|---------------|-------------------------|----------|
| Hero | — | 2 (tagline) | 0 |
| Overview | ✅ primary | 2 (description) + 3 (principle titles) | 0 |
| Skills | ✅ blue-purple | 0 | 0 |
| Journey | ✅ purple-pink | 1 (description) | 0 |
| Projects | ✅ cyan-blue | 1 (description) + rotating card names | 0 |
| Contact | — (inline "reliable") | 0 | 0 |

**Total hashtags remaining: 0** — replaced with tasteful gradient accents where appropriate.

---

## Build Verification

```
$ npx tsc --noEmit  →  ✅ No errors
```

