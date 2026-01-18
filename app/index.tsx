import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas } from '@react-three/fiber/native'; // CAMBIO CLAVE PARA CELULAR
import { Physics, RigidBody } from '@react-three/rapier';
import { PhysicsCube } from '../components/PhysicsCube';
import { THEME } from '../lib/constants/theme';

export default function Home() {
  return (
    <View style={styles.container}>
      <Canvas 
        shadows 
        camera={{ position: [0, 8, 12], fov: 35 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight 
          position={[10, 10, 10]} 
          intensity={THEME.lightIntensity} 
          castShadow 
        />

        <Physics>
          <PhysicsCube position={[0, 5, 0]} />

          {/* Suelo estático */}
          <RigidBody type="fixed">
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
              <planeGeometry args={[50, 50]} />
              <meshStandardMaterial color={THEME.groundColor} />
            </mesh>
          </RigidBody>
        </Physics>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});