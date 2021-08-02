"use strict";

let drawLoopParams = {
  drawLoopID: null,
  fpsToMs: 1000/60
};

module.exports = {

  start: function(canvasControllerReferences, canvasController, animationsParams) {
    drawLoopParams.drawLoopID = setInterval(function(){
      drawLoop(canvasControllerReferences, canvasController, animationsParams);
    }, drawLoopParams.fpsToMs)
  },

  stop: function(canvasControllerReferences, canvasController) {
    drawLoopParams.drawLoopID = null;
    canvas.clearCanvas();
    displayCanvasOnServerHTML(canvasControllerReferences.io, canvasController.canvas)
  }
}

function drawLoop(
  canvasControllerReferences,
  canvasController,
  animationsParams) {
  
  canvasController.canvas.clearCanvas();
  canvasController.current.updateParams(canvasController.canvas, animationsParams);
  canvasController.current.renderToCanvas(canvasController.canvas, animationsParams);
  
  canvasControllerReferences.socketsController.displayCanvasOnServerHTML(canvasControllerReferences, canvasController);
 
 
}


