const { createClient } = require('redis');
config = require('../../config.js');

class Connection {
    start() {
        if (Object.keys(config).length > 0) {
            const isDev = process.argv.includes("--dev");
            
            if (isDev) {
                this.client = createClient(config.REDIS_URL_DEV);
            } else {
                this.client = createClient(config.REDIS_URL_PROD);
            }

            this.client.on('error', err => console.error('Redis Client Error', err));

            this.client = client.connect();
        } else {
            this.client = new Promise((reject) => "Empty Config")
        }

        return this.client;
    }

    stop() {
        if (this.client) {
            this.client.then(c => {
                if (c) c.disconnect();
            })
        }
    }

}

module.exports = new Connection();