"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  MeshTransmissionMaterial,
  useGLTF,
  Text3D,
  PerspectiveCamera,
  OrbitControls,
  useAnimations,
  SoftShadows,
} from "@react-three/drei";

import { useFrame, useThree, extend } from "@react-three/fiber";
import { useControls } from "leva";
import { useDrag } from "@use-gesture/react";
import * as THREE from "three";

function Robot() {
  // Load GLTF model and animations
  const { nodes, scene, animations } = useGLTF("medias/flyingRobot.glb");

  // Set up animation hooks
  const { actions, names } = useAnimations(animations);

  const robotRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null); // Animation mixer reference

  scene.traverse((object) => {
    if ((object as THREE.Mesh).isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

  useEffect(() => {
    if (animations.length > 0 && robotRef.current) {
      // Create an animation mixer to handle the animations
      const mixer = new THREE.AnimationMixer(robotRef.current);
      mixerRef.current = mixer;

      // Create AnimationAction from the first animation clip (assuming only one animation here)
      const action = mixer.clipAction(animations[0]);
      action.reset().fadeIn(0.5).play(); // Start the animation

      // Clean up when the component is unmounted

      return () => {
        mixer.stopAllAction();
      };
    }
  }, [animations]);

  useFrame((state, delta) => {
    // Update the animation mixer on each frame
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  useEffect(() => {
    // Adjust the rotation to make the robot face the camera on load
    if (robotRef.current) {
      robotRef.current.rotation.y = -(Math.PI / 1.5); // Rotate the robot 180 degrees so it's facing the camera
      robotRef.current.position.x = 2;
      robotRef.current.position.y = 1;
    }
  }, []);

  return <primitive object={scene} ref={robotRef} receiveShadow />;
}

export default function Index() {
  const [aspectRatio, setAspectRatio] = useState(1);
  const robotRef = useRef();

  useEffect(() => {
    // Update aspect ratio once window is available
    setAspectRatio(window.innerWidth / window.innerHeight);

    // Optional: handle resizing
    const handleResize = () => {
      setAspectRatio(window.innerWidth / window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const perspectiveConfig = {
    fov: 10,
    aspect: aspectRatio,
    near: 0.1,
    far: 1000,
  };

  const { debug, enabled, samples, ...config } = useControls({
    debug: true,
    enabled: true,
    size: { value: 35, min: 0, max: 100, step: 0.1 },
    focus: { value: 0.5, min: 0, max: 2, step: 0.1 },
    samples: { value: 16, min: 1, max: 40, step: 1 },
  });

  return (
    <Canvas
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10,
      }}
      shadows
    >
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 20]}
        {...perspectiveConfig}
      />

      <ambientLight intensity={0.5} position={[1, 1, 1]} />
      <pointLight
        position={[0.3, 3, 1]}
        intensity={5}
        castShadow
        shadow-mapSize={2048}
        shadow-bias={-0.0001}
      />
      <spotLight intensity={1} position={[1, 2, 2]} castShadow />
      <SoftShadows {...config} samples={samples} />

      {/* Optional: Add AxesHelper to understand scene orientation */}
      <axesHelper args={[5]} />

      <Robot />
    </Canvas>
  );
}
