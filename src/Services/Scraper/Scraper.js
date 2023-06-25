const SimpleScraper = require('./Modules/SimpleScraper');
const MagazineUniboIT = require("./Sources/magazine.unibo.it");

class Scraper {
    scheduleTask() {
        SimpleScraper.scrap(MagazineUniboIT);
      }
    
    init() {
        this.scheduleTask();
    }
}

module.exports = new Scraper();