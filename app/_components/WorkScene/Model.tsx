import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGLTF, OrbitControls, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ScrollControls } from "@react-three/drei";
import { Orbit } from "lucide-react";

export default function Model() {
  const { nodes } = useGLTF("/medias/stylisedplanet.glb");
  const { camera } = useThree();
  const scroll = useScroll();

  const planet = useRef<THREE.Mesh>(null);

  useFrame(() => {
    // Get scroll offset (0 at top, 1 at bottom)

    if (scroll) {
      console.log("??");
      const scrollOffset = scroll.offset;

      // Set camera position based on scroll
      camera.position.z = 9; // Zoom in as we scroll down
      camera.position.y = THREE.MathUtils.lerp(5, 2, scrollOffset);

      // Optional: make the camera look at the planet
      camera.lookAt(planet.current?.position || new THREE.Vector3(0, 0, 0));
    }
  });

  // Set initial camera position

  return (
    <>
      <primitive
        ref={planet}
        object={nodes.Sketchfab_Scene}
        position={[-3, 5, 0]}
      />
    </>
  );
}
