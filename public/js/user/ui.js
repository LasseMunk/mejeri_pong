"use strict";

document.getElementById('left-up').addEventListener('click', function(e){
  pongGame.controlUser('userLeft', 'up');
  e.preventDefault();
});
document.getElementById('left-down').addEventListener('click', function(e){
  pongGame.controlUser('userLeft', 'down');
  e.preventDefault();
});
document.getElementById('right-up').addEventListener('click', function(e){
  pongGame.controlUser('userRight', 'up');
  e.preventDefault();
});
document.getElementById('right-down').addEventListener('click', function(e){
  pongGame.controlUser('userRight', 'down');
  e.preventDefault();
});


