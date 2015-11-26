import chai, {expect} from 'chai';
import sinon, {spy} from 'sinon';
import sinonChai from 'sinon-chai';
import {manualLoopMock} from './mocks/loop.mock';
import {startLoop} from '../src/lib/gameLoop';

chai.use(sinonChai);

describe('Function startLoop should', () => {
  it('exist', () => expect(startLoop).to.not.be.undefined);
  it('be a function', () => expect(startLoop).to.be.a('function'));
});

describe('Initialised startLoop should', () => {
  let update, updateSpy, drawSpy;
  let gameTime, nextFrame, schedulerSpy;
  let state;

  beforeEach(() => {
    update = (state, time, delta) => ({num: state.num + 1});
    const o = manualLoopMock();
    gameTime = spy(o.gameTime);
    nextFrame = spy(o.nextFrame);
    schedulerSpy = spy(o.scheduler);
    updateSpy = spy(update);
    drawSpy = spy();
    state = {num: 0};
  });

  it('be initialized', () => {
    const updateSpy = spy();
    const drawSpy = spy();
    const {scheduler, gameTime, nextFrame} = manualLoopMock();
    expect((() => {
      startLoop(schedulerSpy, gameTime, updateSpy, drawSpy, {});
    })).not.to.throw;
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
