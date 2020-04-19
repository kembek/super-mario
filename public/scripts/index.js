import Compositor from "./Compositor.js";
import { createBackgroundLayer } from "./layers.js";
import { loadBackgroundSprites, loadMarioSprites } from "./sprites.js";
import { loadLevel } from "./utils.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

function createSpriteLayer(sprite, pos) {
  return function drawSpriteLayer(context) {
    sprite.draw("idle", context, pos.x, pos.y);
  };
}

Promise.all([
  loadMarioSprites(),
  loadBackgroundSprites(),
  loadLevel("1-1"),
]).then(([marioSprite, sprites, level]) => {
  const compositor = new Compositor();
  const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites);
  compositor.layers.push(backgroundLayer);

  const pos = {
    x: 64,
    y: 64,
  };
  const marioLayer = createSpriteLayer(marioSprite, pos);
  compositor.layers.push(marioLayer);

  function update() {
    compositor.draw(context);

    pos.x += 2;
    pos.y += 2;
    requestAnimationFrame(update);
  }

  update();
});
