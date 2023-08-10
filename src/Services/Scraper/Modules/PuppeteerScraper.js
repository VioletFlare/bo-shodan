const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
const cheerio = require('cheerio');

class PuppeteerScraper {

    _getHome(resolve, source) {
        puppeteer.launch({ headless: "new" }).then(async browser => {
            try {
                const page = await browser.newPage()
                await page.setViewport({ width: 800, height: 600 })
              
                await page.goto(source.url)
                await page.waitForTimeout(5000)
    
                const unparsedData = await page.content()
                
                const $ = cheerio.load(unparsedData);
                const data = source.run($);

                browser.close();

                resolve(data);
            } catch (error) {
                browser.close();
                console.error(error);
            }
          })
    }

    scrap(source) {
        puppeteer.use(StealthPlugin())
        puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

        return new Promise((resolve) => {
            this._getHome(resolve, source);
        })
    }

}

module.exports = new PuppeteerScraper();