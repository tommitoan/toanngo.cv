import { useEffect, useRef, useState } from "react";
import type { ShowcaseCycleConfig, ShowcasePhase } from "./types";

type UseHeroShowcaseCycleArgs = {
  cycle: ShowcaseCycleConfig;
};

export function useHeroShowcaseCycle({ cycle }: UseHeroShowcaseCycleArgs) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [showcasePhase, setShowcasePhase] = useState<ShowcasePhase>("off");
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

  function scheduleShowcaseCycle(delay = cycle.idleDelayMs) {
    if (orbitZoneActive.current) {
      return;
    }

    clearCycleTimers();

    cycleTimers.current.push(
      setTimeout(() => {
        if (orbitZoneActive.current) {
          return;
        }

        setActiveNodeId(null);
        setShowcasePhase("booting");

        cycleTimers.current.push(
          setTimeout(() => {
            if (orbitZoneActive.current) {
              return;
            }

            setShowcasePhase("visible");
          }, cycle.bootDurationMs)
        );

        cycleTimers.current.push(
          setTimeout(() => {
            if (orbitZoneActive.current) {
              return;
            }

            setShowcasePhase("fading");
          }, cycle.bootDurationMs + cycle.visibleDurationMs)
        );

        cycleTimers.current.push(
          setTimeout(() => {
            if (orbitZoneActive.current) {
              return;
            }

            setShowcasePhase("off");
            scheduleShowcaseCycle(cycle.idleDelayMs);
          }, cycle.bootDurationMs + cycle.visibleDurationMs + cycle.fadeDurationMs)
        );
      }, delay)
    );
  }

  useEffect(() => {
    scheduleShowcaseCycle();

    return () => {
      clearCycleTimers();
    };
  }, [cycle.bootDurationMs, cycle.fadeDurationMs, cycle.idleDelayMs, cycle.visibleDurationMs]);

  function activateNode(nodeId: string) {
    disableShowcase();
    setActiveNodeId(nodeId);
  }

  function deactivateNode(nodeId: string) {
    setActiveNodeId((currentNodeId) => (currentNodeId === nodeId ? null : currentNodeId));
  }

  function handleOrbitZoneEnter() {
    orbitZoneActive.current = true;
    setSuppressShowcase(true);
    disableShowcase();
    setActiveNodeId(null);
  }

  function handleOrbitZoneLeave() {
    orbitZoneActive.current = false;
    setSuppressShowcase(false);
    setActiveNodeId(null);
    disableShowcase();
    scheduleShowcaseCycle();
  }

  return {
    activeNodeId,
    showcasePhase,
    suppressShowcase,
    activateNode,
    deactivateNode,
    handleOrbitZoneEnter,
    handleOrbitZoneLeave
  };
}
