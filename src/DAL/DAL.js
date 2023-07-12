const newsArticleRepository = require('../OM/NewsArticle.js');

class DAL {

    insertArticle(article) {
        newsArticleRepository.then(nar => {
            article.metaScrapedAtTimestamp = new Date();
            nar.createAndSave(article)
        })
    }

    checkIfArticleExists(url) {
        return newsArticleRepository.then(nar => {
            nar.search().where('url').equals(url).return.count().then((count) => {
                if (!count) {
                    return false;
                } else {
                    return true;
                }
            });
        });
    }

    getArticle() {

    }

}

module.exports = new DAL();