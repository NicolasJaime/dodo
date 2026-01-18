export const SHAKE_POWER = 1.85; // Umbral personalizado
export const REFRESH_RATE = 80;  // Más rápido que el original

export interface Coords {
  x: number;
  y: number;
  z: number;
}

export const getGForce = (c: Coords): number => {
  return Math.sqrt(c.x ** 2 + c.y ** 2 + c.z ** 2);
};

export const getRandomFace = (): number => Math.floor(Math.random() * 6) + 1;

export const isDeviceMoving = (coords: Coords): boolean => {
  return getGForce(coords) > SHAKE_POWER;
};