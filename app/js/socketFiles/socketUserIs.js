"use strict";

exports.socketUserIs = (io, socket, socketData, data, canvas) => {
  console.log('server received: ' + data.user);
      
      if(data.user === 'user_1') {
        socketData.userHashes.user_1 = data.hash;
      };
      if(data.user === 'user_2') {
        socketData.userHashes.user_2 = data.hash;
      };
      if(data.user === 'serverDisplay') {
        socketData.userHashes.serverDisplay = data.hash;
        displayCanvasOnServerHTML(io, socket, socketData, data, canvas);
      };
  
      if(socketData.userHashes.user_1 != 'hash_placeholder') {
          console.log('user_1 hash: ' + socketData.userHashes.user_1);
      }
      if(socketData.userHashes.user_2 != 'hash_placeholder') { 
          console.log('user_2 hash: ' + socketData.userHashes.user_2);
      }
      if(socketData.userHashes.serverDisplay != 'hash_placeholder') { 
          console.log('serverDisplay hash: ' + socketData.userHashes.serverDisplay);
      }
}


function displayCanvasOnServerHTML(io, socket, socketData, data, canvas) {
  io.to(socketData.userHashes.serverDisplay).emit('updateCanvas', canvas.imageDataToPixelArr());   
}