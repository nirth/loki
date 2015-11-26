import chai, {expect} from 'chai';
import sinon, {spy} from 'sinon';
import sinonChai from 'sinon-chai';
import {manualLoopMock} from './mocks/loop.mock';

chai.use(sinonChai);

// This is a spec for a mock.
describe('Mock manualLoopMock should', () => {
  it('be a function',
    () => expect(manualLoopMock).to.be.a('function'));

  it('return object', () => expect(manualLoopMock()).to.be.an('object'));

  it('return nextFrame and getTime functions', () => {
    const {gameTime, nextFrame} = manualLoopMock();
    expect(gameTime).to.be.a('function');
    expect(nextFrame).to.be.a('function');
  });
});

describe('Function getTime returned by loopMock should', () => {
  let gameTime, nextFrame, scheduler, noop;
  beforeEach(() => {
    const o = manualLoopMock();
    gameTime = o.gameTime;
    nextFrame = o.nextFrame;
    scheduler = o.scheduler;
    noop = () => true;
  });

  it('return zero by default', () => {
    expect(gameTime()).to.equal(0);
  });

  it('have result incremented by one for each `nextFrame` call', () => {
    // Frame zero / initial.
    expect(gameTime()).to.equal(0);

    // Manual invocation of next frame.
    scheduler(noop);
    nextFrame();

    // Frame 1.
    expect(gameTime()).to.equal(1);

    // Manual invocation of next frame.
    scheduler(noop);
    nextFrame();

    // Frame 2
    expect(gameTime()).to.equal(2);
    scheduler(noop);
    nextFrame();
    scheduler(noop);
    nextFrame();
    scheduler(noop);
    nextFrame();
    scheduler(noop);
    nextFrame();

    // Frame 6
    expect(gameTime()).to.equal(6);
  });
});

describe('Function nextFrame returned by loopMock should', () => {
  let gameTime, nextFrame, scheduler, enterFrameSpy;
  beforeEach(() => {
    enterFrameSpy = spy();
    const o = manualLoopMock();
    gameTime = o.gameTime;
    nextFrame = o.nextFrame;
    scheduler = o.scheduler;
  });

  it('invoke enterFrame passed to lockMock each time nextFrame called', () => {
    expect(enterFrameSpy).to.not.be.called;
    scheduler(enterFrameSpy);
    nextFrame();
    expect(enterFrameSpy).to.be.calledOnce;
    scheduler(enterFrameSpy);
    nextFrame();
    expect(enterFrameSpy).to.be.calledTwice;
    scheduler(enterFrameSpy);
    nextFrame();
    expect(enterFrameSpy).to.be.calledThrice;
  });
});
