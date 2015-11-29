// Error prefix.
export const ERRP = 'gameLoop: ';

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

    scheduler(enterFrame(scheduler, state, now));
  };
  return enterFrame;
};

export const startLoop = (scheduler, gameTime, update, draw, initialState) => {
  if ('function' !== typeof scheduler || scheduler.length !== 1) {
    throw new Error(
      `${ERRP} scheduler should be function: (function) => void`);
  }

  if ('function' !== typeof gameTime || gameTime.length !== 0) {
    throw new Error(
      `${ERRP} gameTime should be function: () => number`
    );
  }

  if ('function' !== typeof update || update.length !== 3) {
    throw new Error(
      `${ERRP} update should be a function: (state, time, delta) => object`
    );
  }

  if ('function' !== typeof draw || draw.length !== 1) {
    throw new Error(
      `${ERRP} draw should be a function: (state) => void`
    );
  }

  if ('object' !== typeof initialState || initialState === null) {
    throw new Error(
      `${ERRP} initialState is invalid: ${initialState}`
    );
  }

  const enterFrame = createEnterFrame(gameTime, update, draw);
  scheduler(enterFrame(scheduler, initialState, gameTime()));
  // TODO: Needs a pause functionality.
};
