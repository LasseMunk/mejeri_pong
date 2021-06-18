"use strict";

// https://codepen.io/thecodingpie/pen/NWxzBxJ
export default class Pong {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.pongCanvas = canvas;

    this.canvasSetup = {
      height: 8,
      width: 72,
      wOffsetL: 54, // pong playing field padding L
                    // 180 - 72 = 108. 108 / 2 = 54
    };

    this.paddleSetup = {
      width: 2,
      height: 2,
      padding: 10
    };

    this.userLeft = this.createUser(
      this.paddleSetup.padding + this.canvasSetup.wOffsetL, // x position
      '#FFF', // color
      1,      // user speed
      0.03,   // difficulty
      false   // is AI
    );

    this.userRight = this.createUser(
      (this.pongCanvas.width - (this.paddleSetup.width + this.paddleSetup.padding)) - this.canvasSetup.wOffsetL, // x position
      '#FFF', // color
      1,      // user speed
      0.03,   // difficulty
      false    // is AI
    );

    this.net = this.createNet(
      1,      // width
      '#00FFFF'  // color
    );
      
    this.ball = this.createBall(
        1,          // radius
        0.3,        // speed
        0.3,        // initial_speed
        0.2,        // increase_speed
        0.3,        // velocityX
        0.32,       // velocityY
        '#ff33cc'   // color 
    );

    // constructor end
  }

  createNet(width, color){
    
    return {
      x: ((this.pongCanvas.width / 2) - (width / 2)),
      y: 0,
      width: width,
      height: this.canvasSetup.height,
      color: color,
    };
  }

  createUser(posX, color, userSpeed, difficulty, isAI){
    return {
        x: posX,
        // initial set in the middle
        y: (this.pongCanvas.height / 2) - (this.paddleSetup.height / 2),
        width: this.paddleSetup.width,
        height: this.paddleSetup.height,
        color: color,
        score: 0,
        difficulty: difficulty, // lower number makes it easier, closer to 1 makes it impossible
        socketID: '#hash-placeholder',
        socketName: 'name-placeholder',
        upPressed: false,
        downPressed: false,
        isAI: isAI,
        userSpeed: userSpeed
    }
  }

  createBall(radius, speed, init_speed, inc_speed, velX, velY, color) {
    return {
      x: (this.pongCanvas.width / 2),
      y: this.pongCanvas.height / 2,
      radius: radius,
      speed: speed,
      initial_speed: init_speed,
      increase_speed: inc_speed,
      velocityX: velX,
      velocityY: velY,
      color: color
    };
  }

  drawNet() {
    // Color of net
    this.ctx.fillStyle = this.net.color;
    // syntax --> fillRect(x, y, width, height)
    this.ctx.fillRect(this.net.x, this.net.y, this.net.width, this.net.height);
  };

  drawScore(x, y, score) {
    this.ctx.fillStyle = '#FFF';
    this.ctx.font = '2px sans-serif';
  
    // syntax -> fillText(text, x, y)
    this.ctx.fillText(score, x + this.canvasSetup.wOffsetL, y);
  };

  drawUser(x, y, width, height, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  };

  drawBall(x, y, radius, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    // syntax --> arc(x, y, radius, startAngle, endAngle, antiClockwise_or_not)
    this.ctx.arc(x, y, radius, 0, Math.PI * 2, true); // π * 2 Radians = 360 degrees
    this.ctx.closePath();
    this.ctx.fill();
  }

  collisionDetect(player, ball) {
    
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

  reset() {
    // reset ball's value to older values
    this.ball.x = this.pongCanvas.width / 2;
    this.ball.y = this.pongCanvas.height / 2;
    this.ball.speed = this.ball.initial_speed;
    
    // changes the diretion of ball
    this.ball.velocityX = -this.ball.velocityX;
    this.ball.velocityY = -this.ball.velocityY;
  }

  update() {

    this.ball.x += this.ball.velocityX;
    this.ball.y += this.ball.velocityY;
  
    //  ai paddle movement
    if(this.userLeft.isAI === true) {
      this.userLeft.y += ((this.ball.y - (this.userLeft.y + this.userLeft.height / 2))) * this.userLeft.difficulty;
    }
    if(this.userRight.isAI === true) {
      this.userRight.y += ((this.ball.y - (this.userRight.y + this.userRight.height / 2))) * this.userRight.difficulty;
    }
  
    // collision dectection on paddles
      // if the ball x.pos is on user half then user else ai
    this.player = (this.ball.x < this.pongCanvas.width / 2) ? this.userLeft : this.userRight;
  
    if(this.collisionDetect(this.player, this.ball)) {
      // play hit sound
  
      // default angle is 0 deg in Radians
      this.angle = 0;
  
      if(this.ball.y < (this.player.y + (this.player.height / 2))) {
        // if ball hit the top of paddle
        this.angle = -1 * Math.PI / 4; // = -45 deg
      } else if (this.ball.y > (this.player.y + (this.player.height / 2))) {
        // if ball hits the bottom of paddle
        this.angle = Math.PI / 4; // = 45 deg
      }
  
      // Change velocity of ball according to which paddle the ball hit
      this.ball.velocityX = (this.player === this.userLeft ? 1 : -1) * this.ball.speed * Math.cos(this.angle);
      this.ball.velocityY = this.ball.speed * Math.sin(this.angle);
  
      // increase ball.speed
      this.ball.speed += this.ball.increase_speed;
    }
  
  
    if (this.ball.y + this.ball.radius >= this.pongCanvas.height || this.ball.y - this.ball.radius <= 0) {
      // invert direction if hitting top or bottom
      this.ball.velocityY = -this.ball.velocityY;
    }
  
    if(this.ball.x + this.ball.radius >= (this.pongCanvas.width - this.canvasSetup.wOffsetL)) {
      // if ball hits right wall
      this.userLeft.score += 1;
      this.reset(); // reset positions if score
    }
  
    if(this.ball.x - this.ball.radius <= (0 + this.canvasSetup.wOffsetL)) {
      // if ball hits left wall
      this.userRight.score += 1;
      this.reset(); // reset positions if score
    }
  };

  render() {  
    this.drawNet();
    // user score
    // drawScore(pongCanvas.width / 4, pongCanvas.height / 6, this.userLeft.score);
    // ai score
    // drawScore( (3 * pongCanvas.width) / 4, pongCanvas.height / 6, this.userRight.score);
    this.drawUser(this.userLeft.x, this.userLeft.y, this.userLeft.width, this.userLeft.height, this.userLeft.color);
    this.drawUser(this.userRight.x, this.userRight.y, this.userRight.width, this.userRight.height, this.userRight.color);
    this.drawBall(this.ball.x, this.ball.y, this.ball.radius, this.ball.color);
  };  

  controlUser(user, moveY) {
    
    if(user === 'userLeft' && this.userLeft.isAI === false) {
      
      if(moveY === 'up' && this.userLeft.y > 0) {
        this.userLeft.y -= this.userLeft.userSpeed;
      }
      if(moveY === 'down' && (this.userLeft.y < this.pongCanvas.height - this.userLeft.height)) {
        this.userLeft.y += this.userLeft.userSpeed;
      }
    }
    if(user === 'userRight' && this.userRight.isAI === false) {
      if(moveY === 'up' && this.userRight.y > 0) {
        this.userRight.y -= this.userRight.userSpeed;
      }
      if(moveY === 'down' && (this.userRight.y < this.pongCanvas.height - this.userRight.height)) {
        this.userRight.y += this.userRight.userSpeed;
      }
    }
  }
}





