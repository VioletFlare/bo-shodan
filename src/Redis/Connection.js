const { createClient } = require('redis');
config = require('../../config.js');

class Connection {
    start() {
        if (Object.keys(config).length > 0) {
            const isDev = process.argv.includes('--dev');

            if (isDev) {
                this.client = createClient({ url: config.REDIS_URL_DEV });
            } else {
                this.client = createClient({ url: config.REDIS_URL_PROD });
            }

            this.client.on('error', (err) =>
                console.error('Redis Client Error', err)
            );

            this.promisedClient = new Promise((resolve) => {
                this.client.connect().then(() => {
                    resolve(this.client);
                });
            });
        } else {
            this.promisedClient = new Promise((reject) => 'Empty Config');
        }

        return this.promisedClient;
    }

    stop() {
        if (this.promisedClient) {
            this.promisedClient.then((c) => {
                if (c) c.disconnect();
            });
        }
    }
}

module.exports = Connection;
