import './draggable-controller.scss';
import draggableControllerHtml from './draggable-controller.markup';

function attachDraggableController(elementId, actions) {
  let disconnect = false;
  $(`#${elementId}`).html(draggableControllerHtml);
  dragElement(document.getElementById('controller-container'));

  $('#large').on('click', function () {
    $('#inter-container').css('font-size', '50px');
  });

  $('#small').click(function () {
    $('#inter-container').css('font-size', '30px');
  });

  $(document).on('disconnectControllerEvent', () => {
    disconnect = true;
  });
  $('#left,#right,#up,#down,#action').on('click', function (event) {
    if (disconnect) {
      return;
    }
    const target = event.currentTarget.id;
    actions.initial();
    switch (target) {
      case 'left':
        return actions.left();
      case 'right':
        return actions.right();
      case 'up':
        return actions.up();
      case 'down':
        return actions.down();
      case 'action':
        return actions.action();
      default:
        break;
    }
  });
  return $('controller-container');
}

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const header = $('#' + elmnt.id + '-header');
  if (header) {
    header.on('mousedown touchstart', dragMouseDown);
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // e.preventDefault();
    // get the mouse cursor position at startup:
    if (e.type === 'touchstart') {
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
    } else {
      pos3 = e.clientX;
      pos4 = e.clientY;
    }

    $(document).on('mouseup touchend', closeDragElement);
    $(document).on('mousemove touchmove', elementDrag);
  }

  function elementDrag(e) {
    e = e || window.event;
    // e.preventDefault();
    // calculate the new cursor position:
    if (e.type === 'touchmove') {
      pos1 = pos3 - e.touches[0].clientX;
      pos2 = pos4 - e.touches[0].clientY;
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
    } else {
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
    }
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
    elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    $(document).off('mouseup touchend', closeDragElement);
    $(document).off('mousemove touchmove', elementDrag);
  }
}

export default attachDraggableController;
