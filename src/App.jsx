import { useEffect, useRef, useState } from "react";
import worldMapData from "./constants.js";
import "./helpers.js";
import "./App.css";
import {
  drawPlayer,
  drawViewport,
  drawMessageModal,
} from "./canvasRendering.js";
import { handleKeyDown, PLAYER_DIRECTIONS } from "./userInteractions.js";

function App() {
  const canvasRef = useRef(null);

  const [playerPosn, setPlayerPosn] = useState({
    x: worldMapData.CENTER_X,
    y: worldMapData.CENTER_Y,
    direction: PLAYER_DIRECTIONS.DOWN,
    viewPort: worldMapData.getViewport(
      worldMapData.WORLD_MAP,
      worldMapData.CENTER_X,
      worldMapData.CENTER_Y,
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
          })
        }
      >
        <canvas
          ref={canvasRef}
          width={playerPosn.viewPort.viewportSize * worldMapData.TILE_SIZE}
          height={playerPosn.viewPort.viewportSize * worldMapData.TILE_SIZE}
          style={{ border: "1px solid black" }}
        />
      </div>
    </div>
  );
}

export default App;
