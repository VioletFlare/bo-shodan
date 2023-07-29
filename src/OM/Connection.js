const { Client } = require('redis-om');
config = require('../../config.js');


class Connection {

    start() {
        let client;

        if (Object.keys(config).length > 0) {
            const isDev = process.argv.includes("--dev");
            
    
            if (isDev) {
                client = new Client().open(config.REDIS_URL_DEV);
            } else {
                client = new Client().open(config.REDIS_URL_PROD);
            }
        } else {
            client = new Promise((reject) => "Empty Config")
        }

        return client;
    }

}



module.exports = new Connection();