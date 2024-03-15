const LocalizerData = require('../Data/LocalizerData');

class ArticleContextAnalyzer {

    constructor(config) {
        this.config = this._initConfiguration(config);
    }

    _shouldRun(url) {
        this.isLocalizerEnabled = this._isEnabledFor('localizer', url);

        return this.isLocalizerEnabled;
    }

    _initConfiguration(config) {
        const ACAConfig = {};

        if (config?.NewsConfig?.plugins?.localizer) {
            ACAConfig.localizer = config.NewsConfig.plugins.localizer;
        } else {
            ACAConfig.localizer = {
                sites: []
            };
        }

        return ACAConfig;
    }

    _isEnabledFor(pluginName, url) {
        const key = this.config[pluginName].sites.find(site => url.includes(site));
        const isEnabled = key ? true : false;

        return isEnabled;
    }

    _extractContext(article) {
        const title = article.title.toLowerCase();
        const description = article.description.toLowerCase();
        let tags = "";

        article.tags.forEach(tag => {
            tags += tag.toLowerCase() + " ";
        });

        const context = title + " " + description + " " + tags;

        return context;
    }

    _shouldBeLocalize

    _run(articles) {
        const filteredArticles = [];

        if (this.isLocalizerEnabled) {
            articles.forEach((article) => {
                let isValid = false;

                const context = this._extractContext(article);

                LocalizerData.some(localizerValue => {
                    isValid = context.includes(localizerValue);

                    if (isValid) {
                        return true;
                    }
                })

                if (isValid) {
                    filteredArticles.push(article);
                }
            });
        };

        return filteredArticles;
    }

run(sourceUrl, articles) {
    const shouldRun = this._shouldRun(sourceUrl);

    if (shouldRun) {
        const filteredArticles = this._run(articles);

        return filteredArticles;
    } else {
        return articles;
    }
}

}

module.exports = ArticleContextAnalyzer;