import $ from 'jquery';

const submitLevel = (checkRisGame) => {
  let lost = 0;
  if (checkRisGame.LEVEL > 1) {
    for (let index = 0; index < checkRisGame.GRID_COLS; index++) {
      const currentLevelCheckbox = $(
        `input[id="${index}"][data-level="${checkRisGame.LEVEL - 1}"]`
      );
      const prevLevelCheckbox = $(
        `input[id="${index}"][data-level="${checkRisGame.LEVEL - 2}"]`
      );

      if (currentLevelCheckbox.prop('checked')) {
        if (!prevLevelCheckbox.prop('checked')) {
          currentLevelCheckbox.prop('checked', false);
        }
      }

      if (!currentLevelCheckbox.prop('checked')) {
        lost = lost + 1;
      }
    }
    if (checkRisGame.DYNAMIC_COL_SPREAD) {
      if (lost < checkRisGame.GRID_COLS) {
        checkRisGame.COL_SPREAD = checkRisGame.GRID_COLS - lost;
      }
    }
  }
  return lost >= checkRisGame.GRID_COLS ? true : false;
};

const startInterval = (currentLevel, checkRisGame) => {
  const gridMaxId = checkRisGame.GRID_COLS - 1;
  let val = currentLevel % 2 === 0 ? 0 : gridMaxId + checkRisGame.COL_SPREAD;

  let token = 1;

  const interval = setInterval(() => {
    if (val >= gridMaxId) {
      token = -1;
    } else if (val <= 0) {
      token = 1;
    }

    $(`input[id="${val}"][data-level="${currentLevel}"]`).prop('checked', true);

    $(
      `input[id="${
        val + checkRisGame.COL_SPREAD
      }"][data-level="${currentLevel}"]`
    ).prop('checked', false);

    $(
      `input[id="${
        val - checkRisGame.COL_SPREAD
      }"][data-level="${currentLevel}"]`
    ).prop('checked', false);

    val = val + token;
  }, checkRisGame.SPEED_MS);

  checkRisGame.SPEED_MS = checkRisGame.speedCalc(currentLevel);
  return interval;
};

const setResult = (result) => $('#result').text(result);
const setScore = (score) => $('#score').text(score);

export { submitLevel, startInterval, setResult, setScore };
