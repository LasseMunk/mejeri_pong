"use strict";

exports.socketDisconnected = (io, socket, socketData) => {
    
        if(socket.id === socketData.userHashes.left) {
          socketData.lastDisconnectedSocket = 'left';
          socketData.userHashes.left = '';
            
            if(socketData.userSetIntervalIDs.left != '') {
                clearInterval(socketData.userSetIntervalIDs.left);
                socketData.userSetIntervalIDs.left = '';
            }
        }
        
        if(socket.id === socketData.userHashes.right) {
          socketData.lastDisconnectedSocket = 'right';
          socketData.userHashes.right = '';
    
            if(socketData.userSetIntervalIDs.right != '') {
                clearInterval(socketData.userSetIntervalIDs.right);
                socketData.userSetIntervalIDs.right = '';
            }
        }
        if(socket.id == socketData.userHashes.serverDisplay) {
          socketData.lastDisconnectedSocket = 'serverDisplay';
          socketData.userHashes.serverDisplay = '';
    
            if(socketData.userSetIntervalIDs.serverDisplay != '') {
                clearInterval(socketData.userSetIntervalIDs.serverDisplay);
                socketData.userSetIntervalIDs.serverDisplay = '';
            }
        }
    
        let i = socketData.socketIds.indexOf(socket);
        socketData.socketIds.splice(i, 1); // delete socket.id from socketIds array
        
        console.log('user ' + socketData.lastDisconnectedSocket + ' disconnected');
        console.log ("active connections: " + socketData.socketIds.length);
}
