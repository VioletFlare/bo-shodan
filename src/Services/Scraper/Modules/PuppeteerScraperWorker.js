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

    _runPuppeteer(source) {
        const pub = new Connection().start();

        puppeteer.launch({ headless: 'new' }).then(async (browser) => {
            try {
                const page = await browser.newPage();
                await page.setViewport({ width: 800, height: 600 });

                await page.goto(source.url);

                await this._autoScroll(page, 100);

                await page.waitForTimeout(5000);

                const unparsedData = await page.content();

                const $ = cheerio.load(unparsedData);
                const data = source.run($);

                await browser.close();

                pub.publish('PuppeteerScraper::OUT', JSON.stringify(data));
                pub.disconnect();
            } catch (error) {
                await browser.close();
                pub.publish('PuppeteerScraper::OUT', undefined);

                pub.disconnect();
                console.error(error);
            }
        });
    }

    async _autoScroll(page, maxScrolls){
        await page.evaluate(async (maxScrolls) => {
            await new Promise((resolve) => {
                var totalHeight = 0;
                var distance = 500;
                var scrolls = 0;  // scrolls counter
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    scrolls++;  // increment counter
    
                    // stop scrolling if reached the end or the maximum number of scrolls
                    if(totalHeight >= scrollHeight - window.innerHeight || scrolls >= maxScrolls){
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        }, maxScrolls);  // pass maxScrolls to the function
    }
    
    run() {
        const sub = new Connection().start();

        sub.subscribe('PuppeteerScraper::IN', () => {
            process.stdout.write('PuppeteerScraperWorker::Subscribed');
        });

        sub.on('message', (channel, message) => {
            sub.disconnect();

            const sourcePath = JSON.parse(message).path;

            if (sourcePath) {
                import(sourcePath).then(module => {
                    this._runPuppeteer(module.default);
                });
            } else {
                console.error('Source module doesn\'t have a path.')
            }
        });
    }
}

new PuppeteerScraperWorker().run();
