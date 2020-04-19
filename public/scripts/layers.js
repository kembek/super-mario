function drawBackground(background, context, sprites) {
  background.ranges.forEach(([xStart, xEnd, yStart, yEnd]) => {
    for (let x = xStart; x < xEnd; ++x) {
      for (let y = yStart; y < yEnd; ++y) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

export function createBackgroundLayer(backgrounds, sprites) {
  const buffer = document.createElement("canvas");
  buffer.width = 256;
  buffer.height = 240;

  backgrounds.forEach((background) =>
    drawBackground(background, buffer.getContext("2d"), sprites)
  );

  return function drawBackgroundLayer(context) {
    context.drawImage(buffer, 0, 0);
  };
}
