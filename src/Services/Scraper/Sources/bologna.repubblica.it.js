const srcsetParse = require('srcset-parse').default;

class BolognaRepubblicaIT {

    constructor() {
        this.url = 'https://bologna.repubblica.it/';
    }

    _getAllArticles($) {
        const allArticles = [];
  
        const all = $("article");

        const articles = all.filter(`
            :not(.box-bom article):not(gdwc-recommendations article):not(.widget-sponsor--container article)
        `);

        articles.each((i, article) => {
            let url = $('a', article).attr('href').replace(/\?/, '');
            const title = $('h2', article).text().replace('\n', '').trim();
            const description = $('.entry__summary', article).text().replace('\n', '').trim();
            let img = $('img', article).attr('src');

            if (!img) {
                img = $('img', article).attr('data-src');
            }

            if (!img) {
                img = '';
            }

            if (img && !img.includes('https://') || img.includes('gelestatic')) {
                img = 'https:' + img;
            } else {
                img = '';
            }

            allArticles.push({
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

module.exports = new BolognaRepubblicaIT();