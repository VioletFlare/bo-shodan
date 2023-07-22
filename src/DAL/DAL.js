const newsArticleRepository = require('../OM/NewsArticle.js');

class DAL {

    insertArticle(article) {
        return newsArticleRepository.then(nar => {
            article.metaScrapedAtTimestamp = new Date();
            article.metaPublishedOnDiscord = false;
            return nar.createAndSave(article)
        })
    }

    checkIfArticleExists(url) {
        return newsArticleRepository.then(nar => {
            return nar.search().where('url').equals(url).return.count().then((count) => {
                if (!count) {
                    return false;
                } else {
                    return true;
                }
            });
        });
    }

    markArticlePublished(url) {
        newsArticleRepository.then(nar => {
            nar.search().where('url').equals(url).all().then((articles) => {
                articles.forEach(article => {
                    article.metaPublishedOnDiscord = true;
                    nar.save(article);
                });
            });
        });
    }

    getUnpublishedArticles() {
        return newsArticleRepository.then(nar => {
            return nar.search().where('metaPublishedOnDiscord').equals(false).return.all();
        });
    }
}

module.exports = new DAL();