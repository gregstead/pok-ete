import GLOBALS from "./constants.js";
import { isValidMove } from "./helpers.js";
import GAME_MAPS from "./gameMaps.js";

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
  currentMapId,
  callback,
) {
  const newX = playerX + dx;
  const newY = playerY + dy;

  if (
    isValidMove(
      GAME_MAPS[currentMapId].tiles,
      newX,
      newY,
      GAME_MAPS[currentMapId].objects,
    )
  ) {
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

function playerInteraction(gameState) {
  const { playerPosn } = gameState;
  // check the tile in front of the player for an object
  let targetX = playerPosn.x;
  let targetY = playerPosn.y;

  switch (playerPosn.direction) {
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

  const objectAtTarget = GAME_MAPS[gameState.currentMapId].objects.find(
    (obj) => obj.objectx === targetX && obj.objecty === targetY,
  );

  if (objectAtTarget) {
    objectInteractionHandler(objectAtTarget, gameState);
  }
}

function objectInteractionHandler(gameObject, gameState) {
  let newMapId;
  const {
    message,
    setMessage,
    currentMapId,
    setCurrentMapId,
    playerPosn,
    setPlayerPosn,
  } = gameState;

  switch (gameObject.type) {
    case "sign":
      if (!message.visible) {
        setMessage({ text: gameObject.message, visible: true });
      } else {
        setMessage({ text: "", visible: false });
      }
      break;
    case "door":
      // for simplicity, we'll just toggle between the bedroom and town maps when interacting with the door
      newMapId = currentMapId === "bedroom" ? "town" : "bedroom";
      setCurrentMapId(newMapId);
      setMessage({ text: "", visible: false }); // hide any messages when changing maps
      // reset player position to the center of the new map
      setPlayerPosn({
        x: GAME_MAPS[newMapId].startingX,
        y: GAME_MAPS[newMapId].startingY,
        direction: playerPosn.direction, // keep the same direction when changing maps
        viewPort: GLOBALS.getViewport(
          GAME_MAPS[newMapId].tiles,
          GAME_MAPS[newMapId].startingX,
          GAME_MAPS[newMapId].startingY,
          GAME_MAPS[newMapId].objects,
        ),
      });
      break;
    default:
      break;
  }
}

function handleKeyDown(event, gameState) {
  const { playerPosn, setPlayerPosn, currentMapId } = gameState;

  switch (event.key) {
    case "ArrowUp":
      movePlayer(
        playerPosn.x,
        playerPosn.y,
        0,
        -1,
        playerPosn.direction,
        PLAYER_DIRECTIONS.UP,
        currentMapId,
        (newX, newY, direction) => {
          setPlayerPosn({
            x: newX,
            y: newY,
            direction,
            viewPort: GLOBALS.getViewport(
              GAME_MAPS[currentMapId].tiles,
              newX,
              newY,
              GAME_MAPS[currentMapId].objects,
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
        currentMapId,
        (newX, newY, direction) => {
          setPlayerPosn({
            x: newX,
            y: newY,
            direction,
            viewPort: GLOBALS.getViewport(
              GAME_MAPS[currentMapId].tiles,
              newX,
              newY,
              GAME_MAPS[currentMapId].objects,
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
        currentMapId,
        (newX, newY, direction) => {
          setPlayerPosn({
            x: newX,
            y: newY,
            direction,
            viewPort: GLOBALS.getViewport(
              GAME_MAPS[currentMapId].tiles,
              newX,
              newY,
              GAME_MAPS[currentMapId].objects,
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
        currentMapId,
        (newX, newY, direction) => {
          setPlayerPosn({
            x: newX,
            y: newY,
            direction,
            viewPort: GLOBALS.getViewport(
              GAME_MAPS[currentMapId].tiles,
              newX,
              newY,
              GAME_MAPS[currentMapId].objects,
            ),
          });
        },
      );
      break;
    case " ":
      // space bar pressed - could be used for interactions in the future
      console.log("Space bar pressed - interaction placeholder");
      playerInteraction(gameState);
      break;
    default:
      break;
  }
}

export { handleKeyDown, PLAYER_DIRECTIONS };
