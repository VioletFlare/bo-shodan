const AjaxHTMLScraper = require('./Modules/AjaxHTMLScraper.js');
const SimpleScraper = require('./Modules/SimpleScraper.js');
const AjaxJSONScraper = require('./Modules/AjaxJSONScraper.js');

class Scraper {
    _routeScraper(source) {
        if (!source.scraper || source.scraper == 'SimpleScraper') {
            return SimpleScraper.scrap(source);
        } else if (source.scraper == 'AjaxHTML') {
            return AjaxHTMLScraper.scrap(source);
        } else if (source.scraper = 'AjaxJSON') {
            return AjaxJSONScraper.scrap(source);
        }
    }

    scrap(source) {
        if (source) {
            return this._routeScraper(source)
        } else {
            console.error('Error: Missing source.')
        }
    }
}

module.exports = new Scraper();