import worldMapData from "./Constants.js";

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

function drawPlayer(posnX, posnY, canvasRef = null) {
  const canvas = canvasRef.current; // get the canvas element
  const ctx = canvas.getContext("2d"); // get the 2d drawing context

  ctx.fillStyle = "red";
  ctx.fillRect(
    posnX * worldMapData.TILE_SIZE,
    posnY * worldMapData.TILE_SIZE,
    worldMapData.TILE_SIZE,
    worldMapData.TILE_SIZE,
  );
}

export { drawMap, drawPlayer };
