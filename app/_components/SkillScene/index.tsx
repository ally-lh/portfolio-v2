// src/RotatingBalls.tsx
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import StarryBackground from "../Scene/Star";
import { useSphere, Physics, usePlane } from "@react-three/cannon";

import * as THREE from "three";
import { TextureLoader, PointLightHelper } from "three";
import {
  OrbitControls,
  Decal,
  MeshTransmissionMaterial,
  Environment,
} from "@react-three/drei";

import { useDrag } from "@use-gesture/react";

const logos: string[] = [
  "https://images.ctfassets.net/3mqyxbmvovbz/6hSehfYSVIpqxA3Xhd8my4/9d837a023dd1768ba63fac776ef2a1e4/HTML5_logo_and_wordmark.svg.png?h=250",
  "https://images.ctfassets.net/3mqyxbmvovbz/fKkT9zHCECYKOmhB7bk69/db9239c3308b54ad4c58903467c93983/React-icon.svg.png?h=250",
  "https://images.ctfassets.net/3mqyxbmvovbz/3VzSEFgmIvy9pjUM7MzWsD/fcf2ab9bcbc15750088c9329f7262fdc/Java_programming_language_logo.svg.png?h=250",
  "https://images.ctfassets.net/3mqyxbmvovbz/3piNQPirUtAlfkWpuOYVp4/11867d587be2cdf6b8d6649303980940/Vue.js_Logo_2.svg.png?h=250",
  "https://images.ctfassets.net/3mqyxbmvovbz/5mUB8oMxKvUS55UyJkRIJA/21833947edef45083c720af21bd23528/CSS-Logo.png?h=250",
  "https://images.ctfassets.net/3mqyxbmvovbz/1reYqyRf2PWrqYCAgn7MXG/f7f89406cbf3043fe3280a367b91e331/Adobe_Photoshop_CC_icon.svg.png?h=250",
  "https://images.ctfassets.net/3mqyxbmvovbz/1UpuvnzYYwHFvVJWp3GGBm/0fab5ec96c877f1119902cbd835393cb/JavaScript-logo.png?h=250",
  "https://images.ctfassets.net/3mqyxbmvovbz/KrKx7GtHjZlEgarQZ0cLu/2355680edd5e613de48501ea4658ed9d/nextjs-icon-1024x1024-5et230l7.png?h=250",
  "https://images.ctfassets.net/3mqyxbmvovbz/7n4QJrw6WzlPLGv3cKK4Ef/0d2a709d496a2940ff661b7856a797cc/Typescript_logo_2020.svg.png?h=250",
  "https://images.ctfassets.net/3mqyxbmvovbz/5BYB95QzPZ5Feh49VlS4W3/410833e18a5e2d436b479aa722751882/Adobe_Illustrator_CC_icon.svg.png?h=250",
  "https://images.ctfassets.net/3mqyxbmvovbz/7FIJJivyMNU4LAgWvczYk8/212b3e7846c3210628a113772ae3834c/Figma-logo.svg.png?h=250",
];

const getRandomColor = () => {
  const darkGrey = new THREE.Color(0, 0, 0); // Dark grey color
  const white = new THREE.Color(1, 1, 1); // White color

  // Generate a random factor between 0 and 1
  const randomFactor = Math.random();

  // Interpolate between dark grey and white
  const color = darkGrey.clone().lerp(white, randomFactor);
  return color;
};

interface BallProps {
  position: [number, number, number];

  decalTexture: THREE.Texture;
}

