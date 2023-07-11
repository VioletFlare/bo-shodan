const { Client, Entity } = require('redis-om');
const config = require('../../config.js');

const client = new Client().open(config.REDIS_URL);

module.exports = client;