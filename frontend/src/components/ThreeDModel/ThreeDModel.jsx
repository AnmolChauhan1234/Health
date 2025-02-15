import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function ThreeDModel() {
  const modelRef = useRef();
  const { scene } = useGLTF("/models/humanoid.glb");
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!hovered && modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Slow rotation
    }
  });

  const handlePointerMove = (event) => {
    if (!modelRef.current) return;
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    const xRotation = (clientY / innerHeight - 0.5) * Math.PI;
    const yRotation = (clientX / innerWidth - 0.5) * Math.PI;

    modelRef.current.rotation.x = -xRotation * 0.5; // Reduce effect
    modelRef.current.rotation.y = yRotation * 0.5;
  };

  return (
    <group position={[0, -1, 0]}>
      <primitive
        ref={modelRef}
        object={scene}
        scale={[1.5, 1.5, 1.5]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerMove={handlePointerMove}
      />
    </group>
  );
}

export default ThreeDModel;
