"use strict";

exports.socketDisconnected = (io, socket, socketData) => {
    
        if(socket.id == socketData.userHashes.user_1) {
          socketData.lastDisconnectedSocket = 'user_1';
          socketData.userHashes.user_1 = 'hash_placeholder';
            
            if(socketData.userSetIntervalIDs.user_1 != 'interval_placeholder') {
                clearInterval(socketData.userSetIntervalIDs.user_1);
                socketData.userSetIntervalIDs.user_1 = 'interval_placeholder';
            }
        }
        
        if(socket.id == socketData.userHashes.user_2) {
          socketData.lastDisconnectedSocket = 'user_2';
          socketData.userHashes.user_2 = 'hash_placeholder';
    
            if(socketData.userSetIntervalIDs.user_2 != 'interval_placeholder') {
                clearInterval(socketData.userSetIntervalIDs.user_2);
                socketData.userSetIntervalIDs.user_2 = 'interval_placeholder';
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
