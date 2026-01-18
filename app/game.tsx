import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { useMotion } from '@/src/lib/hooks/use-motion';
import { isDeviceMoving, getRandomFace } from '@/src/lib/sensors/motion-engine';
import { CyberDice } from '@/src/components/CyberDice';

export default function GameScreen() {
  const [val, setVal] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const { coords, force } = useMotion();

  const startRoll = () => {
    if (isRolling) return;
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
    <View className="flex-1 bg-[#050505]">
      <View className="h-2/3">
        <Canvas>
          <ambientLight intensity={0.8} />
          <pointLight position={[5, 5, 5]} color="#fbbf24" />
          <CyberDice rolling={isRolling} value={val} />
        </Canvas>
      </View>

      <View className="flex-1 bg-yellow-400 p-6 rounded-t-[40px] items-center">
        <Text className="text-black font-black text-4xl mb-2">{isRolling ? "GIRANDO..." : `VALOR: ${val}`}</Text>
        <Text className="text-black/60 font-medium mb-6 uppercase tracking-tighter">Fuerza G: {force.toFixed(2)}</Text>
        
        <Pressable 
          onPress={startRoll}
          className="bg-black px-12 py-4 rounded-full"
        >
          <Text className="text-yellow-400 font-bold text-lg">LANZAR MANUAL</Text>
        </Pressable>
      </View>
    </View>
  );
}