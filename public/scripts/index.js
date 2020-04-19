import SpriteSheet from "./SpriteSheet.js";
import { loadImage, loadLevel } from "./utils.js";

function drawBackground(background, context, sprites) {
  background.ranges.forEach(([xStart, xEnd, yStart, yEnd]) => {
    for (let x = xStart; x < xEnd; ++x) {
      for (let y = yStart; y < yEnd; ++y) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

loadImage("/img/tiles.png").then((image) => {
  const sprites = new SpriteSheet(image, 16, 16);
  sprites.define("ground", 0, 0);
  sprites.define("sky", 3, 23);

  loadLevel("1-1").then((level) => {
    level.backgrounds.forEach((background) =>
      drawBackground(background, context, sprites)
    );
  });
});
