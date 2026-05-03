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
    // if the player is changing direction, don't move them, just change their direction
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

function playerInteraction(playerX, playerY, playerDirection, objectState) {
  const { message, setMessage } = objectState;
  // check the tile in front of the player for an object
  let targetX = playerX;
  let targetY = playerY;

  switch (playerDirection) {
    case PLAYER_DIRECTIONS.UP:
      targetY -= 1;
      break;
    case PLAYER_DIRECTIONS.DOWN:
      targetY += 1;
      break;
    case PLAYER_DIRECTIONS.LEFT:
      targetX -= 1;
      break;
    case PLAYER_DIRECTIONS.RIGHT:
      targetX += 1;
      break;
    default:
      break;
  }

  const objectAtTarget = worldMapData.OBJECTS.find(
    (obj) => obj.objectx === targetX && obj.objecty === targetY,
  );

  if (objectAtTarget) {
    if (!message.visible) {
      setMessage({ text: objectAtTarget.message, visible: true });
    } else {
      setMessage({ text: "", visible: false });
    }
  }
}

// add event listener for key presses
function handleKeyDown(event, gameState) {
  const { playerPosn, setPlayerPosn, message, setMessage } = gameState;

  switch (event.key) {
    case "ArrowUp":
      movePlayer(
        playerPosn.x,
        playerPosn.y,
        0,
        -1,
        playerPosn.direction,
        PLAYER_DIRECTIONS.UP,
        (newX, newY, direction) => {
          setPlayerPosn({
            x: newX,
            y: newY,
            direction,
            viewPort: worldMapData.getViewport(
              worldMapData.WORLD_MAP,
              newX,
              newY,
            ),
          });
        },
      );
      break;
    case "ArrowDown":
      movePlayer(
        playerPosn.x,
        playerPosn.y,
        0,
        1,
        playerPosn.direction,
        PLAYER_DIRECTIONS.DOWN,
        (newX, newY, direction) => {
          setPlayerPosn({
            x: newX,
            y: newY,
            direction,
            viewPort: worldMapData.getViewport(
              worldMapData.WORLD_MAP,
              newX,
              newY,
            ),
          });
        },
      );
      break;
    case "ArrowLeft":
      movePlayer(
        playerPosn.x,
        playerPosn.y,
        -1,
        0,
        playerPosn.direction,
        PLAYER_DIRECTIONS.LEFT,
        (newX, newY, direction) => {
          setPlayerPosn({
            x: newX,
            y: newY,
            direction,
            viewPort: worldMapData.getViewport(
              worldMapData.WORLD_MAP,
              newX,
              newY,
            ),
          });
        },
      );
      break;
    case "ArrowRight":
      movePlayer(
        playerPosn.x,
        playerPosn.y,
        1,
        0,
        playerPosn.direction,
        PLAYER_DIRECTIONS.RIGHT,
        (newX, newY, direction) => {
          setPlayerPosn({
            x: newX,
            y: newY,
            direction,
            viewPort: worldMapData.getViewport(
              worldMapData.WORLD_MAP,
              newX,
              newY,
            ),
          });
        },
      );
      break;
    case " ":
      // space bar pressed - could be used for interactions in the future
      console.log("Space bar pressed - interaction placeholder");
      playerInteraction(playerPosn.x, playerPosn.y, playerPosn.direction, {
        message,
        setMessage,
      });
      break;
    default:
      break;
  }
}

export { handleKeyDown, PLAYER_DIRECTIONS };
