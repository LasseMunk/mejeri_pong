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

const renderFPS = 60;
const fpsToMs = 1000/renderFPS;
const animationsController = require('./app/js/Animations/animationsController');
const NodeCanvasClass = require('./app/js/nodeCanvas');
const canvas = new NodeCanvasClass.NodeCanvas(180, 8, '#000000');
const PongGameClass = require('./app/js/Animations/pong');
const drawLoop = require('./app/js/drawLoop');

animationsController.pong = new PongGameClass.Pong(canvas.ctx, canvas.canvas);
animationsController.lineVertical = require('./app/js/Animations/lineVertical');
animationsController.current = animationsController.lineVertical;



socketsController.start(io, animationsController);
drawLoop.start(canvas, io, animationsController, socketsController, fpsToMs);
    