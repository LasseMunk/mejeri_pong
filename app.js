"use strict";
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const port = 3000;
const io = require('socket.io')(server);
const socketsController = require('./app/js/socketFiles/_socketsController');

server.listen(port, err => { // begins a server which listens on port
    if(err) {
        return console.log('ERROR', err);
    }				
  console.log(`listening on port: ${port}`);
});

app.use(express.static('public')); 	// serve the static files found in the 'public' folder

/*  ----- ANIMAITON SETUP ------ */
const canvasController = require('./app/js/Canvas/canvasController');
const animationsParams = require('./app/js/Animations/animationsParams');

canvasController.start(io, socketsController, animationsParams);
socketsController.start(io, canvasController, animationsParams);
canvasController.setCurrentAnimation('lineVertical');
canvasController.startDrawLoop();

    