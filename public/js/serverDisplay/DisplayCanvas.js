// https://codepen.io/lassse/pen/bGqEpjj?fbclid=IwAR1-ZBKU0trYmxioxlmvfLgb4xRZV73APN53ZxPH6G5iVov6W1CB7-VB4HM

class DisplayCanvas {
  constructor (canvasID, width, height) {
    this.canvas = document.getElementById(canvasID);
    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx = this.canvas.getContext('2d');
  }

  setWidthHeight = (width, height) => {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  setCanvasContent = () => {
    console.log('canvas content');
  }

}




  






// let img = new Image();
// img.onload = function(){
//   ctx.drawImage(img,0,0); // Or at whatever offset you like
// };
// img.src = strDataURI;