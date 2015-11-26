import {Record} from 'immutable';
import {PlayerState} from './player';
import {TimeState} from './time';

export const GameState = Record({
  inputs: null,
  time: new TimeState(),
  player: null
});
