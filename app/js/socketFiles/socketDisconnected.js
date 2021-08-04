"use strict";

module.exports = (socket, socketData, canvasController) => {

  switch(socket.id) {
    case socketData.userHashes.left:
      socketData.lastDisconnectedSocket = 'left';
      canvasController.getAnimationsRef('pong').setUserName('left', 'ai');
      // broadcast both player names to all connected clients
      canvasController
        .getCanvasControllerReferences()
        .io
        .emit('setCurrentUserNames', canvasController.getAnimationsRef('pong').getUserNames());
      socketData.userHashes.left = '';
      break;

    case socketData.userHashes.right:
      socketData.lastDisconnectedSocket = 'right';
      canvasController.getAnimationsRef('pong').setUserName('right', 'ai');
      // broadcast both player names to all connected clients
      canvasController
        .getCanvasControllerReferences()
        .io
        .emit('setCurrentUserNames', canvasController.getAnimationsRef('pong').getUserNames());
      socketData.userHashes.right = '';
      break;
    
    case socketData.userHashes.serverDisplay:
      socketData.lastDisconnectedSocket = 'serverDisplay';
      socketData.userHashes.serverDisplay = '';
      break;
    
    default:
      socketData.lastDisconnectedSocket = 'NOT-A-PONG-PLAYER';
      break;
  }

  // if(socket.id === socketData.userHashes.left) {
  //   socketData.lastDisconnectedSocket = 'left';
  //   socketData.userHashes.left = '';
      
  //     if(socketData.userSetIntervalIDs.left != '') {
  //         clearInterval(socketData.userSetIntervalIDs.left);
  //         socketData.userSetIntervalIDs.left = '';
  //     }
  // }
  
  // if(socket.id === socketData.userHashes.right) {
  //   socketData.lastDisconnectedSocket = 'right';
  //   socketData.userHashes.right = '';

  //     if(socketData.userSetIntervalIDs.right != '') {
  //         clearInterval(socketData.userSetIntervalIDs.right);
  //         socketData.userSetIntervalIDs.right = '';
  //     }
  // }
  // if(socket.id === socketData.userHashes.serverDisplay) {
  //   socketData.lastDisconnectedSocket = 'serverDisplay';
  //   socketData.userHashes.serverDisplay = '';

  //     if(socketData.userSetIntervalIDs.serverDisplay != '') {
  //         clearInterval(socketData.userSetIntervalIDs.serverDisplay);
  //         socketData.userSetIntervalIDs.serverDisplay = '';
  //     }
  // }

  // if(socket.id === '') {
  //   socketData.lastDisconnectedSocket = 'NotAUser'
  // }

  let i = socketData.socketIds.indexOf(socket);
  socketData.socketIds.splice(i, 1); // delete socket.id from socketIds array
  
  console.log('user ' + socketData.lastDisconnectedSocket + ' disconnected');
  console.log ("active connections: " + socketData.socketIds.length);
}
