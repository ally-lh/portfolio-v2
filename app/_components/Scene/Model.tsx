import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MeshTransmissionMaterial, useGLTF, Text3D } from "@react-three/drei";

import { useFrame, useThree, extend } from "@react-three/fiber";
import { useControls } from "leva";
import { useDrag } from "@use-gesture/react";
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

extend({ TextGeometry });

export default function Model() {
  const { nodes } = useGLTF("/medias/torrus.glb");
  const { viewport, gl, camera } = useThree();

  const torus = useRef<THREE.Mesh>(null);
  const [rotationSpeed, setRotationSpeed] = useState({ x: 0.01, y: 0.01 });
  const [dragging, setDragging] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  // Dragging logic to update the rotation speed
  const bindDrag = useDrag(
    ({ delta: [dx, dy], memo = rotationSpeed, active }) => {
      setDragging(active);
      setIsAutoRotating(false); // Disable auto-rotation while dragging

      if (torus.current) {
        torus.current.rotation.y += dx * 0.01;
        torus.current.rotation.x += dy * 0.01;
      }

      // Update rotation speed based on drag distance while dragging
      if (active) {
        setRotationSpeed({ x: dy * 0.01, y: dx * 0.01 });
      }

      return memo;
    }
  );

  useFrame(() => {
    if (torus.current) {
      if (dragging) {
        // Apply drag-induced rotation
        torus.current.rotation.x += rotationSpeed.x;
        torus.current.rotation.y += rotationSpeed.y;
      } else if (!isAutoRotating) {
        // Decay rotation speed gradually when not dragging
        setRotationSpeed((speed) => ({
          x: speed.x * 0.95, // Slower decay for gradual stop
          y: speed.y * 0.95,
        }));

        // Apply the decayed speed for a smooth slow-down effect
        torus.current.rotation.x += rotationSpeed.x;
        torus.current.rotation.y += rotationSpeed.y;

        // Check if rotation speed is below the threshold to switch to auto-rotation
        if (
          Math.abs(rotationSpeed.x) < 0.01 &&
          Math.abs(rotationSpeed.y) < 0.01
        ) {
          setIsAutoRotating(true);
        }
      } else {
        // Auto-rotation when fully stopped
        torus.current.rotation.x += 0.005;
        torus.current.rotation.y += 0.005;
      }
    }
  });

  const materialProps = useControls({
    thickness: { value: 0.45, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true },
  });

  return (
    <group scale={viewport.width / 3.75}>
      <mesh
        ref={torus}
        position={[0, 0, 0]}
        geometry={(nodes.Torus002 as THREE.Mesh).geometry}
        material={(nodes.Torus002 as THREE.Mesh).material}
        {...bindDrag()}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>

      <Text3D
        font={require("../../fonts/Poppins_Bold.json")}
        size={0.6}
        height={0.01}
        position={[-2.3, -0.25, -1]}
      >
        Allison Loo
        <meshStandardMaterial attach="material" color={"white"} />{" "}
      </Text3D>
      {/* <AnimatedScrollingText /> */}
    </group>
  );
}
