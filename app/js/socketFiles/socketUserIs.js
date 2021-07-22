"use strict";

exports.socketUserIs = (socketData, data) => {
  console.log('server received: ' + data.user);
      
      if(data.user === 'user_1') {
        socketData.userHashes.user_1 = data.hash;
        console.log('user_1 hash: ' + socketData.userHashes.user_1);
      };
      if(data.user === 'user_2') {
        socketData.userHashes.user_2 = data.hash;
        console.log('user_2 hash: ' + socketData.userHashes.user_2);
      };
      if(data.user === 'serverDisplay') {
        socketData.userHashes.serverDisplay = data.hash;
        console.log('serverDisplay hash: ' + socketData.userHashes.serverDisplay);
      };
}


