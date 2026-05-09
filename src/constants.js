// Magic numbers

const CANVAS_WIDTH = 624;
const CANVAS_HEIGHT = 468;
const SPRITE_TILE_SIZE = 32; // the size of each individual sprite within the tileset image (assuming a grid layout)
const TILE_SIZE = 32;

const CANVAS_PIXEL_SCALE = 1;

const VIEWPORT_TILE_WIDTH = Math.ceil(
  (CANVAS_WIDTH * CANVAS_PIXEL_SCALE) / TILE_SIZE,
);
const VIEWPORT_TILE_HEIGHT = Math.ceil(
  (CANVAS_HEIGHT * CANVAS_PIXEL_SCALE) / TILE_SIZE,
);

const BRAND_COLORS = {
  blue_sky: "#0994F9",
  blue_water_standard: "#1CA3EC",
  blue_water_dark: "#127683",
  white_cloud: "#B2D0F6",
  green_dark: "#404919",
  green_standard: "#3f5d2a",
  green_light: "#6E7A23",
  orange_standard: "#E2A636",
  red_standard: "#E23667",
  black_buildings: "#100808",
  beige_building_floors: "#9c906b",
  beige_building_floors_dark: "#313120",
};

const GAME_SM_TEXT = {
  BEZEL_SUPER: "dot matrix with stereo sound",
  BEZEL_BATTERY_INDICATOR: "battery",
  CONSOLE_POWER_OFF: "off",
  CONSOLE_POWER_ON: "on",
  CONSOLE_BRAND: "nintendo",
  CONSOLE_NAME: "game boy",
  CONSOLE_TM: "tm",
  CONSOLE_HEADPHONE: "phones",
};

const CANVAS_PROPERTIES = {
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  pixelScale: CANVAS_PIXEL_SCALE,
};

const PLAYER_DIRECTIONS = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
};

const PLAYER_INTERACTIONS = {
  SELECT: "select",
  START: "start",
  B: "b",
  A: "a",
};

const GLOBALS = {
  BRAND_COLORS,
  CANVAS_PROPERTIES,
  PLAYER_DIRECTIONS,
  PLAYER_INTERACTIONS,
  SPRITE_TILE_SIZE,
  TILE_SIZE,
  VIEWPORT_TILE_WIDTH,
  VIEWPORT_TILE_HEIGHT,
  GAME_SM_TEXT,
};

export default GLOBALS;
