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
        const splittedTitle = article.title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(" ");
        const splittedDescription = article.description.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(" ");
        let splittedTags = [];

        article.tags.forEach(tag => {
            const splittedTag = tag.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(" ");

            splittedTags = splittedTags.concat(splittedTag);
        });

        const context = splittedTitle.concat(splittedDescription).concat(splittedTags);

        return context;
    }

    _shouldBeLocalize

    _run(articles) {
        const filteredArticles = [];

        if (this.isLocalizerEnabled) {
            articles.forEach((article) => {
                let isValid = false;

                const context = this._extractContext(article);

                isValid = context.some(value => {
                    let found = false;

                    found = LocalizerData.find((localizerValue) => value.toLowerCase().includes(localizerValue));

                    if (found) {
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