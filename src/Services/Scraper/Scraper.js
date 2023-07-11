const SimpleScraper = require('./Modules/SimpleScraper.js');

class Scraper {
    simpleScrap(source) {
        return SimpleScraper.scrap(source);
    }
}

module.exports = new Scraper();