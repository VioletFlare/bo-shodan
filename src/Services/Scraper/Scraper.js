const SimpleScraper = require('./Modules/SimpleScraper');

class Scraper {
    simpleScrap(source) {
        return SimpleScraper.scrap(source);
    }
}

module.exports = new Scraper();