import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { heroShowcaseConfig } from "./config";
import { OrbitLayer } from "./OrbitLayer";
import { useHeroShowcaseCycle } from "./useHeroShowcaseCycle";

export function HeroShowcaseScene() {
  const reducedMotion = useReducedMotion();
  const { activeNodeId, showcasePhase, suppressShowcase, activateNode, deactivateNode, handleOrbitZoneEnter, handleOrbitZoneLeave } =
    useHeroShowcaseCycle({ cycle: heroShowcaseConfig.cycle });
  const { layout, core, ghostTrackColor, orbits } = heroShowcaseConfig;
  const sceneStyle = {
    "--showcase-stage-min-height": `${layout.stageMinHeightRem}rem`,
    "--showcase-zone-size": `${layout.interactionZoneSizeRem}rem`,
    "--showcase-offset-x": `${layout.offsetXRem}rem`,
    "--showcase-offset-y": `${layout.offsetYRem}rem`,
    "--showcase-scale": `${layout.scale}`,
    "--showcase-light-size": `${layout.lightSizeRem}rem`,
    "--showcase-light-top": `${layout.lightTopPercent}%`,
    "--showcase-light-right": `${layout.lightRightPercent}%`,
    "--showcase-glow-inset": `${layout.glowInsetPercent}%`,
    "--showcase-core-pulse-size": `${layout.corePulseSizeRem}rem`,
    "--showcase-core-icon-size": `${layout.coreIconSizeRem}rem`,
    "--showcase-core-icon-font-size": `${layout.coreIconFontSizeRem}rem`,
    "--showcase-ghost-diameter": `${layout.ghostOrbitDiameterRem}rem`,
    "--showcase-ghost-track-color": ghostTrackColor,
    "--showcase-core-pulse-from": core.pulseFrom,
    "--showcase-core-pulse-to": core.pulseTo,
    "--showcase-core-icon-gradient": `linear-gradient(135deg, ${core.iconGradient.join(", ")})`
  } as CSSProperties;

  return (
    <div className="hero-orbit-stage" style={sceneStyle}>
      <div className="hero-orbit-light" />
      <motion.div
        className="hero-orbit-glow"
        animate={reducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.16, 0.3, 0.16] }}
        transition={reducedMotion ? undefined : { duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="orbit-interaction-zone"
        onMouseEnter={handleOrbitZoneEnter}
        onMouseLeave={handleOrbitZoneLeave}
        onPointerEnter={handleOrbitZoneEnter}
        onPointerLeave={handleOrbitZoneLeave}
      />

      <div className="orbit-system-frame">
        <div className="orbit-system">
          <motion.div
            className="orbit-core-shell"
            animate={reducedMotion ? undefined : { scale: [1, 1.06, 1] }}
            transition={reducedMotion ? undefined : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="orbit-core-pulse" />
            <div className="orbit-core-icon-wrap">
              <motion.div
                className="orbit-core-icon"
                animate={reducedMotion ? undefined : { scale: [1, 1.05, 1], rotate: [0, 4, -4, 0] }}
                transition={reducedMotion ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span>{core.icon}</span>
              </motion.div>
            </div>
          </motion.div>

          <div className="orbit-track orbit-track-ghost" />

          {orbits.map((orbit) => (
            <OrbitLayer
              key={orbit.id}
              orbit={orbit}
              activeNodeId={activeNodeId}
              showcasePhase={showcasePhase}
              suppressShowcase={suppressShowcase}
              cycle={heroShowcaseConfig.cycle}
              onActivate={activateNode}
              onDeactivate={deactivateNode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
