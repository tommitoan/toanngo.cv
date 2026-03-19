import { OrbitSkillNode } from "./OrbitSkillNode";
import type { OrbitConfig, ShowcaseCycleConfig, ShowcasePhase } from "./types";

type OrbitLayerProps = {
  orbit: OrbitConfig;
  activeNodeId: string | null;
  showcasePhase: ShowcasePhase;
  suppressShowcase: boolean;
  cycle: ShowcaseCycleConfig;
  onActivate: (nodeId: string) => void;
  onDeactivate: (nodeId: string) => void;
};

export function OrbitLayer({
  orbit,
  activeNodeId,
  showcasePhase,
  suppressShowcase,
  cycle,
  onActivate,
  onDeactivate
}: OrbitLayerProps) {
  return (
    <>
      <div
        className="orbit-track"
        style={{
          width: `${orbit.radius * 2}px`,
          height: `${orbit.radius * 2}px`,
          borderColor: orbit.trackColor
        }}
      />

      {orbit.nodes.map((node, index) => (
        <OrbitSkillNode
          key={node.id}
          orbit={orbit}
          node={node}
          index={index}
          activeNodeId={activeNodeId}
          showcasePhase={showcasePhase}
          suppressShowcase={suppressShowcase}
          cycle={cycle}
          onActivate={onActivate}
          onDeactivate={onDeactivate}
        />
      ))}
    </>
  );
}
