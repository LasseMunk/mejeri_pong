"use strict";

const socket = io();	
		socket.on('yourHash', setMyHash);

// Objects	
const myInfo = {
	hash: 'hash_placeholder',
	user: 'user_placeholder'
}

function setMyHash(data) {
	myInfo.hash = data;
  myInfo.user = data;
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

function socketPaddleInput(paddleUpDown) {
	if(paddleUpDown === 'paddleUp' || paddleUpDown === 'paddleDown') {
		let data = {
			user: myInfo.user,
			paddleUpDown: paddleUpDown
		}
		socket.emit('pongInteraction', data);
	}
}

function setGlobalRGB(rgbObj) {
	socket.emit('setGlobalRGB', rgbObj);
}
