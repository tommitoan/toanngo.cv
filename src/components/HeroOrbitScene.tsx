import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type OrbitSkill = {
  label: string;
  startAngle: number;
  tint: string;
  planetColor: string;
  planetGlow: string;
};

const innerOrbit: OrbitSkill[] = [
  {
    label: "Go",
    startAngle: 0,
    tint: "from-cyan-500 to-blue-600",
    planetColor: "#6ee7ff",
    planetGlow: "rgba(110, 231, 255, 0.9)"
  },
  {
    label: "Kubernetes",
    startAngle: 60,
    tint: "from-blue-500 to-indigo-600",
    planetColor: "#60a5fa",
    planetGlow: "rgba(96, 165, 250, 0.9)"
  },
  {
    label: "gRPC",
    startAngle: 120,
    tint: "from-indigo-500 to-purple-600",
    planetColor: "#8b5cf6",
    planetGlow: "rgba(139, 92, 246, 0.92)"
  },
  {
    label: "Docker",
    startAngle: 180,
    tint: "from-purple-500 to-pink-600",
    planetColor: "#d946ef",
    planetGlow: "rgba(217, 70, 239, 0.92)"
  },
  {
    label: "PostgreSQL",
    startAngle: 240,
    tint: "from-pink-500 to-rose-600",
    planetColor: "#fb7185",
    planetGlow: "rgba(251, 113, 133, 0.92)"
  },
  {
    label: "Redis",
    startAngle: 300,
    tint: "from-rose-500 to-orange-600",
    planetColor: "#f97316",
    planetGlow: "rgba(249, 115, 22, 0.95)"
  }
];

const outerOrbit: OrbitSkill[] = [
  {
    label: "OpenAPI",
    startAngle: 24,
    tint: "from-violet-500 to-fuchsia-600",
    planetColor: "#c084fc",
    planetGlow: "rgba(192, 132, 252, 0.92)"
  },
  {
    label: "AWS",
    startAngle: 96,
    tint: "from-emerald-500 to-teal-600",
    planetColor: "#34d399",
    planetGlow: "rgba(52, 211, 153, 0.92)"
  },
  {
    label: "Prometheus",
    startAngle: 168,
    tint: "from-orange-500 to-red-600",
    planetColor: "#fb923c",
    planetGlow: "rgba(251, 146, 60, 0.95)"
  },
  {
    label: "Argo CD",
    startAngle: 240,
    tint: "from-amber-500 to-yellow-600",
    planetColor: "#facc15",
    planetGlow: "rgba(250, 204, 21, 0.95)"
  },
  {
    label: "GitHub Actions",
    startAngle: 312,
    tint: "from-slate-600 to-gray-700",
    planetColor: "#cbd5e1",
    planetGlow: "rgba(203, 213, 225, 0.75)"
  }
];

type OrbitLayerProps = {
  duration: number;
  radius: number;
  skills: OrbitSkill[];
  activeSkill: string | null;
  showcasePhase: "off" | "booting" | "visible" | "fading";
  suppressShowcase: boolean;
  onActivate: (label: string) => void;
  onDeactivate: (label: string) => void;
  reverse?: boolean;
  trackClassName?: string;
};

type OrbitSkillNodeProps = {
  duration: number;
  radius: number;
  skill: OrbitSkill;
  index: number;
  reverse: boolean;
  activeSkill: string | null;
  showcasePhase: "off" | "booting" | "visible" | "fading";
  suppressShowcase: boolean;
  onActivate: (label: string) => void;
  onDeactivate: (label: string) => void;
};

