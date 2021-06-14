
const init = function(){
  window.addEventListener('keydown', keyDownHandler);
  window.addEventListener('keyup', keyUpHandler);
}();

// Control
function keyUpHandler(e) {
  // get keyCode
  switch (e.key) {
    case 'ArrowUp':
      upPressed = false;
      break;
    case 'ArrowDown':
      downPressed = false;
      break;
  }
}

function keyDownHandler(e) {
  // get keyCode
  switch (e.key) {
    case 'ArrowUp':
      upPressed = true;
      break;
    case 'ArrowDown':
      downPressed = true;
      break;
  }
}
