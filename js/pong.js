// https://codepen.io/thecodingpie/pen/NWxzBxJ

const pongCanvas = document.getElementById('pong-canvas');
pongCanvas.width = 120;
pongCanvas.height = 8;

const pCtx = pongCanvas.getContext('2d');

const netWidth = 1;
const netHeight = pongCanvas.height;

const paddleWidth = 2;
const paddleHeight = 3;
const paddleCanvasPadding = 1;

let upPressed = false;
let downPressed = false;

const net = {
  x: (pongCanvas.width / 2) - (netWidth / 2),
  y: 0,
  width: netWidth,
  height: netHeight,
  color: '#FFF',
};

// user paddle
const user = {
  x: paddleCanvasPadding,
  // initial set in the middle
  y: (pongCanvas.height / 2) - (paddleHeight / 2),
  width: paddleWidth,
  height: paddleHeight,
  color: '#FFF',
  score: 0
};

const ai = {
  x: pongCanvas.width - (paddleWidth + paddleCanvasPadding),
  y: (pongCanvas.height / 2) - (paddleHeight / 2),
  width: paddleWidth,
  height: paddleHeight,
  color: '#FFF',
  score: 0
};

const ball = {
  x: pongCanvas.width / 2,
  y: pongCanvas.height / 2,
  radius: 1,
  speed: 1,
  initial_speed: 1,
  increase_speed: 0.2,
  velocityX: 1,
  velocityY: 1,
  color: '#ff33cc'
};

function drawNet() {
  // Color of net
  pCtx.fillStyle = net.color;
  // syntax --> fillRect(x, y, width, height)
  pCtx.fillRect(net.x, net.y, net.width, net.height);
};

function drawScore(x, y, score) {
  pCtx.fillStyle = '#FFF';
  pCtx.font = '6px sans-serif';

  // syntax -> fillText(text, x, y)
  pCtx.fillText(score, x, y);
};

function drawPaddle(x, y, width, height, color) {
  pCtx.fillStyle = color;
  pCtx.fillRect(x, y, width, height);
};

function drawBall(x, y, radius, color) {
  pCtx.fillStyle = color;
  pCtx.beginPath();
  // syntax --> arc(x, y, radius, startAngle, endAngle, antiClockwise_or_not)
  pCtx.arc(x, y, radius, 0, Math.PI * 2, true); // π * 2 Radians = 360 degrees
  pCtx.closePath();
  pCtx.fill();
}

function collisionDetech(player, ball) {
  // returns true or false if either user or ai paddle
  // depending on player input to function
  player.top = player.y;
  player.right = player.x + player.width;
  player.bottom = player.y + player.height;
  player.left = player.x;

  ball.top = ball.y - ball.radius;
  ball.right = ball.x + ball.radius;
  ball.bottom = ball.y + ball.radius;
  ball.left = ball.x - ball.radius;

  
  return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;
}

function reset() {
  // reset ball's value to older values
  ball.x = pongCanvas.width / 2;
  ball.y = pongCanvas.height / 2;
  ball.speed = ball.initial_speed;
  
  // changes the diretion of ball
  ball.velocityX = -ball.velocityX;
  ball.velocityY = -ball.velocityY;
}

function render() {
  // draw on the canvas
  pCtx.fillStyle = '#000';
  pCtx.fillRect(0,0, pongCanvas.width, pongCanvas.height);

  drawNet();
  // user score
  // drawScore(pongCanvas.width / 4, pongCanvas.height / 6, user.score);
  // ai score
  // drawScore( (3 * pongCanvas.width) / 4, pongCanvas.height / 6, ai.score);
  drawPaddle(user.x, user.y, user.width, user.height, user.color);
  drawPaddle(ai.x, ai.y, ai.width, ai.height, ai.color);
  drawBall(ball.x, ball.y, ball.radius, ball.color);
};

function update() {

  // move paddle
  if (upPressed && user.y > 0) {
    user.y -= 1;
  } else if (downPressed && (user.y < pongCanvas.height - user.height)) {
    user.y += 1;
  }
  // check if ball hits top or bottom wall 
  // move the ball
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  //  ai paddle movement
  // collision dectection on paddles
    // if the ball x.pos is on user half then user else ai
  let player = (ball.x < pongCanvas.width / 2) ? user : ai;

  if(collisionDetech(player, ball)) {
    // play hit sound

    // default angle is 0 deg in Radio
    let angle = 0;

    if(ball.y < (player.y + (player.height / 2))) {
      // if ball hit the top of paddle
      angle = -1 * Math.PI / 4; // = -45 deg
    } else if (ball.y > (player.y + (player.height / 2))) {
      // if ball hits the bottom of paddle
      angle = Math.PI / 4; // = 45 deg
    }

    // Change velocity of ball according to which paddle the ball hit
    ball.velocityX = (player === user ? 1 : -1) * ball.speed * Math.cos(angle);
    ball.velocityY = ball.speed * Math.sin(angle);

    // increase ball.speed
    ball.speed += ball.increase_speed;
  }


  if (ball.y + ball.radius >= pongCanvas.height || ball.y - ball.radius <= 0) {
    // invert direction if hitting top or bottom
    ball.velocityY = -ball.velocityY;
  }

  if(ball.x + ball.radius >= pongCanvas.width) {
    // if ball hits right wall
    user.score += 1;
    reset(); // reset positions if score
  }

  if(ball.x - ball.radius <= 0) {
    // if ball hits right wall
    ai.score += 1;
    reset(); // reset positions if score
  }
};

function gameLoop() {
  
  update();
  render();

  window.requestAnimationFrame(gameLoop);
}

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

const init = function(){
  window.addEventListener('keydown', keyDownHandler);
  window.addEventListener('keyup', keyUpHandler);

  requestAnimationFrame(gameLoop);
}();