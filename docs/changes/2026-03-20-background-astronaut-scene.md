# Revision 3 — Cute Astronaut Background Upgrade

**Date:** 2026-03-20

---

## Summary

The full-page space background now includes a cute illustrated-style astronaut rendered inside the existing React Three Fiber canvas.

The astronaut drifts across random 3D waypoints, changes perceived distance by moving through depth, and keeps a soft floating pose so the background feels playful instead of heavy.

---

## What Changed

### 1. One shared background canvas

The site already had a full-page WebGL canvas for the star field.

That canvas now owns both:

- the rotating star field
- the astronaut scene
- the background lights used by the astronaut mesh

This avoids creating a second fixed canvas and keeps the background effect in one render pass.

### 2. Illustrated billboard instead of awkward mesh

The previous astronaut direction still felt wrong because it behaved like a small 3D toy.

The replacement design now uses a transparent illustrated texture on a plane that always faces the camera.

Why this direction fits better:

- your reference image is fundamentally illustrative, not sculptural
- the silhouette stays clean at small background sizes
- the movement reads correctly because the astronaut never twists away from the viewer
- depth still works because the billboard exists inside the 3D scene and moves along the same random `z` path

The new illustration is intentionally simple:

- oversized round helmet
- soft white suit
- dark purple visor
- cyan chest accent
- dark visor with white highlights
- thick violet outline

This is much closer to the illustrated reference direction.

### 3. Random free-flight behavior

The astronaut motion is driven by a waypoint system:

- pick a random visible point in the viewport
- assign a random `z` depth between far and near bounds
- move toward it with smoother-step easing
- add a curved midpoint offset so the path is not perfectly straight
- once the leg completes, generate a new waypoint and repeat

This creates the effect of free-floating travel rather than a fixed loop.

### 4. Texture and glow setup

The astronaut is drawn in an offscreen canvas and uploaded as a transparent texture.

The integration also adds:

- a separate radial glow texture behind the astronaut
- depth-based glow opacity
- camera-facing billboard behavior

That gives the figure some atmosphere without turning it back into a clumsy mesh.

### 5. Near/far screen presence

To make the astronaut sometimes feel far away and sometimes very close, the implementation combines:

- real `z` movement inside the perspective camera
- extra depth-based scaling
- responsive waypoint bounds that keep close passes nearer to the center of the screen

The result is a much wider range of perceived distance without abrupt clipping.

### 6. Motion strategy

The background now combines two motion layers:

- a random waypoint-driven root transform
- a smaller internal pose float applied inside the billboard frame

That split matters:

- the root handles the big free-flight movement
- the inner pose keeps the astronaut cute and alive without becoming noisy

---

- `docs/customization/space-background.md`

## Files Updated

- `src/components/StarsBackground.tsx`
- `src/components/SpaceBackgroundAstronaut.tsx`
- `src/components/spaceBackgroundConfig.ts`
- `src/App.tsx`
- `docs/README.md`
- `docs/FEATURES.md`
- `docs/IMPLEMENTATION.md`
- `docs/architecture/frontend-spa.md`

---

## Verification

Expected verification command:

```bash
pnpm build
```

If the astronaut ever feels too busy, first reduce:

- `astronaut.baseScale`
- `astronaut.bobAmplitude`
- `astronaut.maxCurveOffset`
- `astronaut.poseTiltAmount`
