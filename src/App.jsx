import { useEffect, useRef, useState, useMemo } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef(null);

  const worldMap = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
  ];
  const tileSize = 32; // size of each tile in pixels
  const centerX = Math.floor(worldMap[0].length / 2);
  const centerY = Math.floor(worldMap.length / 2);

  function drawMap(worldMap = null, tileSize = null) {
    const canvas = canvasRef.current; // get the canvas element
    const ctx = canvas.getContext("2d"); // get the 2d drawing context
    // draw a square world map
    canvas.width = worldMap[0].length * tileSize;
    canvas.height = worldMap.length * tileSize;

    // draw the world map
    for (let y = 0; y < worldMap.length; y++) {
      for (let x = 0; x < worldMap[y].length; x++) {
        const tile = worldMap[y][x];

        if (tile === 1) {
          ctx.fillStyle = "green";
        } else if (tile === 0) {
          ctx.fillStyle = "blue";
        }
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        // ctx.strokeStyle = "none";
        // ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }
  const [playerX, setPlayerX] = useState(centerX);
  const [playerY, setPlayerY] = useState(centerY);

  function movePlayer(dx, dy) {
    const newX = playerX + dx;
    const newY = playerY + dy;

    // check if the new position is within the bounds of the map and is not a wall
    if (
      newX >= 0 &&
      newX < worldMap[0].length &&
      newY >= 0 &&
      newY < worldMap.length &&
      worldMap[newY][newX] === 1
    ) {
      setPlayerX(newX);
      setPlayerY(newY);
    }
  }

  function drawPlayer(posnX, posY) {
    const canvas = canvasRef.current; // get the canvas element
    const ctx = canvas.getContext("2d"); // get the 2d drawing context

    ctx.fillStyle = "red";
    ctx.fillRect(posnX * tileSize, posY * tileSize, tileSize, tileSize);
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
    drawMap(worldMap, tileSize);
    drawPlayer(playerX, playerY);
  }, [worldMap, tileSize, playerX, playerY]);

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
