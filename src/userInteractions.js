import GLOBALS from "./constants.js";
import { isValidMove, getViewport } from "./helpers.js";
import GAME_MAPS from "./gameMaps.js";

const { PLAYER_DIRECTIONS } = GLOBALS;

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

  if (isValidMove(GAME_MAPS[currentMapId], newX, newY)) {
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
    gamePrompt,
    setGamePrompt,
    _currentMapId,
    setCurrentMapId,
    playerPosn,
    setPlayerPosn,
  } = gameState;

  switch (gameObject.type) {
    case "sign":
      if (!gamePrompt.visible) {
        setGamePrompt({
          text: gameObject.message,
          visible: true,
          promptOptions: null,
        });
      } else {
        setGamePrompt({ text: "", visible: false, promptOptions: null });
      }
      break;
    case "portal":
      if (!gamePrompt.visible) {
        setGamePrompt({
          text: gameObject.action.promptMessage,
          visible: true,
          promptOptions: gameObject.action.promptOptions,
        });

        return; // wait for the player to acknowledge the message before changing maps
      } else {
        setGamePrompt({ text: "", visible: false, promptOptions: null });
      }

      newMapId = gameObject.action.targetMap;

      setCurrentMapId(newMapId);
      setGamePrompt({ text: "", visible: false, promptOptions: null }); // hide any messages when changing maps
      // reset player position to the center of the new map
      setPlayerPosn({
        x: GAME_MAPS[newMapId].startingX,
        y: GAME_MAPS[newMapId].startingY,
        direction: playerPosn.direction, // keep the same direction when changing maps
        viewPort: getViewport(
          GAME_MAPS[newMapId],
          GAME_MAPS[newMapId].startingX,
          GAME_MAPS[newMapId].startingY,
        ), // update the viewport for the new map
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
            viewPort: getViewport(GAME_MAPS[currentMapId], newX, newY),
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
            viewPort: getViewport(GAME_MAPS[currentMapId], newX, newY),
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
            viewPort: getViewport(GAME_MAPS[currentMapId], newX, newY),
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
            viewPort: getViewport(GAME_MAPS[currentMapId], newX, newY),
          });
        },
      );
      break;
    case " ":
      // space bar pressed - could be used for interactions in the future
      console.log(
        "Space bar pressed - interaction placeholder - State: ",
        gameState,
      );
      playerInteraction(gameState);
      break;
    default:
      break;
  }
}

export { handleKeyDown };
