import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import { Coords, getGForce } from '../sensors/motion-engine';

export function useMotion() {
  const [motion, setMotion] = useState<Coords>({ x: 0, y: 0, z: 0 });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const startSensor = async () => {
      const { status } = await Accelerometer.requestPermissionsAsync();
      if (status !== 'granted') return;

      Accelerometer.setUpdateInterval(80);
      const sub = Accelerometer.addListener(data => {
        setMotion(data);
        setIsReady(true);
      });
      return sub;
    };

    let subscription: any;
    startSensor().then(s => subscription = s);

    return () => subscription?.remove();
  }, []);

  return { 
    coords: motion, 
    force: getGForce(motion), 
    isReady 
  };
}