function Aliens(game, { doAttack }) {
  let _doAttack = doAttack;

  Object.defineProperty(this, 'doAttack', {
    get() {
      return _doAttack;
    },
    set(value) {
      _doAttack = value;
      this.attack(game);
    }
  });

  let alienPositions = [];

  this.getAlienPositions = function () {
    return alienPositions;
  };

  this.attack = function (game) {
    const id = 1;
    alienPositions = [];

    function drawAlienCallback(newAlienPositions) {
      alienPositions = newAlienPositions;
    }

    function makeDrawAlien() {
      const drawAlien = (game, frameCount) => {
        /* alienPositions is closured in on from upper scope */
        if (frameCount % 10 === 0) {
          if (alienPositions.length > 0) {
            alienPositions.forEach((alien, index) => {
              $(`input[id="${alien.x}"][data-level="${alien.y}"]`).prop(
                'checked',
                false
              );
              $(`#${alien.x}-${alien.y}-wrap`).removeClass('p-danger');
              if (alien.y <= game.MAX_LEVELS && alien.y >= 0) {
                alien.y = alien.y - 1;
              } else {
                alienPositions.splice(index, 1);
              }
              $(`input[id="${alien.x}"][data-level="${alien.y}"]`).prop(
                'checked',
                true
              );
              $(`#${alien.x}-${alien.y}-wrap`).addClass('p-danger');
            });
          }
          if (Math.random() > 0.5) {
            alienPositions.push({
              y: game.MAX_LEVELS,
              x: Math.floor(Math.random() * game.GRID_COLS)
            });
          }
        }
        return alienPositions;
      };
      return drawAlien;
    }

    if (this.doAttack) {
      game.addGameProcess({
        id,
        runner: makeDrawAlien(),
        callback: drawAlienCallback
      });
    } else {
      game.removeGameProcess(id);
    }
  };

  this.destroyAlien = function (missileX, missileY) {
    const alienIndex = alienPositions.findIndex(
      alien => alien.x === missileX && alien.y === missileY
    );
    if (alienIndex >= 0) {
      alienPositions.splice(alienIndex, 1);
      $(`#${missileX}-${missileY}-wrap`).removeClass('p-danger');
      return true;
    }
    return false;
  };
}

export default Aliens;
