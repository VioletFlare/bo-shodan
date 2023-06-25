const SimpleScraper = require('./Modules/SimpleScraper');
const MagazineUniboIT = require("./Sources/magazine.unibo.it");

class Scraper {
    simpleScrap(source) {
        return SimpleScraper.scrap(source);
    }
    
    start() {
        this.simpleScrap(MagazineUniboIT);
    }
}

module.exports = new Scraper();