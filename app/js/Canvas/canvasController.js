"use strict";
// Controls what animation / game is displayed on the canvas
const NodeCanvasClass = require('./nodeCanvas');
const drawLoop = require('../drawLoop');
const animationsParams = require('../Animations/animationsParams');

const canvasControllerReferences = {
  io: null,
  animationsParams: null,
  socketsController: null
}

const canvasController = {
  canvas: new NodeCanvasClass.NodeCanvas(180, 8, '#000000'),
  current: null
}

const animations = {
  pong: require('../Animations/pong'),
  lineVertical: require('../Animations/lineVertical'),
  noiseSimplex: null
}

animations.pong.init(canvasController.canvas);

module.exports = { 
  setCurrentAnimation: function(displayThisOnCanvas) {
    switch(displayThisOnCanvas) {
      case 'pong':
        canvasController.current = animations.pong;
        break;
        
        case 'lineVertical':
          canvasController.current = animations.lineVertical;
        break;

      default:
        console.log('canvas controller set current animation error');
        break;
    }
  },

  start: function(io, socketsController, animationsParams) {
    canvasControllerReferences.io = io;
    canvasControllerReferences.socketsController = socketsController;
    canvasControllerReferences.animationsParams = animationsParams;
  },

  getCanvasControllerReferences: function() {
    return canvasControllerReferences;
  },

  startDrawLoop: function() {
    drawLoop.start(canvasControllerReferences, canvasController, animationsParams) 
  },

  stopDrawLoop: function() {
    drawLoop.stop(canvasControllerReferences, canvasController);
  },
  getAnimationsRef: function(whichAnimation) {
    let reference = null;

    switch(whichAnimation) {
      case 'pong':
        reference = animations.pong;
        break;
      
      case 'lineVertical':
        reference = animations.lineVertical;
        break;
      
      case 'noiseSimplex':
        reference = animations.noiseSimplex;
        break;
      
      default: 
        console.log('wrong input to canvascontroller.getAnimationsRef()');
        break;
    }
    
    return reference;
  }
 };