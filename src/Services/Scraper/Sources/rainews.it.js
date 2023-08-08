class RainewsITHome {

    constructor() {
        this.scraper = "Puppeteer";
        this.url = 'https://www.rainews.it';
    }

    _getAllArticles($) {
        const allArticles = [];

        $('.launch-item--articolo').each((i, article) => {
            const url = this.url + $('h3 a:first-child', article).attr('href');
            const img = this.url + $('img', article).data('src');
            const title = $('h3 a:first-child', article).text().trim().replace('\n', '');
            const description = $('.launch-item__text', article).text().trim().replace('\n', '');
      
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
            const title = $('h2', article).text().trim().replace('\n', '');
            const description = $('.occhiello', article).text().trim().replace('\n', '');
      
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