"use strict";

let drawLoopParams = {
  drawLoopID: null,
};

module.exports = {

  start: function(canvas, io, socketsController, animationsController, animationsParams, fpsToMs) {
    drawLoopParams.drawLoopID = setInterval(function(){
      drawLoop(canvas, io, animationsController, animationsParams, socketsController);
    }, fpsToMs)
  },

  stop: function(canvas, io, socketsController) {
    drawLoopParams.drawLoopID = null;
    canvas.clearCanvas();
    socketsController.displayCanvasOnServerHTML(io, canvas)
  },

  setCanvasContent: function(newCanvasContent) {
    drawLoopParams.canvasContent = newCanvasContent;
  }
}

function drawLoop(
  canvas, 
  io, 
  animationsController, 
  animationsParams, 
  socketsController) {
  
  canvas.clearCanvas();
  
  animationsController.current.updateParams(canvas, animationsParams);
  
  animationsController.current.renderToCanvas(canvas, animationsParams);
  socketsController.displayCanvasOnServerHTML(io, canvas)
}
