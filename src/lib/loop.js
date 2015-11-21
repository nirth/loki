import {info} from './log';


const enterFrame = (update, draw, previousState) => () => {
  const state = update(previousState);
  draw(state);
  window.requestAnimationFrame(enterFrame(update, draw, state));
};

export const startLoop = (update, draw, initialState) => {
  enterFrame(update, draw, initialState)();
};
