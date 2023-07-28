const proxyquire = require('proxyquire');
const DALStub = require('./DALStub');
const RedisOM = require('./RedisOM');
const Scraper = proxyquire("../src/Services/Scraper/Scraper.js", { 'SimpleScraper': { 'DAL': { DALStub, 'NewsArticle': { 'Client': { 'redis-om': RedisOM } } } } });
const SourcesIndex = require('../src/Services/Scraper/SourcesIndex.js');

class Scraping {

	constructor() {
		this.source = SourcesIndex.MetroNewsITAjaxHTMLBologna
	}

	run() {
		Scraper.scrap(this.source).then(
			console.log
		);
	}

}

module.exports = new Scraping();