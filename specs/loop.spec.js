import chai, {expect} from 'chai';
import sinon, {spy} from 'sinon';
import sinonChai from 'sinon-chai';
import {fakeManualLoop, fakeTimerLoop, randomTick} from './mocks/fakeLoop';
import {startLoop} from '../src/lib/gameLoop';

chai.use(sinonChai);

describe('Function startLoop should', () => {
  it('exist', () => expect(startLoop).to.not.be.undefined);
  it('be a function', () => expect(startLoop).to.be.a('function'));
});

describe('When initialising game loop it should', () => {
  const funcWith0Arguments  = () => null;
  const funcWith1Argument   = (a) => null;
  const funcWith2Arguments  = (a, b) => null;
  const funcWith3Arguments  = (a, b, c) => null;
  const funcWith4Arguments  = (a, b, c, d) => null;
  const state = {};

  it('not throw when all arguments are valid', () => {
    expect(startLoop.bind(
      null,                 // Context.
      funcWith1Argument,    // scheduler should have 1 argument.
      funcWith0Arguments,   // gameTime should have 0 arguments.
      funcWith3Arguments,   // update should have 3 arguments.
      funcWith1Argument,    // draw should have 1 argument.
      state
    )).not.to.throw();
  });

  it('throw error when invalid scheduler passed', () => {
    expect(startLoop.bind(
      null,                 // Context.
      null,                 // scheduler should have 1 argument.
      funcWith0Arguments,   // gameTime should have 0 arguments.
      funcWith3Arguments,   // update should have 3 arguments.
      funcWith1Argument,    // draw should have 1 argument.
      state
    ), 'throw scheduler error when function is null').to.throw();
    expect(startLoop.bind(
      null,                 // Context.
      funcWith2Arguments,   // scheduler should have 1 argument.
      funcWith0Arguments,   // gameTime should have 0 arguments.
      funcWith3Arguments,   // update should have 3 arguments.
      funcWith1Argument,    // draw should have 1 argument.
      state
    ), 'throw scheduler error when function has 2 arguments').to.throw();
  });

  it('throw error when invalid gameTime passed', () => {
    expect(startLoop.bind(
      null,                 // Context.
      funcWith1Argument,    // scheduler should have 1 argument.
      null,                 // gameTime should have 0 arguments.
      funcWith3Arguments,   // update should have 3 arguments.
      funcWith1Argument,    // draw should have 1 argument.
      state
    ), 'throw gameTime error when function is null').to.throw();
    expect(startLoop.bind(
      null,                 // Context.
      funcWith1Argument,    // scheduler should have 1 argument.
      funcWith3Arguments,   // gameTime should have 0 arguments.
      funcWith3Arguments,   // update should have 3 arguments.
      funcWith1Argument,    // draw should have 1 argument.
      state
    ), 'throw gameTime error when function has too many arguments').to.throw();
  });

  it('throw error when invalid update function passed', () => {
    expect(startLoop.bind(
      null,                 // Context.
      funcWith1Argument,    // scheduler should have 1 argument.
      funcWith0Arguments,   // gameTime should have 0 arguments.
      null,                 // update should have 3 arguments.
      funcWith1Argument,    // draw should have 1 argument.
      state
    ), 'throw update error when function is null').to.throw();
    expect(startLoop.bind(
      null,                 // Context.
      funcWith1Argument,    // scheduler should have 1 argument.
      funcWith0Arguments,   // gameTime should have 0 arguments.
      funcWith1Argument,    // update should have 3 arguments.
      funcWith1Argument,    // draw should have 1 argument.
      state
    ), 'throw update error when function has too little arguments').to.throw();
    expect(startLoop.bind(
      null,                 // Context.
      funcWith1Argument,    // scheduler should have 1 argument.
      funcWith0Arguments,   // gameTime should have 0 arguments.
      funcWith4Arguments,    // update should have 3 arguments.
      funcWith1Argument,    // draw should have 1 argument.
      state
    ), 'throw update error when function has too many arguments').to.throw();
  });
  it('throw error when invalid draw function passed', () => {
    expect(startLoop.bind(
      null,                 // Context.
      funcWith1Argument,    // scheduler should have 1 argument.
      funcWith0Arguments,   // gameTime should have 0 arguments.
      funcWith3Arguments,   // update should have 3 arguments.
      null,                 // draw should have 1 argument.
      state
    ), 'throw draw error when function is null').to.throw();
    expect(startLoop.bind(
      null,                 // Context.
      funcWith1Argument,    // scheduler should have 1 argument.
      funcWith0Arguments,   // gameTime should have 0 arguments.
      funcWith3Arguments,   // update should have 3 arguments.
      funcWith0Arguments,   // draw should have 1 argument.
      state
    ), 'throw draw error when function has too little arguments').to.throw();
    expect(startLoop.bind(
      null,                 // Context.
      funcWith1Argument,    // scheduler should have 1 argument.
      funcWith0Arguments,   // gameTime should have 0 arguments.
      funcWith3Arguments,   // update should have 3 arguments.
      funcWith3Arguments,   // draw should have 1 argument.
      state
    ), 'throw draw error when function has too many arguments').to.throw();
  });

});

