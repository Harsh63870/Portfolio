"use client";

import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, Stars, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/** Central rotating torus-knot — reads strongly as 3D thanks to its self-occluding tube. */
function CoreKnot({ isDark, reducedMotion }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y += delta * 0.35;
    ref.current.rotation.x += delta * 0.18;
  });
  return (
    <Float speed={reducedMotion ? 0 : 1.2} rotationIntensity={0.5} floatIntensity={0.9}>
      <mesh ref={ref} scale={1.1}>
        <torusKnotGeometry args={[0.85, 0.28, 220, 32]} />
        <meshStandardMaterial
          color={isDark ? "#22d3ee" : "#2563eb"}
          emissive={isDark ? "#0ea5e9" : "#1d4ed8"}
          emissiveIntensity={isDark ? 0.35 : 0.18}
          metalness={1}
          roughness={0.12}
        />
      </mesh>
    </Float>
  );
}

function Ring({ radius, tilt, color, speed, reducedMotion }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.018, 18, 140]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} metalness={1} roughness={0.2} />
    </mesh>
  );
}

/** A solid that continuously self-rotates AND drifts on an orbit path through depth. */
function DriftingSolid({ type, color, radius, speed, phase, height, scale, reducedMotion }) {
  const ref = useRef();
  const spin = useMemo(
    () => ({ x: 0.2 + Math.random() * 0.5, y: 0.2 + Math.random() * 0.5, z: 0.1 + Math.random() * 0.3 }),
    []
  );

  const geometry = useMemo(() => {
    switch (type) {
      case "octa":
        return <octahedronGeometry args={[1, 0]} />;
      case "tetra":
        return <tetrahedronGeometry args={[1.2, 0]} />;
      case "dodeca":
        return <dodecahedronGeometry args={[0.95, 0]} />;
      case "box":
        return <boxGeometry args={[1.1, 1.1, 1.1]} />;
      case "torus":
        return <torusGeometry args={[0.7, 0.26, 20, 60]} />;
      default:
        return <icosahedronGeometry args={[1, 0]} />;
    }
  }, [type]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    if (reducedMotion) return;
    const t = state.clock.elapsedTime * speed + phase;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius - 1;
    ref.current.position.y = height + Math.sin(t * 1.3) * 0.4;
    ref.current.rotation.x += delta * spin.x;
    ref.current.rotation.y += delta * spin.y;
    ref.current.rotation.z += delta * spin.z;
  });

  return (
    <mesh ref={ref} scale={scale} position={[Math.cos(phase) * radius, height, Math.sin(phase) * radius - 1]}>
      {geometry}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.18} metalness={0.95} roughness={0.18} />
    </mesh>
  );
}

function Rig({ reducedMotion }) {
  const { camera, pointer } = useThree();
  useFrame(() => {
    if (reducedMotion) return;
    camera.position.lerp(new THREE.Vector3(pointer.x * 1.3, pointer.y * 0.9, 6.5), 0.04);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroSceneContent({ isDark = true, reducedMotion = false }) {
  const accent = isDark ? "#22d3ee" : "#3b82f6";
  const accent2 = isDark ? "#a855f7" : "#7c3aed";
  const accent3 = isDark ? "#f472b6" : "#db2777";

  const solids = useMemo(
    () => [
      { type: "octa", color: accent, radius: 3.0, speed: 0.25, phase: 0.0, height: 1.2, scale: 0.5 },
      { type: "dodeca", color: accent2, radius: 3.6, speed: -0.2, phase: 1.1, height: -1.4, scale: 0.55 },
      { type: "tetra", color: accent3, radius: 2.7, speed: 0.3, phase: 2.4, height: 1.8, scale: 0.42 },
      { type: "box", color: accent, radius: 4.0, speed: -0.16, phase: 3.3, height: -0.6, scale: 0.45 },
      { type: "icosa", color: accent2, radius: 3.2, speed: 0.22, phase: 4.5, height: 0.2, scale: 0.5 },
      { type: "torus", color: accent3, radius: 2.5, speed: -0.28, phase: 5.6, height: -1.9, scale: 0.5 },
      { type: "octa", color: accent2, radius: 4.3, speed: 0.18, phase: 0.7, height: 2.1, scale: 0.4 },
      { type: "dodeca", color: accent, radius: 2.9, speed: -0.24, phase: 2.0, height: 1.4, scale: 0.46 },
    ],
    [accent, accent2, accent3]
  );

  return (
    <>
      <ambientLight intensity={isDark ? 0.3 : 0.55} />
      <pointLight position={[5, 5, 5]} intensity={isDark ? 80 : 55} color={accent} />
      <pointLight position={[-5, -3, 2]} intensity={isDark ? 60 : 40} color={accent2} />
      <spotLight position={[0, 6, 4]} angle={0.6} penumbra={1} intensity={isDark ? 50 : 30} color="#ffffff" />

      {/* Reflections — the main thing that makes the metal solids look genuinely 3D */}
      <Environment preset={isDark ? "night" : "city"} />

      <Rig reducedMotion={reducedMotion} />

      <CoreKnot isDark={isDark} reducedMotion={reducedMotion} />

      <group rotation={[0.4, 0, 0.2]}>
        <Ring radius={1.9} tilt={1.2} color={accent} speed={0.25} reducedMotion={reducedMotion} />
        <Ring radius={2.4} tilt={-0.6} color={accent2} speed={-0.18} reducedMotion={reducedMotion} />
      </group>

      {solids.map((s, i) => (
        <DriftingSolid key={i} {...s} reducedMotion={reducedMotion} />
      ))}

      <Sparkles count={reducedMotion ? 25 : 70} scale={[14, 9, 8]} size={2} speed={reducedMotion ? 0 : 0.4} color={accent} opacity={0.6} />

      {isDark && <Stars radius={70} depth={45} count={1400} factor={3} saturation={0} fade speed={0.5} />}

      <EffectComposer>
        <Bloom intensity={isDark ? 0.55 : 0.3} luminanceThreshold={0.45} luminanceSmoothing={0.85} mipmapBlur />
      </EffectComposer>
    </>
  );
}
