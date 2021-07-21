"use strict";
const displayCanvas = new DisplayCanvas('serverDisplayCanvas', 180, 8);

const socket = io();	
		socket.on('yourHash', setMyHash);
		socket.on('updateCanvas', updateCanvas);

// Objects	
const myInfo = {
	hash: 'hash_placeholder',
	user: 'serverDisplay'
}

function updateCanvas(pixelArr) {
	displayCanvas.setCanvasContent(pixelArr);
};

function setMyHash(data) {
	myInfo.hash = data;
	if(myInfo.user != 'user_placeholder') {
		sendMyInfoToServer();
	}
	
}

function sendMyInfoToServer() {
	
	socket.emit('userIs', myInfo);
}



