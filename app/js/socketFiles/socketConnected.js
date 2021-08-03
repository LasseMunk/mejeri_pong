"use strict";

exports.socketConnected = (io, socket, socketData) => {
	// socket exist when a new connection is made. Therefore the argument
	// is the socket.
	// There has to be code in the socket which tells the socket to connect
	// to the server (and triggers the new connection event). 

	// saves socket hash on server side
	socketData.socketIds.push(socket.id);
	console.log ("active connections: " + socketData.socketIds.length);

	// saves hash on connected socket on client side  
	io.to(socket.id).emit('yourHash', socket.id);
}
