const Redis = require("ioredis");
config = require('../../config.js');

class Connection {
    start() {
        if (Object.keys(config).length > 0) {
            const isDev = process.argv.includes('--dev');

            if (isDev) {
                this.client = new Redis(config.REDIS_URL_DEV);
            } else {
                this.client = new Redis(config.REDIS_URL_PROD);
            }

        } else {
            this.client = new Promise((resolve, reject) => resolve('Empty Config'));
        }

        return this.client;
    }

    stop() {
        if (this.client) {
            this.client.disconnect();
        }
    }
}

module.exports = Connection;
