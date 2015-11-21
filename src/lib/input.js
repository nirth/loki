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

const onKey = (controls, commands, update, switchOn) => ({keyCode}) => {
  if (controls.has(keyCode)) {
    const command = controls.get(keyCode);
    update(commands.set(command, switchOn));
  }
};

export const initializeInputs = (controls, commands) => {
  const body = window.document.body;
  const {update, retrieve} = manager();
  update(commands);
  body.addEventListener('keydown', onKey(controls, commands, update, true));
  body.addEventListener('keyup',   onKey(controls, commands, update, false));
  return retrieve;
};
