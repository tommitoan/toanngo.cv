import type { HeroShowcaseConfig } from "./types";

export const heroShowcaseConfig: HeroShowcaseConfig = {
  layout: {
    frameMaxWidthRem: 38,
    stageMinHeightRem: 36,
    interactionZoneSizeRem: 35,
    offsetXRem: 0,
    offsetYRem: 0,
    scale: 1,
    lightSizeRem: 6,
    lightTopPercent: 3,
    lightRightPercent: 14,
    glowInsetPercent: 24,
    corePulseSizeRem: 6.5,
    coreIconSizeRem: 4.5,
    coreIconFontSizeRem: 1.75,
    ghostOrbitDiameterRem: 18
  },
  cycle: {
    idleDelayMs: 2500,
    bootDurationMs: 1750,
    visibleDurationMs: 2000,
    fadeDurationMs: 450,
    bootStaggerMs: 50
  },
  core: {
    icon: ">_",
    pulseFrom: "rgba(168, 85, 247, 0.2)",
    pulseTo: "rgba(59, 130, 246, 0.08)",
    iconGradient: ["#3b82f6", "#9333ea", "#ec4899"]
  },
  ghostTrackColor: "rgba(255, 255, 255, 0.06)",
  orbits: [
    {
      id: "inner",
      radius: 160,
      duration: 30,
      direction: "clockwise",
      trackColor: "rgba(96, 165, 250, 0.18)",
      defaultPlanetSizeRem: 1.15,
      tooltipDefaults: {
        distance: 108,
        beamLength: 108,
        minWidthRem: 9,
        textColor: "#eff6ff",
        accentColor: "#7dd3fc",
        surfaceFrom: "rgba(9, 17, 31, 0.94)",
        surfaceTo: "rgba(10, 32, 58, 0.82)",
        glowColor: "rgba(96, 165, 250, 0.18)"
      },
      nodes: [
        {
          id: "go",
          label: "Go",
          startAngle: 0,
          planetColor: "#6ee7ff",
          planetGlow: "rgba(110, 231, 255, 0.9)"
        },
        {
          id: "kubernetes",
          label: "Kubernetes",
          startAngle: 60,
          planetColor: "#60a5fa",
          planetGlow: "rgba(96, 165, 250, 0.9)"
        },
        {
          id: "grpc",
          label: "gRPC",
          startAngle: 120,
          planetColor: "#8b5cf6",
          planetGlow: "rgba(139, 92, 246, 0.92)"
        },
        {
          id: "docker",
          label: "Docker",
          startAngle: 180,
          planetColor: "#d946ef",
          planetGlow: "rgba(217, 70, 239, 0.92)"
        },
        {
          id: "postgresql",
          label: "PostgreSQL",
          startAngle: 240,
          planetColor: "#fb7185",
          planetGlow: "rgba(251, 113, 133, 0.92)"
        },
        {
          id: "redis",
          label: "Redis",
          startAngle: 300,
          planetColor: "#f97316",
          planetGlow: "rgba(249, 115, 22, 0.95)"
        }
      ]
    },
    {
      id: "outer",
      radius: 214,
      duration: 40,
      direction: "counterclockwise",
      trackColor: "rgba(168, 85, 247, 0.16)",
      defaultPlanetSizeRem: 1.15,
      tooltipDefaults: {
        distance: 118,
        beamLength: 118,
        minWidthRem: 9.5,
        textColor: "#f5f3ff",
        accentColor: "#c084fc",
        surfaceFrom: "rgba(17, 13, 34, 0.94)",
        surfaceTo: "rgba(31, 16, 58, 0.82)",
        glowColor: "rgba(168, 85, 247, 0.18)"
      },
      nodes: [
        {
          id: "openapi",
          label: "OpenAPI",
          startAngle: 24,
          planetColor: "#c084fc",
          planetGlow: "rgba(192, 132, 252, 0.92)"
        },
        {
          id: "aws",
          label: "AWS",
          startAngle: 96,
          planetColor: "#34d399",
          planetGlow: "rgba(52, 211, 153, 0.92)"
        },
        {
          id: "prometheus",
          label: "Prometheus",
          startAngle: 168,
          planetColor: "#fb923c",
          planetGlow: "rgba(251, 146, 60, 0.95)"
        },
        {
          id: "argocd",
          label: "Argo CD",
          startAngle: 240,
          planetColor: "#facc15",
          planetGlow: "rgba(250, 204, 21, 0.95)"
        },
        {
          id: "github-actions",
          label: "GitHub Actions",
          startAngle: 312,
          planetColor: "#cbd5e1",
          planetGlow: "rgba(203, 213, 225, 0.75)",
          tooltip: {
            minWidthRem: 10.5
          }
        }
      ]
    }
  ]
};
