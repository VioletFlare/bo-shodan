class BolognaTodayITHome {

    constructor() {
        this.url = 'https://www.bolognatoday.it';
    }

    _getAllArticles($) {
        const allArticles = [];
        const articles = $('article');

        articles.each((i, article) => {
            const url = this.url + $('.o-link-text', article).attr('href');

            const imgUrl =  $('.c-story__media source', article).attr('srcset');
            
            let img = '';

            if (imgUrl && !imgUrl.includes('https://')) {
                const img = 'https:' + imgUrl;
            } else {
                img = imgUrl;
            }

            const title = $('.c-story__content h1', article).text().replace('\n', '').trim();
            const description = $('.c-story__summary', article).text().replace('\n', '').trim();

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

module.exports = new BolognaTodayITHome();