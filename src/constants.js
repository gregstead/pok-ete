const TILE_SIZE = 32;
const WORLD_MAP = [
  [0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0],
];

const CENTER_X = Math.floor(WORLD_MAP[0].length / 2);
const CENTER_Y = Math.floor(WORLD_MAP.length / 2);

const worldMapData = { TILE_SIZE, WORLD_MAP, CENTER_X, CENTER_Y };

export default worldMapData;
