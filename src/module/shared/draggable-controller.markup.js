const draggableControllerHtml = `<div class="align-self-center text-center ui-widget-content" id="controller-container">
  <div id="controller-container-header">
    <i class="icon mdi mdi-drag drag"></i>
    <i id="large" class="icon mdi mdi-gamepad-square-outline large"></i>
    <div class="small" id="small"><div><i class="icon mdi mdi-gamepad-square-outline"></i></div></div>
  </div>
  <div id="inter-container">
  <div class="top-row">
    <div id="up" class="pretty p-icon">
      <input type="checkbox" checked  disabled/>
      <div class="state p-success">
        <i
          style="border-right-width: 2px; border-top-width: 2px;"
          class="icon mdi mdi-arrow-up-thick"
        ></i>
        <label></label>
      </div>
    </div>
  </div>
  <div class="mid-row">
    <div id="left" class="pretty p-icon">
      <input type="checkbox" checked  disabled/>
      <div class="state p-success">
        <i
          style="border-right-width: 1px; border-top-width: 4px;"
          class="icon mdi mdi-arrow-left-thick"
        ></i>
        <label></label>
      </div>
    </div>
    <div id="action" class="pretty p-icon">
      <input type="checkbox" checked disabled />
      <div class="state p-danger">
        <i
          style="border-right-width: 2px; border-top-width: 2px;"
          class="icon mdi mdi-atom"
        ></i>
        <label></label>
      </div>
    </div>
    <div id="right" class="pretty p-icon">
      <input type="checkbox" checked  disabled/>
      <div class="state p-success">
        <i
          style="border-right-width: 1px; border-top-width: 4px;"
          class="icon mdi mdi-arrow-right-thick"
        ></i>
        <label></label>
      </div>
    </div>
  </div>
  <div class="bottom-row">
    <div id="down" class="pretty p-icon">
      <input type="checkbox" checked disabled/>
      <div class="state p-success">
        <i
          style="border-right-width: 2px; border-top-width: 2px;"
          class="icon mdi mdi-arrow-down-thick"
        ></i>
        <label></label>
      </div>
    </div>
  </div>
  </div>
</div>`;

export default draggableControllerHtml;
