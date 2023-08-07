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
			(response) => {
				response.forEach(data => {
					if (data.url && data.title) {
						console.log("OK", data.url)
					} else {
						console.error("Missing URL or TITLE", {
							url: data.url,
							title: data.title
						})
					}
				})
			}
		);
	}

}

module.exports = new Scraping();