import { useEffect, useRef } from "react";

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current; // get the canvas element
    const ctx = canvas.getContext("2d"); // get the 2d drawing context

    const tileSize = 32; // size of each tile in pixels
    const worldMap = [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ];

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

    // draw a red square at the center of the map
    const centerX = Math.floor(worldMap[0].length / 2);
    const centerY = Math.floor(worldMap.length / 2);
    ctx.fillStyle = "red";
    ctx.fillRect(centerX * tileSize, centerY * tileSize, tileSize, tileSize);
  }, []);

  return (
    <div className="canvas-container">
      <div>
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          style={{ border: "1px solid black" }}
        />
      </div>
    </div>
  );
}

export default App;
