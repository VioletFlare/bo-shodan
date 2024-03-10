class BolognaTodayITHome {

    constructor() {
        this.url = 'https://www.bolognatoday.it';
    }

    _getAllArticles($) {
        const allArticles = [];
        const all = $('article');

        const articles = all.filter(":not([data-theme='today'] article)")
                            .filter(":not([data-section-key='header-list-5'] article)")
                            .filter(":not([data-section-key='special-focus-single-1'] article)")
                            .filter("article:not(.c-story--editorial)");

        articles.each((i, article) => {
            let href = $('.o-link-text', article).attr('href').replace(/\?.+/, '');
            let url = '';
            let kicker = $('.c-story__kicker:not(.o-dot)', article).text().replace('\n', '').trim();
            const tags = [kicker];

            if (href.indexOf('//') === 0) {
                url = 'https:' + href;
            } else {    
                url = this.url + href;
            }

            let imgUrl =  $('.c-story__media source', article).attr('srcset');

            if (!imgUrl) {
                imgUrl = $('.c-story__media img', article).attr('src');
            }
            
            let img = '';

            const shouldCompleteUrl = imgUrl && !imgUrl.includes('https://');

            if (shouldCompleteUrl) {
                img = 'https:' + imgUrl;
            } else if (imgUrl) {
                img = imgUrl;
            }

            let title = $('.c-story__content h1', article).text().replace('\n', '').trim();

            if (!title) {
                title = $('.c-story__header h1', article).text().replace('\n', '').trim();
            }

            const description = $('.c-story__summary', article).text().replace('\n', '').trim();

            allArticles.push({
                url, img, title, description, tags
            });
        });

        return allArticles;
    }

    run($) {
        const allArticles = this._getAllArticles($);

        return allArticles;
    }

}

module.exports = new BolognaTodayITHome();