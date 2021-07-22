class NodeCanvas {
  constructor (width, height, canvasColor) {
    const {createCanvas} = require('canvas');
    this.width = width;
    this.height = height;
    this.canvas = createCanvas(this.width, this.height);
    this.ctx = this.canvas.getContext('2d');

    this.canvasColor = canvasColor;
  }

  clearCanvas = () => {
    this.ctx.fillStyle = this.canvasColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawDot = (x, y) => {
    this.ctx.fillStyle = this.canvasColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    if(x >= 0 && x < this.width && y >= 0 && y < this.height ) {
      this.ctx.fillStyle = "#FF0000";
      this.ctx.fillRect(x, y, 1, 1);
    }
  }

  imageDataToPixelArr = () => {
    const imageData = this.ctx.getImageData(0, 0, this.width, this.height);
    
    let pixelArr = [];
    
    for (let i = 0; i < imageData.data.length; i+= 4) {
      // imageData.data.length = R*G*B*A;
      let x = pixelArr.length % this.width;
      let y = Math.floor(pixelArr.length / this.width);
      
      let r = imageData.data[i + 0]; // R
      let g = imageData.data[i + 1]; // G
      let b = imageData.data[i + 2]; // B
      
      pixelArr.push({
        // 0: x = 0, y = 0
        // 180: x = 0, y = 1
        // 360: x = 0, y = 2
        // 540: x = 0, y = 3
        // 720: x = 0, y = 4
        // 900: x = 0, y = 5
        // 1080: x = 0, y = 6
        // 1260: x = 0, y = 7
          x, y, r, g, b
      });
    }
      return pixelArr;
      // console.log(pixelArr);
  }
}

module.exports = { NodeCanvas };


