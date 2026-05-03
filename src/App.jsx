import { useEffect, useRef, useState } from "react";
import worldMapData from "./constants.js";
import "./helpers.js";
import "./App.css";
import { drawMap, drawPlayer } from "./canvasRendering.js";
import { handleKeyDown, PLAYER_DIRECTIONS } from "./userInteractions.js";

function App() {
  const canvasRef = useRef(null);

  const [playerPosn, setPlayerPosn] = useState({
    x: worldMapData.CENTER_X,
    y: worldMapData.CENTER_Y,
    direction: PLAYER_DIRECTIONS.DOWN,
  });

  useEffect(() => {
    drawMap(canvasRef);
    drawPlayer(playerPosn.x, playerPosn.y, playerPosn.direction, canvasRef);
  }, [playerPosn.x, playerPosn.y, playerPosn.direction]);

  return (
    <div className="canvas-container">
      <div
        className="canvas-handler-container"
        tabIndex={0} // make the div focusable to receive key events
        onKeyDown={(event) =>
          handleKeyDown(
            event,
            playerPosn.x,
            playerPosn.y,
            playerPosn.direction,
            (newX, newY, direction) => {
              setPlayerPosn({ x: newX, y: newY, direction });
            },
          )
        }
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          style={{ border: "1px solid black" }}
        />
      </div>
    </div>
  );
}

export default App;
