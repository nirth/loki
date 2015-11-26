import PIXI, {
  autoDetectRenderer,
  Container,
  Sprite
} from '../vendor/pixi.min';

export const createStage = () => {
  const renderer = autoDetectRenderer(800, 600, { antialias: true });

  document.body.appendChild(renderer.view);

  const stage = new Container();
  stage.interactive = true;
  return {renderer, stage};
};
