import { FightStyle } from '../types';

/**
 * Returns the image source for the given move or idle state
 */
export const getImageSource = (isAnimating: boolean, currentMove: FightStyle) => {
  if (!isAnimating) {
    return require('../../assets/idle.png');
  }
  
  switch (currentMove) {
    case 'punch':
      return require('../../assets/left-punch.png');
    case 'kick':
      return require('../../assets/kick.png');
    case 'rightPunch':
      return require('../../assets/right-punch.png');
    default:
      return require('../../assets/idle.png');
  }
};

/**
 * Returns the color for the given move type
 */
export const getMoveColor = (moveType: FightStyle): string => {
  switch (moveType) {
    case 'punch':
      return '#ff7043'; // orange
    case 'kick':
      return '#7e57c2'; // purple
    case 'rightPunch':
      return '#42a5f5'; // blue
    default:
      return '#e0e0e0';
  }
}; 