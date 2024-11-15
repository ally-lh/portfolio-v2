import React, { useEffect, useRef, useImperativeHandle } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

// Forward ref with explicit typing
const Robot = React.forwardRef<THREE.Group, any>((props, ref) => {
  // Load GLTF model and animations
  const { scene, animations } = useGLTF("medias/flyingRobot.glb");

  // Animation hooks
  const { actions } = useAnimations(animations);

  // Internal robot ref to manage 3D object
  const robotRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    // Set up the animation
    if (animations.length > 0 && robotRef.current) {
      const mixer = new THREE.AnimationMixer(robotRef.current);
      mixerRef.current = mixer;
      const action = mixer.clipAction(animations[0]);
      action.reset().fadeIn(0.5).play(); // Start the animation

      return () => {
        mixer.stopAllAction();
      };
    }
  }, [animations]);

  useEffect(() => {
    if (robotRef.current) {
      robotRef.current.rotation.y = -(Math.PI / 1.5);
      robotRef.current.position.x = 2;
      robotRef.current.position.y = 1;
    }
  }, []);

  useImperativeHandle(ref, () => ({
    // Expose the robotRef's 3D object so that the parent can access it
    get robot() {
      return robotRef.current;
    },
  }));

  return <primitive object={scene} ref={robotRef} {...props} receiveShadow />;
});

export default Robot;
