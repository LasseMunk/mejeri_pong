"use strict";


document.getElementById('paddleUp').addEventListener('click', function(e){
  socketPaddleInput('paddleUp');
  e.preventDefault();
});
document.getElementById('paddleDown').addEventListener('click', function(e){
  socketPaddleInput('paddleDown');
  e.preventDefault();
});

document.getElementById('navbar-pong').addEventListener('click', function(e){
  changeNavbarClassList(e);
  e.preventDefault();
});

document.getElementById('navbar-animations').addEventListener('click', function(e){
  changeNavbarClassList(e);
  e.preventDefault();
});

function changeNavbarClassList(e) {

  let pongBtn = document.getElementById('navbar-pong');
  let animationsBtn = document.getElementById('navbar-animations');

  if(e.target.id === 'navbar-pong') {
    pongBtn.classList = "navbar-btn navbar-btn-selected";
    animationsBtn.classList = "navbar-btn";

    document.getElementById('pong').style.display = 'flex';
    document.getElementById('animations').style.display = 'none';

  } else {
    pongBtn.classList = "navbar-btn";
    animationsBtn.classList = "navbar-btn navbar-btn-selected";

    document.getElementById('pong').style.display = 'none';
    document.getElementById('animations').style.display = 'block';

  }  
}

