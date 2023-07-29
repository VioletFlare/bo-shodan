const proxyquire = require('proxyquire');
const DALStub = require('./DALStub');
const Scraper = proxyquire("../src/Services/Scraper/Scraper.js", { 'SimpleScraper': { './../../../DAL/DAL.js': DALStub } } );
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