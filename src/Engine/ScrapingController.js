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
            this.DAL.checkIfArticleExists(article.url).then(articleExists => {
                if (!articleExists) {
                    this.DAL.insertArticle(article);
                    this.$B.emit('Engine::PublishArticle', article);
                }
            });
        });
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
        //this._scheduleScraping(SourcesIndex.AnsaITHome);
        //this._scheduleScraping(SourcesIndex.AnsaITEmiliaRomagna);
        this._scheduleScraping(SourcesIndex.BolognaTodayITHome);
        this._scheduleScraping(SourcesIndex.IlRestoDelCarlinoITBologna);
        this._scheduleScraping(SourcesIndex.CorriereITSiteSearchBologna);
    }
}

module.exports = ScrapingController;