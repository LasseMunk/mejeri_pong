"use strict";

const elementIDs = {
  pongLandingPage: document.getElementById('pongLandingPage'),
  pongWhoIsPlaying: document.getElementById('pongWhoIsPlaying'),
  pongInputName: document.getElementById('pongInputName'),
  pong: document.getElementById('pong'),
  kickedFromPong: document.getElementById('kickedFromPong'),
  animations: document.getElementById('animations'),
  pickerContainer: document.getElementById('pickerContainer'),
}

function showPageContent(whichContent) {

  if(typeof whichContent != 'string') {
    console.error(`wrong type in showPageContent function - should have been string`);
  }

  switch(whichContent) {
    case 'pongWhoIsPlaying':
      elementIDs.pongLandingPage.style.display = 'block',
      elementIDs.pongWhoIsPlaying.style.display = 'flex';
      elementIDs.pongInputName.style.display = 'none';
      elementIDs.pong.style.display = 'none';
      elementIDs.kickedFromPong.style.display = 'none';
      elementIDs.animations.style.display = 'none';
      elementIDs.pickerContainer.style.display = 'none';
      break;

    case 'pongInputName':
      elementIDs.pongLandingPage.style.display = 'none',
      elementIDs.pongWhoIsPlaying.style.display = 'none';
      elementIDs.pongInputName.style.display = 'block';
      elementIDs.pong.style.display = 'none';
      elementIDs.kickedFromPong.style.display = 'none';
      elementIDs.animations.style.display = 'none';
      elementIDs.pickerContainer.style.display = 'none';
      break;
    
    case 'pong':
      elementIDs.pongInputName.style.display = 'none';
      elementIDs.pong.style.display = 'flex';
      elementIDs.kickedFromPong.style.display = 'none';
      elementIDs.animations.style.display = 'none';
      elementIDs.pickerContainer.style.display = 'flex';
      break;
    
      case 'kickedFromPong':
        elementIDs.pongInputName.style.display = 'none';
        elementIDs.pong.style.display = 'none';
        elementIDs.kickedFromPong.style.display = 'flex';
        elementIDs.animations.style.display = 'none';
        elementIDs.pickerContainer.style.display = 'none';
        break;
    
    case 'animations':
      elementIDs.pongLandingPage.style.display = 'none',
      elementIDs.pongWhoIsPlaying.style.display = 'none';
      elementIDs.pongInputName.style.display = 'none';
      elementIDs.pong.style.display = 'none';
      elementIDs.kickedFromPong.style.display = 'none';
      elementIDs.animations.style.display = 'grid';
      elementIDs.pickerContainer.style.display = 'flex';
      break;
    
    default:
      console.error('showPageContent function do not contain requested page');
      break;
  }

}