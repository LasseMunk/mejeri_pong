"use strict";
const displayCanvas = new DisplayCanvas('serverDisplayCanvas', 180, 8);

const socket = io();	
		socket.on('yourHash', setMyHash);
		socket.on('updateCanvas', updateCanvas);

// Objects	
const myInfo = {
	hash: '',
	userSide: 'serverDisplay'
}

function updateCanvas(pixelArr) {
	displayCanvas.setCanvasContent(pixelArr);
};

function setMyHash(data) {
	myInfo.hash = data;
	if(myInfo.userSide != '') {
		sendMyInfoToServer();
	}
	
}

function sendMyInfoToServer() {
	socket.emit('userIs', myInfo);
}



