function isWalkable(worldMap, x, y) {
  return worldMap[y][x] === 1 || worldMap[y][x] === 2; // treat both grass and path as walkable
}

function isOnMap(worldMap, x, y) {
  return x >= 0 && x < worldMap[0].length && y >= 0 && y < worldMap.length;
}

function isObjectAtPosition(objects, x, y) {
  return objects.some((obj) => obj.objectx === x && obj.objecty === y);
}

function isValidMove(worldMap, x, y, gameObjects) {
  return (
    isOnMap(worldMap, x, y) &&
    isWalkable(worldMap, x, y) &&
    !isObjectAtPosition(gameObjects, x, y)
  );
}

function getViewport(worldMap, playerX, playerY, mapObjects) {
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
        row.push(tileHandler(worldMap[y][x], x, y, mapObjects)); // use tileHandler to determine what to render
      } else {
        row.push(0); // treat out-of-bounds as empty space
      }
    }
    viewport.viewport.push(row);
  }

  return viewport;
}

function tileHandler(tile, x, y, mapObjects) {
  // check if there's an object at this tile
  const objectAtTile = mapObjects.find(
    (obj) => obj.objectx === x && obj.objecty === y,
  );
  if (objectAtTile) {
    return 9; // return a different value to indicate an object is present
  }
  return tile; // otherwise return the original tile value
}

export { isValidMove, getViewport };
