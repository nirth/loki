import chai, {expect} from 'chai';
import sinon, {spy} from 'sinon';
import sinonChai from 'sinon-chai';
import {fakeTimerLoop} from './mocks/fakeLoop';

chai.use(sinonChai);

// This is a spec for a mock.
describe('Mock fakeTimerLoop should', () => {
  it('be a function',
    () => expect(fakeTimerLoop).to.be.a('function'));

  it('return object', () => expect(fakeTimerLoop()).to.be.an('object'));

  it('return nextFrame and getTime functions', () => {
    const {gameTime, scheduler} = fakeTimerLoop();
    expect(gameTime).to.be.a('function');
    expect(scheduler).to.be.a('function');
  });
});

describe('Function getTime returned by loopMock should', () => {
  let gameTime, scheduler, noop;
  let clock, startTime;

  beforeEach(() => {
    startTime = Date.now();
    clock = sinon.useFakeTimers(startTime);

    const o = fakeTimerLoop();
    gameTime = o.gameTime;
    scheduler = o.scheduler;
    noop = () => true;
  });

  afterEach(() => {
    clock.restore();
  });

  it('return hardcoded time when asked', () => {
    expect(gameTime()).to.equal(startTime);
  });

  it('return proper time value after each tick.', () => {
    // Frame zero / initial.
    expect(gameTime()).to.equal(startTime);
    clock.tick(50);
    expect(gameTime()).to.equal(startTime + 50);
    clock.tick(150);
    expect(gameTime()).to.equal(startTime + 50 + 150);
  });
});
