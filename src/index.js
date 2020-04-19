import 'bootstrap';
import './app.scss';
import initiateCheckRis from './module/check-ris/check-ris.initiate';
import initiateSpaceCheck from './module/space-check/space-check.initiate';
import { version } from '../package.json';
import jquery from 'jquery';

window.$ = window.jQuery = jquery;

$(function () {
  $('#jumbotron').css({
    height: document.documentElement.clientHeight
  });
  $('#score').hide();
  $('#score').before(mainMenu());
  const footer = $('#footer');

  $('#contrib').html(`⚡ @rapiddeath | ${version}`);

  $(`#checkris`).click(() => {
    $('#menu').remove();
    $('#score').show();
    initiateCheckRis();
    footer.hide();
  });
  $(`#spacecheck`).click(() => {
    $('#menu').remove();
    $('#score').show();
    initiateSpaceCheck();
    footer.hide();
  });
});

function mainMenu() {
  return `<div id="menu" class="d-flex flex-wrap align-content-center justify-content-center mt-4">
            <div id="checkris" class="d-flex p-3 m-2 menu-item">
              <div class="text-center m-auto">Check Ris 🏁</div>
            </div>
            <div id="spacecheck" class="d-flex p-3 m-2 menu-item">
              <div class="text-center m-auto">Space Check 🚀</div>
            </div>
          </div>`;
}
