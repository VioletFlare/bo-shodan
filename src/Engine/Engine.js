const PublishingController = require('./PublishingController');
const ScrapingController = require('./ScrapingController');

class Engine {
  constructor(config, $B, DAL) {
    this.config = config;
    this.$B = $B;
    this.DAL = DAL;  
  }

  init() {
    if (this.$B && this.DAL) {
      new PublishingController(this.$B, this.DAL).init();
      new ScrapingController(this.config, this.$B, this.DAL).init();
    } else {
      console.warn('WARN: Message bus is not present. Scraping will not be scheduled.')
    }
  }
}

module.exports = Engine;
