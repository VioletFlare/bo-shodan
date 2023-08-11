const Connection = require('./../../../Redis/Connection');

class PuppeteerScraper {

    _getHome(resolve, source) {
        const client = Connection.start();

        client.then(c => {
            c.subscribe('PuppeteerScraper', (message) => {
                resolve(message);
            });
        })

        const proc = spawn('node', [
            path.resolve(__dirname, 'PuppeteerScraperWorker.js'),
        ], { shell: false });
            
        proc.stderr.on('data', (data) => {
            console.error(`NodeERR: ${data}`);
        });

        proc.on('exit', () => {
            proc.kill();
            Connection.stop();
            resolve(undefined);
        });
    }

    scrap(source) {
        return new Promise((resolve) => {
            this._getHome(resolve, source);
        })
    }

}

module.exports = new PuppeteerScraper();