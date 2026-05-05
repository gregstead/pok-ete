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
          spriteData &&
          spriteData.tilesetIndex.x !== null &&
          spriteData.tilesetIndex.y !== null; // only draw default tile if we don't have valid sprite data for this tile

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
            spriteData.tilesetIndex.x * GLOBALS.SPRITE_TILE_SIZE,
            spriteData.tilesetIndex.y * GLOBALS.SPRITE_TILE_SIZE,
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
        tile.gameObject.tilsetIndex.x &&
        tile.gameObject.tilsetIndex.y
      ) {
        // check that the terrain under the map is defined
        let terrainTile =
          tile.gameObject.terrain && sprites[tile.gameObject.terrain]; // default to -1 if no terrain tile is defined
        if (terrainTile) {
          ctx.drawImage(
            sprites.tileset,
            sprites[tile.gameObject.terrain].tilesetIndex.x *
              GLOBALS.SPRITE_TILE_SIZE,
            sprites[tile.gameObject.terrain].tilesetIndex.y *
              GLOBALS.SPRITE_TILE_SIZE,
            GLOBALS.SPRITE_TILE_SIZE,
            GLOBALS.SPRITE_TILE_SIZE,
            x * GLOBALS.TILE_SIZE,
            y * GLOBALS.TILE_SIZE,
            GLOBALS.TILE_SIZE,
            GLOBALS.TILE_SIZE,
          );
        } else {
          // if no terrain tile defined, just draw a colored square based on the tile value
          ctx.fillStyle = "gray"; // default color for unknown tiles
          ctx.fillRect(
            x * GLOBALS.TILE_SIZE,
            y * GLOBALS.TILE_SIZE,
            GLOBALS.TILE_SIZE,
            GLOBALS.TILE_SIZE,
          );
          console.log("No terrain sprite data for tile ", tile);
          console.log("tile.terrain: ", tile.gameObject.terrain ?? null);
        }

        // if tile itself has sprite data, draw it
        ctx.drawImage(
          sprites.tileset,
          tile.gameObject.tilsetIndex.x * GLOBALS.SPRITE_TILE_SIZE,
          tile.gameObject.tilsetIndex.y * GLOBALS.SPRITE_TILE_SIZE,
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
  const modalWidth = canvas.width * 1;
  const modalHeight = canvas.height * (3 / 9);
  const modalX = (canvas.width - modalWidth) / 2;
  // const modalY = (canvas.height - modalHeight) / 2;
  const modalY = canvas.height - modalHeight;
  console.log("Modal dimensions: ", {
    modalX,
    modalY,
    modalWidth,
    modalHeight,
  });

  // draw semi-transparent background
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(modalX, modalY, modalWidth, modalHeight);

  // draw message text
  ctx.fillStyle = "white";
  ctx.font = "10px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom"; // align text to the top of the modal
  ctx.fillText(
    message,
    canvas.width / 10,
    canvas.height - canvas.height * (2 / 9),
  ); // position text with some padding from the left and bottom edges of the modal
}

export { drawPlayer, drawViewport, drawMessageModal };
