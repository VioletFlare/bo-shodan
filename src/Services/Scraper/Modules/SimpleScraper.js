const axios = require("axios");
const cheerio = require("cheerio");

class SimpleScraper {
  scrap(source) {
    axios
      .get(source.url)
      .then((response) => {
        const $ = cheerio.load(response.data);
        source.run($);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

module.exports = new SimpleScraper();
