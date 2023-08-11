const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
const cheerio = require('cheerio');
const Connection = require('./../../../Redis/Connection');

class PuppeteerScraperWorker {

    constructor() {
        puppeteer.use(StealthPlugin())
        puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

        this.client = Connection.start();
    }

    run() {
        puppeteer.launch({ headless: "new" }).then(async browser => {
            try {
                const page = await browser.newPage()
                await page.setViewport({ width: 800, height: 600 })
            
                await page.goto(source.url)
                await page.waitForTimeout(5000)

                const unparsedData = await page.content()
                
                const $ = cheerio.load(unparsedData);
                const data = source.run($);

                page.close();
                browser.close();

                this.client.then(c => {
                    c.publish('PuppeteerScraper', data);
                })
            } catch (error) {
                page.close();
                browser.close();
                console.error(error);
            }
        })
    }

}

new PuppeteerScraperWorker().run();

