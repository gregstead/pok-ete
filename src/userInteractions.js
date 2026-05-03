import worldMapData from "./constants.js";
import { isValidMove } from "./helpers.js";

const PLAYER_DIRECTIONS = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
};

function movePlayer(
  playerX,
  playerY,
  dx,
  dy,
  playerDirection,
  dDirection,
  callback,
) {
  const newX = playerX + dx;
  const newY = playerY + dy;

  if (isValidMove(worldMapData.WORLD_MAP, newX, newY)) {
    if (playerDirection !== dDirection) {
      callback(playerX, playerY, dDirection);
      return;
    } else {
      callback(newX, newY, dDirection);
    }
  } else {
    callback(playerX, playerY, dDirection);
  }
}

// add event listener for key presses
function handleKeyDown(event, playerX, playerY, playerDirection, callback) {
  switch (event.key) {
    case "ArrowUp":
      movePlayer(
        playerX,
        playerY,
        0,
        -1,
        playerDirection,
        PLAYER_DIRECTIONS.UP,
        callback,
      );
      break;
    case "ArrowDown":
      movePlayer(
        playerX,
        playerY,
        0,
        1,
        playerDirection,
        PLAYER_DIRECTIONS.DOWN,
        callback,
      );
      break;
    case "ArrowLeft":
      movePlayer(
        playerX,
        playerY,
        -1,
        0,
        playerDirection,
        PLAYER_DIRECTIONS.LEFT,
        callback,
      );
      break;
    case "ArrowRight":
      movePlayer(
        playerX,
        playerY,
        1,
        0,
        playerDirection,
        PLAYER_DIRECTIONS.RIGHT,
        callback,
      );
      break;
    default:
      break;
  }
}

export { handleKeyDown, PLAYER_DIRECTIONS };
