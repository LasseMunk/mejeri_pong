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
  showPageContent('welcome');
  
  e.preventDefault();
});

document.getElementById('navbar-animations').addEventListener('click', function(e){
  changeNavbarClassList(e);
  showPageContent('animations');
  e.preventDefault();
});

document.getElementById('playPong-btn').addEventListener('click', function(e){
  inputName();
  showPageContent('pong');
  e.preventDefault();
});

function inputName() {
  let inputText = document.getElementById('writeName');
  let playerName = document.getElementById('pong-playerName');

  if(inputText.value === '') {
     playerName.innerHTML = `Player: ${getRandomName()}`;
  } else {
    playerName.innerHTML = `Player: ${inputText.value}`;
  }
}

function getRandomName() {
  return randomNames[Math.round(Math.random() * randomNames.length)];
}

function emitLoadToServer(loadThis) {


}

function changeNavbarClassList(e) {

  let pongBtn = document.getElementById('navbar-pong');
  let animationsBtn = document.getElementById('navbar-animations');

  if(e.target.id === 'navbar-pong') {
    pongBtn.classList = "navbar-btn navbar-btn-selected";
    animationsBtn.classList = "navbar-btn";

  } else {
    pongBtn.classList = "navbar-btn";
    animationsBtn.classList = "navbar-btn navbar-btn-selected";
  }  
}
