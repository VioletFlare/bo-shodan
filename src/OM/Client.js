const { Client } = require('redis-om');
config = require('../../config.js');

const isDev = process.argv.includes("--dev");
let client;

if (isDev) {
    client = new Client().open(config.REDIS_URL_DEV);
} else {
    client = new Client().open(config.REDIS_URL_PROD);
}

module.exports = client;