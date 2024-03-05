class GazzettaDiBolognaITViewAll {

    constructor() {
        this.url = "https://gazzettadibologna.it/?s=";
    }

    _getAllArticles($) {
        const allArticles = [];
        const $articles = $('article');

        $articles.each((i, article) => {
            const url = $('h2 a', article).attr('href').replace(/\?.+/, '');
            const tags = [];

            const img = $('img', article).attr('src');

            const title = $('h2', article).text().replace('\n', '');
            const description = $('.entry-content p', article).text().replace('\n', '');

            allArticles.push({
                url, img, title, description, tags
            })
        });

        const $asideArticles = $('aside .single-article')

        $asideArticles.each((i, article) => {
            const url = $('h3 a', article).attr('href').replace(/\?.+/, '');
            const tags = [];

            const img = $('img', article).attr('src');

            const title = $('h3', article).text().replace('\n', '');
            let description = $('.entry-content p', article).text().replace('\n', '');

            if (!description) {
                description = '';
            }

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


module.exports = new GazzettaDiBolognaITViewAll();