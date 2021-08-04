"use strict";

const socket = io();	
		socket.on('yourHash', setMyHash);
		socket.on('setCurrentUserNames', setCurrentUserNames);
		socket.on('kickedFromPong', kickedFromPong)

const myInfo = {
	hash: '',
	userName: '',
	userSide: '',
}

function setMyHash(data) {
	myInfo.hash = data;
	// console.log("hash set: " + myInfo.hash);
	initLandingPage();
}

function socketPlayPong () {
	// console.log("side: " + myInfo.userSide + " name: " + myInfo.userName);
	socket.emit('playPong', myInfo);
}

function socketPaddleInput(paddleUpDown) {
	if(paddleUpDown === 'paddleUp' || paddleUpDown === 'paddleDown') {
		let paddleMovement = {
			userSide: myInfo.userSide,
			paddleUpDown: paddleUpDown
		}
		socket.emit('pongPaddleMovement', paddleMovement);
	}
}

function emitMyRGB(rgbObj) {
	socket.emit('emitMyRGB', rgbObj);
}

function socketGetPongWhoIsPlaying () {
	socket.emit('getWhoIsPlayingPong', myInfo.hash);
}

function setCurrentUserNames(userNames) {
	document.getElementById('pongUserLeft').innerText = userNames.left;
	document.getElementById('pongUserLeftDiv').innerText = userNames.left;
	document.getElementById('pongUserRight').innerText = userNames.right;
	document.getElementById('pongUserRightDiv').innerText = userNames.right;
}

function kickedFromPong(myInfo) {
	document.getElementById('kickedFromPongUserName').innerHTML = myInfo.userName;
	showPageContent('kickedFromPong');
}