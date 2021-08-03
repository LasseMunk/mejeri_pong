"use strict";

const elementIDs = {
  pongLandingPage: document.getElementById('pongLandingPage'),
  pongWhoIsPlaying: document.getElementById('pongWhoIsPlaying'),
  pongInputName: document.getElementById('pongInputName'),
  pong: document.getElementById('pong'),
  animations: document.getElementById('animations'),
  pickerContainer: document.getElementById('pickerContainer'),
}

function showPageContent(whichContent) {
  switch(whichContent) {
    case 'pongWhoIsPlaying':
      elementIDs.pongLandingPage.style.display = 'block',
      elementIDs.pongWhoIsPlaying.style.display = 'flex';
      elementIDs.pongInputName.style.display = 'none';
      elementIDs.pong.style.display = 'none';
      elementIDs.animations.style.display = 'none';
      elementIDs.pickerContainer.style.display = 'none';
      break;

    case 'pongInputName':
      elementIDs.pongLandingPage.style.display = 'none',
      elementIDs.pongWhoIsPlaying.style.display = 'none';
      elementIDs.pongInputName.style.display = 'block';
      elementIDs.pong.style.display = 'none';
      elementIDs.animations.style.display = 'none';
      elementIDs.pickerContainer.style.display = 'none';
      break;
    
    case 'pong':
      elementIDs.pongInputName.style.display = 'none';
      elementIDs.pong.style.display = 'flex';
      elementIDs.animations.style.display = 'none';
      elementIDs.pickerContainer.style.display = 'flex';
      break;
    
    case 'animations':
      elementIDs.pongLandingPage.style.display = 'none',
      elementIDs.pongWhoIsPlaying.style.display = 'none';
      elementIDs.pongInputName.style.display = 'none';
      elementIDs.pong.style.display = 'none';
      elementIDs.animations.style.display = 'grid';
      elementIDs.pickerContainer.style.display = 'flex';
      break;
    
    default: 
      break;
  }

}