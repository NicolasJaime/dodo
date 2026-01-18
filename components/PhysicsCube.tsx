import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { usePhysicsLogic } from '../lib/hooks/physics-logic';

export function PhysicsCube(props: any) {
  const { rigidBodyRef, jump } = usePhysicsLogic();

  return (
    <RigidBody 
      {...props}
      ref={rigidBodyRef} 
      colliders="cuboid" 
      onPointerDown={jump} // En /native esto detecta el "tap"
    >
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </RigidBody>
  );
}