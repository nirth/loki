import chai, {expect} from 'chai';
import sinon, {spy} from 'sinon';
import sinonChai from 'sinon-chai';
import {timerLoopMock} from './mocks/fakeLoop';
import {startLoop} from '../src/lib/gameLoop';
import {initialGameState, updateGameState} from '../src/game/update';

chai.use(sinonChai);

// describe('')
//
// describe('', () => {
//   let clock, startTime, currentTime, tick;
//   let draw, updateSpy, drawSpy;
//   let gameTime, schedulerSpy;
//
//   beforeEach(() => {
//     startTime = 1000000;
//     currentTime = startTime;
//     tick = 20;
//     clock = sinon.useFakeTimers(startTime);
//
//     update = (state, time, delta) => ({num: state.num + 1});
//     draw = (state) => null;
//     const o = timerLoopMock();
//     gameTime = spy(o.gameTime);
//     schedulerSpy = spy(o.scheduler);
//     updateSpy = spy(updateGameState);
//     drawSpy = spy(draw);
//     state = initialGameState();
//   });
//
//   afterEach(() => {
//     startTime = null;
//     clock.restore();
//     clock = null;
//   });
//
// });
