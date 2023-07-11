const newsArticleRepository = require('../OM/NewsArticle.js');

class DAL {

    insertArticle(article) {
        newsArticleRepository.then(nar => nar.createAndSave(article))
    }

    getArticle() {

    }

}