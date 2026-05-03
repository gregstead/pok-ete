const TILE_SIZE = 32;
const WORLD_MAP = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const CENTER_X = Math.floor(WORLD_MAP[0].length / 2);
const CENTER_Y = Math.floor(WORLD_MAP.length / 2);
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
        row.push(worldMap[y][x]);
      } else {
        row.push(0); // treat out-of-bounds as empty space
      }
    }
    viewport.viewport.push(row);
  }

  return viewport;
}

const worldMapData = { TILE_SIZE, WORLD_MAP, CENTER_X, CENTER_Y, getViewport };

export default worldMapData;
