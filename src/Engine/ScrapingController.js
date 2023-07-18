const Scraper = require("../Services/Scraper/Scraper.js");
const SourcesIndex = require("../Services/Scraper/SourcesIndex.js");
const CronJob = require("cron").CronJob;
const CronParser = require('cron-parser');

class ScrapingController {

    constructor($B, DAL) {
        this.$B = $B;
        this.DAL = DAL;
    }

    _handleResponse(response) {
        response.forEach(article => {
            if (article) {
                this.DAL.checkIfArticleExists(article.url).then(articleExists => {
                    if (!articleExists) {
                        this.DAL.insertArticle(article);
                        this.$B.emit('Engine::PublishArticle', article);
                    }
                });
            }
        });
    }
  
    _runJob(self, source, response) {
      self.stop();

      if (response) {
        this._handleResponse(response);
      }
      
      this.$B.emit('Engine::ScheduleScraping', source);
    }
  
    _handle(self, source) {
      Scraper.simpleScrap(source).then(
          (response) => this._runJob(self, source, response)
      );
    }

    _getRandomArbitraryInteger(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
  
    _scheduleScraping(source) {
        const second = this._getRandomArbitraryInteger(1, 60);
        const minute = this._getRandomArbitraryInteger(1, 60);
        const pattern = `*/${second} */${minute} * * * *`;
    
        const cronJob = new CronJob(
            pattern,
            () => this._handle(cronJob, source),
            null,
            true,
            "Europe/Rome"
        )

        const interval = CronParser.parseExpression(cronJob.cronTime);
        const runTime = new Date(interval.next()).toLocaleString("it-IT");

        console.log('Scraping scheduled for: ' + source.url + ' at ' + runTime);
    }
  

    _setEvents() {
        this.$B.on('Engine::ScheduleScraping', (source) => {
            this._scheduleScraping(source);
        });
    }

    init() {
        this._setEvents();
        //this._handle(new CronJob('* * * * * *'), SourcesIndex.BolognaTodayITHome);
        this._scheduleScraping(SourcesIndex.MagazineUniboITHome);
        this._scheduleScraping(SourcesIndex.AnsaITEmiliaRomagna);
        this._scheduleScraping(SourcesIndex.BolognaTodayITHome);
        this._scheduleScraping(SourcesIndex.IlRestoDelCarlinoITBologna);
        this._scheduleScraping(SourcesIndex.CorriereITSiteSearchBologna);
        this._handle(new CronJob('* * * * * *'), SourcesIndex.BolognaInDirettaIT);
    }
}

module.exports = ScrapingController;