"use strict";

module.exports = (io, socket, socketData) => {
	// socket exist when a new connection is made. Therefore the argument
	// is the socket.

	// saves socket hash on server side
	socketData.socketIds.push(socket.id);
	console.log ("active connections: " + socketData.socketIds.length);

	// saves hash on connected socket on client side  
	io.to(socket.id).emit('yourHash', socket.id);
}
