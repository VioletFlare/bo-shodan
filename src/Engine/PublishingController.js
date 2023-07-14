class PublishingController {

    constructor($B, DAL) {
        this.$B = $B;
        this.DAL = DAL;
        this.overdueArticlesToPublish = {};
    }

    _initArticlesToPublish() {
        if (this.DAL) {
          this.DAL.getUnpublishedArticles().then(articles => {
            articles.forEach(article => {
              this.overdueArticlesToPublish[article.url] = article;
            })
    
            const areThereOverdueArticles = Object.keys(this.overdueArticlesToPublish).length > 0;
      
            if (areThereOverdueArticles) {
              this.$B.emit('Engine::PublishOverdueArticlesStart');
            }
          });
        }
      }

    _setEvents() {
        this.$B.on('Engine::PublishOverdueArticlesStart', () => {
            Object.keys(this.overdueArticlesToPublish).forEach(url => {
              this.$B.emit('Engine::PublishArticle', this.overdueArticlesToPublish[url]);
            })
        })
  
        this.$B.on('NewsPublisher::ArticlePublished', (url) => {
          if (this.overdueArticlesToPublish[url]) {
            delete this.overdueArticlesToPublish[url];
            this.DAL.markArticlePublished(url);
          }
        })
    }

    init() {
        this._setEvents();
        this._initArticlesToPublish();
    }

}

module.exports = PublishingController;