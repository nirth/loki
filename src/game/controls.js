import {Map} from 'immutable';

const UP = 'up';
const DOWN = 'down';
const LEFT = 'left';
const RIGHT = 'right';
const FIRE = 'fire';
const PAUSE = 'pause';

export const createCommands = () => {
  const map = new Map();
  return map
    .set(UP, false)
    .set(LEFT, false)
    .set(RIGHT, false)
    .set(DOWN, false)
    .set(FIRE, false)
    .set(PAUSE, false)
    .set('default', false);
};

export const createControls = () => {
  const map = new Map();
  return map
    // Arrow keys
    .set(37, LEFT)
    .set(38, UP)
    .set(39, RIGHT)
    .set(40, DOWN)
    // WASD
    .set(65, LEFT)
    .set(87, UP)
    .set(68, RIGHT)
    .set(83, DOWN)
    // Space bar
    .set(32, FIRE)
    // Right control
    .set(17, FIRE)
    // Enter
    .set(13, PAUSE);
};
