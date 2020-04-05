import $ from 'jquery';
import './app.scss';
import CheckRis from './check-ris';
import drawGame from './check-ris.sprites';
import { submitLevel, startInterval, setResult } from './check-ris.behavior';

const results = Object.freeze({
  WIN: 'You Win !',
  LOSE: 'You Lose !',
});

$(function () {
  let checkRisGame = new CheckRis();
  let result = null;
  drawGame(checkRisGame);

  const resetGame = () => {
    checkRisGame.reset();
    setResult('');
    drawGame(checkRisGame);
  };

  let prevInterval = null;
  $(document).on('keydown touchstart', function (event) {
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
      if (checkRisGame.LEVEL <= checkRisGame.MAX_LEVELS) {
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
        }
      }
    }
  });
});
