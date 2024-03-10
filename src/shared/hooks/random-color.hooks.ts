import { COLORS } from '@/src/constant/colors.constant';
import { useState } from 'react';

export const useRandomColor = () => {
  const [color, setColor] = useState('');
  const colors = [COLORS.MAROON, COLORS.SECONDARY, COLORS.THIRD];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const updateRandomColor = () => {
    const newColor = getRandomColor();
    setColor(newColor);
  };

  return { color, updateRandomColor };
};
