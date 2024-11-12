"use client";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment } from "@react-three/drei";
import StarryBackground from "./Star";

export default function Index() {
  return (
    <Canvas
      style={{
        width: "100vw", // Full width of the viewport
        height: "90vh",
        overflow: "hidden",
        zIndex: 2,
      }}
    >
      <Model />
      <directionalLight intensity={2} position={[0, 2, 3]} />
      <Environment preset="city" />
      <StarryBackground starCount={100} />
    </Canvas>
  );
}
