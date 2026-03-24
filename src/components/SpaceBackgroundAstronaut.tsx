import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CanvasTexture, LinearFilter, MathUtils, SRGBColorSpace, Vector3 } from "three";
import type { Group, Mesh } from "three";
import { spaceBackgroundConfig } from "./spaceBackgroundConfig";

type FlightState = {
  from: Vector3;
  to: Vector3;
  current: Vector3;
  curveAxis: Vector3;
  curveAmplitude: number;
  progress: number;
  duration: number;
  bobPhase: number;
  swayPhase: number;
  rollBias: number;
};

const BOOTSTRAP_VIEWPORT = { width: 1.8, height: 1.2 };
const TAU = Math.PI * 2;
const OUTLINE = "#593e8f";
const SUIT = "#fffafc";
const SUIT_SOFT = "#e6ddff";
const VISOR = "#251649";
const VISOR_SOFT = "#4f377d";
const ACCENT = "#54caff";

function randomBetween(min: number, max: number) {
  return MathUtils.randFloat(min, max);
}

function getDepthMix(z: number) {
  const { farZ, nearZ } = spaceBackgroundConfig.astronaut;
  return MathUtils.clamp(MathUtils.inverseLerp(farZ, nearZ, z), 0, 1);
}

function getAstronautScale(z: number) {
  const { baseScale, minScaleMultiplier, maxScaleMultiplier } = spaceBackgroundConfig.astronaut;
  return baseScale * MathUtils.lerp(minScaleMultiplier, maxScaleMultiplier, getDepthMix(z));
}

function createCurveAxis() {
  const axis = new Vector3(
    randomBetween(-1, 1),
    randomBetween(-1, 1),
    randomBetween(-0.08, 0.08),
  );

  if (axis.lengthSq() < 0.001) {
    axis.set(0, 1, 0);
  }

  return axis.normalize();
}

function createWaypoint(viewportWidth: number, viewportHeight: number) {
  const { farZ, nearZ } = spaceBackgroundConfig.astronaut;
  const z = randomBetween(farZ, nearZ);
  const depthMix = getDepthMix(z);
  const xRange = viewportWidth * MathUtils.lerp(0.34, 0.12, depthMix);
  const yRange = viewportHeight * MathUtils.lerp(0.26, 0.11, depthMix);

  return new Vector3(
    randomBetween(-xRange, xRange),
    randomBetween(-yRange, yRange),
    z,
  );
}

function createDistinctWaypoint(source: Vector3, viewportWidth: number, viewportHeight: number) {
  let next = createWaypoint(viewportWidth, viewportHeight);
  let attempts = 0;

  while (attempts < 6 && next.distanceToSquared(source) < 0.12) {
    next = createWaypoint(viewportWidth, viewportHeight);
    attempts += 1;
  }

  return next;
}

function createInitialFlightState(viewportWidth: number, viewportHeight: number): FlightState {
  const start = createWaypoint(viewportWidth, viewportHeight);

  return {
    from: start.clone(),
    to: createDistinctWaypoint(start, viewportWidth, viewportHeight),
    current: start.clone(),
    curveAxis: createCurveAxis(),
    curveAmplitude: randomBetween(
      spaceBackgroundConfig.astronaut.minCurveOffset,
      spaceBackgroundConfig.astronaut.maxCurveOffset,
    ),
    progress: 0,
    duration: randomBetween(
      spaceBackgroundConfig.astronaut.minLegDuration,
      spaceBackgroundConfig.astronaut.maxLegDuration,
    ),
    bobPhase: randomBetween(0, TAU),
    swayPhase: randomBetween(0, TAU),
    rollBias: randomBetween(-0.06, 0.06),
  };
}

function beginNextFlightLeg(flight: FlightState, viewportWidth: number, viewportHeight: number) {
  flight.from.copy(flight.current);
  flight.to.copy(createDistinctWaypoint(flight.current, viewportWidth, viewportHeight));
  flight.curveAxis.copy(createCurveAxis());
  flight.curveAmplitude = randomBetween(
    spaceBackgroundConfig.astronaut.minCurveOffset,
    spaceBackgroundConfig.astronaut.maxCurveOffset,
  );
  flight.progress = 0;
  flight.duration = randomBetween(
    spaceBackgroundConfig.astronaut.minLegDuration,
    spaceBackgroundConfig.astronaut.maxLegDuration,
  );
  flight.bobPhase = randomBetween(0, TAU);
  flight.swayPhase = randomBetween(0, TAU);
  flight.rollBias = randomBetween(-0.06, 0.06);
}

function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function capsulePath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  roundedRectPath(ctx, x, y, width, height, Math.min(width, height) / 2);
}

function strokeAndFill(
  ctx: CanvasRenderingContext2D,
  fill: string,
  lineWidth = 18,
  stroke = OUTLINE,
) {
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = stroke;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();
}

