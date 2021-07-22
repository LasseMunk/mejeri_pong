"use strict";
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const port = 3000;
const io = require('socket.io')(server);
const ui = require('./app/js/serverUI');

server.listen(port, err => { // begins a server which listens on port
    if(err) {
        return console.log('ERROR', err);
    }				
  console.log(`listening on port: ${port}`);
});

app.use(express.static('public')); 	// serve the static files found in the 'public' folder

const NodeCanvasClass = require('./app/js/nodeCanvas');
const canvas = new NodeCanvasClass.NodeCanvas(180, 8, '#000000');

const PongGameClass = require('./app/js/pongFiles/pongServer');
const pongGame = new PongGameClass.Pong(canvas.ctx, canvas.canvas);
ui.controls.pong = pongGame;

const socketsController = require('./app/js/socketFiles/_socketsController');
socketsController.start(io, ui);

function drawLoop () {
    canvas.clearCanvas();
    pongGame.update();
    pongGame.render();
    socketsController.displayCanvasOnServerHTML(io, canvas)
}

let render = setInterval(drawLoop, 16);