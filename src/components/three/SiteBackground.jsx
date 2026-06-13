"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useThemeMode, usePrefersReducedMotion } from "../../hooks/useThemeMode";

function FloatingSolid({ type, color, radius, speed, phase, height, scale, reducedMotion }) {
  const ref = useRef();
  const spin = useMemo(
    () => ({ x: 0.1 + Math.random() * 0.3, y: 0.1 + Math.random() * 0.3, z: 0.05 + Math.random() * 0.2 }),
    []
  );

  const geometry = useMemo(() => {
    switch (type) {
      case "octa":
        return <octahedronGeometry args={[1, 0]} />;
      case "dodeca":
        return <dodecahedronGeometry args={[0.95, 0]} />;
      case "box":
        return <boxGeometry args={[1.1, 1.1, 1.1]} />;
      case "torus":
        return <torusGeometry args={[0.7, 0.25, 16, 48]} />;
      default:
        return <icosahedronGeometry args={[1, 0]} />;
    }
  }, [type]);

  useFrame((state, delta) => {
    if (!ref.current || reducedMotion) return;
    const t = state.clock.elapsedTime * speed + phase;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius - 2;
    ref.current.position.y = height + Math.sin(t * 1.2) * 0.5;
    ref.current.rotation.x += delta * spin.x;
    ref.current.rotation.y += delta * spin.y;
    ref.current.rotation.z += delta * spin.z;
  });

  return (
    <mesh ref={ref} scale={scale} position={[Math.cos(phase) * radius, height, Math.sin(phase) * radius - 2]}>
      {geometry}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} metalness={0.9} roughness={0.25} />
    </mesh>
  );
}

function Parallax({ reducedMotion }) {
  const { camera, pointer } = useThree();
  useFrame(() => {
    if (reducedMotion) return;
    camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 0.5 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene({ isDark, reducedMotion }) {
  const accent = isDark ? "#22d3ee" : "#60a5fa";
  const accent2 = isDark ? "#a855f7" : "#a78bfa";
  const accent3 = isDark ? "#f472b6" : "#f0abfc";

  const solids = useMemo(
    () => [
      { type: "octa", color: accent, radius: 5.5, speed: 0.12, phase: 0.0, height: 2.2, scale: 0.7 },
      { type: "dodeca", color: accent2, radius: 6.2, speed: -0.1, phase: 1.4, height: -2.4, scale: 0.8 },
      { type: "icosa", color: accent3, radius: 4.8, speed: 0.14, phase: 2.7, height: 0.4, scale: 0.65 },
      { type: "box", color: accent, radius: 7.0, speed: -0.08, phase: 3.9, height: 1.4, scale: 0.6 },
      { type: "torus", color: accent2, radius: 5.0, speed: 0.11, phase: 5.1, height: -1.2, scale: 0.7 },
      { type: "icosa", color: accent3, radius: 6.6, speed: -0.13, phase: 0.8, height: 3.0, scale: 0.55 },
      { type: "octa", color: accent, radius: 4.4, speed: 0.16, phase: 2.2, height: -3.0, scale: 0.6 },
    ],
    [accent, accent2, accent3]
  );

  return (
    <>
      <ambientLight intensity={isDark ? 0.25 : 0.5} />
      <pointLight position={[6, 6, 6]} intensity={isDark ? 70 : 45} color={accent} />
      <pointLight position={[-6, -4, 3]} intensity={isDark ? 55 : 35} color={accent2} />
      <Environment preset={isDark ? "night" : "dawn"} />

      <Parallax reducedMotion={reducedMotion} />

      {solids.map((s, i) => (
        <FloatingSolid key={i} {...s} reducedMotion={reducedMotion} />
      ))}

      <Sparkles count={reducedMotion ? 20 : 50} scale={[20, 14, 12]} size={2} speed={reducedMotion ? 0 : 0.3} color={accent} opacity={0.5} />

      <EffectComposer>
        <Bloom intensity={isDark ? 0.4 : 0.2} luminanceThreshold={0.5} luminanceSmoothing={0.85} mipmapBlur />
      </EffectComposer>
    </>
  );
}

export default function SiteBackground() {
  const [mounted, setMounted] = useState(false);
  const isDark = useThemeMode();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <Suspense fallback={null}>
          <Scene isDark={isDark} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
