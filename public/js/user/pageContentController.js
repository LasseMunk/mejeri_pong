"use strict";

function showPageContent(whichContent) {
  switch(whichContent) {
    case 'welcome':
      document.getElementById('welcomeScreen').style.display = 'block';
      document.getElementById('pong').style.display = 'none';
      document.getElementById('animations').style.display = 'none';
      document.getElementById('pickerContainer').style.display = 'none';
      break;
    
    case 'pong':
      document.getElementById('welcomeScreen').style.display = 'none';
      document.getElementById('pong').style.display = 'flex';
      document.getElementById('animations').style.display = 'none';
      document.getElementById('pickerContainer').style.display = 'flex';
      break;
    
    case 'animations':
      document.getElementById('welcomeScreen').style.display = 'none';
      document.getElementById('pong').style.display = 'none';
      document.getElementById('animations').style.display = 'grid';
      document.getElementById('pickerContainer').style.display = 'flex';
      break;
    
    default: 
      break;
  }

}