class Bologna24OreIT {

    constructor() {
        this.url = 'https://www.bologna24ore.it/?s=';
    }

    _getAllArticles($) {
        const allArticles = [];
  
        const $articles = $(".td_module_16.td_module_wrap.td-animation-stack");

        $articles.each((i, article) => {
            const title = $('h3', article).text().replace('\n', '').trim();
            let url = $('h3 a', article).attr('href').replace(/\?.+/, '');
            const description = '';
            let img = $('img', article).attr('src');

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

module.exports = new Bologna24OreIT();