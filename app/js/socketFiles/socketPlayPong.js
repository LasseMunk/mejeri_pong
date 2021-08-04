"use strict";
const { socketUserIs } = require('./socketUserIs');

module.exports = (canvasController, socketData, myInfo) => {

  if(myInfo.userSide === 'left'){
          
    // transmit to current user right to disconnect
    if(socketData.userHashes.left != '') {
      canvasController.getCanvasControllerReferences()
      .io.to(socketData.userHashes.left)
      .emit('kickedFromPong', myInfo);
    }
  
    canvasController.getAnimationsRef('pong').setUserName(myInfo.userSide, myInfo.userName);

  }
  
  if(myInfo.userSide === 'right'){
     // transmit to left to disconnect
    
    if(socketData.userHashes.right != '') {
      canvasController.getCanvasControllerReferences()
      .io.to(socketData.userHashes.right)
      .emit('kickedFromPong', myInfo);
    }
 
    canvasController.getAnimationsRef('pong').setUserName(myInfo.userSide, myInfo.userName);
  }
  // update the new user to occupy either left or right side of
  // pong game
  socketUserIs(socketData, myInfo);

  // broadcast to all clients when a player has joined pong
  canvasController
        .getCanvasControllerReferences()
        .io
        .emit('setCurrentUserNames', canvasController.getAnimationsRef('pong').getUserNames());

  // restart game
  canvasController.getAnimationsRef('pong').restart;
}