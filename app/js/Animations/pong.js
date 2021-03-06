"use strict";
// https://codepen.io/thecodingpie/pen/NWxzBxJ

let fullCanvas = { // the actual canvas
  width: null,
  height: null
}

let pongCanvasSetup = null;
let paddleSetup = null;
let userLeft = null;
let userRight = null;
let net = null;
let ball = null;



function createNet(width, color){
  return {
    x: ((fullCanvas.width / 2) - (width / 2)),
    y: 0,
    width: width,
    height: pongCanvasSetup.height,
    color: color,
  };
}

function createUser(posX, color, userSpeed, difficulty, isAI){
  return {
      x: posX,
      // initial set in the middle
      y: (fullCanvas.height / 2) - (paddleSetup.height / 2),
      width: paddleSetup.width,
      height: paddleSetup.height,
      color: color,
      score: 0,
      difficulty: difficulty, // lower number makes it easier, closer to 1 makes it impossible
      name: 'ai',
      upPressed: false,
      downPressed: false,
      isAI: isAI,
      userSpeed: userSpeed
  }
}

function createBall(radius, speed, init_speed, inc_speed, velX, velY, color) {
  return {
    x: (fullCanvas.width / 2),
    y: fullCanvas.height / 2,
    radius: radius,
    speed: speed,
    initial_speed: init_speed,
    increase_speed: inc_speed,
    velocityX: velX,
    velocityY: velY,
    color: color
  };
}

function drawNet(canvas) {
  // Color of net
  canvas.ctx.fillStyle = net.color;
  // syntax --> fillRect(x, y, width, height)
  canvas.ctx.fillRect(net.x, net.y, net.width, net.height);
};

// function drawScore(x, y, score) {
//   ctx.fillStyle = '#FFF';
//   ctx.font = '2px sans-serif';

//   // syntax -> fillText(text, x, y)
//   ctx.fillText(score, x + pongCanvasSetup.wOffsetL, y);
// };

function drawUser(canvas, x, y, width, height, color) {
  canvas.ctx.fillStyle = color;
  canvas.ctx.fillRect(x, y, width, height);
};

function drawBall(canvas, x, y, radius, color) {
  canvas.ctx.fillStyle = color;
  canvas.ctx.beginPath();
  // syntax --> arc(x, y, radius, startAngle, endAngle, antiClockwise_or_not)
  canvas.ctx.arc(x, y, radius, 0, Math.PI * 2, true); // π * 2 Radians = 360 degrees
  canvas.ctx.closePath();
  canvas.ctx.fill();
}

function collisionDetect(player, ball) {
  // depending on player input to function
  player.top = player.y;
  player.right = player.x + player.width;
  player.bottom = player.y + player.height;
  player.left = player.x;

  ball.top = ball.y - ball.radius;
  ball.right = ball.x + ball.radius;
  ball.bottom = ball.y + ball.radius;
  ball.left = ball.x - ball.radius;

  // returns true or false if either user or ai paddle
  return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;
}

function reset() {
  // reset ball's value to older values
  ball.x = fullCanvas.width / 2;
  ball.y = fullCanvas.height / 2;
  ball.speed = ball.initial_speed;
  
  // changes the diretion of ball
  ball.velocityX = -ball.velocityX;
  ball.velocityY = -ball.velocityY;
}

function updateParams() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  //  ai paddle movement
  if(userLeft.isAI === true) {
    userLeft.y += ((ball.y - (userLeft.y + userLeft.height / 2))) * userLeft.difficulty;
  }
  if(userRight.isAI === true) {
    userRight.y += ((ball.y - (userRight.y + userRight.height / 2))) * userRight.difficulty;
  }

  // collision dectection on paddles
    // if the ball x.pos is on left half then left else right
  let player = (ball.x < fullCanvas.width / 2) ? userLeft : userRight;

  if(collisionDetect(player, ball)) {
    // play hit sound

    // default angle is 0 deg in Radians
    let angle = 0;

    if(ball.y < (player.y + (player.height / 2))) {
      // if ball hit the top of paddle
      angle = (-1 * Math.PI / 4) * (Math.random()*0.1); // = -45 deg
    } else if (ball.y > (player.y + (player.height / 2))) {
      // if ball hits the bottom of paddle
      angle = Math.PI / 4 * (Math.random()*0.1); // = 45 deg
    }

    // Change velocity of ball according to which paddle the ball hit
    ball.velocityX = (player === userLeft ? 1 : -1) * ball.speed * Math.cos(angle);
    ball.velocityY = ball.speed * Math.sin(angle);

    // increase ball.speed
    ball.speed += ball.increase_speed;
  }

  if (ball.y + ball.radius >= fullCanvas.height || ball.y - ball.radius <= 0) {
    // invert direction if hitting top or bottom
    ball.velocityY = -ball.velocityY;
  }

  if(ball.x + ball.radius >= (fullCanvas.width - pongCanvasSetup.wOffsetL)) {
    // if ball hits right wall
    userLeft.score += 1;
    reset(); // reset positions if score
  }

  if(ball.x - ball.radius <= (0 + pongCanvasSetup.wOffsetL)) {
    // if ball hits left wall
    userRight.score += 1;
    reset(); // reset positions if score
  }
};

