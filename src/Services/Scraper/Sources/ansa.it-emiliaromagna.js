class AnsaITEmiliaRomagna {

    constructor() {
        this.url = 'https://www.ansa.it/emiliaromagna';
        this.resourceUrl = 'https://www.ansa.it';
    }

    _getAllArticles($) {
        const allArticles = [];
        const articles = $('article');

        articles.each((i, el) => {
            const url = this.resourceUrl + $('h3 a', el).attr('href');

            const $imgEl = $('img', el);
            const imgDataSrc = $imgEl.data('src');

            let img;

            const title = $('h3', el).text().replace('\n', '').trim();

            if (imgDataSrc) {
                img = this.resourceUrl + imgDataSrc;
            } else if ($imgEl.attr('src')) {
                img = this.resourceUrl + $imgEl.attr('src');
            } else {
                img = '';
            }

            let description = $('.pp-abs p', el).text();

            if (!description) {
                description = $('.pp-abs', el).text();
            }

            description = description.trim();
    
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