const monk = require('monk');

const db = monk('localhost/chat-web');

module.exports = db;

