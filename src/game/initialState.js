import {createPlayerSprite} from '../drawing/player';
import {GameState} from './state/game';
import {PlayerState} from './state/player';
import {TimeState} from './state/time';

export const initialState = (inputs) => {
  const player = new PlayerState({sprite: createPlayerSprite()});
  const time = new TimeState();
  
  return new GameState({
    inputs,
    player,
    time
  });
};

// export const createGameState = (inputs) => {
//   const player = new PlayerState({sprite: createPlayerSprite()});
//   return new GameState({
//     inputs: inputs,
//     player: player
//   });
// };
