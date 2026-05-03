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

const GAME_MAPS = {
  bedroom: {
    tiles: BEDROOM_MAP,
    objects: BEDROOM_OBJECTS,
    centerX: Math.floor(BEDROOM_MAP[0].length / 2),
    centerY: Math.floor(BEDROOM_MAP.length / 2),
  },
  town: {
    tiles: TOWN_MAP,
    objects: TOWN_OBJECTS,
    centerX: Math.floor(TOWN_MAP[0].length / 2),
    centerY: Math.floor(TOWN_MAP.length / 2),
  },
};

export default GAME_MAPS;
