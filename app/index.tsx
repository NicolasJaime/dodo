import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Welcome() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-black items-center justify-center p-6">
      <StatusBar style="light" />
      <View className="border-2 border-yellow-400 p-8 mb-10 rotate-3">
        <Text className="text-yellow-400 text-6xl font-black italic">VOLT-DICE</Text>
      </View>
      
      <TouchableOpacity 
        onPress={() => router.push('/game')}
        className="bg-yellow-400 w-full py-5 items-center skew-x-[-12deg]"
      >
        <Text className="text-black font-bold text-xl uppercase tracking-widest">Inicializar Sistema</Text>
      </TouchableOpacity>
    </View>
  );
}