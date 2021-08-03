"use strict";

exports.socketUserIs = (socketData, data) => {
  console.log('server received: ' + data.user);
      
      if(data.userSide === 'left') {
        socketData.userHashes.left = data.hash;
        console.log('user left hash: ' + socketData.userHashes.left);
      };
      if(data.userSide === 'right') {
        socketData.userHashes.right = data.hash;
        console.log('user right hash: ' + socketData.userHashes.right);
      };
      if(data.userSide === 'serverDisplay') {
        socketData.userHashes.serverDisplay = data.hash;
        console.log('serverDisplay hash: ' + socketData.userHashes.serverDisplay);
      };
}


