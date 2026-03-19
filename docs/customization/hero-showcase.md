# Hero Showcase Customization

This guide is for the premium hero motion layer on the right side of the landing section.

## Main files

- `src/components/hero-showcase/config.ts`: all editable values for layout, cycle timing, orbit geometry, node count, colors, and tooltip behavior
- `src/components/hero-showcase/types.ts`: the config shape
- `src/components/hero-showcase/HeroShowcaseScene.tsx`: scene composition
- `src/components/hero-showcase/OrbitLayer.tsx`: one orbit ring plus its nodes
- `src/components/hero-showcase/OrbitSkillNode.tsx`: one moving planet and its HUD tooltip
- `src/components/hero-showcase/useHeroShowcaseCycle.ts`: idle showcase loop and orbit-zone interaction rules
- `src/sections/HeroSection.tsx`: outer frame width for the showcase column
- `src/index.css`: CSS variables and visual styling for the scene

## Fast edit map

- Change overall width of the right hero column:
  - edit `layout.frameMaxWidthRem`
- Move the whole showcase left, right, up, or down:
  - edit `layout.offsetXRem`
  - edit `layout.offsetYRem`
- Make the whole showcase larger or smaller:
  - edit `layout.scale`
- Change the interaction zone size:
  - edit `layout.interactionZoneSizeRem`
- Change orbit size:
  - edit `orbits[n].radius`
- Change orbit speed:
  - edit `orbits[n].duration`
  - lower number = faster
  - higher number = slower
- Change orbit direction:
  - edit `orbits[n].direction`
  - use `clockwise` or `counterclockwise`
- Change number of planets in an orbit:
  - add or remove items in `orbits[n].nodes`
- Change a planet starting position:
  - edit `nodes[n].startAngle`
- Change a planet color or glow:
  - edit `nodes[n].planetColor`
  - edit `nodes[n].planetGlow`
- Change default tooltip look for one orbit:
  - edit `orbits[n].tooltipDefaults`
- Change one specific planet tooltip:
  - edit `nodes[n].tooltip`
- Disable hover tooltip for one planet:
  - set `nodes[n].interactive = false`
  - or set `nodes[n].tooltip.mode = "none"`

## Config structure

```ts
type HeroShowcaseConfig = {
  layout: ShowcaseLayoutConfig;
  cycle: ShowcaseCycleConfig;
  core: ShowcaseCoreConfig;
  ghostTrackColor: string;
  orbits: OrbitConfig[];
};
```

## Layout controls

These live in `layout`.

- `frameMaxWidthRem`: width cap for the entire right-column showcase frame
- `stageMinHeightRem`: minimum height of the square hero stage
- `interactionZoneSizeRem`: hover-sensitive orbit area size
- `offsetXRem`: move the full orbit system horizontally
- `offsetYRem`: move the full orbit system vertically
- `scale`: scale the orbit system up or down
- `lightSizeRem`, `lightTopPercent`, `lightRightPercent`: top glow orb size and position
- `glowInsetPercent`: inner scene glow spread
- `corePulseSizeRem`: center pulse size
- `coreIconSizeRem`: center icon box size
- `coreIconFontSizeRem`: center icon text size
- `ghostOrbitDiameterRem`: diameter of the decorative center ring

## Cycle controls

These live in `cycle`.

- `idleDelayMs`: time before the all-skills showcase starts
- `bootDurationMs`: flicker/boot phase length
- `visibleDurationMs`: full-visibility hold time
- `fadeDurationMs`: fade-out time
- `bootStaggerMs`: stagger between node HUD boot timings

If you want the idle showcase to feel calmer, increase `idleDelayMs` and reduce `bootStaggerMs`.

## Core controls

These live in `core`.

- `icon`: center icon text
- `pulseFrom`, `pulseTo`: center pulse colors
- `iconGradient`: center icon background gradient stops

## Orbit controls

Each item in `orbits` controls one ring.

```ts
type OrbitConfig = {
  id: string;
  radius: number;
  duration: number;
  direction: "clockwise" | "counterclockwise";
  trackColor: string;
  defaultPlanetSizeRem?: number;
  tooltipDefaults?: OrbitTooltipConfig;
  nodes: OrbitNodeConfig[];
};
```

- `radius`: ring size in pixels from center to planet
- `duration`: seconds for one full revolution
- `direction`: orbit rotation direction
- `trackColor`: ring stroke color
- `defaultPlanetSizeRem`: default planet size for the whole orbit
- `tooltipDefaults`: shared hover/HUD settings for that orbit

## Planet controls

Each item in `nodes` controls one moving planet.

```ts
type OrbitNodeConfig = {
  id: string;
  label: string;
  startAngle: number;
  planetColor: string;
  planetGlow: string;
  planetSizeRem?: number;
  icon?: string;
  interactive?: boolean;
  tooltip?: OrbitTooltipConfig;
};
```

- `id`: unique key for state and hover handling
- `label`: default skill name
- `startAngle`: initial orbital angle in degrees
- `planetColor`: visible dot color
- `planetGlow`: aura/glow color
- `planetSizeRem`: optional per-planet size override
- `icon`: optional tooltip icon text
- `interactive`: set `false` if you want a decorative planet with no hover interaction
- `tooltip`: per-planet tooltip override

## Tooltip controls

These can be defined at orbit level in `tooltipDefaults` and overridden per node in `tooltip`.

```ts
type OrbitTooltipConfig = {
  mode?: "text" | "icon" | "iconText" | "none";
  label?: string;
  icon?: string;
  distance?: number;
  beamLength?: number;
  minWidthRem?: number;
  textColor?: string;
  accentColor?: string;
  surfaceFrom?: string;
  surfaceTo?: string;
  glowColor?: string;
};
```

- `mode`:
  - `text`: only show the skill name
  - `icon`: only show the icon
  - `iconText`: show both
  - `none`: no tooltip at all
- `label`: override displayed text without changing the planet label key
- `icon`: icon text for the tooltip
- `distance`: how far the tooltip panel projects away from the planet
- `beamLength`: line length from planet center to the tooltip direction
- `minWidthRem`: tooltip minimum width
- `textColor`: text color
- `accentColor`: target dot and accent color
- `surfaceFrom`, `surfaceTo`: tooltip panel background colors
- `glowColor`: panel glow color

## Common recipes

### Make the first orbit faster and smaller

```ts
orbits: [
  {
    ...,
    radius: 144,
    duration: 24
  }
]
```

### Reverse the second orbit

```ts
orbits: [
  ...,
  {
    ...,
    direction: "clockwise"
  }
]
```

### Push outer tooltips farther away

```ts
tooltipDefaults: {
  distance: 140,
  beamLength: 140
}
```

### Add a non-interactive decorative planet

```ts
{
  id: "decorative-node",
  label: "Decorative",
  startAngle: 48,
  planetColor: "#ffffff",
  planetGlow: "rgba(255, 255, 255, 0.65)",
  interactive: false,
  tooltip: {
    mode: "none"
  }
}
```

### Use icon plus text in one tooltip

```ts
{
  id: "go",
  label: "Go",
  ...,
  icon: "Go",
  tooltip: {
    mode: "iconText",
    icon: "Go"
  }
}
```

## Practical rule

If you only want visual tuning, start in `config.ts`.

If you need new interaction rules or a different hover/showcase lifecycle, edit `useHeroShowcaseCycle.ts`.

If you need a different tooltip layout or node rendering pattern, edit `OrbitSkillNode.tsx`.
