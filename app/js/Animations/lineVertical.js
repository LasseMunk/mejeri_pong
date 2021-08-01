// https://stackoverflow.com/questions/42291249/how-do-i-allow-a-2d-shape-to-wrap-around-a-canvas-using-webgl

"use strict";

const localParams = {
  x: 0,
}

module.exports = {
  updateParams: function(canvas, animationsParams) {
    
      if(animationsParams.global.speed < 0) {
        localParams.x = (localParams.x + animationsParams.global.speed);
      } else {
        localParams.x = (localParams.x + animationsParams.global.speed) % canvas.width;
      }
    
      if(localParams.x < 0) {
        localParams.x = canvas.width - localParams.x;
      } 
  },

  renderToCanvas: function(canvas, animationsParams) {
    canvas.ctx.lineWidth = animationsParams.global.width;
    canvas.ctx.strokeStyle = 'rgb( ' + animationsParams.global.colors.r + ', ' + animationsParams.global.colors.g + ', ' + animationsParams.global.colors.b + ')';
    canvas.ctx.beginPath();
      canvas.ctx.moveTo(localParams.x, 0);
      canvas.ctx.lineTo(localParams.x, canvas.height);
      canvas.ctx.stroke();
  }
}