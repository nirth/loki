import {Record} from 'immutable';
import {PlayerState} from './player';
import {createPlayerSprite} from '../drawing/player';

const GameState = Record({
  inputs: null,
  player: null
});

export const createGameState = (inputs) => {
  const player = new PlayerState({sprite: createPlayerSprite()});
  return new GameState({
    inputs: inputs,
    player: player
  });
};
