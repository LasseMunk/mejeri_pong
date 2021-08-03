"use strict";
const socketIds = []; // array which takes care of connected IDs

const userHashes = {
    left: '',
    right: '',
    serverDisplay: ''
};

const userSetIntervalIDs = {
  left: '',
  right: '',
  serverDisplay: ''
}

const lastDisconnectedSocket = '';

module.exports = {
  socketIds: socketIds,
  userHashes: userHashes,
  userSetIntervalIDs: userSetIntervalIDs,
  lastDisconnectedSocket: lastDisconnectedSocket
};