const Scraper = require("../Services/Scraper/Scraper.js");
const SourcesIndex = require("../Services/Scraper/SourcesIndex.js");
const CronJob = require("cron").CronJob;
const CronParser = require('cron-parser');
const ArticleContextAnalyzer = require('./ArticleContextAnalyzer.js');

class ScrapingController {

    constructor(config, $B, DAL) {
        this.config = config;
        this.$B = $B;
        this.DAL = DAL;
    }

    _attemptArticleInsertion(article) {
        this.DAL.checkIfArticleExists(article.url).then(articleExists => {
            if (!articleExists) {
                this.DAL.insertArticle(article).then((response) => {
                    this.$B.emit('Engine::PublishArticle', article);
                });
            }
        });
    }

    _handleResponse(response) {
        response.forEach(article => {
            if (!article.metaExistsInDb) {
                if (article?.url && article?.title) {
                    this._attemptArticleInsertion(article);
                } else {
                    console.error(`Couldn't attempt to insert article. Missing URL or Title: \n ${JSON.stringify(article)}`)
                }
            }
        });
    }

    _runJob(source, response) {
        if (response) {
            const filteredResponse = new ArticleContextAnalyzer(this.config).run(source.url, response)
            this._handleResponse(filteredResponse);
        }

        this.$B.emit('Engine::ScheduleScraping', source);
    }

    _handle(self, source) {
        self.stop();

        Scraper.scrap(source).then(
            (response) => this._runJob(source, response)
        );
    }

    _getRandomArbitraryInteger(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    _scheduleScraping(source) {
        const second = this._getRandomArbitraryInteger(5, 60);
        const minute = this._getRandomArbitraryInteger(5, 60);
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
        
        this.config.NewsConfig.sources.forEach(source => {
            if (!this.config.NewsConfig.skipSchedule) {
                this._scheduleScraping(source);
            } else {
                this._handle(new CronJob('* * * * * *'), source);
            }
        });

        if (!this.config.NewsConfig.sources.length) {
            console.error("Warning: sources in config empty!")
        }
    }
}

module.exports = ScrapingController;