function drawAstronautTexture(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  canvas.width = 1024;
  canvas.height = 1024;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  ctx.save();
  ctx.translate(512, 530);
  ctx.rotate(0.08);

  ctx.save();
  ctx.translate(132, 34);
  ctx.rotate(0.06);
  capsulePath(ctx, -42, -118, 84, 184);
  strokeAndFill(ctx, "#f3edff", 18);
  ctx.restore();

  ctx.save();
  ctx.translate(-2, 20);
  ctx.rotate(-0.04);
  capsulePath(ctx, -118, -112, 210, 240);
  strokeAndFill(ctx, SUIT, 18);
  ctx.restore();

  ctx.save();
  ctx.translate(2, -246);
  ctx.rotate(0.02);
  ctx.scale(1.08, 1);
  ctx.beginPath();
  ctx.arc(0, 0, 164, 0, Math.PI * 2);
  strokeAndFill(ctx, SUIT, 18);
  ctx.restore();

  ctx.save();
  ctx.translate(6, -240);
  ctx.scale(1.18, 1.06);
  ctx.beginPath();
  ctx.arc(0, 0, 114, 0, Math.PI * 2);
  strokeAndFill(ctx, VISOR, 18);
  ctx.restore();

  ctx.save();
  ctx.translate(14, -266);
  ctx.rotate(-0.48);
  ctx.strokeStyle = "rgba(255,255,255,0.92)";
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.arc(0, 0, 82, 3.78, 5.18);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.translate(18, -208);
  ctx.rotate(-0.38);
  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(0, 0, 46, 3.7, 4.88);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.translate(12, -34);
  roundedRectPath(ctx, -46, -24, 92, 70, 22);
  strokeAndFill(ctx, SUIT_SOFT, 16);
  ctx.beginPath();
  ctx.arc(0, 12, 15, 0, Math.PI * 2);
  ctx.fillStyle = ACCENT;
  ctx.fill();
  ctx.lineWidth = 10;
  ctx.strokeStyle = OUTLINE;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 12, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#e6fbff";
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(-136, -22);
  ctx.rotate(1.08);
  capsulePath(ctx, -34, -106, 64, 162);
  strokeAndFill(ctx, SUIT, 16);
  capsulePath(ctx, 24, 18, 58, 118);
  strokeAndFill(ctx, SUIT, 16);
  ctx.beginPath();
  ctx.arc(72, 126, 30, 0, Math.PI * 2);
  strokeAndFill(ctx, SUIT, 16);
  ctx.restore();

  ctx.save();
  ctx.translate(122, 20);
  ctx.rotate(-0.16);
  capsulePath(ctx, -32, -100, 64, 170);
  strokeAndFill(ctx, SUIT, 16);
  capsulePath(ctx, -30, 52, 62, 114);
  strokeAndFill(ctx, SUIT, 16);
  ctx.beginPath();
  ctx.arc(0, 154, 30, 0, Math.PI * 2);
  strokeAndFill(ctx, SUIT, 16);
  ctx.restore();

  ctx.save();
  ctx.translate(-54, 184);
  ctx.rotate(0.32);
  capsulePath(ctx, -42, -92, 84, 160);
  strokeAndFill(ctx, SUIT, 16);
  capsulePath(ctx, -30, 54, 64, 96);
  strokeAndFill(ctx, SUIT, 16);
  ctx.beginPath();
  ctx.ellipse(10, 146, 52, 38, 0.18, 0, Math.PI * 2);
  strokeAndFill(ctx, SUIT_SOFT, 16);
  ctx.restore();

  ctx.save();
  ctx.translate(74, 192);
  ctx.rotate(-0.08);
  capsulePath(ctx, -42, -92, 84, 168);
  strokeAndFill(ctx, SUIT, 16);
  capsulePath(ctx, -32, 62, 66, 94);
  strokeAndFill(ctx, SUIT, 16);
  ctx.beginPath();
  ctx.ellipse(0, 154, 52, 38, 0.02, 0, Math.PI * 2);
  strokeAndFill(ctx, SUIT_SOFT, 16);
  ctx.restore();

  ctx.save();
  ctx.translate(164, -186);
  ctx.rotate(0.08);
  ctx.beginPath();
  ctx.arc(0, 0, 50, 0, Math.PI * 2);
  strokeAndFill(ctx, SUIT, 16);
  ctx.beginPath();
  ctx.arc(0, 0, 34, 0, Math.PI * 2);
  strokeAndFill(ctx, SUIT_SOFT, 10);
  ctx.restore();

  ctx.restore();
}

