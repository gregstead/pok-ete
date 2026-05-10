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

  const [gamePrompt, setGamePrompt] = useState({
    text: "",
    visible: false,
    promptOptions: null,
    // TODO next: treat this as the single source of truth for the selected prompt option.
    // The radio inputs should update this value; Enter/confirm should consume it.
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
  }, [playerPosn, gamePrompt, currentMapId, assetsLoaded, gamePrompt]);

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
                // TODO next: once the prompt owns focus while visible, decide whether this
                // handler should stay here or move to a shared parent/prompt-specific handler.
                onKeyDown={(event) =>
                  handleKeyDown(event, {
                    playerPosn,
                    setPlayerPosn,
                    gamePrompt,
                    setGamePrompt,
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
            <GamePrompt gamePrompt={gamePrompt} setGamePrompt={setGamePrompt} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
