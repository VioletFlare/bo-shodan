const srcsetParse = require('srcset-parse').default;

class IlRestoDelCarlinoITBologna {

    constructor() {
        this.url = 'https://www.ilrestodelcarlino.it/bologna'
    }

    _getAllArticles($) {
        const allArticles = [];
        const $mainArticles = $('[class*="Homepage_container"] > div > section[class*="vaschetta"] article');
        const $sidecar = $('[class*="sidecar__main"] article');

        if (!$mainArticles.length) {
            console.error("IlRestoDelCarlinoITBologna: Couldn't scrape main articles. Should probably check that.")
        } 

        if (!$sidecar.length) {
            console.error("IlRestoDelCarlinoITBologna: Couldn't scrape sidecar articles. Should probably check that.")
        }

        const articles = $mainArticles.add($sidecar);

        articles.each((i, article) => {
            const url = $('h3 a', article).attr('href').replace(/\?.+/, '');
            const category = $('.card__category', article).text().replace('\n', '').trim();
            const tags = [category];
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
                url, img, title, description, tags
            })
        });

        return allArticles;
    }

    run($) {
        return this._getAllArticles($);
    }

}

module.exports = new IlRestoDelCarlinoITBologna();