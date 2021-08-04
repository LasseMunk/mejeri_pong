"use strict";

const socketData = require('./socketsData.js'); 
const socketPlayPong = require('./socketPlayPong');
const socketConnected = require('./socketConnected');
const socketDisconnected = require('./socketDisconnected');
// const animationsParams = require('../Animations/animationsParams.js');


module.exports = {
  start: function (io, canvasController, animationsParams) {
    
    io.on('connection', function(socket){
      
      socketConnected(io, socket, socketData); 
      
      socket.on('disconnect', function(){
        // call function when socket is disconnecting
        socketDisconnected(socket, socketData, canvasController); 
        });

      socket.on('playPong', function(myInfo) { 
        // receiving 'i am this user' from socket
        // data is sent from the users client website
        socketPlayPong(canvasController, socketData, myInfo);
        
      });
      
      socket.on('pongPaddleMovement', function(paddleMovement) { 
        console.log(paddleMovement);
        canvasController.getAnimationsRef('pong').moveUser(paddleMovement);
      });

      socket.on('getWhoIsPlayingPong', function(myInfoHash){
        canvasController.getCanvasControllerReferences()
          .io.to(myInfoHash)
          .emit('setCurrentUserNames', canvasController.getAnimationsRef('pong').getUserNames());
      });

      socket.on('playPongAgainst', function(myInfo){
        // kick out and message the other player
        // update players info on server
        // restart game
        switch(myInfo.playAgainst) {
          case 'left':
            
            break;
          case 'right':
            break;
          default:
            console.log('error in sockets controller play against');
            break;
        }
      });

      socket.on('emitMyRGB', function(rgbObj) {
        animationsParams.global.colors.r = rgbObj.r;
        animationsParams.global.colors.g = rgbObj.g;
        animationsParams.global.colors.b = rgbObj.b;
      });

      socket.on('displayThisOnCanvas', function(displayThisOnCanvas) {
        canvasController.stopDrawLoop();
        canvasController.setCurrentAnimation(displayThisOnCanvas);
      })
    }); 
  },
  
  displayCanvasOnServerHTML: function (canvasControllerReferences, canvasController) {
    canvasControllerReferences.io.to(socketData.userHashes.serverDisplay).emit('updateCanvas', canvasController.canvas.imageDataToPixelArr());   
  }
}



