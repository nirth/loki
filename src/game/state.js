import {Record} from 'immutable';

export const GameState = Record({
  inputs: null,
  player: null
});


export const PlayerState = Record({
  x: 0,
  y: 0,
  isFiring: false,
  sprite: null
});
