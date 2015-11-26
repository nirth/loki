
export const gameTime = () => {
  // TODO: This function should actually return game time.
  return Date.now();
};

export const rafScheduler = (fun) => {
  window.requestAnimationFrame(fun);
};

const createEnterFrame = (gameTime, update, draw) => {
  const enterFrame = (scheduler, previousState, time) => () => {
    const now = gameTime();
    const delta = now - time;

    const state = update(previousState, now, delta);
    // TODO: Implement smarter drawing, it doesn't have to happen all the time.
    draw(state);

    if ('function' === typeof scheduler) {
      scheduler(enterFrame(scheduler, state, now));
    } else {
      throw new Error(`enterFrame:error Missing scheduler: ${scheduler}`);
    }

  };
  return enterFrame;
};

export const startLoop = (scheduler, gameTime, update, draw, initialState) => {
  const enterFrame = createEnterFrame(gameTime, update, draw);
  scheduler(enterFrame(scheduler, initialState, gameTime()));
  // TODO: Needs a pause functionality.
};
