const proxyquire = require('proxyquire');
const SimpleScraper = proxyquire('../src/Services/Scraper/Modules/SimpleScraper', { './../../../DAL/DAL.js': {
	checkIfArticleExists: (url) => new Promise(resolve => resolve(false))
}})
const Scraper = proxyquire("../src/Services/Scraper/Scraper.js", { './Modules/SimpleScraper.js': SimpleScraper } );
const SourcesIndex = require('../src/Services/Scraper/SourcesIndex.js');

class Scraping {

	constructor() {
		this.source = SourcesIndex.CorriereITSiteSearchBologna
	}

	run() {
		Scraper.scrap(this.source).then(
			(response) => console.log(JSON.stringify(response))
		);
	}

}

module.exports = new Scraping();