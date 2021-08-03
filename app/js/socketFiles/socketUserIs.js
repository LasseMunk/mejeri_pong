"use strict";

exports.socketUserIs = (socketData, myInfo) => {
  console.log(`CONNECTED user: ${myInfo.userSide} name: ${myInfo.userName} hash: ${myInfo.hash}` );
      
      if(myInfo.userSide === 'left') {
        socketData.userHashes.left = myInfo.hash;
      };
      if(myInfo.userSide === 'right') {
        socketData.userHashes.right = myInfo.hash;
      };
      if(myInfo.userSide === 'serverDisplay') {
        socketData.userHashes.serverDisplay = myInfo.hash;
      };
}


