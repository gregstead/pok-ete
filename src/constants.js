const TILE_SIZE = 32;
const WORLD_MAP = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 2, 2, 2, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 2, 0, 2, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 2, 0, 2, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 2, 0, 2, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 2, 0, 2, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 2, 0, 2, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 2, 2, 2, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const CENTER_X = Math.floor(WORLD_MAP[0].length / 2);
const CENTER_Y = Math.floor(WORLD_MAP.length / 2);

const OBJECTS = [
  {
    name: "Welcome Sign",
    sprite: "sign.png",
    type: "sign",
    message: "Welcome to Pokemon Eternal!",
    objectx: 7,
    objecty: 5,
  },
];

function getViewport(worldMap, playerX, playerY) {
  const viewportSize = 5; // 5x5 grid around the player
  const halfViewport = Math.floor(viewportSize / 2);
  const viewportOriginX = playerX - halfViewport;
  const viewportOriginY = playerY - halfViewport;
  const viewport = {
    viewport: [],
    viewportSize,
    halfViewport,
    viewportOriginX,
    viewportOriginY,
  };

  for (let y = playerY - halfViewport; y <= playerY + halfViewport; y++) {
    const row = [];
    for (let x = playerX - halfViewport; x <= playerX + halfViewport; x++) {
      if (y >= 0 && y < worldMap.length && x >= 0 && x < worldMap[0].length) {
        row.push(/*worldMap[y][x]*/ tileHandler(worldMap[y][x], x, y)); // use tileHandler to determine what to render
      } else {
        row.push(0); // treat out-of-bounds as empty space
      }
    }
    viewport.viewport.push(row);
  }

  return viewport;
}

function tileHandler(tile, x, y) {
  // check if there's an object at this tile
  const objectAtTile = OBJECTS.find(
    (obj) => obj.objectx === x && obj.objecty === y,
  );
  if (objectAtTile) {
    return 9; // return a different value to indicate an object is present
  }
  return tile; // otherwise return the original tile value
}

const worldMapData = {
  TILE_SIZE,
  WORLD_MAP,
  CENTER_X,
  CENTER_Y,
  getViewport,
  OBJECTS,
};

export default worldMapData;
