import PIXI, {Graphics, Sprite} from './lib/pixi.min';
import './index.styl';
import './assets/ship-sheet.jpg';
import {info} from './lib/log';
import {startLoop} from './lib/loop';
import {initializeInputs} from './lib/input';
import {createStage} from './lib/renderer';
import {createControls, createCommands} from './game/controls';
import {drawPlayer} from './game/drawing/player';
import {createGameState} from './game/state/game';

const controls = createControls();
const commands = createCommands();
const inputs = initializeInputs(controls, commands);
const gameState = createGameState(inputs);

const {renderer, stage} = createStage();

const init = (stage, state) => {
  const {player: {sprite}} = state;
  stage.addChild(sprite);
};

const update = (previousState) => {
  const {inputs, player} = previousState;
  const commands = inputs();

  let p = player;
  if (commands.get('up')) {
    p = player.set('y', player.get('y') - 1);
  };

  if (commands.get('down')) {
    p = player.set('y', player.get('y') + 1);
  }

  return previousState.set('player', p);
};

const draw = (state) => {
  const {player} = state;
  drawPlayer(player);
  renderer.render(stage);
};

init(stage, gameState);
startLoop(update, draw, gameState);
