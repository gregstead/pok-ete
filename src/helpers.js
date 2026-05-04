import GLOBALS from "./constants.js";

function isWalkable(worldMap, x, y) {
  return worldMap[y][x] === 1 || worldMap[y][x] === 2; // treat both grass and path as walkable
}

function isOnMap(worldMap, x, y) {
  return x >= 0 && x < worldMap[0].length && y >= 0 && y < worldMap.length;
}

function isObjectAtPosition(objects, x, y) {
  return objects.some((obj) => obj.objectx === x && obj.objecty === y);
}

function isValidMove(worldMapData, x, y) {
  return (
    isOnMap(worldMapData.tiles, x, y) &&
    isWalkable(worldMapData.tiles, x, y) &&
    !isObjectAtPosition(worldMapData.objects, x, y)
  );
}

function getViewport(worldMapData, playerX, playerY) {
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
      if (
        y >= 0 &&
        y < worldMapData.tiles.length &&
        x >= 0 &&
        x < worldMapData.tiles[0].length
      ) {
        row.push(
          tileHandler(worldMapData.tiles[y][x], x, y, worldMapData.objects),
        ); // use tileHandler to determine what to render
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

function getFacingIndicatorPoints(posnX, posnY, direction) {
  const tileSize = GLOBALS.TILE_SIZE;
  const tileLeft = posnX * tileSize;
  const tileTop = posnY * tileSize;
  const tileCenterX = tileLeft + tileSize / 2;
  const tileCenterY = tileTop + tileSize / 2;
  const indicatorPadding = tileSize * 0.2;

  switch (direction) {
    case "up":
      return [
        [tileCenterX, tileTop + indicatorPadding],
        [tileLeft + tileSize * 0.35, tileTop + tileSize * 0.45],
        [tileLeft + tileSize * 0.65, tileTop + tileSize * 0.45],
      ];
    case "left":
      return [
        [tileLeft + indicatorPadding, tileCenterY],
        [tileLeft + tileSize * 0.45, tileTop + tileSize * 0.35],
        [tileLeft + tileSize * 0.45, tileTop + tileSize * 0.65],
      ];
    case "right":
      return [
        [tileLeft + tileSize - indicatorPadding, tileCenterY],
        [tileLeft + tileSize * 0.55, tileTop + tileSize * 0.35],
        [tileLeft + tileSize * 0.55, tileTop + tileSize * 0.65],
      ];
    case "down":
    default:
      return [
        [tileCenterX, tileTop + tileSize - indicatorPadding],
        [tileLeft + tileSize * 0.35, tileTop + tileSize * 0.55],
        [tileLeft + tileSize * 0.65, tileTop + tileSize * 0.55],
      ];
  }
}

export { isValidMove, getViewport, getFacingIndicatorPoints };
