"use strict";

document.getElementById('paddleUp').addEventListener('click', function(e){
  socketPaddleInput('paddleUp');
  e.preventDefault();
});
document.getElementById('paddleDown').addEventListener('click', function(e){
  socketPaddleInput('paddleDown');
  e.preventDefault();
});


