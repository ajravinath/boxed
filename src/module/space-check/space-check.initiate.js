import { v4 as uuidV4 } from 'uuid';
import attachDraggableController from '../shared/draggable-controller';
import Aliens from './aliens';
import SpaceCheck from './space-check';
import { setResult, setScore } from './space-check.behaviour';
import './space-check.scss';
import drawGame from './space-check.sprites';
import { setTitle, setHeading } from '../shared/dom';

function initiateSpaceCheck() {
  setTitle('Check-ris');
  setHeading('Space-Check 🚀');

  let game = new SpaceCheck();
  let aliens = new Aliens(game, { doAttack: false });

  game.startGame();
  const actions = {
    initial() {
      if (!aliens.doAttack) {
        aliens.doAttack = true;
      }
    },
    action() {
      fireMissile(game, aliens);
    },
    left() {
      if (game.shipX > 0) {
        clearShip(game);
        game.shipX = game.shipX - 1;
        drawShip(game);
      }
    },
    right() {
      if (game.shipX < game.GRID_COLS - 3) {
        clearShip(game);
        game.shipX = game.shipX + 1;
        drawShip(game);
      }
    },
    up() {
      if (game.shipY < game.MAX_LEVELS - 3) {
        clearShip(game);
        game.shipY = game.shipY + 1;
        drawShip(game);
      }
    },
    down() {
      if (game.shipY > 0) {
        clearShip(game);
        game.shipY = game.shipY - 1;
        drawShip(game);
      }
    }
  };

  drawGame(game);
  drawShip(game);
  attachDraggableController('controller-wrapper', actions);

  monitorShip(game, aliens);
  setScore(game);
  setResult(game);

  $(document).on('keyup', function (event) {
    if (!game.stopGame) {
      if (
        event.which === 37 ||
        event.which === 39 ||
        event.which === 38 ||
        event.which === 40 ||
        event.which === 32
      ) {
        actions.initial();
        if (event.which === 37) {
          //left
          actions.left();
        } else if (event.which === 39) {
          //right
          actions.right();
        } else if (event.which === 38) {
          //up
          actions.up();
        } else if (event.which === 40) {
          actions.down();
        } else if (event.which === 32) {
          actions.action();
        }
      }
    }
  });

  $(document).on('scoreChangeEvent resultChangeEvent', function (event, game) {
    switch (event.type) {
      case 'scoreChangeEvent':
        setScore(game);
        break;
      case 'resultChangeEvent':
        setResult(game);
        break;
      default:
        break;
    }
  });
}

function clearShip({ shipX, shipY }) {
  paintShip(shipX, shipY, false);
  $(`input[id="${shipX}"][data-level="${shipY}"]`).prop('checked', false);
  $(`input[id="${shipX}"][data-level="${shipY + 1}"]`).prop('checked', false);
  $(`input[id="${shipX + 1}"][data-level="${shipY + 1}"]`).prop(
    'checked',
    false
  );
  $(`input[id="${shipX + 1}"][data-level="${shipY + 2}"]`).prop(
    'checked',
    false
  );
  $(`input[id="${shipX + 2}"][data-level="${shipY}"]`).prop('checked', false);
  $(`input[id="${shipX + 2}"][data-level="${shipY + 1}"]`).prop(
    'checked',
    false
  );
}

function drawShip({ shipX, shipY }) {
  paintShip(shipX, shipY, true);
  $(`input[id="${shipX}"][data-level="${shipY}"]`).prop('checked', true);
  $(`input[id="${shipX + 2}"][data-level="${shipY}"]`).prop('checked', true);

  $(`input[id="${shipX}"][data-level="${shipY + 1}"]`).prop('checked', true);
  $(`input[id="${shipX + 1}"][data-level="${shipY + 1}"]`).prop(
    'checked',
    true
  );
  $(`input[id="${shipX + 2}"][data-level="${shipY + 1}"]`).prop(
    'checked',
    true
  );

  $(`input[id="${shipX + 1}"][data-level="${shipY + 2}"]`).prop(
    'checked',
    true
  );
}

