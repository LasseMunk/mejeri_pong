"use strict";

const socket = io();	
		// socket.on('message', oscMessage);
		socket.on('yourHash', setMyHash);

// Objects	
const myInfo = {
	hash: 'hash_placeholder',
	user: 'user_placeholder'
}

// function oscMessage(data) {	 
// 	if (data.args[0] == 'ping'){			 
// 		returnPing();
// 	}
// }

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

function userInput(buttonPressed) {
	let data = {
		user: myInfo.user,
		buttonPressed: buttonPressed
	}

	socket.emit('pongInteraction', data);
	// modtag socket besked på server og trigger event på client
}
