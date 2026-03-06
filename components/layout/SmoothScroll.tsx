// components/layout/SmoothScroll.tsx
"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    // ReactLenis wrapper for smooth scrolling.
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {/* @ts-expect-error: Bypassing React 19 type mismatch for Lenis */}
      {children}
    </ReactLenis>
  );
}