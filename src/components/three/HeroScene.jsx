"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import HeroSceneContent from "./HeroSceneContent";

export default function HeroScene({ isDark = true, reducedMotion = false }) {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <HeroSceneContent isDark={isDark} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}
