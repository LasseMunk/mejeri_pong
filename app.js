"use strict";
const express = require('express'); 			// import express
const app = express();						
const http = require('http').Server(app);
const port = 3000;
const io = require('socket.io')(http);

const NodeCanvasClass = require('./app/js/nodeCanvas');
const canvas = new NodeCanvasClass.NodeCanvas(180, 8);
// const osc = require("osc");

http.listen(port, err => { // begins a server which listens on port
    if(err) {
        return console.log('ERROR', err);
    }				
  console.log(`listening on port: ${port}`);
});

app.use(express.static('public')); 	// serve the static files found in the 'dist' folder

const clientIds = []; // array which takes care of connected IDs

const userHashes = {
    user_1: 'hash_placeholder',
    user_2: 'hash_placeholder',
    serverDisplay: 'hash_placeholder'
};

const userSetIntervalID = {
  user_1: 'interval_placeholder',
  user_2: 'interval_placeholder',
  serverDisplay: 'interval_placeholder'
}
let lastDisconnected = 'user_placeholder';

const timer = setInterval(displayCanvas, 16);
let counter = 0;

function displayCanvas() {
    counter = (counter + 1) % canvas.width;
    canvas.drawRedDot(counter, 1);
    io.to(userHashes.serverDisplay).emit('updateCanvas', canvas.imageDataToPixelArr());   
}

io.on('connection', function(client){
    clientConnect(client); // call function when client is connecting
    client.on('disconnect', function(){
        clientDisconnect(client); // call function when client is disconnecting
        });

    client.on('userIs', function(data) { 
        // receiving 'i am this user' from client
          console.log('server received: ' + data.user);
          
            if(data.user === 'user_1') {
                userHashes.user_1 = data.hash;
            };
            if(data.user === 'user_2') {
                userHashes.user_2 = data.hash;
            };
            if(data.user === 'serverDisplay') {
                userHashes.serverDisplay = data.hash;
                displayCanvas();
            };
       
            if(userHashes.user_1 != 'hash_placeholder') {
                console.log('user_1 hash: ' + userHashes.user_1);
            }
            if(userHashes.user_2 != 'hash_placeholder') { 
                console.log('user_2 hash: ' + userHashes.user_2);
            }
            if(userHashes.serverDisplay != 'hash_placeholder') { 
                console.log('serverDisplay hash: ' + userHashes.serverDisplay);
            }
        });

    client.on('whatsupserver', function(data) {
        console.log('ping from: ' + data.args); 
    }); 
});

function clientConnect(socket) {

	// socket exist when a new connection is made. Therefore the argument
	// is the socket.

	// There has to be code in the client which tells the client to connect
	// to the server (and triggers the new connection event). 

    clientIds.push(socket.id);
    console.log ("active connections: " + clientIds.length);

    io.to(socket.id).emit('yourHash', socket.id);  
}

function clientDisconnect (socket) {
    
    if(socket.id == userHashes.user_1) {
        lastDisconnected = 'user_1';
        userHashes.user_1 = 'hash_placeholder';
        
        if(userSetIntervalID.user_1 != 'interval_placeholder') {
            clearInterval(userSetIntervalID.user_1);
            userSetIntervalID.user_1 = 'interval_placeholder';
        }
    }
    
    if(socket.id == userHashes.user_2) {
        lastDisconnected = 'user_2';
        userHashes.user_2 = 'hash_placeholder';

        if(userSetIntervalID.user_2 != 'interval_placeholder') {
            clearInterval(userSetIntervalID.user_2);
            userSetIntervalID.user_2 = 'interval_placeholder';
        }
    }
    if(socket.id == userHashes.serverDisplay) {
        lastDisconnected = 'serverDisplay';
        userHashes.serverDisplay = 'hash_placeholder';

        if(userSetIntervalID.serverDisplay != 'interval_placeholder') {
            clearInterval(userSetIntervalID.serverDisplay);
            userSetIntervalID.serverDisplay = 'interval_placeholder';
        }
    }

    let i = clientIds.indexOf(socket);
    clientIds.splice(i, 1); // delete socket.id from clientIds array
    
    console.log(lastDisconnected + ' disconnected');
    console.log ("active connections: " + clientIds.length);
}
