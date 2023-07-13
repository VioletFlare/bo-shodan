const Scraper = require("../Services/Scraper/Scraper.js");
const SourcesIndex = require("../Services/Scraper/SourcesIndex.js");
const CronJob = require("cron").CronJob;

class Engine {
  constructor($B, DAL) {
    this.$B = $B;
    this.DAL = DAL;
    this.overdueArticlesToPublish = {};
    this.isPublishing = false;
  }

  _handleResponse(response) {
    if (this.DAL) {
      response.forEach(article => {
        this.DAL.checkIfArticleExists(article.url).then(articleExists => {
          if (!articleExists) {
            this.DAL.insertArticle(article);
            this.$B.emit('Engine::PublishArticle', article);
          }
        });
      });
    }
  }

  _runJob(self, source, response) {
    self.stop();
    this._handleResponse(response);
    this.$B.emit('Engine::ScheduleScraping', source);
  }

  _handle(self, source) {
    Scraper.simpleScrap(source).then(
        (response) => this._runJob(self, source, response)
    );
  }

  _scheduleScraping(source) {
    const second = Math.floor(Math.random() * 60);
    const minute = Math.floor(Math.random() * 60);
    const pattern = `${second} ${minute} * * * *`;

    const cronJob = new CronJob(
        pattern,
        () => this._handle(cronJob, source),
        null,
        true,
        "Europe/Rome"
      )
  }

  _initArticlesToPublish() {
    if (this.DAL) {
      this.DAL.getUnpublishedArticles().then(articles => {
        articles.forEach(article => {
          this.overdueArticlesToPublish[article.url] = article;
        })

        areThereOverdueArticles = Object.keys(this.overdueArticlesToPublish).length > 0;
  
        if (areThereOverdueArticles) {
          this.$B.emit('Engine::PublishOverdueArticlesStart');
        }
      });
    }
  }

  _setEvents() {
    if (this.$B) {
      this.$B.on('Engine::ScheduleScraping', (source) => {
        this._scheduleScraping(source);
      })

      this.$B.on('Engine::PublishOverdueArticlesStart', () => {
          Object.keys(this.overdueArticlesToPublish).forEach(url => {
            this.$B.emit('Engine::PublishArticle', this.overdueArticlesToPublish[url]);
          })
      })

      this.$B.on('NewsPublisher::ArticlePublished', (url) => {
        if (this.overdueArticlesToPublish[url]) {
          delete this.overdueArticlesToPublish[url];
        }
      });
    } else {
      console.warn('WARN: Message bus is not present. Scraping will not be scheduled.')
    }
  }

  init() {
    this._setEvents();
    this._initArticlesToPublish();
    //this._handle(new CronJob('* * * * * *'), SourcesIndex.BolognaTodayITHome);
    this._scheduleScraping(SourcesIndex.MagazineUniboITHome);
    //this._scheduleScraping(SourcesIndex.AnsaITHome);
    //this._scheduleScraping(SourcesIndex.AnsaITEmiliaRomagna);
    this._scheduleScraping(SourcesIndex.BolognaTodayITHome);
    this._scheduleScraping(SourcesIndex.IlRestoDelCarlinoITBologna);
    this._scheduleScraping(SourcesIndex.CorriereITSiteSearchBologna);
    this._handle(new CronJob('* * * * * *'), SourcesIndex.BolognaTodayITHome);


    /*
      Detects simple scraping attempts:
      SourcesIndex.RainewsITHome
    */
  }
}

module.exports = Engine;
