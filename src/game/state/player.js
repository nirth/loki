import {Record} from 'immutable';

export const PlayerState = Record({
  x: 0,
  y: 0,
  isFiring: false,
  sprite: null
});
