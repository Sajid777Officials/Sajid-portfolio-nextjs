"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const particlesCount = 4200;

function createParticlePositions() {
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }

  return positions;
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particlePositions = useMemo(() => createParticlePositions(), []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.x = state.pointer.y * 0.28;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05 + state.pointer.x * 0.5;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00ffcc"
        sizeAttenuation
        transparent
        opacity={0.78}
      />
    </points>
  );
}

export default function ParticleMatrix() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.7]}>
        <Particles />
      </Canvas>
    </div>
  );
}
