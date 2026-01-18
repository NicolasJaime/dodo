import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// Usamos la misma paleta neón para que todo el sistema sea coherente
const NEON_COLORS = [
  "#00f2ff", // Azul
  "#ff00ff", // Rosa
  "#39ff14", // Verde
  "#ffea00", // Amarillo Volt
  "#fe0000", // Rojo
];

export default function Welcome() {
  const router = useRouter();
  const [colorIndex, setColorIndex] = useState(0);

  // Efecto para cambiar el color automáticamente cada 1.5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % NEON_COLORS.length);
    }, 1500); // Puedes bajarlo a 500 si quieres que cambie muy rápido

    return () => clearInterval(interval);
  }, []);

  const activeColor = NEON_COLORS[colorIndex];

  return (
    <View className="flex-1 bg-black items-center justify-center p-6">
      <StatusBar style="light" />
      
      {/* El borde y el texto ahora usan el estilo dinámico */}
      <View 
        style={{ borderColor: activeColor, shadowColor: activeColor, shadowOpacity: 0.8, shadowRadius: 15, elevation: 10 }}
        className="border-2 p-8 mb-10 rotate-3"
      >
        <Text 
          style={{ color: activeColor }}
          className="text-6xl font-black italic"
        >
          DODO
        </Text>
      </View>
      
      <TouchableOpacity 
        onPress={() => router.push('/game')}
        style={{ backgroundColor: activeColor }}
        className="w-full py-5 items-center skew-x-[-12deg]"
      >
        <Text className="text-black font-black text-xl uppercase tracking-widest">
          JUGAR
        </Text>
      </TouchableOpacity>

      <Text className="text-white/20 absolute bottom-10 font-mono text-[10px]">
        v2.0 // NEON_ENGINE
      </Text>
    </View>
  );
}