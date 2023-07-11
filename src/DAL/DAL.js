const newsArticleRepository = require('../OM/NewsArticle.js');

class DAL {

    insertArticle(article) {
        article.metaScrapedAtTimestamp = new Date();
        newsArticleRepository.then(nar => nar.createAndSave(article));
    }

    getArticle() {

    }

}

module.exports = new DAL();