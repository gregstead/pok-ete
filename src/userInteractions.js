import worldMapData from "./constants.js";
import { isValidMove } from "./helpers.js";

function movePlayer(playerX, playerY, dx, dy, callback) {
  const newX = playerX + dx;
  const newY = playerY + dy;

  if (isValidMove(worldMapData.WORLD_MAP, newX, newY)) {
    callback(newX, newY);
  }
}

// add event listener for key presses
function handleKeyDown(event, playerX, playerY, callback) {
  switch (event.key) {
    case "ArrowUp":
      movePlayer(playerX, playerY, 0, -1, callback);
      break;
    case "ArrowDown":
      movePlayer(playerX, playerY, 0, 1, callback);
      break;
    case "ArrowLeft":
      movePlayer(playerX, playerY, -1, 0, callback);
      break;
    case "ArrowRight":
      movePlayer(playerX, playerY, 1, 0, callback);
      break;
    default:
      break;
  }
}

export { handleKeyDown };
