import GLOBALS from "./constants.js";

const BEDROOM_MAP = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 2, 2, 2, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 2, 0, 2, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 2, 0, 2, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 2, 0, 2, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 2, 0, 2, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 2, 0, 2, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 2, 2, 2, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const TOWN_MAP = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 0],
  [0, 2, 1, 2, 0, 0, 0, 0, 2, 1, 2, 0],
  [0, 2, 1, 2, 0, 0, 0, 0, 2, 1, 2, 0],
  [0, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 0],
  [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const BEDROOM_OBJECTS = [
  {
    name: "Door",
    sprite: "door.png",
    message: "This is a door.",
    type: "door",
    objectx: 5,
    objecty: 10,
  },
];

const TOWN_OBJECTS = [
  {
    name: "Welcome Sign",
    sprite: "sign.png",
    type: "sign",
    message: "Welcome to Pokemon Eternal!",
    objectx: 7,
    objecty: 5,
  },
];

const TOWN_SPRITES = {
  0: { sx: null, sy: null, color: GLOBALS.BRAND_COLORS.blue_water_standard }, // water
  1: { sx: 16, sy: 16, color: GLOBALS.BRAND_COLORS.green_standard }, // grass
  2: { sx: null, sy: null, color: GLOBALS.BRAND_COLORS.green_light }, // path
  9: { sx: null, sy: null, color: GLOBALS.BRAND_COLORS.orange_standard }, // object (like sign or door)
};

function getCenterX(map) {
  return Math.floor(map[0].length / 2);
}

function getCenterY(map) {
  return Math.floor(map.length / 2);
}

const GAME_MAPS = {
  bedroom: {
    tiles: BEDROOM_MAP,
    objects: BEDROOM_OBJECTS,
    centerX: getCenterX(BEDROOM_MAP),
    centerY: getCenterY(BEDROOM_MAP),
    startingX: 1,
    startingY: 1,
    sprites: TOWN_SPRITES, // for simplicity, we'll use the same sprites for both maps for now
  },
  town: {
    tiles: TOWN_MAP,
    objects: TOWN_OBJECTS,
    centerX: getCenterX(TOWN_MAP),
    centerY: getCenterY(TOWN_MAP),
    startingX: 1,
    startingY: 1,
    sprites: TOWN_SPRITES,
  },
};

export default GAME_MAPS;
