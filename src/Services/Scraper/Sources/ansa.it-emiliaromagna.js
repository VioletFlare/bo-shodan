const srcsetParse = require('srcset-parse').default;

class AnsaITEmiliaRomagna {

    constructor() {
        this.url = 'https://www.ansa.it/emiliaromagna';
        this.resourceUrl = 'https://www.ansa.it';
    }

    _getAllArticles($) {
        const allArticles = [];
  
        const all = $(".article-teaser");

        const articles = all.filter(`
            :not(.section-articles-stripe-video .article-teaser),
            :not(#ultima-ora .article-teaser), 
            :not(.section-promo-articles .article-teaser)
        `);

        articles.each((i, article) => {
            const url = this.resourceUrl + $('.title a', article).attr('href').replace(/\?.+/, '');
            const title = $('.title a', article).text().replace('\n', '').trim();
            const description = $('.summary', article).text().replace('\n', '').trim();
            const srcset = $('img', article).attr('srcset');

            let img = '';

            if (srcset) {
                const parsedSrcset = srcsetParse(srcset)

                if (parsedSrcset.length) {
                    img = this.resourceUrl + parsedSrcset[0].url;
                }
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

module.exports = new AnsaITEmiliaRomagna();