const Ball: React.FC<BallProps> = ({ position, decalTexture }) => {
  const [dragging, setDragging] = useState(false);
  const [ref, api] = useSphere(() => ({
    mass: 10000,
    position,
    args: [1], // Radius of the sphere
    material: { friction: 0.3, restitution: 0.6 },
  }));
  const decalOffset: [number, number, number] = [
    Math.random() * 0.2 - 0.1, // X offset
    Math.random() * 0.2 - 0.1, // Y offset
    Math.random() * 0.2 + 1.01, // Z offset slightly above the sphere
  ];
  const { camera, scene } = useThree();
  const raycaster = new THREE.Raycaster();
  const color = getRandomColor();

  return (
    <mesh
      ref={ref as React.RefObject<THREE.Mesh>}
      castShadow
      receiveShadow
      renderOrder={position[2]}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0} />
      <Decal
        position={[0, 0, 1.01]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
        map={decalTexture}
        renderOrder={position[2]}
      />
    </mesh>
  );
};

const Floor: React.FC = () => {
  const [floorRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -2, 0],
    material: { friction: 0.6, restitution: 0.3 },
  }));

  // Left Wall
  const [leftWallRef] = usePlane(() => ({
    rotation: [0, Math.PI / 2, 0],
    position: [-9, 0, 0],
  }));

  // Right Wall
  const [rightWallRef] = usePlane(() => ({
    rotation: [0, -Math.PI / 2, 0],
    position: [9, 0, 0],
  }));

  // Back Wall
  const [backWallRef] = usePlane(() => ({
    rotation: [0, 0, 0],
    position: [0, -5, -1],
  }));
  const [frontWallRef] = usePlane(() => ({
    rotation: [0, Math.PI, 0], // The front wall is facing opposite the back wall
    position: [0, -5, 5], // Position it at the front
  }));

  return (
    <>
      <mesh ref={floorRef as React.RefObject<THREE.Mesh>} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <MeshTransmissionMaterial
          color="#ffffff"
          metalness={0.5}
          roughness={0.05}
          transmission={0.9} // High transmission for glass effect
          thickness={0.5} // Adjust for thicker glass look
          transparent={true}
        />
      </mesh>
      <mesh ref={leftWallRef as React.RefObject<THREE.Mesh>}>
        <planeGeometry args={[20, 10]} /> {/* Shortened height */}
        <meshStandardMaterial
          color="#888"
          opacity={0} // Low opacity for transparency
          transparent={true}
        />
      </mesh>
      <mesh ref={rightWallRef as React.RefObject<THREE.Mesh>}>
        <planeGeometry args={[20, 10]} /> {/* Shortened height */}
        <meshStandardMaterial
          color="#888"
          opacity={0} // Low opacity for transparency
          transparent={true}
        />
      </mesh>
      <mesh ref={backWallRef as React.RefObject<THREE.Mesh>}>
        <planeGeometry args={[20, 10]} /> {/* Shortened height */}
        <meshStandardMaterial
          color="#888"
          opacity={0} // Low opacity for transparency
          transparent={true}
        />
      </mesh>
      <mesh ref={frontWallRef as React.RefObject<THREE.Mesh>}>
        <planeGeometry args={[20, 10]} /> {/* Shortened height */}
        <meshStandardMaterial
          color="#888"
          opacity={0} // Low opacity for transparency
          transparent={true}
        />
      </mesh>
    </>
  );
};

const Index: React.FC = () => {
  const textures = logos.map((logo) => new TextureLoader().load(logo));

  return (
    <Canvas
      style={{ width: "100%", height: "50vh" }}
      camera={{ position: [0, 0, 20], fov: 20 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 5, 5]} intensity={1} />
      <directionalLight intensity={2} position={[0, 2, 3]} />

      <Physics gravity={[0, -9.81, 0]} allowSleep>
        {textures.map((texture, index) => (
          <Ball
            key={index}
            position={[
              (index % 5) * 1.5 - 3, // X position remains the same
              Math.floor(index / 5) * 2 + 2, // Lowered Y positions
              0,
            ]}
            decalTexture={texture}
          />
        ))}
        <Floor />
      </Physics>

      {/* <EffectComposer>
        <Bloom luminanceThreshold={0.2} intensity={0.3} radius={0.5} />
      </EffectComposer> */}
    </Canvas>
  );
};
export default Index;
