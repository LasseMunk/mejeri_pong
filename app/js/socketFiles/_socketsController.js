"use strict";

const socketData = require('./socketsData.js'); 
const { socketConnected } = require('./socketConnected');
const { socketDisconnected } = require('./socketDisconnected');
const { socketUserIs } = require('./socketUserIs');
const animationsParams = require('../Animations/animationsParams.js');


module.exports = {
  start: function (io, canvasController, animationsParams) {

    io.on('connection', function(socket){
      
      socketConnected(io, socket, socketData); 
      
      socket.on('disconnect', function(){
        // call function when socket is disconnecting
        socketDisconnected(io, socket, socketData); 
        });

      socket.on('playPong', function(myInfo) { 
        // receiving 'i am this user' from socket
        // data is sent from the users client website
        socketUserIs(socketData, myInfo);
        
        if(myInfo.playAgainst === 'left'){
          
          // transmit to current user right to disconnect
          if(socketData.userHashes.right != '') {
            canvasController.getCanvasControllerReferences()
            .io.to(socketData.userHashes.right)
            .emit('kickedFromPong', myInfo);
          }

          // update that i am right
          socketData.userHashes.right = myInfo.hash;
          
          canvasController.getAnimationsRef('pong').setUserName(myInfo.userSide, myInfo.userName);

        }
        
        if(myInfo.playAgainst === 'right'){
           // transmit to left to disconnect
          
          if(socketData.userHashes.left != '') {
            canvasController.getCanvasControllerReferences()
            .io.to(socketData.userHashes.left)
            .emit('kickedFromPong', myInfo);
          }

          // update that i am left
          socketData.userHashes.left = myInfo.hash;
          
          canvasController.getAnimationsRef('pong').setUserName(myInfo.userSide, myInfo.userName);
        }

        // restart game
        canvasController.getAnimationsRef('pong').restart;
      });
      
      // socket.on('pongInteraction', function(data) { 
      //   canvasController.pong.moveUser('userLeft', data.paddleUpDown);
      // });

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



