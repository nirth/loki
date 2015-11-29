import {
  GameState,
  PlayerState
} from './state';

export const initialGameState = (inputs) => {
  const player = new PlayerState();

  return new GameState({
    inputs,
    player,
  });
};

/**
 * Update function is invoked every frame even when there is no drawing involved.
 * It takes current state, current game time and delta as arguments and returns
 * new game state.
 *
 * @function updateGameState
 * @param {GameState} state - Current game state.
 * @param {number} time - Current game time in milliseconds.
 * @param {number} delta - Current delta between current and previous frame.
 * @return {GameState} - Updated game state.
 */
export const updateGameState = (state, time, delta) => {


  return state;
};
