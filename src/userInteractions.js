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
          ...gamePrompt,
          text: gameObject.message,
          visible: true,
          promptOptions: null,
        });
      } else {
        setGamePrompt({
          ...gamePrompt,
          text: "",
          visible: false,
          promptOptions: null,
        });
      }
      break;
    case "portal":
      if (!gamePrompt.visible) {
        setGamePrompt({
          ...gamePrompt,
          text: gameObject.action.promptMessage,
          visible: true,
          promptOptions: gameObject.action.promptOptions,
        });

        return; // wait for the player to acknowledge the message before changing maps
      } else {
        setGamePrompt({
          ...gamePrompt,
          text: "",
          visible: false,
          promptOptions: null,
        });
      }

      // TODO next: this portal action is now a two-step flow:
      // 1. show the prompt and capture userResponse
      // 2. confirm the response, then run or cancel the map transition below
      // newMapId = gameObject.action.targetMap;

      // setCurrentMapId(newMapId);
      // setGamePrompt({
      //   ...gamePrompt,
      //   text: "",
      //   visible: false,
      //   promptOptions: null,
      // }); // hide any messages when changing maps
      // // reset player position to the center of the new map
      // setPlayerPosn({
      //   ...playerPosn,
      //   x: GAME_MAPS[newMapId].startingX,
      //   y: GAME_MAPS[newMapId].startingY,
      //   direction: playerPosn.direction, // keep the same direction when changing maps
      //   viewPort: getViewport(
      //     GAME_MAPS[newMapId],
      //     GAME_MAPS[newMapId].startingX,
      //     GAME_MAPS[newMapId].startingY,
      //   ), // update the viewport for the new map
      // });
      break;
    default:
      break;
  }
}

function handleGameDynamics(event, gameState) {
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
            ...playerPosn,
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
            ...playerPosn,
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
            ...playerPosn,
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
            ...playerPosn,
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

function handleGamePromptKeydown(event, gameState) {
  const { gamePrompt, _setGamePrompt } = gameState;
  // TODO next: do not read the selected option from event.target here.
  // Read gamePrompt.userResponse, then use Enter/Space to confirm or Escape to cancel.
  console.log(
    "handleGamePromptKeydown: target ",
    event.target,
    "gamePrompt ",
    gamePrompt,
  );
}

function handleKeyDown(event, gameState) {
  const { gamePrompt } = gameState;
  console.log("handleKeyDown, ", event.key);
  if (!gamePrompt.visible) {
    handleGameDynamics(event, gameState);
  } else {
    handleGamePromptKeydown(event, gameState);
  }
}

function handleFormFocus(event, gamePromptState) {
  const { gamePrompt, setGamePrompt } = gamePromptState;
  const userResponse = event.target.value;
  // TODO next: this should likely become handlePromptOptionChange.
  // Use setGamePrompt((prev) => ({ ...prev, userResponse })) so selection updates
  // are based on the latest React state instead of the render that created this handler.
  console.log("Value changed: ", userResponse);
}

export { handleKeyDown, handleGamePromptKeydown, handleFormFocus };
