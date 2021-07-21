"use strict";

let io;

const socketData = require('./socketsData.js'); 

const { socketConnected } = require('./socketConnected');
const { socketDisconnected } = require('./socketDisconnected');
const { socketUserIs } = require('./socketUserIs');

exports.socketConnection = (server, canvas) => {
  io = require('socket.io')(server);

  io.on('connection', function(socket){
    
    socketConnected(io, socket, socketData); // call function when socket is connecting
    
    socket.on('disconnect', function(){
      socketDisconnected(io, socket, socketData); // call function when socket is disconnecting
      });

    socket.on('userIs', function(data) { 
      // receiving 'i am this user' from socket
      // data is sent from the users client website
      socketUserIs(io, socket, socketData, data, canvas);
    });
  });
} 



