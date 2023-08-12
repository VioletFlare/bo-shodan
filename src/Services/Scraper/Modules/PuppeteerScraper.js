const Connection = require('./../../../Redis/Connection');

const { spawn } = require('child_process');
const path = require('path');

class PuppeteerScraper {

    _getHome(resolve, source) {
        const client = new Connection().start();

        client.then(c => {
            const sub = c.duplicate();
            sub.connect().then(() => { 
                sub.subscribe('PuppeteerScraper::OUT', (message) => {
                    resolve(message);
                    sub.disconnect();
                });
            });
        })

        const proc = spawn('node', [
            path.resolve(__dirname, 'PuppeteerScraperWorker.js'),
        ], { shell: false });
            
        proc.stdout.on('data', data => {
            const decodedData = data.toString('utf8');

            if (decodedData === 'PuppeteerScraperWorker::Subscribed') {
                client.then(c => {
                   c.publish('PuppeteerScraper::IN', JSON.stringify(source));
                })
            }
        })

        proc.stderr.on('data', (data) => {
            console.error(`PuppetterScraperWorker: ${data}`);
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