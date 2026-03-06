// components/canvas/ParticleMatrix.tsx
"use client";
// @ts-nocheck

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// React কম্পোনেন্টের বাইরে পার্টিকেল তৈরি করা হচ্ছে (এটি এখন 100% Pure)
const particlesCount = 5000;
const particlePositions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
  particlePositions[i * 3] = (Math.random() - 0.5) * 15; // X axis
  particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 15; // Y axis
  particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 15; // Z axis
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  // Using useFrame to rotate the particles and react to mouse movement
  useFrame((state) => {
    if (pointsRef.current) {
      // Auto-rotation based on elapsed time
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      // Reacts to mouse pointer position
      pointsRef.current.rotation.x = state.pointer.y * 0.3;
      pointsRef.current.rotation.y += state.pointer.x * 0.5;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlePositions, 3]} // Using the positions generated outside
        />
      </bufferGeometry>
      {/* Define particle size, color, and transparency */}
      <pointsMaterial 
        size={0.03} 
        color="#00ffcc" 
        sizeAttenuation={true} 
        transparent 
        opacity={0.8} 
      />
    </points>
  );
}

export default function ParticleMatrix() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Particles />
      </Canvas>
    </div>
  );
}