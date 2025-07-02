import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ThreeDModel from "./ThreeDModel";

function Scene() {
  return (
    <Canvas camera={{ position: [0, 1, 5], fov: 50 }} className="w-full h-full">
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} position={[5, 5, 5]} />
      <ThreeDModel />
      <OrbitControls enableZoom={false} /> {/* Disable zoom for better UX */}
    </Canvas>
  );
}

export default Scene;
