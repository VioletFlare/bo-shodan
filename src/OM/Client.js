const { Client } = require('redis-om');
config = require('../../config.js');

const client = new Client().open(config.REDIS_URL);

module.exports = client;