import chai, {expect} from 'chai';
import {manager} from '../src/lib/input';

describe('Utility manager should', () => {
  it('exist', () => expect(manager).to.not.be.undefined);
  it('be a function', () => expect(manager).to.be.a('function'));

  it('return update and retrieve functions', () => {
    const {update, retrieve} = manager();
    expect(update).to.be.a('function');
    expect(retrieve).to.be.a('function');
  });

  it('update should change value that retrieve will return', () => {
    const {update, retrieve} = manager();
    update(1);
    expect(retrieve()).to.equal(1);
    update(2);
    expect(retrieve()).to.equal(2);
  });
});
