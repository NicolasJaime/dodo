import { useRef } from 'react';
import { RapierRigidBody } from '@react-three/rapier';

export const usePhysicsLogic = () => {
  const rigidBodyRef = useRef<RapierRigidBody>(null!);

  const jump = () => {
    if (rigidBodyRef.current) {
      // Impulso hacia arriba al tocar el cubo
      rigidBodyRef.current.applyImpulse({ x: 0, y: 5, z: 0 }, true);
    }
  };

  return { rigidBodyRef, jump };
};