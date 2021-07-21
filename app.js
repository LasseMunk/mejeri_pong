"use strict";
const { socketConnection } = require('./app/js/socketFiles/socket-io');
const http = require('http');
const express = require('express'); 			// import express
const app = express();
const server = http.createServer(app);						
const port = 3000;

server.listen(port, err => { // begins a server which listens on port
    if(err) {
        return console.log('ERROR', err);
    }				
  console.log(`listening on port: ${port}`);
});

app.use(express.static('public')); 	// serve the static files found in the 'dist' folder

const NodeCanvasClass = require('./app/js/nodeCanvas');
const canvas = new NodeCanvasClass.NodeCanvas(180, 8);
canvas.drawRedDot(0,1);

socketConnection(server, canvas);