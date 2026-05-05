import { useEffect, useRef, useState } from "react";
import GLOBALS from "./constants.js";
import GAME_MAPS from "./gameMaps.js";
import { getViewport, handleOnLoad } from "./helpers.js";
import "./App.css";
import {
  drawPlayer,
  drawViewport,
  drawMessageModal,
} from "./canvasRendering.js";
import { handleKeyDown } from "./userInteractions.js";
import GamePrompt from "./GamePrompt.jsx";

function App() {
  const canvasRef = useRef(null);
  // Game Messages
  const [message, setMessage] = useState({
    text: "",
    visible: false,
    promptOptions: null, // for future use when we want to add options to messages (e.g. yes/no prompts)
  });

  const [gamePompts, setGamePrompts] = useState({
    text: "",
    visible: false,
    promptOptions: null,
  });

  const [assetsLoaded, setAssetsLoaded] = useState(false); // track whether assets are loaded

  const [currentMapId, setCurrentMapId] = useState("bedroom"); // default to bedroom map
  const [playerPosn, setPlayerPosn] = useState({
    x: GAME_MAPS[currentMapId].startingX,
    y: GAME_MAPS[currentMapId].startingY,
    direction: GLOBALS.PLAYER_DIRECTIONS.DOWN,
    viewPort: getViewport(
      GAME_MAPS[currentMapId],
      GAME_MAPS[currentMapId].startingX,
      GAME_MAPS[currentMapId].startingY,
    ),
  });

  useEffect(() => {
    handleOnLoad(GAME_MAPS[currentMapId], {
      assetsLoaded,
      setAssetsLoaded,
    });
    drawViewport(
      canvasRef,
      playerPosn.viewPort.viewport,
      GAME_MAPS[currentMapId].sprites,
    );
    drawPlayer(playerPosn, canvasRef);
    if (message.visible) {
      // draw the message box
      drawMessageModal(message, canvasRef);
    }
  }, [playerPosn, message, currentMapId, assetsLoaded]);

  return (
    <div className="game-container">
      <GamePrompt
        text={message.text}
        visible={message.visible}
        promptOptions={message.promptOptions}
      />
      <div className="canvas-container">
        <div
          className="canvas-handler-container"
          tabIndex={0} // make the div focusable to receive key events
          onKeyDown={(event) =>
            handleKeyDown(event, {
              playerPosn,
              setPlayerPosn,
              message,
              setMessage,
              currentMapId,
              setCurrentMapId,
            })
          }
        >
          <canvas
            ref={canvasRef}
            width={
              GLOBALS.CANVAS_PROPERTIES.width *
              GLOBALS.CANVAS_PROPERTIES.pixelScale
            }
            height={
              GLOBALS.CANVAS_PROPERTIES.height *
              GLOBALS.CANVAS_PROPERTIES.pixelScale
            }
            style={{ border: "1px solid black" }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
