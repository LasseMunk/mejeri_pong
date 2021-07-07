"use strict";
const express = require('express'); 			// import express
const app = express();						
const http = require('http').Server(app);
const port = 3000;
const io = require('socket.io')(http);

// const osc = require("osc");
const canvas = require("./app/js/nodeCanvas");

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

function socketStayAlive(who) {
    // start setInterval pinging tablets to avoid websockets closes
    // see https://stackoverflow.com/questions/40228577/does-socket-io-handle-keepalives-automatically

    let pingMsg = {
        args: ["ping"] 
    };

    if(who == 'user_1') {
        userSetIntervalID.user_1 = setInterval(function() {
            console.log("ping to user_1");
            if(userHashes.user_1 != "hash_placeholder" ) { 
                for(let i = 0; i < clientIds.length; i++) { 
                    if(clientIds[i] == userHashes.user_1) { 
                        io.sockets.connected[userHashes.user_1].emit('message', pingMsg);   
                    }
                }
            }
        }, 10000);
    }
    if(who == 'user_2') {
        userSetIntervalID.user_2 = setInterval(function() {
            console.log("ping to user_2");
            if(userHashes.user_2 != "hash_placeholder" ) {    // test if hash is in connected ids
                for(var i = 0; i < clientIds.length; i++) {
                    if(clientIds[i] == userHashes.user_2) {
                        io.sockets.connected[userHashes.user_2].emit('message', pingMsg); 
                    }
                }
            }
        }, 10000);
    }
}

function displayCanvas() {
    let updateCanvas = {
        args: ["updateCanvas"] 
    };

    userSetIntervalID.serverDisplay = setInterval(function() {
        if(userHashes.serverDisplay != "hash_placeholder" ) { 
            io.to(userHashes.serverDisplay).emit('updateCanvas', updateCanvas);  
                    
        }
    }, 1000);   
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
                socketStayAlive('user_1');
            };
            if(data.user === 'user_2') {
                userHashes.user_2 = data.hash;
                socketStayAlive('user_2');
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

    var i = clientIds.indexOf(socket);
    clientIds.splice(i, 1); // delete socket.id from clientIds array
    
    console.log(lastDisconnected + ' disconnected');
    console.log ("active connections: " + clientIds.length);
}
