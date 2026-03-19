# 2026-03-19 Premium Hero Motion

## What was added

- premium split-layout hero modeled on the reference screenshot and `/home/ngominhtoan/tommi-team/me`
- orbit-style motion layer with circular trajectory lines and persistent planet nodes
- restored the earlier freeform intro composition on the left
- moved skill labels into timed hover tooltips instead of permanent inline chips
- expanded the blinking starfield background to the full page
- simplified the orbit system so tracks stay centered and labels are only revealed on interaction
- converted the orbit paths to circles, removed the solid center disk, and changed skill labels into timed hover tooltips
- re-centered the core icon and changed the tooltip into a farther projected HUD panel that can overflow the stage cleanly
- moved the full orbit system onto one shared center anchor so rings and planets stay visually aligned
- reworked tooltip placement to follow the live planet position and added an idle mode that reveals all skill HUDs
- upgraded the idle mode into a repeating flicker-on, hold, and fade-off showcase cycle
- fixed the interaction flow so entering the orbit zone disables the showcase loop until the cursor leaves that zone
- added a real orbit interaction surface so the current showcase frame is also cut off immediately on entry
- replaced the old exit-animation path with an immediate forced hide for showcase HUDs on zone entry
- removal of the previous Three.js-based experiment
- docs updates covering the final feature direction and implementation state

## Why this approach

The 3D experiment was visually wrong for this project. The final direction now follows the real hero reference more closely and keeps the motion premium without pulling in a heavy 3D dependency stack.

## Verification

- run `pnpm build`
