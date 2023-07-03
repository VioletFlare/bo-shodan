const Scraper = require("../Services/Scraper/Scraper");
const SourcesIndex = require("../Services/Scraper/SourcesIndex");
const CronJob = require("cron").CronJob;

class Engine {
  constructor($B) {
    this.$B = $B;
    this.jobs = [];
  }

  _runJob(self, source, response) {
    self.stop();

    this._scheduleScraping(source);
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
    //this._handle(new CronJob('* * * * * *'), SourcesIndex.BolognaTodayITHome);
    this._scheduleScraping(SourcesIndex.MagazineUniboITHome);
    this._scheduleScraping(SourcesIndex.AnsaITHome);
    this._scheduleScraping(SourcesIndex.BolognaTodayITHome);
    this._handle(new CronJob('* * * * * *'), SourcesIndex.IlRestoDelCarlinoITBologna);
  }
}

module.exports = Engine;
