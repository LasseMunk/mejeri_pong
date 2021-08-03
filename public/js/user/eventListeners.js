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
  socketGetPongWhoIsPlaying();
  showPageContent('pongWhoIsPlaying');
  
  e.preventDefault();
});

document.getElementById('navbar-animations').addEventListener('click', function(e){
  changeNavbarClassList(e);
  showPageContent('animations');
  e.preventDefault();
});

document.getElementById('pongUserLeftBtn').addEventListener('click', function(e){
  myInfo.userSide = 'right'
  myInfo.playAgainst = 'left';
  showPageContent('pongInputName');
  e.preventDefault();
});
document.getElementById('pongUserRightBtn').addEventListener('click', function(e){
  myInfo.userSide = 'left';
  myInfo.playAgainst = 'right';
  showPageContent('pongInputName');
  e.preventDefault();
});

document.getElementById('playPong-btn').addEventListener('click', function(e){
  inputName();
  socketPlayPong();
  showPageContent('pong');
  e.preventDefault();
});

function inputName() {
  // sets inputted name
  let inputText = document.getElementById('writeName');
  let playerNameH2 = document.getElementById('pong-playerName');
  let whichName = null;

  if(inputText.value === '') {
    whichName = getRandomName();
    playerNameH2.innerHTML = `${whichName}`;
  } else {
    whichName = inputText.value
    playerNameH2.innerHTML = `${whichName}`;
  }
  
  myInfo.userName = whichName;
}

function getRandomName() {
  return randomNames[Math.round(Math.random() * randomNames.length)];
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
