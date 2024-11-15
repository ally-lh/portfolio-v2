"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Text3D, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree, extend, Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  ToneMapping,
} from "@react-three/postprocessing";
import { useControls } from "leva"; // Import Leva's useControls

import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

extend({ TextGeometry });

function MovingSpotlight() {
  const spotlightRef = useRef<THREE.SpotLight>(null);

  // Circular motion logic for the spotlight
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const xRadius = 10; // Larger X radius for the flat oval
    const yRadius = 2.9; // Smaller Y radius for the flat oval
    const speed = 0.5;

    if (spotlightRef.current) {
      spotlightRef.current.position.x = xRadius * Math.cos(time * speed) - 1; // Scaled X position
      spotlightRef.current.position.y = yRadius * Math.sin(time * speed) + 1; // Scaled Y position
      spotlightRef.current.position.z = 3; // Fixed Z position
    }
  });

  return (
    <spotLight ref={spotlightRef} intensity={70} penumbra={0.5} castShadow />
  );
}

export default function Index() {
  const { levels, intensity } = useControls({
    intensity: { value: 0.4, min: 0, max: 1.5, step: 0.01 },
    levels: { value: 8, min: 1, max: 9, step: 1 },
  });
  const {
    color,
    roughness,
    clearcoat,
    clearcoatRoughness,
    bevelThickness,
    bevelSize,
    bevelSegments,
    bevelOffset,
  } = useControls({
    color: { value: "#ffffff" },
    roughness: { value: 0, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { value: 0.15, min: 0, max: 1, step: 0.01 },
    bevelThickness: { value: 0.1, min: 0, max: 0.2, step: 0.01 },
    bevelSize: { value: 0.06, min: 0, max: 0.2, step: 0.01 },
    bevelSegments: { value: 25, min: 0, max: 40, step: 1 },
    bevelOffset: { value: 0, min: 0, max: 1, step: 0.01 },
  });
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100vh",
      }}
      shadows
    >
      <ambientLight intensity={0.5} position={[1, 1, 1]} />

      <MovingSpotlight />

      <pointLight position={[-2, -2, -2]} color="white" />
      <Text3D
        font={require("../../fonts/Poppins_Bold.json")}
        size={1.6}
        height={0.01}
        position={[-6, -0.25, -1]}
        bevelEnabled={true}
        bevelThickness={bevelThickness} // Use Leva-controlled bevelThickness
        bevelSize={bevelSize} // Use Leva-controlled bevelSize
        bevelOffset={bevelOffset}
        bevelSegments={bevelSegments} // Use Leva-controlled bevelSegments
      >
        My Works.
        <meshPhysicalMaterial
          color={color} // Leva-controlled color
          roughness={roughness} // Leva-controlled roughness
          clearcoat={clearcoat} // Leva-controlled clearcoat
          clearcoatRoughness={clearcoatRoughness} // Leva-controlled clearcoatRoughness
        />
        {/* <EffectComposer enableNormalPass>
          <Bloom
            mipmapBlur
            luminanceThreshold={1}
            levels={9} // Define a value for levels
            intensity={intensity * 4}
          />
          <ToneMapping />
        </EffectComposer> */}
      </Text3D>
    </Canvas>
  );
}
