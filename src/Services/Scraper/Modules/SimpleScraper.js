const axios = require("axios");
const cheerio = require("cheerio");

class SimpleScraper {
  scrap(source) {
    return new Promise(resolve => {
      axios
      .get(source.url)
      .then((response) => {
        const $ = cheerio.load(response.data);
        const data = source.run($);
        ressolve(data);
      })
      .catch((error) => {
        console.error(error);
      });
    })
  }
}

module.exports = new SimpleScraper();
