const { pathToFileURL } = require('url');

class RainewsITHome {

    constructor() {
        this.scraper = "Puppeteer";
        this.url = 'https://www.rainews.it';
        this.path = pathToFileURL(__filename).href;
    }

    _shortenTitle(title) {
      let shortenedTitle = title;

      if (title > 256) {
        shortenedTitle = title.substring(0, 253) + '...';
      }

      return shortenedTitle;
    }

    _getAllArticles($) {
        const allArticles = [];

        $('.launch-item--articolo').each((i, article) => {
            const url = this.url + $('h3 a:first-child', article).attr('href');
            const img = this.url + $('img', article).data('src');
            let title = $('h3 a:first-child', article).text().trim().replace('\n', '');
            const description = $('.launch-item__text', article).text().trim().replace('\n', '');
      
            title = this._shortenTitle(title);

            allArticles.push({
              url, img, title, description
            })
          });

        return allArticles;
    }

    _getAllVideoArticles($) {
        const allArticles = [];

        $('.launch-item--video').each((i, article) => {
            const url = $(article).attr('href').replace(/\?.+/, '');
            const img = $('img', article).attr('src');
            let title = $('h2', article).text().trim().replace('\n', '');
            const description = $('.occhiello', article).text().trim().replace('\n', '');
      
            title = this._shortenTitle(title);

            otherMainPosts.push({
              url, img, title, description
            })
          });

        return allArticles;
    }

    run($) {
        const allArticles = this._getAllArticles($);

        return allArticles;
    }
}

module.exports = new RainewsITHome();