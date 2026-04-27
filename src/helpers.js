function isWalkable(worldMap, x, y) {
  return worldMap[y][x] === 1;
}

function isOnMap(worldMap, x, y) {
  return x >= 0 && x < worldMap[0].length && y >= 0 && y < worldMap.length;
}

function isValidMove(worldMap, x, y) {
  return isOnMap(worldMap, x, y) && isWalkable(worldMap, x, y);
}

export { isValidMove };