function paintShip(shipX = 0, shipY = 0, isPaint) {
  const ship = [
    $(`#${shipX}-${shipY}-wrap`),
    $(`#${shipX + 2}-${shipY}-wrap`),
    $(`#${shipX}-${shipY + 1}-wrap`),
    $(`#${shipX + 1}-${shipY + 1}-wrap`),
    $(`#${shipX + 2}-${shipY + 1}-wrap`),
    $(`#${shipX + 1}-${shipY + 2}-wrap`)
  ];
  ship.forEach(shipBlock => {
    if (isPaint) {
      shipBlock.addClass('p-success');
    } else {
      shipBlock.removeClass('p-success');
    }
  });
}

function stopGame(game) {
  game.stopGame = true;
  $(document).trigger('disconnectControllerEvent');
}

function monitorShip({ addGameProcess }, aliens) {
  const id = uuidV4();
  addGameProcess({
    id,
    runner: makeMonitorFunc(),
    callback: () => {}
  });

  function makeMonitorFunc() {
    const monitorFunc = game => {
      aliens.getAlienPositions().forEach(alien => {
        if (
          alien.x >= game.shipX &&
          alien.x <= game.shipX + 2 &&
          alien.y >= game.shipY &&
          alien.y <= game.shipY + 2
        ) {
          stopGame(game);
          game.result = 'You Failed Your Galaxy ! 🌌💥';
          return;
        }
      });
    };
    return monitorFunc;
  }
}

function Missile(initialX, initialY, missileSize) {
  this.missileSize = missileSize;
  let x = initialX;
  let y = initialY;
  Object.defineProperties(this, {
    x: {
      get() {
        return x;
      }
    },
    y: {
      get() {
        return y;
      },
      set(val) {
        y = val;
      }
    }
  });
  this.setXValue = function (index, value) {
    let newValue = value;
    if (typeof value === 'function') newValue = value(x[index]);
    x[index] = newValue;
  };
  this.setYValue = function (index, value) {
    let newValue = value;
    if (typeof value === 'function')
      newValue = value(index === 0 ? y[index] : y[index - 1]);
    y[index] = newValue;
  };
}

function fireMissile({ shipX, shipY, addGameProcess }, aliens) {
  // let missile = { y: [shipY + 3], x: [shipX + 1] };
  let missile = new Missile([shipX + 1, shipX + 1], [shipY + 3, shipY + 4], 2);
  const id = uuidV4();
  addGameProcess({
    id,
    runner: makeFireAtWill(),
    callback: () => {}
  });

  function makeFireAtWill() {
    const fireAtWill = (game, frameCount) => {
      /* move missile unless out of play: if out of play clear missile interval */
      if (frameCount % 4 === 0) {
        for (let index = 0; index < missile.missileSize; index++) {
          if (missile.y[0] <= game.MAX_LEVELS) {
            if (missile.y[0] > shipY + 3) {
              /* clearing previous missile position should be done after first position if not if will also
            clear the ship gun spout */
              $(
                `input[id="${missile.x[0]}"][data-level="${missile.y[0] - 1}"]`
              ).prop('checked', false);
              $(`#${missile.x[0]}-${missile.y[0] - 1}-wrap`).removeClass(
                'p-warning'
              );
            }

            /* missile color should be p-warning */
            $(`#${missile.x[index]}-${missile.y[index]}-wrap`).addClass(
              'p-warning'
            );

            /* paint the missile */
            $(
              `input[id="${missile.x[index]}"][data-level="${missile.y[index]}"]`
            ).prop('checked', true);

            /* if aliens intersect missile position then we clear that alien; hence destroying it */
            if (aliens.destroyAlien(missile.x[index], missile.y[index])) {
              game.score += 1;
            }
          } else {
            game.removeGameProcess(id);
          }
        }
        missile.y = missile.y.map(missileY => missileY + 1);
      }
    };
    return fireAtWill;
  }
}

export default initiateSpaceCheck;
