const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
const cheerio = require('cheerio');
const Connection = require('./../../../Redis/Connection');

class PuppeteerScraperWorker {

    constructor() {
        puppeteer.use(StealthPlugin())
        puppeteer.use(AdblockerPlugin({ blockTrackers: true }))
    }

    run() {
        this.client = new Connection().start();

        this.client.then(c => {
            const sub = c.duplicate();

            sub.connect().then(() => {
                sub.subscribe('PuppeteerScraper::IN', (source) => {
                    this.source = JSON.parse(source);
    
                    puppeteer.launch({ headless: "new" }).then(async browser => {
                        try {
                            const page = await browser.newPage()
                            await page.setViewport({ width: 800, height: 600 })
                        
                            await page.goto(this.source.url)
                            await page.waitForTimeout(5000)
            
                            const unparsedData = await page.content()
                            
                            const $ = cheerio.load(unparsedData);
                            const data = this.source.run($);
            
                            browser.close();
            
                            this.client.then(c => {
                                c.connect().then(() => {
                                    c.publish('PuppeteerScraper::OUT', data);
                                })
                                
                                c.disconnect();
                            })
                        } catch (error) {
                            browser.close();
                            console.error(error);
                        }
                    })
                });

                process.stdout.write('PuppeteerScraperWorker::Subscribed');
            })
        });
    }

}

new PuppeteerScraperWorker().run();

