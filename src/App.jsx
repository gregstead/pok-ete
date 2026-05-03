import { useEffect, useRef, useState } from "react";
import GLOBALS from "./constants.js";
import GAME_MAPS from "./gameMaps.js";
// import "./helpers.js";
import "./App.css";
import {
  drawPlayer,
  drawViewport,
  drawMessageModal,
} from "./canvasRendering.js";
import { handleKeyDown, PLAYER_DIRECTIONS } from "./userInteractions.js";

function App() {
  const canvasRef = useRef(null);
  const [currentMapId, setCurrentMapId] = useState("bedroom"); // default to bedroom map
  const [playerPosn, setPlayerPosn] = useState({
    x: GAME_MAPS[currentMapId].centerX,
    y: GAME_MAPS[currentMapId].centerY,
    direction: PLAYER_DIRECTIONS.DOWN,
    viewPort: GLOBALS.getViewport(
      GAME_MAPS[currentMapId].tiles,
      GAME_MAPS[currentMapId].centerX,
      GAME_MAPS[currentMapId].centerY,
      GAME_MAPS[currentMapId].objects,
    ),
  });

  const [message, setMessage] = useState({
    text: "",
    visible: false,
  });

  useEffect(() => {
    // drawMap(canvasRef);
    drawViewport(canvasRef, playerPosn.viewPort);
    drawPlayer(
      playerPosn.x - playerPosn.viewPort.viewportOriginX,
      playerPosn.y - playerPosn.viewPort.viewportOriginY,
      playerPosn.direction,
      canvasRef,
    );
    if (message.visible) {
      // draw the message box
      drawMessageModal(message.text, canvasRef);
    }
  }, [
    playerPosn.x,
    playerPosn.y,
    playerPosn.direction,
    playerPosn.viewPort,
    message,
  ]);

  return (
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
          width={playerPosn.viewPort.viewportSize * GLOBALS.TILE_SIZE}
          height={playerPosn.viewPort.viewportSize * GLOBALS.TILE_SIZE}
          style={{ border: "1px solid black" }}
        />
      </div>
    </div>
  );
}

export default App;
