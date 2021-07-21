"use strict";
const socketIds = []; // array which takes care of connected IDs

const userHashes = {
    user_1: 'hash_placeholder',
    user_2: 'hash_placeholder',
    serverDisplay: 'hash_placeholder'
};

const userSetIntervalIDs = {
  user_1: 'interval_placeholder',
  user_2: 'interval_placeholder',
  serverDisplay: 'interval_placeholder'
}

const lastDisconnectedSocket = 'user_placeholder';

module.exports = {
  socketIds: socketIds,
  userHashes: userHashes,
  userSetIntervalIDs: userSetIntervalIDs,
  lastDisconnectedSocket: lastDisconnectedSocket
};