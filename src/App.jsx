import { useEffect, useRef, useState } from "react";
import worldMapData from "./constants.js";
import "./helpers.js";
import "./App.css";
import { drawMap, drawPlayer } from "./canvasRendering.js";
import { handleKeyDown } from "./userInteractions.js";

function App() {
  const canvasRef = useRef(null);

  // states
  const [playerX, setPlayerX] = useState(worldMapData.CENTER_X);
  const [playerY, setPlayerY] = useState(worldMapData.CENTER_Y);

  useEffect(() => {
    drawMap(canvasRef);
    drawPlayer(playerX, playerY, canvasRef);
  }, [playerX, playerY]);

  return (
    <div className="canvas-container">
      <div
        className="canvas-handler-container"
        tabIndex={0} // make the div focusable to receive key events
        onKeyDown={(event) =>
          handleKeyDown(event, playerX, playerY, (newX, newY) => {
            setPlayerX(newX);
            setPlayerY(newY);
          })
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
