import chai, {expect} from 'chai';
import sinon, {spy} from 'sinon';
import sinonChai from 'sinon-chai';
import chaiImmutable from 'chai-immutable';
import {timerLoopMock} from './mocks/fakeLoop';
import {GameState, PlayerState} from '../src/game/state';
import {initialGameState, updateGameState} from '../src/game/update';

chai.use(sinonChai);
chai.use(chaiImmutable);

describe('Function initialGameState should', () => {
  it('exist', () => expect(initialGameState).to.not.be.undefined);
  it('be a function', () => expect(initialGameState).to.be.a('function'));

  
});

describe('Function updateGameState should', () => {
  it('exist', () => expect(updateGameState).to.not.be.undefined);
  it('be a function', () => expect(updateGameState).to.be.a('function'));
});
