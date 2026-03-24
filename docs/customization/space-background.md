# Space Background Customization

This guide is for the full-page React Three Fiber background that sits behind the portfolio content.

The astronaut is now a cute illustrated billboard inside the 3D scene.

## Main files

- `src/components/spaceBackgroundConfig.ts`: all editable values for star density, astronaut depth range, scaling, flight timing, sprite size, and glow behavior
- `src/components/StarsBackground.tsx`: the fixed canvas entry point, softer cute-scene lighting, and star field composition
- `src/components/SpaceBackgroundAstronaut.tsx`: illustrated astronaut texture generation, billboard behavior, glow layer, and waypoint-based flight logic
- `src/App.tsx`: page-level layering order for the background image and WebGL canvas

## Fast edit map

- Make the star field denser or lighter:
  - edit `stars.count`
- Make stars cover more or less space:
  - edit `stars.radius`
- Make stars brighter or larger:
  - edit `stars.color`
  - edit `stars.size`
- Make the star field rotate faster or slower:
  - edit `stars.rotationX`
  - edit `stars.rotationY`
- Push the astronaut farther back on average:
  - decrease `astronaut.nearZ`
  - or decrease `astronaut.baseScale`
- Let the astronaut get much closer to the screen:
  - increase `astronaut.nearZ`
  - or increase `astronaut.baseScale`
- Make the astronaut travel slower:
  - increase `astronaut.minLegDuration`
  - increase `astronaut.maxLegDuration`
- Make the path feel more erratic:
  - increase `astronaut.minCurveOffset`
  - increase `astronaut.maxCurveOffset`
- Make the idle suit motion calmer:
  - decrease `astronaut.bobAmplitude`
  - decrease `astronaut.driftAmplitude`
- Change the illustration itself:
  - edit `drawAstronautTexture()`
- Make the onboard glow stronger:
  - edit `astronaut.minGlowOpacity`
  - edit `astronaut.maxGlowOpacity`
- Make the sprite larger or smaller:
  - edit `astronaut.spriteWidth`
  - edit `astronaut.spriteHeight`
- Make the halo larger or smaller:
  - edit `astronaut.glowScale`
- Make the inner floating pose more playful:
  - edit `astronaut.poseBobAmount`
  - edit `astronaut.poseTiltAmount`

## Config structure

```ts
export const spaceBackgroundConfig = {
  stars: {
    count: number,
    radius: number,
    size: number,
    color: string,
    rotationX: number,
    rotationY: number,
  },
  astronaut: {
    farZ: number,
    nearZ: number,
    baseScale: number,
    minScaleMultiplier: number,
    maxScaleMultiplier: number,
    minLegDuration: number,
    maxLegDuration: number,
    minCurveOffset: number,
    maxCurveOffset: number,
    bobAmplitude: number,
    bobSpeed: number,
    driftAmplitude: number,
    driftSpeed: number,
    turnResponsiveness: number,
    poseBobAmount: number,
    poseTiltAmount: number,
    spriteWidth: number,
    spriteHeight: number,
    glowScale: number,
    minGlowOpacity: number,
    maxGlowOpacity: number,
  },
};
```

## Star controls

These live in `spaceBackgroundConfig.stars`.

- `count`: number of rendered points
- `radius`: spread of the star sphere around the scene
- `size`: point size in world units
- `color`: shared star tint
- `rotationX`, `rotationY`: lower numbers rotate faster because the frame loop divides delta by these values

## Astronaut controls

These live in `spaceBackgroundConfig.astronaut`.

- `farZ`: farthest depth the astronaut can reach
- `nearZ`: closest depth the astronaut can approach before it feels near-camera
- `baseScale`: baseline scale for the billboarded astronaut
- `minScaleMultiplier`, `maxScaleMultiplier`: extra depth scaling layered on top of `baseScale`
- `minLegDuration`, `maxLegDuration`: duration range for one waypoint-to-waypoint flight leg
- `minCurveOffset`, `maxCurveOffset`: how much the midpoint of each path bends off-axis
- `bobAmplitude`, `bobSpeed`: slow up/down breathing drift
- `driftAmplitude`, `driftSpeed`: lateral micro-drift that keeps the motion from feeling linear
- `turnResponsiveness`: damping speed for the inner pose roll
- `poseBobAmount`: how much the inner astronaut body floats relative to the root
- `poseTiltAmount`: cute side-to-side torso tilt amount
- `spriteWidth`, `spriteHeight`: plane aspect used for the astronaut artwork
- `glowScale`: size multiplier for the halo plane behind the astronaut
- `minGlowOpacity`, `maxGlowOpacity`: depth-based halo opacity range

## Motion model

The astronaut is now a 2.5D illustration in 3D space, which is much closer to the visual reference than a full mesh character.

Instead, `SpaceBackgroundAstronaut.tsx` does three things:

1. Draws the astronaut into an offscreen canvas.
2. Uses that canvas as a transparent texture on a plane that always faces the camera.
3. Generates visible 3D waypoints, eases between them, and layers subtle pose motion on top.

That means you can change the motion feel from config, and change the art style directly in the component.

## Geometry edit map

If you want to restyle the astronaut itself, start in `SpaceBackgroundAstronaut.tsx`.

- Main illustration:
  - edit `drawAstronautTexture()`
- Glow halo:
  - edit `createGlowTexture()`
- Flight path generation:
  - edit `createWaypoint()` and `beginNextFlightLeg()`
- Inner pose behavior:
  - edit the `pose.position.y` and `pose.rotation.*` targets inside `useFrame()`

## Practical rules

- If you only want to tune speed, size, depth, and motion feel, stay in `spaceBackgroundConfig.ts`.
- If you want a different suit palette, visor look, or overall silhouette, edit `SpaceBackgroundAstronaut.tsx`.
- Keep the astronaut in the shared canvas instead of adding a second canvas. One fixed WebGL layer is cheaper and easier to maintain.
