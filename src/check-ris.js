function CheckRis(
  GRID_COLS = 15,
  COL_SPREAD = 5,
  DYNAMIC_COL_SPREAD = true,
  MAX_LEVELS = 20,
  LEVEL_INITIAL = 0,
  SPEED_MS = 50,
  INTERACTION_KEY_CODE = 32
) {
  this.GRID_COLS = GRID_COLS;
  this.COL_SPREAD = COL_SPREAD;
  this.COL_SPREAD_DEFAULT = COL_SPREAD;
  this.DYNAMIC_COL_SPREAD = DYNAMIC_COL_SPREAD;
  this.MAX_LEVELS = MAX_LEVELS;
  this.LEVEL_INITIAL = LEVEL_INITIAL;
  this.SPEED_MS_DEFAULT = SPEED_MS;
  this.SPEED_MS = SPEED_MS;
  this.LEVEL = LEVEL_INITIAL;
  this.INTERACTION_KEY_CODE = INTERACTION_KEY_CODE;

  this.reset = function () {
    this.GRID_COLS = GRID_COLS;
    this.COL_SPREAD_DEFAULT = COL_SPREAD;
    this.DYNAMIC_COL_SPREAD = DYNAMIC_COL_SPREAD;
    this.MAX_LEVELS = MAX_LEVELS;
    this.LEVEL_INITIAL = LEVEL_INITIAL;
    this.SPEED_MS_DEFAULT = SPEED_MS;
    this.SPEED_MS = SPEED_MS;
    this.LEVEL = LEVEL_INITIAL;
    this.INTERACTION_KEY_CODE = INTERACTION_KEY_CODE;
    this.COL_SPREAD = COL_SPREAD;
  };

  this.speedCalc = function (level = 0) {
    const deductionSpeed = level * 1;
    if (SPEED_MS > deductionSpeed) {
      return SPEED_MS - deductionSpeed;
    }
    return SPEED_MS;
  };
}
export default CheckRis;
