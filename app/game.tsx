import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { useMotion } from '@/lib/hooks/use-motion';
import { isDeviceMoving, getRandomFace } from '@/lib/sensors/motion-engine';
import { CyberDice } from '@/components/CyberDice';

export default function GameScreen() {
  const [val, setVal] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [hasBeenRolled, setHasBeenRolled] = useState(false); // Nuevo: control de visibilidad
  const { coords, force } = useMotion();

  const startRoll = () => {
    if (isRolling) return;
    setHasBeenRolled(true); // Aparece el dado
    setIsRolling(true);
    setTimeout(() => {
      setVal(getRandomFace());
      setIsRolling(false);
    }, 1200);
  };

  useEffect(() => {
    if (isDeviceMoving(coords) && !isRolling) {
      startRoll();
    }
  }, [coords]);

  return (
    <View className="flex-1 bg-[#000000]">
      <View className="h-[65%]">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} color="#00f2ff" intensity={2.5} />
            <CyberDice rolling={isRolling} value={val} visible={hasBeenRolled} />
        </Canvas>
      </View>

      <View className="flex-1 bg-black border-t-2 border-[#00f2ff] p-6 items-center">
        {!hasBeenRolled ? (
          <Text className="text-[#00f2ff] font-bold text-center text-xl mb-4 animate-pulse">
            SISTEMA LISTO... AGITE PARA LANZAR
          </Text>
        ) : (
          <>
            <Text className="text-[#00f2ff] font-black text-4xl mb-2">
              {isRolling ? "PROCESANDO..." : `RESULTADO: ${val}`}
            </Text>
            <Text className="text-[#00f2ff]/40 font-mono mb-6 uppercase">
              Sensor-G: {force.toFixed(2)}
            </Text>
          </>
        )}
        
        <Pressable 
          onPress={startRoll}
          className="bg-[#00f2ff] px-12 py-4 rounded-none shadow-[0_0_15px_#00f2ff]"
        >
          <Text className="text-black font-black text-lg">LANZAMIENTO MANUAL</Text>
        </Pressable>
      </View>
    </View>
  );
}