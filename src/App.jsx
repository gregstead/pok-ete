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
  // Game Messages
  const [message, setMessage] = useState({
    text: "",
    visible: false,
  });

  const [currentMapId, setCurrentMapId] = useState("bedroom"); // default to bedroom map
  const [playerPosn, setPlayerPosn] = useState({
    x: GAME_MAPS[currentMapId].startingX,
    y: GAME_MAPS[currentMapId].startingY,
    direction: PLAYER_DIRECTIONS.DOWN,
    viewPort: GLOBALS.getViewport(
      GAME_MAPS[currentMapId].tiles,
      GAME_MAPS[currentMapId].startingX,
      GAME_MAPS[currentMapId].startingY,
      GAME_MAPS[currentMapId].objects,
    ),
  });

  useEffect(() => {
    console.log("useEffect triggered");
    drawViewport(canvasRef, playerPosn.viewPort);
    drawPlayer(playerPosn, canvasRef);
    if (message.visible) {
      // draw the message box
      drawMessageModal(message.text, canvasRef);
    }
  }, [playerPosn, message, currentMapId]);

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
