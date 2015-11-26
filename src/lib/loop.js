import {info} from './log';

const enterFrame = (update, draw, previousState) => () => {
  const state = update(previousState);
  draw(state);
  window.requestAnimationFrame(enterFrame(update, draw, state));
  // setTimeout(enterFrame(update, draw, state), 500);
};

/**
 * Function starts a game loop, which then attempts to invoke `update` and
 * `draw` functions passed in argumates at 60 frames per second.
 *
 * @function startLoop
 * @param {Function} update - Reference to update function that should update state.
 * @param {Function} draw - Reference to draw function that should redraw screen.
 * @param {Object} initialState - Initial state of a game.
 */
export const startLoop = (update, draw, initialState) => {
  enterFrame(update, draw, initialState)();
};
