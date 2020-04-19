const renderRow = (renderLevel, cols) => {
  let elements = '';
  for (let i = 0; i < cols; i++) {
    let element = `<div class="custom-control custom-checkbox custom-control-inline">
      <input type="checkbox" class="custom-control-input" data-level=${renderLevel} id="${i}" disabled/>
      <label class="custom-control-label" for="${i}"></label>
      </div>`;

    elements += element;
  }
  return elements;
};

const setGrid = (game) => () => {
  let elements = '';
  for (let index = game.MAX_LEVELS - 1; index >= 0; index--) {
    elements += '<div>' + renderRow(index, game.GRID_COLS) + '</div>';
  }
  $('#grid').html(elements);
};

const drawGame = (newGame) => {
  setGrid(newGame)();
};

export default drawGame;
