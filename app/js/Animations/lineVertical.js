"use strict";

const params = {
  x: 0,
  y: 0,
  height: null,
  width: null,
  colors: 
    {
      r: null,
      g: null,
      b: null
    }
}

module.exports = {

  updateParams: function(canvas, direction, speed, width, colors) {
    
    params.width = width;
    params.height = canvas.height;

    params.colors.r = colors.r;
    params.colors.g = colors.g;
    params.colors.b = colors.b;
    
      if(direction < 0) {
        params.x = (params.x + (direction * speed));
      } else {
        params.x = (params.x + (direction * speed)) % canvas.width;
      }
    
      if(params.x < 0) {
        params.x = canvas.width - params.x;
      } 

  },
  renderToCanvas: function(canvas) {
    canvas.ctx.lineWidth = params.width;
    canvas.ctx.strokeStyle = 'rgb( ' + params.colors.r + ', ' + params.colors.g + ', ' + params.colors.b + ')';
    canvas.ctx.beginPath();
      canvas.ctx.moveTo(params.x, 0);
      canvas.ctx.lineTo(params.x, canvas.height);
      canvas.ctx.stroke();
  }
}