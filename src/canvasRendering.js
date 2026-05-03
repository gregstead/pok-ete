import worldMapData from "./constants.js";

function drawMap(canvasRef = null) {
  const canvas = canvasRef.current; // get the canvas element
  const ctx = canvas.getContext("2d"); // get the 2d drawing context
  // draw a square world map
  canvas.width = worldMapData.WORLD_MAP[0].length * worldMapData.TILE_SIZE;
  canvas.height = worldMapData.WORLD_MAP.length * worldMapData.TILE_SIZE;

  // draw the world map
  for (let y = 0; y < worldMapData.WORLD_MAP.length; y++) {
    for (let x = 0; x < worldMapData.WORLD_MAP[y].length; x++) {
      const tile = worldMapData.WORLD_MAP[y][x];

      if (tile === 1) {
        ctx.fillStyle = "green";
      } else if (tile === 0) {
        ctx.fillStyle = "blue";
      }
      ctx.fillRect(
        x * worldMapData.TILE_SIZE,
        y * worldMapData.TILE_SIZE,
        worldMapData.TILE_SIZE,
        worldMapData.TILE_SIZE,
      );
      // ctx.strokeStyle = "none";
      // ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

function getFacingIndicatorPoints(posnX, posnY, direction) {
  const tileSize = worldMapData.TILE_SIZE;
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

function drawPlayer(posnX, posnY, direction, canvasRef = null) {
  const canvas = canvasRef.current; // get the canvas element
  const ctx = canvas.getContext("2d"); // get the 2d drawing context
  const indicatorPoints = getFacingIndicatorPoints(posnX, posnY, direction);

  ctx.fillStyle = "red";
  ctx.fillRect(
    posnX * worldMapData.TILE_SIZE,
    posnY * worldMapData.TILE_SIZE,
    worldMapData.TILE_SIZE,
    worldMapData.TILE_SIZE,
  );

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(indicatorPoints[0][0], indicatorPoints[0][1]);
  ctx.lineTo(indicatorPoints[1][0], indicatorPoints[1][1]);
  ctx.lineTo(indicatorPoints[2][0], indicatorPoints[2][1]);
  ctx.closePath();
  ctx.fill();
}

export { drawMap, drawPlayer };
