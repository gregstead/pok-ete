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

const GAME_MAP = [
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
    name: "Bedroom Door",
    type: "portal",
    tilsetIndex: { x: 52, y: 19 },
    terrain: 0,
    objectx: 7,
    objecty: 0,
    action: {
      type: "changeMap",
      targetMap: "town",
      promptMessage: "Leave bedroom and go to town?",
      promptOptions: ["Yes", "No"], // options for the player to choose from when prompted
    },
  },
];

const TOWN_OBJECTS = [
  {
    name: "Welcome Sign",
    type: "sign",
    tilsetIndex: { x: 21, y: 20 },
    terrain: 1,
    message: "Welcome to Blissful Meadows!",
    objectx: 7,
    objecty: 5,
  },
];

const GAME_TILESET = new Image();
GAME_TILESET.src = "/sprites/slates_v2.png";

const BEDROOM_SPRITES = {
  tileset: GAME_TILESET,
  0: {
    color: GLOBALS.BRAND_COLORS.black_buildings,
    tilesetIndex: { x: null, y: null },
  }, // water
  1: {
    color: GLOBALS.BRAND_COLORS.beige_building_floors,
    tilesetIndex: { x: 13, y: 2 },
  }, // grass
  2: {
    color: GLOBALS.BRAND_COLORS.beige_building_floors_dark,
    tilesetIndex: { x: 15, y: 7 },
  }, // path
};

const TOWN_SPRITES = {
  tileset: GAME_TILESET,
  0: {
    color: GLOBALS.BRAND_COLORS.blue_water_standard,
    tilesetIndex: { x: null, y: null },
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
    sprites: BEDROOM_SPRITES,
  },
  town: {
    tiles: GAME_MAP,
    objects: TOWN_OBJECTS,
    centerX: getCenterX(GAME_MAP),
    centerY: getCenterY(GAME_MAP),
    startingX: 1,
    startingY: 1,
    sprites: TOWN_SPRITES,
  },
};

export default GAME_MAPS;
