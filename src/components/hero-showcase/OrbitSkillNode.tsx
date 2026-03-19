import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect } from "react";
import type { CSSProperties } from "react";
import type { OrbitConfig, OrbitNodeConfig, ShowcaseCycleConfig, ShowcasePhase } from "./types";

type OrbitSkillNodeProps = {
  orbit: OrbitConfig;
  node: OrbitNodeConfig;
  index: number;
  activeNodeId: string | null;
  showcasePhase: ShowcasePhase;
  suppressShowcase: boolean;
  cycle: ShowcaseCycleConfig;
  onActivate: (nodeId: string) => void;
  onDeactivate: (nodeId: string) => void;
};

const DEFAULT_TOOLTIP_DISTANCE = 108;
const DEFAULT_TOOLTIP_MIN_WIDTH_REM = 9;
const DEFAULT_TOOLTIP_SURFACE_FROM = "rgba(15, 23, 42, 0.92)";
const DEFAULT_TOOLTIP_SURFACE_TO = "rgba(12, 28, 48, 0.82)";
const DEFAULT_TOOLTIP_TEXT_COLOR = "#f8fafc";

function getDirectionMultiplier(direction: OrbitConfig["direction"]) {
  return direction === "counterclockwise" ? -1 : 1;
}

export function OrbitSkillNode({
  orbit,
  node,
  index,
  activeNodeId,
  showcasePhase,
  suppressShowcase,
  cycle,
  onActivate,
  onDeactivate
}: OrbitSkillNodeProps) {
  const reducedMotion = useReducedMotion();
  const direction = getDirectionMultiplier(orbit.direction);
  const frames = 120;
  const tooltip = {
    mode: "text" as const,
    distance: DEFAULT_TOOLTIP_DISTANCE,
    beamLength: undefined,
    minWidthRem: DEFAULT_TOOLTIP_MIN_WIDTH_REM,
    textColor: DEFAULT_TOOLTIP_TEXT_COLOR,
    accentColor: node.planetColor,
    surfaceFrom: DEFAULT_TOOLTIP_SURFACE_FROM,
    surfaceTo: DEFAULT_TOOLTIP_SURFACE_TO,
    glowColor: node.planetGlow,
    ...orbit.tooltipDefaults,
    ...node.tooltip
  };
  const tooltipDistance = tooltip.distance ?? DEFAULT_TOOLTIP_DISTANCE;
  const beamLength = tooltip.beamLength ?? tooltipDistance;
  const tooltipMode = tooltip.mode ?? "text";
  const canDisplayHud = tooltipMode !== "none";
  const isInteractive = node.interactive !== false && canDisplayHud;
  const initialRadians = (node.startAngle * Math.PI) / 180;
  const initialX = Math.cos(initialRadians) * orbit.radius;
  const initialY = Math.sin(initialRadians) * orbit.radius;
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);
  const hudMode =
    activeNodeId === node.id
      ? "active"
      : suppressShowcase || showcasePhase === "off" || !canDisplayHud
        ? "off"
        : showcasePhase;

  useEffect(() => {
    if (reducedMotion) {
      x.set(initialX);
      y.set(initialY);
      return;
    }

    const xFrames = Array.from({ length: frames + 1 }, (_, frame) => {
      const angle = ((node.startAngle + direction * (360 * frame) / frames) * Math.PI) / 180;
      return Math.cos(angle) * orbit.radius;
    });
    const yFrames = Array.from({ length: frames + 1 }, (_, frame) => {
      const angle = ((node.startAngle + direction * (360 * frame) / frames) * Math.PI) / 180;
      return Math.sin(angle) * orbit.radius;
    });

    const xAnimation = animate(x, xFrames, { duration: orbit.duration, repeat: Infinity, ease: "linear" });
    const yAnimation = animate(y, yFrames, { duration: orbit.duration, repeat: Infinity, ease: "linear" });

    return () => {
      xAnimation.stop();
      yAnimation.stop();
    };
  }, [direction, frames, initialX, initialY, node.startAngle, orbit.duration, orbit.radius, reducedMotion, x, y]);

  const beamRotation = useTransform([x, y], ([latestX, latestY]) => {
    const xValue = Number(latestX);
    const yValue = Number(latestY);
    const angle = (Math.atan2(yValue, xValue) * 180) / Math.PI;
    return `translateY(-50%) rotate(${angle}deg)`;
  });
  const tooltipX = useTransform([x, y], ([latestX, latestY]) => {
    const angle = Math.atan2(Number(latestY), Number(latestX));
    return Math.cos(angle) * tooltipDistance;
  });
  const tooltipY = useTransform([x, y], ([latestX, latestY]) => {
    const angle = Math.atan2(Number(latestY), Number(latestX));
    return Math.sin(angle) * tooltipDistance;
  });

  function getHudAnimation(mode: typeof hudMode) {
    if (suppressShowcase && mode !== "active") {
      return { opacity: 0, scale: 0.92 };
    }

    if (reducedMotion) {
      return { opacity: mode === "fading" ? 0 : 1, scale: 1 };
    }

    if (mode === "off") {
      return {
        opacity: 0,
        scale: 0.92
      };
    }

    if (mode === "booting") {
      return {
        opacity: [0, 0.18, 0.04, 0.46, 0.14, 0.76, 0.34, 1],
        scale: [0.94, 1.01, 0.97, 1.03, 0.98, 1.01, 0.995, 1]
      };
    }

    if (mode === "fading") {
      return {
        opacity: 0,
        scale: 0.96
      };
    }

    if (mode === "visible") {
      return {
        opacity: 1,
        scale: [1, 1.015, 1]
      };
    }

    return {
      opacity: 1,
      scale: 1
    };
  }

  function getHudTransition(mode: typeof hudMode) {
    if (suppressShowcase && mode !== "active") {
      return { duration: 0 } as const;
    }

    if (reducedMotion) {
      return { duration: 0 };
    }

    if (mode === "off") {
      return {
        duration: 0.16,
        ease: "easeOut"
      } as const;
    }

    if (mode === "booting") {
      return {
        duration: cycle.bootDurationMs / 1000,
        delay: (index * cycle.bootStaggerMs) / 1000,
        times: [0, 0.12, 0.24, 0.4, 0.56, 0.74, 0.88, 1],
        ease: "easeInOut"
      } as const;
    }

    if (mode === "fading") {
      return {
        duration: cycle.fadeDurationMs / 1000,
        ease: "easeOut"
      } as const;
    }

    if (mode === "visible") {
      return {
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut"
      } as const;
    }

    return {
      duration: 0.22,
      ease: "easeOut"
    } as const;
  }

  const nodeStyle = {
    "--orbit-node-size": `${node.planetSizeRem ?? orbit.defaultPlanetSizeRem ?? 1.15}rem`
  } as CSSProperties;
  const badgeStyle = {
    minWidth: `${tooltip.minWidthRem ?? DEFAULT_TOOLTIP_MIN_WIDTH_REM}rem`,
    color: tooltip.textColor,
    borderColor: `${tooltip.accentColor ?? node.planetColor}33`,
    background: `linear-gradient(135deg, ${tooltip.surfaceFrom}, ${tooltip.surfaceTo})`,
    boxShadow: `0 18px 34px rgba(15, 23, 42, 0.26), 0 0 24px ${tooltip.glowColor}, inset 0 0 0 1px rgba(255, 255, 255, 0.05)`,
    "--orbit-tooltip-accent": tooltip.accentColor ?? node.planetColor
  } as CSSProperties;
  const tooltipLabel = tooltip.label ?? node.label;
  const showIcon = tooltipMode === "icon" || tooltipMode === "iconText";
  const showText = tooltipMode === "text" || tooltipMode === "iconText";
  const iconLabel = tooltip.icon ?? node.icon;

  return (
    <motion.div
      className="orbit-node"
      style={{ x, y }}
      initial={
        reducedMotion
          ? undefined
          : {
              opacity: 0,
              scale: 0.8
            }
      }
      animate={{ opacity: 1, scale: 1 }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              opacity: { duration: 0.45, delay: index * 0.08 },
              scale: { duration: 0.45, delay: index * 0.08 }
            }
      }
    >
      <div className="orbit-skill-anchor" style={nodeStyle}>
        {isInteractive ? (
          <button
            type="button"
            aria-label={node.label}
            onMouseEnter={() => onActivate(node.id)}
            onMouseLeave={() => onDeactivate(node.id)}
            onFocus={() => onActivate(node.id)}
            onBlur={() => onDeactivate(node.id)}
            onPointerDown={() => onActivate(node.id)}
            className="orbit-planet-trigger"
          >
            <span
              className="orbit-label-planet"
              style={{ background: node.planetColor, boxShadow: `0 0 18px ${node.planetGlow}` }}
            />
            <span className="orbit-planet-aura" style={{ boxShadow: `0 0 28px ${node.planetGlow}` }} />
          </button>
        ) : (
          <>
            <span
              className="orbit-label-planet"
              style={{ background: node.planetColor, boxShadow: `0 0 18px ${node.planetGlow}` }}
            />
            <span className="orbit-planet-aura" style={{ boxShadow: `0 0 28px ${node.planetGlow}` }} />
          </>
        )}

        <motion.div
          initial={false}
          animate={getHudAnimation(hudMode)}
          transition={getHudTransition(hudMode)}
          className="orbit-hud"
          style={{
            visibility: hudMode === "off" && activeNodeId !== node.id ? "hidden" : "visible"
          }}
        >
          <motion.span className="orbit-hud-beam" style={{ width: beamLength, transform: beamRotation }} />
          <motion.div className="orbit-hud-panel-position" style={{ x: tooltipX, y: tooltipY }}>
            <div className="orbit-hud-panel-anchor">
              <motion.div
                animate={reducedMotion || hudMode !== "visible" ? undefined : { y: [0, -2, 0] }}
                transition={reducedMotion || hudMode !== "visible" ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="orbit-badge orbit-badge-floating"
                style={badgeStyle}
              >
                <span className="orbit-badge-target" />
                {showIcon && iconLabel ? <span className="orbit-badge-icon">{iconLabel}</span> : null}
                {showText ? (
                  <span className={`orbit-badge-name ${showIcon && iconLabel ? "orbit-badge-name-with-icon" : ""}`}>
                    {tooltipLabel}
                  </span>
                ) : null}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
