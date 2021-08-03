"use strict";

exports.socketDisconnected = (io, socket, socketData) => {
    
        if(socket.id == socketData.userHashes.left) {
          socketData.lastDisconnectedSocket = 'left';
          socketData.userHashes.left = 'hash_placeholder';
            
            if(socketData.userSetIntervalIDs.left != 'interval_placeholder') {
                clearInterval(socketData.userSetIntervalIDs.left);
                socketData.userSetIntervalIDs.left = 'interval_placeholder';
            }
        }
        
        if(socket.id == socketData.userHashes.right) {
          socketData.lastDisconnectedSocket = 'right';
          socketData.userHashes.right = 'hash_placeholder';
    
            if(socketData.userSetIntervalIDs.right != 'interval_placeholder') {
                clearInterval(socketData.userSetIntervalIDs.right);
                socketData.userSetIntervalIDs.right = 'interval_placeholder';
            }
        }
        if(socket.id == socketData.userHashes.serverDisplay) {
          socketData.lastDisconnectedSocket = 'serverDisplay';
          socketData.userHashes.serverDisplay = 'hash_placeholder';
    
            if(socketData.userSetIntervalIDs.serverDisplay != 'interval_placeholder') {
                clearInterval(socketData.userSetIntervalIDs.serverDisplay);
                socketData.userSetIntervalIDs.serverDisplay = 'interval_placeholder';
            }
        }
    
        let i = socketData.socketIds.indexOf(socket);
        socketData.socketIds.splice(i, 1); // delete socket.id from socketIds array
        
        console.log(socketData.lastDisconnectedSocket + ' disconnected');
        console.log ("active connections: " + socketData.socketIds.length);
}
