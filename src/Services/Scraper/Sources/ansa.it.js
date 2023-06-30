const Scraper = require('../Scraper');
const AnsaITArticle = require('./ansa.it-article');

class AnsaITHome {
	constructor() {
		this.url = 'https://www.ansa.it';
		this.article = AnsaITArticle;
	}

	_getMainPost($) {
		const url = this.url + $('.big-container h3 a').attr('href');
		const img = this.url + $('.big-container .pp-img > a img').attr('src');
		const title = $('.big-container h3 a').text();
		const description = $('.big-container .pp-abs p').text();

		const article = Scraper.simpleScrap(new AnsaITArticle(url));
	}

	run($) {
		const mainPost = this._getMainPost($);
	}
}

module.exports = new AnsaITHome();