describe('Initialised game loop with manual frame switch should', () => {
  let update, draw, updateSpy, drawSpy;
  let gameTime, nextFrame, schedulerSpy;
  let state;

  beforeEach(() => {
    update = (state, time, delta) => ({num: state.num + 1});
    draw = (state) => null;
    const o = fakeManualLoop();
    gameTime = spy(o.gameTime);
    nextFrame = spy(o.nextFrame);
    schedulerSpy = spy(o.scheduler);
    updateSpy = spy(update);
    drawSpy = spy(draw);
    state = {num: 0};
  });

  it('invoke update and draw on each frame', () => {
    expect(updateSpy).to.not.be.called;
    expect(drawSpy).to.not.be.called;
    expect(schedulerSpy).to.not.be.called;

    startLoop(schedulerSpy, gameTime, updateSpy, drawSpy, {});
    expect(schedulerSpy).to.be.calledOnce;
    expect(updateSpy).to.not.be.called;
    expect(drawSpy).to.not.be.called;

    // Moving to next frame.
    nextFrame();
    expect(schedulerSpy).to.be.calledTwice;
    expect(updateSpy).to.be.calledOnce;
    expect(drawSpy).to.be.calledOnce;

    // Frame 2.
    nextFrame();
    expect(schedulerSpy).to.be.calledThrice;
    expect(updateSpy).to.be.calledTwice;
    expect(drawSpy).to.be.calledTwice;

    // Frame 3.
    nextFrame();
    expect(updateSpy).to.be.calledThrice;
    expect(drawSpy).to.be.calledThrice;
  });

  it('invoke update with proper state, gametime and delta', () => {
    startLoop(schedulerSpy, gameTime, updateSpy, drawSpy, state);

    nextFrame();
    expect(updateSpy).calledWith({num: 0}, 1, 1);
    nextFrame();
    expect(updateSpy).calledWith({num: 1}, 2, 1);
    nextFrame();
    expect(updateSpy).calledWith({num: 2}, 3, 1);
    nextFrame();
    expect(updateSpy).calledWith({num: 3}, 4, 1);
    nextFrame();
    expect(updateSpy).calledWith({num: 4}, 5, 1);
    nextFrame();
    expect(updateSpy).calledWith({num: 5}, 6, 1);
  });
});

describe('Initialised game loop with timer based frame switch should', () => {
  let clock, startTime, currentTime, tick;
  let update, draw, updateSpy, drawSpy;
  let gameTime, nextFrame, schedulerSpy;
  let state;

  beforeEach(() => {
    startTime = 1000000;
    currentTime = startTime;
    tick = 20;
    clock = sinon.useFakeTimers(startTime);

    update = (state, time, delta) => ({num: state.num + 1});
    draw = (state) => null;
    const o = fakeTimerLoop();
    gameTime = spy(o.gameTime);
    schedulerSpy = spy(o.scheduler);
    updateSpy = spy(update);
    drawSpy = spy(draw);
    state = {num: 0};
  });

  afterEach(() => {
    startTime = null;
    clock.restore();
    clock = null;
  });

  it('invoke update with proper state, gametime and delta', () => {
    startLoop(schedulerSpy, gameTime, updateSpy, drawSpy, state);

    expect(updateSpy).to.not.be.called;
    clock.tick(tick);
    currentTime += tick;
    expect(updateSpy).calledWith({num: 0}, currentTime, tick);

    clock.tick(tick);
    currentTime += tick;
    expect(updateSpy).calledWith({num: 1}, currentTime, tick);

    clock.tick(tick);
    currentTime += tick;
    expect(updateSpy).calledWith({num: 2}, currentTime, tick);

    clock.tick(tick);
    currentTime += tick;
    expect(updateSpy).calledWith({num: 3}, currentTime, tick);

    clock.tick(tick);
    currentTime += tick;
    expect(updateSpy).calledWith({num: 4}, currentTime, tick);

    clock.tick(tick);
    currentTime += tick;
    expect(updateSpy).calledWith({num: 5}, currentTime, tick);
  });

  it('invoke update with proper time and delta when ticks a random', () => {
    startLoop(schedulerSpy, gameTime, updateSpy, drawSpy, state);
    expect(updateSpy).to.not.be.called;

    let currentTick;

    currentTick = 20;
    clock.tick(currentTick);
    currentTime += currentTick;
    expect(updateSpy).calledWith({num: 0}, currentTime, currentTick);
    expect(updateSpy).to.be.calledOnce;

    currentTick = 10;
    clock.tick(currentTick);
    currentTime += currentTick;
    expect(updateSpy).to.be.calledOnce;

    currentTick = 20;
    clock.tick(currentTick);
    currentTime += currentTick;
    expect(updateSpy).calledWith({num: 1}, currentTime - 10, 20);
  });
});

xdescribe('Initialised game loop with timer based frame switch should', () => {
  let clock, startTime, currentTime, tick;
  let update, draw, updateSpy, drawSpy;
  let gameTime, nextFrame, schedulerSpy;
  let state;

  beforeEach(() => {
    startTime = 1000000;
    currentTime = startTime;
    tick = 20;
    clock = sinon.useFakeTimers(startTime);

    update = (state, time, delta) => ({num: state.num + 1});
    draw = (state) => null;
    const o = timerLoopMock();
    gameTime = spy(o.gameTime);
    schedulerSpy = spy(o.scheduler);
    updateSpy = spy(update);
    drawSpy = spy(draw);
    state = {num: 0};
  });

  afterEach(() => {
    startTime = null;
    clock.restore();
    clock = null;
  });


});
