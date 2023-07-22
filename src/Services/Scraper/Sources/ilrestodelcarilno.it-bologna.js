const srcsetParse = require('srcset-parse').default;

class IlRestoDelCarlinoITBologna {

    constructor() {
        this.url = 'https://www.ilrestodelcarlino.it/bologna'
    }

    _getAllArticles($) {
        const allArticles = [];
        const articles = $('article');

        articles.each((i, article) => {
            const url = $('h3 a', article).attr('href').replace(/\?.+/, '');

            const srcset = $('img', article).attr('srcset');

            let img = '';

            if (srcset) {
                const parsedSrcset = srcsetParse(srcset)

                if (parsedSrcset.length) {
                    img = parsedSrcset[0].url;
                }
            }

            const title = $('h3 a', article).text().replace('\n', '');
            const description = $('div:nth-child(1) > div:nth-child(2) p', article).text();

            allArticles.push({
                url, img, title, description
            })
        });

        return allArticles;
    }

    run($) {
        return this._getAllArticles($);
    }

}

module.exports = new IlRestoDelCarlinoITBologna();