import chai, {expect} from 'chai';
import sinon, {spy} from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

// Making sure that test framework and it's plugins are in order.
describe('Sanity should', () => {
  it('be sane', () => expect(true).to.equal(true));
  it('have spies', () => expect(spy()).to.be.a('function'));
});

describe('Sinon fake timers by default should', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers(0);
  });

  afterEach(() => {
    clock.restore();
  });

  it('return EPOCH 0 as their current time', () => {
    expect(Date.now()).to.equal(0);
  });

  it('increment time by 500ms when tick is invoked', () => {
    clock.tick(500);
    expect(Date.now()).to.equal(500);
  });
});

describe('Sinon fake timers with preset time should', () => {
  let clock, realTime;

  beforeEach(() => {
    realTime = Date.now();
    clock = sinon.useFakeTimers(realTime);
  });

  afterEach(() => {
    clock.restore();
  });

  it('return real time as current time', () => {
    expect(Date.now()).to.equal(realTime);
  });

  it('should return real time plus million milliseconds when asked to', () => {
    clock.tick(1000000);
    expect(Date.now()).to.equal(realTime + 1000000);
  });
});
