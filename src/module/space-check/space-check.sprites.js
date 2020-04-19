function checkBox(row, column) {
  return (
    '<div class="pretty p-icon">' +
    `<input type="checkbox" disabled data-level="${row}" id="${column}"/>` +
    `<div id="${column}-${row}-wrap" class="state">` +
    `<i id="${column}-${row}-icon" class="icon mdi mdi-close"></i>` +
    '<label></label>' +
    '</div>' +
    '</div>'
  );
}

const renderRow = (renderLevel, cols) => {
  let elements = '';
  for (let i = 0; i < cols; i++) {
    let element = checkBox(renderLevel, i);
    elements += element;
  }
  return elements;
};

const setGrid = game => () => {
  let elements = '';
  for (let index = game.MAX_LEVELS - 1; index >= 0; index--) {
    elements +=
      '<div style="font-size: 8px;">' +
      renderRow(index, game.GRID_COLS) +
      '</div>';
  }
  $('#grid').html(elements);
};

const drawGame = newGame => {
  setGrid(newGame)();
};

export default drawGame;