function renderToCanvas(canvas) {
  drawNet(canvas);
  drawUser(canvas, userLeft.x, userLeft.y, userLeft.width, userLeft.height, userLeft.color);
  drawUser(canvas, userRight.x, userRight.y, userRight.width, userRight.height, userRight.color);
  drawBall(canvas, ball.x, ball.y, ball.radius, ball.color);
};  

function moveUser(paddleMovement) {
  let userSide = paddleMovement.userSide;
  let paddleUpDown = paddleMovement.paddleUpDown;

  console.log(userLeft.isAI);
  console.log(userRight.isAI);
  
  if(userSide === 'left' && userLeft.isAI === false) {
    
    if(paddleUpDown === 'paddleUp' && userLeft.y > 0) {
      userLeft.y -= userLeft.userSpeed;
    }
    if(paddleUpDown === 'paddleDown' && (userLeft.y < fullCanvas.height - userLeft.height)) {
      userLeft.y += userLeft.userSpeed;
    }
  }
  if(userSide === 'right' && userRight.isAI === false) {
    if(paddleUpDown === 'paddleUp' && userRight.y > 0) {
      userRight.y -= userRight.userSpeed;
    }
    if(paddleUpDown === 'paddleDown' && (userRight.y < fullCanvas.height - userRight.height)) {
      userRight.y += userRight.userSpeed;
    }
  }
}

function initPong(canvas) {

  fullCanvas.width = canvas.width;
  fullCanvas.height = canvas.height;

  pongCanvasSetup = { // the actual canvas for pong
    height: 8,
    width: 72,
    wOffsetL: 54, // pong playing field padding L
                  // 180 - 72 = 108. 108 / 2 = 54
  };

  paddleSetup = {
    width: 2,
    height: 2,
    padding: 10
  };

  userLeft = createUser(
    paddleSetup.padding + pongCanvasSetup.wOffsetL, // x position
    '#FFF', // color
    1,      // user speed
    0.03,   // difficulty
    true   // is AI
  );

  userRight = createUser(
    (fullCanvas.width - (paddleSetup.width + paddleSetup.padding)) - pongCanvasSetup.wOffsetL, // x position
    '#FFF', // color
    1,      // user speed
    0.03,   // difficulty
    true    // is AI
  );

  ball = createBall(
    1,          // radius
    0.3,        // speed
    0.3,        // initial_speed
    0.2,        // increase_speed
    0.3,        // velocityX
    0.32,       // velocityY
    '#ff33cc'   // color 
);

net = createNet(
  1,      // width
  '#dddddd'  // color
);
}

module.exports = {
  init: function(canvas) {
    initPong(canvas);
  },

  restart: function () {
    console.log('restart pong');
  },
  
  moveUser: function(userSide, paddleUpDown) {
    moveUser(userSide, paddleUpDown);
  },
  setUserName: function(user, userName) {
    let isAi = true;

    if(typeof user === 'string' && typeof userName === 'string') {

      if(userName === 'ai') {
        isAi = true;
      } else { 
        isAi = false;
      }
      
      if(user === 'left') {
        userLeft.name = userName;
        userLeft.isAI = isAi;
      } else {
        userRight.name = userName;
        userRight.isAI = isAi;
      }
    } else {
      console.log('wrong type in pong setUserName method');
    }
  },

  getUserNames: function(){
    let userNames = {
      left: userLeft.name,
      right: userRight.name
    }
    return userNames;
  }, 
  
  getScore() {
    let pongScore = {
      left: userLeft.score,
      right: userRight.score
    }
    return pongScore;
  },

  renderToCanvas: function(canvas, animationsParams) {
    renderToCanvas(canvas);
  },
  updateParams: function(canvas, animationsParams) {
    updateParams();
  },
 };
