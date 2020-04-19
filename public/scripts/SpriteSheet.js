export default class SpriteSheet {
  constructor(image, width, height) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(name, x, y, width, height) {
    const buffer = document.createElement("canvas");
    buffer.width = this.width;
    buffer.height = this.height;

    buffer
      .getContext("2d")
      .drawImage(
        this.image,
        x,
        y,
        this.width,
        this.height,
        0,
        0,
        width,
        height
      );

    this.tiles.set(name, buffer);
  }

  defineTile(name, x, y) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }

  draw(name, context, x, y) {
    const tile = this.tiles.get(name);
    context.drawImage(tile, x, y);
  }

  drawTile(name, context, x, y) {
    const tile = this.tiles.get(name);
    context.drawImage(tile, x * this.width, y * this.height);
  }
}
