import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Base width from design
const BASE_WIDTH = 466;

export const scale = (size: number) => {
  return (size * width) / BASE_WIDTH;
};
