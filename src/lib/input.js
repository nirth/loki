import {info} from './log';

export const manager = () => {
  let d = null;
  const update = (newData) => {
    d = newData;
  };
  const retrieve = () => {
    return d;
  };
  return {update, retrieve};
};

const onKey = (controls, update, retrieve, switchOn) => ({keyCode}) => {
  if (controls.has(keyCode)) {
    const command = controls.get(keyCode);
    update(retrieve().set(command, switchOn));
  }
};

export const initializeInputs = (controls, commands) => {
  const body = window.document.body;
  const {update, retrieve} = manager();
  update(retrieve() || commands);
  body.addEventListener('keydown', onKey(controls, update, retrieve, true));
  body.addEventListener('keyup',   onKey(controls, update, retrieve, false));
  return retrieve;
};
