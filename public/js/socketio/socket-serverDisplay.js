"use strict";
const displayCanvas = new DisplayCanvas('serverDisplayCanvas', 180, 8);

const socket = io();	
		// socket.on('message', oscMessage);
		socket.on('yourHash', setMyHash);
		socket.on('updateCanvas', updateCanvas);

// Objects	
const myInfo = {
	hash: 'hash_placeholder',
	user: 'serverDisplay'
}

// function oscMessage(data) {	 
// 	if (data.args[0] == 'ping'){			 
// 		returnPing();
// 	}
// }

function updateCanvas(pixelArr) {
	
	displayCanvas.setCanvasContent(pixelArr);
};

function setMyHash(data) {
	myInfo.hash = data;
	if(myInfo.user != 'user_placeholder') {
		sendMyInfoToServer();
	}
	console.log("hash set: " + myInfo.hash);
}

function sendMyInfoToServer() {
	console.log("send user: " + myInfo.user + " hash: " + myInfo.hash);
	socket.emit('userIs', myInfo);
}

function iAm(who) {
	myInfo.user = who;
	console.log("user set: " + myInfo.user);

	sendMyInfoToServer();
}		


