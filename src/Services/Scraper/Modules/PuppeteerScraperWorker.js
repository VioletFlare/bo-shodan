const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const cheerio = require('cheerio');
const Connection = require('./../../../Redis/Connection');

class PuppeteerScraperWorker {
    constructor() {
        puppeteer.use(StealthPlugin());
        puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
    }

    run() {
        const sub = new Connection().start();
        const pub = new Connection().start();

        sub.subscribe('PuppeteerScraper::IN');

        sub.on('message', (source) => {
            sub.disconnect();
            this.source = JSON.parse(source);
        
            puppeteer.launch({ headless: 'new' }).then(async (browser) => {
                try {
                    const page = await browser.newPage();
                    await page.setViewport({ width: 800, height: 600 });

                    await page.goto(this.source.url);
                    await page.waitForTimeout(5000);

                    const unparsedData = await page.content();

                    const $ = cheerio.load(unparsedData);
                    const data = this.source.run($);

                    browser.close();

                    pub.publish('PuppeteerScraper::OUT', data);
                    pub.disconnect();

                } catch (error) {
                    browser.close();
                    console.error(error);
                }
            });
        });

        process.stdout.write('PuppeteerScraperWorker::Subscribed');
    }
}

new PuppeteerScraperWorker().run();
