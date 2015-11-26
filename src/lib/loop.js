import {info} from './log';

const schedule = (closure) => {
  // window.requestAnimationFrame(closure);
  setTimeout(closure, 100);
};

const enterFrame = (update, draw, previousState) => () => {
  const state = update(previousState);
  draw(state);
  schedule(enterFrame(
    update,
    draw,
    state.set('time', updateTime(state.get('time'), Date.now))
  ));
};

export const updateTime = (time, now) => {
  const lastUpdatedAt = time.get('updatedAt');
  let delta = -1;
  if (lastUpdatedAt === -1) {
    delta = 0;
  } else {
    delta = now - lastUpdatedAt;
  }
  if (delta > 1000) {
    throw new Error(`Delta too high ${delta}`);
  }

  return time
    .set('updatedAt', now)
    .set('delta', delta)
    .set('gameTime', time.get('gameTime') + delta);
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
  enterFrame(
    update,
    draw,
    initialState.set('time', updateTime(initialState.get('time'), Date.now()))
  )();
};
