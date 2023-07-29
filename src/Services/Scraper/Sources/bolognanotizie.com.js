class BolognaNotizieCOM {

    constructor() {
        this.url = 'https://www.bolognanotizie.com/?tipo=ultimora';
        this.resourceUrl = 'https://www.bolognanotizie.com';
    }

    _getAllArticles($) {
        const allArticles = [];
  
        const $articles = $("article > article");

        $articles.each((i, article) => {
            const title = $('h2', article).text().replace('\n', '').trim();
            let url = $('h2 a', article).attr('href').replace(/\?.+/, '');

            url = this.resourceUrl + url;

            const description = $('.text-justify', article).text().replace('\n', '').trim();
            let img = $('img', article).attr('data-src');

            if (!img.includes('https://')) {
                img = 'https:' + img;
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

module.exports = new BolognaNotizieCOM();