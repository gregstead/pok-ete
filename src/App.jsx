import { useEffect, useRef, useState, useMemo } from "react";
import worldMapData from "./Constants.js";
import "./helpers.js";
import "./App.css";
import { isValidMove } from "./helpers.js";
import { drawMap, drawPlayer } from "./canvasRendering.js";

function App() {
  const canvasRef = useRef(null);
  // local variables
  const worldMap = worldMapData.WORLD_MAP;
  const tileSize = worldMapData.TILE_SIZE;
  // states
  const [playerX, setPlayerX] = useState(worldMapData.CENTER_X);
  const [playerY, setPlayerY] = useState(worldMapData.CENTER_Y);
  // const [worldMap, setWorldMap] = useState(worldMapData.WORLD_MAP); --- I will eventuall want worldMap to be a mutable, a subset of worldMapData.WORLD_MAP ---

  function movePlayer(dx, dy) {
    const newX = playerX + dx;
    const newY = playerY + dy;

    if (isValidMove(worldMap, newX, newY)) {
      setPlayerX(newX);
      setPlayerY(newY);
    }
  }

  // add event listener for key presses
  function handleKeyDown(event) {
    switch (event.key) {
      case "ArrowUp":
        movePlayer(0, -1);
        break;
      case "ArrowDown":
        movePlayer(0, 1);
        break;
      case "ArrowLeft":
        movePlayer(-1, 0);
        break;
      case "ArrowRight":
        movePlayer(1, 0);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    drawMap(canvasRef);
    drawPlayer(playerX, playerY, canvasRef);
  }, [playerX, playerY]);

  return (
    <div className="canvas-container">
      <div
        className="canvas-handler-container"
        tabIndex={0} // make the div focusable to receive key events
        onKeyDown={handleKeyDown}
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
