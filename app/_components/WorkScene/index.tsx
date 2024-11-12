"use client";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment, ScrollControls } from "@react-three/drei";

export default function Index() {
  return (
    <section className=" ">
      <Canvas
        style={{
          width: "20vw", // Full width of the viewport
          height: "100%",
        }}
      >
        <ambientLight />
        <directionalLight position={[10, 10, 10]} />
        <Model /> {/* Assuming Model is the component with your 3D scene */}
      </Canvas>
    </section>
  );
}
