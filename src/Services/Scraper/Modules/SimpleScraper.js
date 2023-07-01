const axios = require("axios");
const cheerio = require("cheerio");
const UserAgent = require('user-agents');

class SimpleScraper {
  _getHome(resolve, source) {
	const userAgent = new UserAgent({ deviceCategory: 'mobile' }).toString();

	axios
	.get(source.url, { headers: { 'User-Agent': userAgent } })
	.then((response) => {
	  const $ = cheerio.load(response.data);
	  const data = source.run($);
	  resolve(data);
	})
	.catch((error) => {
	  console.error(error);
	});
  }

  _getArticle(resolve, source, articleData) {
	const userAgent = new UserAgent({ deviceCategory: 'mobile' }).toString();

	axios
	.get(source.url, { headers: { 'User-Agent': userAgent } })
	.then((response) => {
	  const $ = cheerio.load(response.data);
	  const data = source.run($);

	  const newData = {...data, ...articleData};

	  resolve(newData);
	})
	.catch((error) => {
	  console.error(error);
	});
  }

  scrap(source) {
    return new Promise(resolve => {
		this._getHome(resolve, source);
    }).then(homeData => {
		if (source.article) {
			const promises = [];

			homeData.forEach(articleData => {
				promises.push(new Promise(resolve => {
					this._getArticle(resolve, new source.article(articleData.url), articleData);
				}));
			});

			return Promise.all(promises);

		} else {
			return homeData;
		}
	})
  }
}

module.exports = new SimpleScraper();
