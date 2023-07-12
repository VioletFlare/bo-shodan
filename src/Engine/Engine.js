const Scraper = require("../Services/Scraper/Scraper.js");
const SourcesIndex = require("../Services/Scraper/SourcesIndex.js");
const CronJob = require("cron").CronJob;
const DAL = require('../DAL/DAL.js');

class Engine {
  constructor($B) {
    this.$B = $B;
    this.jobs = [];
  }

  _runJob(self, source, response) {
    self.stop();

    response.forEach(article => {
      DAL.checkIfArticleExists(article.url).then(articleExists => {
        if (!articleExists) {
          DAL.insertArticle(article);
        }
      });
    });
    
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

    this.jobs.push(cronJob);
  }

  init() {
	if (this.$B) {
		this.$B.on('Engine::ScheduleScraping', (source) => {
			this._scheduleScraping(source);
		})
	} else {
		console.warn('WARN: Message bus is not present. Scraping will not be scheduled.')
	}

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
