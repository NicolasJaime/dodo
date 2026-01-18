import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber/native';
import * as THREE from 'three';

const FACE_ROTATIONS: any = {
  1: [0, 0, 0], 2: [0, Math.PI / 2, 0], 3: [Math.PI / 2, 0, 0],
  4: [-Math.PI / 2, 0, 0], 5: [0, -Math.PI / 2, 0], 6: [Math.PI, 0, 0],
};

// Paleta de colores Cyberpunk
const CYBER_COLORS = [
  "#00f2ff", // Azul
  "#ff00ff", // Rosa/Magenta
  "#39ff14", // Verde Neón
  "#fe0000", // Rojo brillante
  "#ffea00", // Amarillo Volt
];

export const CyberDice = ({ rolling, value, visible }: { rolling: boolean; value: number; visible: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Estados para velocidad y color actual
  const [velocity] = useState(() => new THREE.Vector2(0.04, 0.035));
  const [currentColor, setCurrentColor] = useState(CYBER_COLORS[0]);

  const changeColor = () => {
    // Elige un color al azar de la lista que no sea el actual
    const filtered = CYBER_COLORS.filter(c => c !== currentColor);
    const nextColor = filtered[Math.floor(Math.random() * filtered.length)];
    setCurrentColor(nextColor);
  };

  useFrame(() => {
    if (!meshRef.current || !visible) return;

    if (rolling) {
      // Regresar al centro mientras gira
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 0, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 0, 0.1);
      
      meshRef.current.rotation.x += 0.5;
      meshRef.current.rotation.y += 0.4;
    } else {
      // Movimiento de rebote
      meshRef.current.position.x += velocity.x;
      meshRef.current.position.y += velocity.y;

      // Límites de la pantalla (ajustar según fov)
      const boundX = 2.4; 
      const boundY = 4.0;

      // Rebote en X
      if (Math.abs(meshRef.current.position.x) > boundX) {
        velocity.x *= -1;
        changeColor(); // <--- CAMBIO DE COLOR
      }
      // Rebote en Y
      if (Math.abs(meshRef.current.position.y) > boundY) {
        velocity.y *= -1;
        changeColor(); // <--- CAMBIO DE COLOR
      }

      // Orientación según el resultado
      const target = FACE_ROTATIONS[value] || [0, 0, 0];
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, target[0], 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, target[1], 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 10, 0]}>
      <boxGeometry args={[1.8, 1.8, 1.8]} />
      <meshStandardMaterial 
        color="#000" 
        emissive={currentColor} 
        emissiveIntensity={0.8} 
        metalness={1}
      />
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.85, 1.85, 1.85)]} />
        <lineBasicMaterial color={currentColor} linewidth={4} />
      </lineSegments>
    </mesh>
  );
};