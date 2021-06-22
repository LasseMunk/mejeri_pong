"use strict";
const express = require('express'); 			// import express
const app = express();						
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const osc = require("osc");
const draw = require("./app/js/nodeCanvas");

console.log(draw.canvas);


http.listen(3000, function(){				// begins a server which listens on port 3000
  console.log('listening on *:3000');
});

app.use(express.static('dist')); 	// serve the static files found in the 'public' folder

const clientIds = []; // array which takes care of connected IDs

const userHashes = {
    user_1: 'hash_placeholder',
    user_2: 'hash_placeholder'
};

const userSetIntervalID = {
  user_1: 'interval_placeholder',
  user_2: 'interval_placeholder'
}
const lastDisconnected = 'user_placeholder';

function socketStayAlive(who) {
    // start setInterval pinging tablets to avoid websockets closes

    var pingMsg = {
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

io.on('connection', function(client){
    clientConnect(client); // call function when client is connecting
    client.on('disconnect', function(){
        clientDisconnect(client); // call function when client is disconnecting
        });

    client.on('userIs', function(data) { 
        // receiving 'i am this user' from client
        
          console.log('server received: ' + data.user);
            if(data.user == 'user_1') {
                userHashes.user_1 = data.hash;
                socketStayAlive('user_1');
            };
            if(data.user == 'user_2') {
                userHashes.user_2 = data.hash;
                socketStayAlive('user_2');
            };
       
            if(userHashes.user_1 != 'hash_placeholder') {
                console.log('user_1 hash: ' + userHashes.user_1);
            }
            if(userHashes.user_2 != 'hash_placeholder') { 
                console.log('user_2 hash: ' + userHashes.user_2);
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

    var i = clientIds.indexOf(socket);
    clientIds.splice(i, 1); // delete socket.id from clientIds array
    
    console.log(lastDisconnected + ' disconnected');
    console.log ("active connections: " + clientIds.length);
}

/****************
 * OSC Over UDP *
 ****************/

// Run npm install osc to use

// When sending OSC, use /your-osc-message to avoid errors
/*
var getIPAddresses = function () {
    var os = require("os"),
        interfaces = os.networkInterfaces(),
        ipAddresses = [];

    for (var deviceName in interfaces) {
        var addresses = interfaces[deviceName];
        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i];
            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address);
            }
        }
    }
    return ipAddresses;
};

var udpPort = new osc.UDPPort({
    // socket server ip
    localAddress: "127.0.0.1",
    localPort: 57121,

    // MAX ip and port
    remoteAddress: "127.0.0.1",
    remotePort: 57120
});

udpPort.on("ready", function () {
    var ipAddresses = getIPAddresses();

    console.log("Listening for OSC over UDP.");
    ipAddresses.forEach(function (address) {
        console.log(" Host:", address + ", Port:", udpPort.options.localPort);
    });
});

udpPort.on("message", function (oscMessage) {
    console.log(oscMessage);

    if (oscMessage.address == '/all') {
        io.sockets.emit("message", oscMessage);   // send to all
    };

    if(oscMessage.address == '.user_1') {
        if(typeof userHashes.user_1 === "undefined" ) {
            console.log('user_1 is undefined');
        }
        else {
            if(userHashes.user_1 != 'hash_placeholder') {
                io.sockets.connected[userHashes.user_1].emit('message', oscMessage);  
            }
            else {
                console.log('user_1 is undefined');
            }
        }
    }
    if(oscMessage.address == '/user_2') {
        if(typeof userHashes.user_2 === "undefined" ) {
            console.log('user_2 is undefined');
        }
        else {
            if(userHashes.user_2 != 'hash_placeholder') {
                io.sockets.connected[userHashes.user_2].emit('message', oscMessage);  
            }
            else {
                console.log('user_2 is undefined');
            }
        }
    }  
});

udpPort.on("error", function (err) {
    console.log(err);
});

udpPort.open();
*/
/****************
 * OSC THE END  *
 ****************/