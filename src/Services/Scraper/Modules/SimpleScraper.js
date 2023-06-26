const axios = require("axios");
const cheerio = require("cheerio");
const UserAgent = require('user-agents');

class SimpleScraper {
  scrap(source) {
    const userAgent = new UserAgent({ deviceCategory: 'mobile' }).toString();

    return new Promise(resolve => {
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
    })
  }
}

module.exports = new SimpleScraper();
