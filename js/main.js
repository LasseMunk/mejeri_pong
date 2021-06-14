
const pongGame = new Pong('skorsten-canvas');

let animationFrame;

// Create CTX out here
// pass CTX into pong game

function render() {
  pongGame.update();
  pongGame.render();
  animationFrame = window.requestAnimationFrame(render);
}

render();