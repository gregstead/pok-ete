import worldMapData from "./constants.js";
import { isValidMove } from "./helpers.js";

const PLAYER_DIRECTIONS = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
};

function movePlayer(playerX, playerY, dx, dy, direction, callback) {
  const newX = playerX + dx;
  const newY = playerY + dy;

  if (isValidMove(worldMapData.WORLD_MAP, newX, newY)) {
    callback(newX, newY, direction);
  } else {
    callback(playerX, playerY, direction);
  }
}

// add event listener for key presses
function handleKeyDown(event, playerX, playerY, callback) {
  switch (event.key) {
    case "ArrowUp":
      movePlayer(playerX, playerY, 0, -1, PLAYER_DIRECTIONS.UP, callback);
      break;
    case "ArrowDown":
      movePlayer(playerX, playerY, 0, 1, PLAYER_DIRECTIONS.DOWN, callback);
      break;
    case "ArrowLeft":
      movePlayer(playerX, playerY, -1, 0, PLAYER_DIRECTIONS.LEFT, callback);
      break;
    case "ArrowRight":
      movePlayer(playerX, playerY, 1, 0, PLAYER_DIRECTIONS.RIGHT, callback);
      break;
    default:
      break;
  }
}

export { handleKeyDown, PLAYER_DIRECTIONS };
