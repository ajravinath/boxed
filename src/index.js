import 'bootstrap';
import './app.scss';
import CheckRis from './check-ris';
import drawGame from './check-ris.sprites';
import {
  submitLevel,
  startInterval,
  setResult,
  setScore,
} from './check-ris.behavior';

const results = Object.freeze({
  WIN: 'You Win ! 🏆',
  LOSE: 'You Lose ! 👎',
});

$(function () {
  const element = document.getElementById('info');
  const tooltip = $('#info').tooltip({
    container: element,
    placement: 'top',
  });
  tooltip.tooltip('show');
  setTimeout(() => {
    tooltip.tooltip('hide');
  }, 4000);
});

$(function () {
  $('#jumbotron').css({
    height: document.documentElement.clientHeight,
  });

  let checkRisGame = new CheckRis();
  let score = 0;
  let result = null;
  drawGame(checkRisGame);

  const resetGame = () => {
    checkRisGame.reset();
    setResult('');
    drawGame(checkRisGame);
  };

  let prevInterval = null;
  let initialInterval = null;
  $(document).on('keyup touchstart', function (event) {
    if (
      event.which === checkRisGame.INTERACTION_KEY_CODE ||
      event.type === 'touchstart'
    ) {
      if (result) {
        resetGame();
        result = null;
      }

      if (prevInterval) {
        clearInterval(prevInterval);
      }

      if (checkRisGame.LEVEL === 0) {
        if (!initialInterval) {
          initialInterval = startInterval(0, checkRisGame);
          const randomTimeOut = Math.floor(Math.random() * 1500 + 1000);
          setTimeout(() => {
            clearInterval(initialInterval);
            checkRisGame.LEVEL = checkRisGame.LEVEL + 1;
            initialInterval = null;
          }, randomTimeOut);
        }
        return;
      }

      if (
        checkRisGame.LEVEL >= 1 &&
        checkRisGame.LEVEL <= checkRisGame.MAX_LEVELS
      ) {
        const isLost = submitLevel(checkRisGame);
        if (!isLost) {
          prevInterval = startInterval(checkRisGame.LEVEL, checkRisGame);
          checkRisGame.LEVEL = checkRisGame.LEVEL + 1;
        } else {
          setResult(results.LOSE);
          result = results.LOSE;
        }
        if (checkRisGame.LEVEL > checkRisGame.MAX_LEVELS) {
          setResult(results.WIN);
          result = results.WIN;
          score = score + 1;
          setScore(score);
        }
      }
    }
  });
});