function createAstronautTexture() {
  const canvas = document.createElement("canvas");
  drawAstronautTexture(canvas);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function createGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new CanvasTexture(canvas);
  }

  const gradient = ctx.createRadialGradient(256, 256, 20, 256, 256, 220);
  gradient.addColorStop(0, "rgba(150, 199, 255, 0.72)");
  gradient.addColorStop(0.45, "rgba(139, 92, 246, 0.28)");
  gradient.addColorStop(1, "rgba(139, 92, 246, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

export function SpaceBackgroundAstronaut() {
  const rootRef = useRef<Group>(null);
  const billboardRef = useRef<Group>(null);
  const poseRef = useRef<Group>(null);
  const glowRef = useRef<Mesh>(null);
  const texture = useMemo(createAstronautTexture, []);
  const glowTexture = useMemo(createGlowTexture, []);
  const flightRef = useRef<FlightState>(
    createInitialFlightState(BOOTSTRAP_VIEWPORT.width, BOOTSTRAP_VIEWPORT.height),
  );
  const previousPositionRef = useRef(flightRef.current.current.clone());
  const scratchRef = useRef({
    position: new Vector3(),
    velocity: new Vector3(),
  });

  const initialPosition = flightRef.current.current;
  const initialScale = getAstronautScale(initialPosition.z);

  useFrame((state, delta) => {
    const root = rootRef.current;
    const billboard = billboardRef.current;
    const pose = poseRef.current;
    const glow = glowRef.current;

    if (!root || !billboard || !pose || !glow) {
      return;
    }

    const flight = flightRef.current;
    const scratch = scratchRef.current;
    const viewportWidth = state.viewport.width;
    const viewportHeight = state.viewport.height;
    const time = state.clock.elapsedTime;

    flight.progress += delta / flight.duration;

    if (flight.progress >= 1) {
      flight.current.copy(flight.to);
      beginNextFlightLeg(flight, viewportWidth, viewportHeight);
    }

    const easedT = MathUtils.smootherstep(MathUtils.clamp(flight.progress, 0, 1), 0, 1);

    scratch.position.lerpVectors(flight.from, flight.to, easedT);
    scratch.position.addScaledVector(
      flight.curveAxis,
      Math.sin(easedT * Math.PI) * flight.curveAmplitude,
    );

    scratch.position.x +=
      Math.cos(time * spaceBackgroundConfig.astronaut.driftSpeed + flight.swayPhase) *
      spaceBackgroundConfig.astronaut.driftAmplitude;
    scratch.position.y +=
      Math.sin(time * spaceBackgroundConfig.astronaut.bobSpeed + flight.bobPhase) *
      spaceBackgroundConfig.astronaut.bobAmplitude;
    scratch.position.z += Math.cos(time * 0.12 + flight.swayPhase) * 0.012;

    scratch.velocity.copy(scratch.position).sub(previousPositionRef.current);
    previousPositionRef.current.copy(scratch.position);
    flight.current.copy(scratch.position);

    root.position.copy(scratch.position);
    root.scale.setScalar(getAstronautScale(scratch.position.z));

    billboard.quaternion.copy(state.camera.quaternion);

    pose.position.y = MathUtils.damp(
      pose.position.y,
      Math.sin(time * 0.78 + flight.bobPhase) * spaceBackgroundConfig.astronaut.poseBobAmount,
      3.8,
      delta,
    );
    pose.rotation.z = MathUtils.damp(
      pose.rotation.z,
      0.05 + flight.rollBias + Math.sin(time * 0.48 + flight.swayPhase) * spaceBackgroundConfig.astronaut.poseTiltAmount,
      spaceBackgroundConfig.astronaut.turnResponsiveness,
      delta,
    );
    pose.rotation.x = MathUtils.damp(
      pose.rotation.x,
      Math.cos(time * 0.36 + flight.bobPhase) * 0.025,
      3.6,
      delta,
    );

    const depthMix = getDepthMix(scratch.position.z);
    if (!Array.isArray(glow.material)) {
      glow.material.opacity = MathUtils.lerp(
        spaceBackgroundConfig.astronaut.minGlowOpacity,
        spaceBackgroundConfig.astronaut.maxGlowOpacity,
        depthMix,
      );
    }
  });

  return (
    <group
      ref={rootRef}
      position={[initialPosition.x, initialPosition.y, initialPosition.z]}
      scale={initialScale}
    >
      <group ref={billboardRef}>
        <mesh
          ref={glowRef}
          position={[0, -0.02, -0.02]}
          scale={[
            spaceBackgroundConfig.astronaut.spriteWidth * spaceBackgroundConfig.astronaut.glowScale,
            spaceBackgroundConfig.astronaut.spriteHeight * spaceBackgroundConfig.astronaut.glowScale,
            1,
          ]}
          renderOrder={1}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={glowTexture}
            transparent
            opacity={spaceBackgroundConfig.astronaut.minGlowOpacity}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        <group ref={poseRef}>
          <mesh
            scale={[
              spaceBackgroundConfig.astronaut.spriteWidth,
              spaceBackgroundConfig.astronaut.spriteHeight,
              1,
            ]}
            renderOrder={2}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              map={texture}
              transparent
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
