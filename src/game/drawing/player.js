import PIXI, {Graphics, Sprite, Point} from '../../vendor/pixi.min';
import {PlayerState} from '../state/player';

export const createPlayerSprite = () => {
  const triangle = new Graphics();
  triangle.beginFill(0xFF6600);
  triangle.moveTo(0, 0);
  triangle.lineTo(100, 50);
  triangle.lineTo(0, 100);
  triangle.lineTo(0, 0);
  triangle.endFill();

  const container = new Sprite();
  container.anchor = new Point(0.5, 0.5);
  container.addChild(triangle);

  return container;
};

export const drawPlayer = (playerState) => {
  const {sprite, x, y} = playerState;

  sprite.position.x = x;
  sprite.position.y = y;
};
