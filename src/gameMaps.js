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
    type: "door",
    tilsetIndex: { x: 52, y: 19 }, // the tile coordinates of the door sprite within the tileset
    terrain: 1, // the tile type that this object is associated with (for rendering purposes)
    message: "This is a door.",
    objectx: 7, // coordinates for the door object in the bedroom map
    objecty: 3,
  },
];

const TOWN_OBJECTS = [
  {
    name: "Welcome Sign",
    type: "sign",
    tilsetIndex: { x: 21, y: 20 },
    terrain: 1,
    message: "Welcome to Pokemon Eternal!",
    objectx: 7,
    objecty: 5,
  },
];

const TOWN_TILESET = new Image();
TOWN_TILESET.src = "/sprites/slates_v2.png";

const TOWN_SPRITES = {
  tileset: TOWN_TILESET,
  0: {
    color: GLOBALS.BRAND_COLORS.blue_water_standard,
    tilesetIndex: { x: 19, y: 4 },
  }, // water
  1: {
    color: GLOBALS.BRAND_COLORS.green_standard,
    tilesetIndex: { x: 1, y: 2 },
  }, // grass
  2: {
    color: GLOBALS.BRAND_COLORS.green_light,
    tilesetIndex: { x: 5, y: 2 },
  }, // path
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
