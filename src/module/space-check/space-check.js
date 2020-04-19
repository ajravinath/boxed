function SpaceCheck(GRID_COLS = 20, MAX_LEVELS = 25) {
  this.shipX = 0;
  this.shipY = 0;
  let _score = 0;
  let _result = '';
  Object.defineProperties(this, {
    score: {
      get() {
        return _score;
      },
      set(score) {
        $(document).trigger('scoreChangeEvent', this);
        _score = score;
      }
    },
    result: {
      get() {
        return _result;
      },
      set(result) {
        $(document).trigger('resultChangeEvent', this);
        _result = result;
      }
    }
  });

  this.result = '';
  this.GRID_COLS = GRID_COLS;
  this.MAX_LEVELS = MAX_LEVELS;
  this.stopGame = false;

  let gameProcess = {};

  this.addGameProcess = function (process) {
    gameProcess[process.id] = process;
  };

  this.removeGameProcess = function (id) {
    delete gameProcess[id];
  };

  this.startGame = function () {
    let frameCount = 0;
    const gameLoop = setInterval(() => {
      if (this.stopGame) {
        clearInterval(gameLoop);
      }
      frameCount = frameCount + 1;
      Object.keys(gameProcess).forEach(key => {
        gameProcess[key].callback(gameProcess[key].runner(this, frameCount));
      });
    }, 33);
  };
}

export default SpaceCheck;
