const Connection = require('./../../../Redis/Connection');

const { spawn } = require('child_process');
const path = require('path');

class PuppeteerScraper {

    _getHome(resolve, source) {
        const sub = new Connection().start();
        const pub = new Connection().start();

        sub.subscribe('PuppeteerScraper::OUT');

        sub.on("message", (message) => {
            resolve(message);
            sub.disconnect();
        });

        const proc = spawn('node', [
            path.resolve(__dirname, 'PuppeteerScraperWorker.js'),
        ], { shell: true });
            
        proc.stdout.on('data', data => {
            const decodedData = data.toString('utf8');

            if (decodedData === 'PuppeteerScraperWorker::Subscribed') {
                pub.publish('PuppeteerScraper::IN', JSON.stringify(source));
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