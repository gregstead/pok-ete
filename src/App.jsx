import { useEffect, useRef, useState } from "react";
import GLOBALS from "./constants.js";
import GAME_MAPS from "./gameMaps.js";
import { getViewport, handleOnLoad } from "./helpers.js";
import "./App.css";
import "./game-sm.css";
import { drawPlayer, drawViewport } from "./canvasRendering.js";
import { handleKeyDown } from "./userInteractions.js";
import GamePrompt from "./GamePrompt.jsx";

function App() {
  const canvasRef = useRef(null);
  // Game Messages
  // const [message, setMessage] = useState({
  //   text: "",
  //   visible: false,
  //   promptOptions: null, // for future use when we want to add options to messages (e.g. yes/no prompts)
  // });

  const [gamePrompts, setGamePrompts] = useState({
    text: "",
    visible: false,
    promptOptions: null,
    userResponse: null,
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
  }, [playerPosn, gamePrompts, currentMapId, assetsLoaded, gamePrompts]);

  return (
    <div className="app-container">
      <div className="game-sm-bezel">
        <div className="game-sm-bezel-super-container">
          <span className="game-sm-bezel-super-accent game-sm-bezel-super-accent-left">
            &zwnj;
          </span>
          <span className="game-sm-bezel-super-text">
            {GLOBALS.GAME_SM_TEXT.BEZEL_SUPER}
          </span>
          <span className="game-sm-bezel-super-accent game-sm-bezel-super-accent-right">
            &zwnj;
          </span>
        </div>
        <div className="game-sm-bezel-power-indicator hidden d-none">
          &zwnj;
        </div>
        <div className="game-sm-bezel-display">
          <div className="game-container">
            <div className="canvas-container">
              <div
                className="canvas-handler-container"
                tabIndex={0} // make the div focusable to receive key events
                onKeyDown={(event) =>
                  handleKeyDown(event, {
                    playerPosn,
                    setPlayerPosn,
                    gamePrompts,
                    setGamePrompts,
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
            <GamePrompt
              text={gamePrompts.text}
              visible={gamePrompts.visible}
              promptOptions={gamePrompts.promptOptions}
              userResponse={gamePrompts.userResponse}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
