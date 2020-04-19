export function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();

    img.addEventListener("load", () => {
      resolve(img);
    });

    img.src = src;
  });
}

export function loadLevel(levelName) {
  return fetch(`levels/${levelName}.json`).then((level) => level.json());
}
