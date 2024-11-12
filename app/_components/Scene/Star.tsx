import React, { useEffect, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";

interface StarProps {
  position: [number, number, number];
  size: number;
}

const Star: React.FC<StarProps> = ({ position, size }) => {
  const [opacity, setOpacity] = useState(1);
  const flickerInterval = Math.random() * 1000 + 500; // Random interval between 500ms and 1500ms

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity((prev) => (prev === 1 ? 0 : 1)); // Toggle opacity between 0 and 1
    }, flickerInterval);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [flickerInterval]);
  return (
    <animated.mesh position={position} scale={[size, size, size]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="white" transparent opacity={opacity} />
    </animated.mesh>
  );
};

const StarryBackground = ({ starCount = 100 }) => {
  const stars = useMemo(() => {
    const starArray = [];
    for (let i = 0; i < starCount; i++) {
      const position: [number, number, number] = [
        (Math.random() - 0.5) * 10, // Random x position
        (Math.random() - 0.5) * 10, // Random y position
        (Math.random() - 0.5) * 10, // Random z position
      ];
      const size = Math.random() * 0.1 + 0.05; // Random size between 0.05 and 0.25
      starArray.push({ position, size });
    }
    return starArray;
  }, [starCount]);

  return (
    <>
      {stars.map((star, index) => (
        <Star key={index} position={star.position} size={star.size} />
      ))}
    </>
  );
};

export default StarryBackground;
