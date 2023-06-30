const axios = require("axios");
const cheerio = require("cheerio");
const UserAgent = require('user-agents');

class SimpleScraper {
  _makeRequest(resolve, source, config) {
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

  scrap(source, config) {
    return new Promise(resolve => {
		this._makeRequest(resolve, source, config)
    }).then()
  }
}

module.exports = new SimpleScraper();
