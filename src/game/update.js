import {GameState} from './state/game';
import {PlayerState} from './state/player';
import {TimeState} from './state/time';

export const initialState = (inputs) => {
  const player = new PlayerState();
  const time = new TimeState();

  return new GameState({
    inputs,
    player,
    time
  });
};

/**
 * Update function is invoked every frame even when there is no drawing involved.
 * It takes current state, current game time and delta as arguments and returns
 * new game state.
 *
 * @function update
 * @param {GameState} state - Current game state.
 * @param {number} time - Current game time in milliseconds.
 * @param {number} delta - Current delta between current and previous frame.
 * @return {GameState} - Updated game state.
 */
export const update = (state, time, delta) => {


  return state;
};
