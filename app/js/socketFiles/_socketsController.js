"use strict";

const socketData = require('./socketsData.js'); 
const { socketConnected } = require('./socketConnected');
const { socketDisconnected } = require('./socketDisconnected');
const { socketUserIs } = require('./socketUserIs');

module.exports = {
  start: function (io, ui) {
    io.on('connection', function(socket){
      
      socketConnected(io, socket, socketData); // call function when socket is connecting
      
      socket.on('disconnect', function(){
        socketDisconnected(io, socket, socketData); // call function when socket is disconnecting
        });

      socket.on('userIs', function(data) { 
        // receiving 'i am this user' from socket
        // data is sent from the users client website
        socketUserIs(socketData, data);      
      });
      
      socket.on('pongInteraction', function(data) { 
        console.log(ui, data);
      });
    });
  },
  displayCanvasOnServerHTML: 
    function displayCanvasOnServerHTML(io, canvas) {
      io.to(socketData.userHashes.serverDisplay).emit('updateCanvas', canvas.imageDataToPixelArr());   
    }
}


