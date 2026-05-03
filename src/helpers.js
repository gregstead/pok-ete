import worldMapData from "./constants.js";

function isWalkable(worldMap, x, y) {
  return worldMap[y][x] === 1 || worldMap[y][x] === 2; // treat both grass and path as walkable
}

function isOnMap(worldMap, x, y) {
  return x >= 0 && x < worldMap[0].length && y >= 0 && y < worldMap.length;
}

function isObjectAtPosition(objects, x, y) {
  return objects.some((obj) => obj.objectx === x && obj.objecty === y);
}

function isValidMove(worldMap, x, y) {
  return (
    isOnMap(worldMap, x, y) &&
    isWalkable(worldMap, x, y) &&
    !isObjectAtPosition(worldMapData.OBJECTS, x, y)
  );
}

export { isValidMove };
