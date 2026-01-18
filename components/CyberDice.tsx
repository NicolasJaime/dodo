import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber/native';
import * as THREE from 'three';

const FACE_ROTATIONS: any = {
  1: [0, 0, 0],
  2: [0, Math.PI / 2, 0],
  3: [Math.PI / 2, 0, 0],
  4: [-Math.PI / 2, 0, 0],
  5: [0, -Math.PI / 2, 0],
  6: [Math.PI, 0, 0],
};

export const CyberDice = ({ rolling, value }: { rolling: boolean; value: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (rolling) {
      meshRef.current.rotation.x += 0.4;
      meshRef.current.rotation.y += 0.3;
    } else {
      const target = FACE_ROTATIONS[value] || [0, 0, 0];
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, target[0], 0.15);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, target[1], 0.15);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, target[2], 0.15);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color="#111" 
        emissive="#fbbf24" 
        emissiveIntensity={0.2} 
        roughness={0.3}
      />
      {/* Bordes neón */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(2, 2, 2)]} />
        <lineBasicMaterial color="#fbbf24" linewidth={2} />
      </lineSegments>
    </mesh>
  );
};