
const skorstenCanvas = document.getElementById('skorsten-canvas');
skorstenCanvas.width = 180;
skorstenCanvas.height = 8;

const ctx = skorstenCanvas.getContext('2d');

const pongGame = new Pong(ctx, skorstenCanvas);

let animationFrame;
// black bg on CTX here

function render() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0,0, skorstenCanvas.width, skorstenCanvas.height);
  
  pongGame.update();
  pongGame.render();
  animationFrame = window.requestAnimationFrame(render);
}

render();
