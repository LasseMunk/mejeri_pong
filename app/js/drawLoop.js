"use strict";

let drawLoopParams = {
  drawLoopID: null,
};

module.exports = {

  start: function(canvas, io, animationsController, socketsController, fpsToMs) {
    drawLoopParams.drawLoopID = setInterval(function(){
      drawLoop(canvas, io, animationsController, socketsController);
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

function drawLoop(canvas, io, animationsController, socketsController) {
  canvas.clearCanvas();
  let direction = 1;
  let speed = 0.5;
  let width = 1;
  let colors = {
    r: 255,
    g: 100,
    b: 0
  }
  // animationsController.current.update();
  // animationsController.current.render();
  animationsController.current.updateParams(canvas, direction, speed, width, colors);
  animationsController.current.renderToCanvas(canvas);
  socketsController.displayCanvasOnServerHTML(io, canvas)
}
