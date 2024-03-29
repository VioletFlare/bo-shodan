const srcsetParse = require('srcset-parse').default;
const Utils = require('./../Modules/Utils');

class BolognaRepubblicaIT {

    constructor() {
        this.url = 'https://bologna.repubblica.it/';
    }

    _getAllArticles($) {
        const allArticles = [];

        const $articles = $(".is-hard-news article") 

        if (!$articles.length) {
            console.error("BolognaRepubblicaIT: Couldn't scrape any articles. Should probably check that.")
        }

        $articles.each((i, article) => {
            let url = Utils.cleanUrl($('a', article).attr('href'));
            const title = $('h2', article).text().replace('\n', '').trim();
            const description = $('.entry__summary', article).text().replace('\n', '').trim();
            let img = $('img', article).attr('src');
            const tags = [];

            if (!img) {
                img = $('img', article).attr('data-src');
            }

            if (!img) {
                img = '';
            }

            if (img.includes('gelestatic')) {
                img = img.replace(/^.+(?=https:\/\/)/, '');
            }

            if (img && !img.includes('https://')) {
                img = 'https:' + img;
            }

            allArticles.push({
                url, img, title, description, tags
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