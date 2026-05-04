import GLOBALS from "./constants.js";

function drawViewport(canvasRef = null, viewport = null) {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const _viewport = viewport.viewport;

  for (let y = 0; y < _viewport.length; y++) {
    for (let x = 0; x < _viewport[y].length; x++) {
      const tile = _viewport[y][x];

      switch (tile) {
        case 1:
          ctx.fillStyle = "green";
          break;
        case 2:
          ctx.fillStyle = "yellow";
          break;
        case 9:
          ctx.fillStyle = "orange";
          break;
        default:
          ctx.fillStyle = "blue";
      }

      ctx.fillRect(
        x * GLOBALS.TILE_SIZE,
        y * GLOBALS.TILE_SIZE,
        GLOBALS.TILE_SIZE,
        GLOBALS.TILE_SIZE,
      );
    }
  }
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

// function drawPlayer(posnX, posnY, direction, canvasRef = null) {
//   const canvas = canvasRef.current; // get the canvas element
//   const ctx = canvas.getContext("2d"); // get the 2d drawing context
//   const indicatorPoints = getFacingIndicatorPoints(posnX, posnY, direction);

//   ctx.fillStyle = "red";
//   ctx.fillRect(
//     posnX * GLOBALS.TILE_SIZE,
//     posnY * GLOBALS.TILE_SIZE,
//     GLOBALS.TILE_SIZE,
//     GLOBALS.TILE_SIZE,
//   );

//   ctx.fillStyle = "white";
//   ctx.beginPath();
//   ctx.moveTo(indicatorPoints[0][0], indicatorPoints[0][1]);
//   ctx.lineTo(indicatorPoints[1][0], indicatorPoints[1][1]);
//   ctx.lineTo(indicatorPoints[2][0], indicatorPoints[2][1]);
//   ctx.closePath();
//   ctx.fill();
// }

const playerSprite = new Image();
playerSprite.src = "/sprites/PlayerSpriteV1.png"; // make sure to have a player sprite at this path

function drawPlayer(playerPosn, canvasRef = null) {
  const { x, y, viewPort } = playerPosn;
  const canvas = canvasRef.current; // get the canvas element
  const ctx = canvas.getContext("2d");
  const renderX = x - viewPort.viewportOriginX;
  const renderY = y - viewPort.viewportOriginY;
  ctx.drawImage(
    playerSprite,
    renderX * GLOBALS.TILE_SIZE,
    renderY * GLOBALS.TILE_SIZE,
    GLOBALS.TILE_SIZE,
    GLOBALS.TILE_SIZE,
  );
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
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(message, canvas.width / 2, canvas.height / 2);
}

export { drawPlayer, drawViewport, drawMessageModal };
