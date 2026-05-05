import GLOBALS from "./constants.js";
import { getFacingIndicatorPoints } from "./helpers.js";

function drawViewport(canvasRef = null, viewport = null, sprites = null) {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  for (let y = 0; y < viewport.length; y++) {
    for (let x = 0; x < viewport[y].length; x++) {
      const tile = viewport[y][x];

      let tileToDraw = false;

      if (sprites && sprites.tileset && sprites[tile]) {
        // if a tileset image is provided, draw the tile from the tileset instead of a colored square
        const spriteData = sprites[tile];

        tileToDraw =
          spriteData && spriteData.sx !== null && spriteData.sy !== null; // only draw default tile if we don't have valid sprite data for this tile

        if (!tileToDraw) {
          // if we don't have valid sprite data for this tile, fall back to drawing a colored square
          ctx.fillStyle = sprites[tile].color || "red"; // default to red to indicate missing data
          ctx.fillRect(
            x * GLOBALS.TILE_SIZE,
            y * GLOBALS.TILE_SIZE,
            GLOBALS.TILE_SIZE,
            GLOBALS.TILE_SIZE,
          );
        } else {
          ctx.drawImage(
            sprites.tileset,
            spriteData.sx,
            spriteData.sy,
            GLOBALS.SPRITE_TILE_SIZE,
            GLOBALS.SPRITE_TILE_SIZE,
            x * GLOBALS.TILE_SIZE,
            y * GLOBALS.TILE_SIZE,
            GLOBALS.TILE_SIZE,
            GLOBALS.TILE_SIZE,
          );
        }
      } else if (
        sprites &&
        tile.gameObject &&
        tile.gameObject.sx &&
        tile.gameObject.sy
      ) {
        // if tile itself has sprite data, draw it
        ctx.drawImage(
          sprites.tileset,
          tile.gameObject.sx,
          tile.gameObject.sy,
          GLOBALS.SPRITE_TILE_SIZE,
          GLOBALS.SPRITE_TILE_SIZE,
          x * GLOBALS.TILE_SIZE,
          y * GLOBALS.TILE_SIZE,
          GLOBALS.TILE_SIZE,
          GLOBALS.TILE_SIZE,
        );
      } else {
        // if no tileset image, just draw a colored square based on the tile value
        ctx.fillStyle = "gray"; // default color for unknown tiles
        ctx.fillRect(
          x * GLOBALS.TILE_SIZE,
          y * GLOBALS.TILE_SIZE,
          GLOBALS.TILE_SIZE,
          GLOBALS.TILE_SIZE,
        );
        console.log("No sprite data for tile ", tile);
      }
    }
  }
}

const playerSprite = new Image();
playerSprite.src = "/sprites/PlayerSpriteV1.png"; // make sure to have a player sprite at this path

function drawPlayer(playerPosn, canvasRef = null) {
  const { x, y, viewPort, direction } = playerPosn;
  const canvas = canvasRef.current; // get the canvas element
  const ctx = canvas.getContext("2d");

  const renderX = x - viewPort.originX;
  const renderY = y - viewPort.originY;
  const indicatorPoints = getFacingIndicatorPoints(renderX, renderY, direction);

  ctx.drawImage(
    playerSprite,
    renderX * GLOBALS.TILE_SIZE,
    renderY * GLOBALS.TILE_SIZE,
    GLOBALS.TILE_SIZE,
    GLOBALS.TILE_SIZE,
  );

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(indicatorPoints[0][0], indicatorPoints[0][1]);
  ctx.lineTo(indicatorPoints[1][0], indicatorPoints[1][1]);
  ctx.lineTo(indicatorPoints[2][0], indicatorPoints[2][1]);
  ctx.closePath();
  ctx.fill();
}

function drawMessageModal(message, canvasRef = null) {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const modalWidth = canvas.width * 0.8;
  const modalHeight = canvas.height * 0.3;
  const modalX = (canvas.width - modalWidth) / 2;
  const modalY = (canvas.height - modalHeight) / 2;

  // draw semi-transparent background
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(modalX, modalY, modalWidth, modalHeight);

  // draw message text
  ctx.fillStyle = "white";
  ctx.font = "10px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(message, canvas.width / 2, canvas.height / 2);
}

export { drawPlayer, drawViewport, drawMessageModal };
