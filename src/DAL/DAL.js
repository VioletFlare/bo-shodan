const newsArticleRepository = require('../OM/NewsArticle.js');

class DAL {

    insertArticle(article) {
        article.metaScrapedAtTimestamp = new Date();

        newsArticleRepository.then(nar => {
            nar.search().where('url').equals(article.url).return.count().then((count) => {
                if (!count) {
                    nar.createAndSave(article)
                }
            });
        });
    }

    getArticle() {

    }

}

module.exports = new DAL();