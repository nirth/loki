import {Record} from 'immutable';

export const TimeState = Record({
  gameTime: 0, // Time elapsed from start of the game, not counting pause.
  updatedAt: -1,
  delta: -1 //
});