function OrbitSkillNode({
  duration,
  radius,
  skill,
  index,
  reverse,
  activeSkill,
  showcasePhase,
  suppressShowcase,
  onActivate,
  onDeactivate
}: OrbitSkillNodeProps) {
  const reducedMotion = useReducedMotion();
  const direction = reverse ? -1 : 1;
  const frames = 120;
  const cardDistance = 108;
  const beamLength = cardDistance;
  const initialRadians = (skill.startAngle * Math.PI) / 180;
  const initialX = Math.cos(initialRadians) * radius;
  const initialY = Math.sin(initialRadians) * radius;
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);
  const tooltipMode =
    activeSkill === skill.label
      ? "active"
      : suppressShowcase || showcasePhase === "off"
        ? "off"
        : showcasePhase;
  useEffect(() => {
    if (reducedMotion) {
      x.set(initialX);
      y.set(initialY);
      return;
    }

    const xFrames = Array.from({ length: frames + 1 }, (_, frame) => {
      const angle = ((skill.startAngle + direction * (360 * frame) / frames) * Math.PI) / 180;
      return Math.cos(angle) * radius;
    });
    const yFrames = Array.from({ length: frames + 1 }, (_, frame) => {
      const angle = ((skill.startAngle + direction * (360 * frame) / frames) * Math.PI) / 180;
      return Math.sin(angle) * radius;
    });

    const xAnimation = animate(x, xFrames, { duration, repeat: Infinity, ease: "linear" });
    const yAnimation = animate(y, yFrames, { duration, repeat: Infinity, ease: "linear" });

    return () => {
      xAnimation.stop();
      yAnimation.stop();
    };
  }, [direction, duration, frames, initialX, initialY, radius, reducedMotion, skill.startAngle, x, y]);

  const beamRotation = useTransform([x, y], ([latestX, latestY]) => {
    const xValue = Number(latestX);
    const yValue = Number(latestY);
    const angle = (Math.atan2(yValue, xValue) * 180) / Math.PI;
    return `translateY(-50%) rotate(${angle}deg)`;
  });
  const tooltipX = useTransform([x, y], ([latestX, latestY]) => {
    const xValue = Number(latestX);
    const yValue = Number(latestY);
    const angle = Math.atan2(yValue, xValue);
    return Math.cos(angle) * cardDistance;
  });
  const tooltipY = useTransform([x, y], ([latestX, latestY]) => {
    const xValue = Number(latestX);
    const yValue = Number(latestY);
    const angle = Math.atan2(yValue, xValue);
    return Math.sin(angle) * cardDistance;
  });

  function getHudAnimation(mode: typeof tooltipMode) {
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

  function getHudTransition(mode: typeof tooltipMode) {
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
        duration: 1.75,
        delay: index * 0.05,
        times: [0, 0.12, 0.24, 0.4, 0.56, 0.74, 0.88, 1],
        ease: "easeInOut"
      } as const;
    }

    if (mode === "fading") {
      return {
        duration: 0.45,
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
      <div className="orbit-skill-anchor">
        <button
          type="button"
          aria-label={skill.label}
          onMouseEnter={() => onActivate(skill.label)}
          onMouseLeave={() => onDeactivate(skill.label)}
          onFocus={() => onActivate(skill.label)}
          onBlur={() => onDeactivate(skill.label)}
          onPointerDown={() => onActivate(skill.label)}
          className="orbit-planet-trigger"
        >
          <span
            className="orbit-label-planet"
            style={{ background: skill.planetColor, boxShadow: `0 0 18px ${skill.planetGlow}` }}
          />
          <span className="orbit-planet-aura" style={{ boxShadow: `0 0 28px ${skill.planetGlow}` }} />
        </button>

        <motion.div
          initial={false}
          animate={getHudAnimation(tooltipMode)}
          transition={getHudTransition(tooltipMode)}
          className="orbit-hud"
          style={{
            visibility: tooltipMode === "off" && activeSkill !== skill.label ? "hidden" : "visible"
          }}
        >
          <motion.span className="orbit-hud-beam" style={{ width: beamLength, transform: beamRotation }} />
          <motion.div className="orbit-hud-panel-position" style={{ x: tooltipX, y: tooltipY }}>
            <div className="orbit-hud-panel-anchor">
              <motion.div
                animate={
                  reducedMotion || tooltipMode === "fading" || tooltipMode === "booting" || tooltipMode === "off"
                    ? undefined
                    : { y: [0, -2, 0] }
                }
                transition={
                  reducedMotion || tooltipMode === "fading" || tooltipMode === "booting" || tooltipMode === "off"
                    ? undefined
                    : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                }
                className={`orbit-badge orbit-badge-floating bg-gradient-to-r ${skill.tint}`}
              >
                <span className="orbit-badge-target" />
                <span className="orbit-badge-name">{skill.label}</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function OrbitLayer({
  duration,
  radius,
  skills,
  activeSkill,
  showcasePhase,
  suppressShowcase,
  onActivate,
  onDeactivate,
  reverse = false,
  trackClassName = ""
}: OrbitLayerProps) {
  return (
    <>
      <div
        className={`orbit-track ${trackClassName}`}
        style={{
          width: `${radius * 2}px`,
          height: `${radius * 2}px`
        }}
      />

      {skills.map((skill, index) => (
        <OrbitSkillNode
          key={skill.label}
          duration={duration}
          radius={radius}
          skill={skill}
          index={index}
          reverse={reverse}
          activeSkill={activeSkill}
          showcasePhase={showcasePhase}
          suppressShowcase={suppressShowcase}
          onActivate={onActivate}
          onDeactivate={onDeactivate}
        />
      ))}
    </>
  );
}

export function HeroOrbitScene() {
  const reducedMotion = useReducedMotion();
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [showcasePhase, setShowcasePhase] = useState<"off" | "booting" | "visible" | "fading">("off");
  const [suppressShowcase, setSuppressShowcase] = useState(false);
  const cycleTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const orbitZoneActive = useRef(false);

  function clearCycleTimers() {
    cycleTimers.current.forEach((timer) => clearTimeout(timer));
    cycleTimers.current = [];
  }

  function disableShowcase() {
    clearCycleTimers();
    setShowcasePhase("off");
  }

  function scheduleShowcaseCycle(delay = 2500) {
    if (orbitZoneActive.current) {
      return;
    }

    clearCycleTimers();

    cycleTimers.current.push(
      setTimeout(() => {
        if (orbitZoneActive.current) {
          return;
        }

        setActiveSkill(null);
        setShowcasePhase("booting");

        cycleTimers.current.push(
          setTimeout(() => {
            if (orbitZoneActive.current) {
              return;
            }

            setShowcasePhase("visible");
          }, 1750)
        );

        cycleTimers.current.push(
          setTimeout(() => {
            if (orbitZoneActive.current) {
              return;
            }

            setShowcasePhase("fading");
          }, 3750)
        );

        cycleTimers.current.push(
          setTimeout(() => {
            if (orbitZoneActive.current) {
              return;
            }

            setShowcasePhase("off");
            scheduleShowcaseCycle(2500);
          }, 4200)
        );
      }, delay)
    );
  }

  useEffect(() => {
    scheduleShowcaseCycle();

    return () => {
      clearCycleTimers();
    };
  }, []);

  function activateSkill(label: string) {
    disableShowcase();
    setActiveSkill(label);
  }

  function deactivateSkill(label: string) {
    if (activeSkill !== label) {
      return;
    }

    setActiveSkill(null);
  }

  function handleOrbitZoneEnter() {
    orbitZoneActive.current = true;
    setSuppressShowcase(true);
    disableShowcase();
    setActiveSkill(null);
  }

  function handleOrbitZoneLeave() {
    orbitZoneActive.current = false;
    setSuppressShowcase(false);
    setActiveSkill(null);
    disableShowcase();
    scheduleShowcaseCycle();
  }

  return (
    <div className="hero-orbit-stage">
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
      >
        <div className="orbit-system">
          <motion.div
            className="orbit-core-shell"
            animate={
              reducedMotion
                ? undefined
                : {
                    scale: [1, 1.06, 1]
                  }
            }
            transition={reducedMotion ? undefined : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="orbit-core-pulse" />
            <div className="orbit-core-icon-wrap">
              <motion.div
                className="orbit-core-icon"
                animate={reducedMotion ? undefined : { scale: [1, 1.05, 1], rotate: [0, 4, -4, 0] }}
                transition={reducedMotion ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span>&gt;_</span>
              </motion.div>
            </div>
          </motion.div>

          <div className="orbit-track orbit-track-ghost" style={{ width: "18rem", height: "18rem" }} />
          <OrbitLayer
            duration={30}
            radius={160}
            skills={innerOrbit}
            activeSkill={activeSkill}
            showcasePhase={showcasePhase}
            suppressShowcase={suppressShowcase}
            onActivate={activateSkill}
            onDeactivate={deactivateSkill}
            trackClassName="orbit-track-inner"
          />
          <OrbitLayer
            duration={40}
            radius={214}
            skills={outerOrbit}
            activeSkill={activeSkill}
            showcasePhase={showcasePhase}
            suppressShowcase={suppressShowcase}
            onActivate={activateSkill}
            onDeactivate={deactivateSkill}
            reverse
            trackClassName="orbit-track-outer"
          />
        </div>
      </div>
    </div>
  );
}
