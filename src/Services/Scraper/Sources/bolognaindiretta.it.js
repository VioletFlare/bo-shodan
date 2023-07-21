class AnsaITEmiliaRomagna {

    constructor() {
        this.url = 'https://www.bolognaindiretta.it/';
    }

    _getAllArticles($) {
        const allArticles = [];
  
        const all = $("article");

        const articles = all.filter(`
            :not(#video_tg article):not(#video_sport article)
        `);

        articles.each((i, article) => {
            let title = $('h2', article).text().replace('\n', '').trim();

            if (!title) {
                title = $('h3', article).text().replace('\n', '').trim();
            }

            const url = $('a', article).attr('href');
            const description = $('.text', article).text().replace('\n', '').trim();
            const img = $('img', article).attr('src');

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