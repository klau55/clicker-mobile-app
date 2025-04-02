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

export const getMoveColor = (moveType: FightStyle): string => {
  switch (moveType) {
    case 'punch':
      return '#D36B00';
    case 'kick':
      return '#2666CF';
    case 'rightPunch':
      return '#9B0000';
    default:
      return '#e0e0e0';
  }
};
