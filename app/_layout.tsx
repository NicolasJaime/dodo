import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import '../global.css';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          // Fondo negro sólido para evitar fugas de color de la app de tu amigo
          contentStyle: { backgroundColor: '#000000' },
          animation: 'fade_from_bottom', 
        }}
      >
        {/* Pantalla de inicio */}
        <Stack.Screen name="index" />
        
        {/* Pantalla del juego con animación de diapositiva vertical */}
        <Stack.Screen 
          name="game" 
          options={{
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}