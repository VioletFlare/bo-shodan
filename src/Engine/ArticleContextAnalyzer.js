const LocalizerData = require('../Data/LocalizerData');
const { HotThemes, HotThemesWords } = require('../Data/HotThemesData');

class ArticleContextAnalyzer {

    constructor(config) {
        this.config = this._initConfiguration(config);
    }

    _shouldLocalize(url) {
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

        const normal = title + " " + description + " " + tags;
        const splitted = normal.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(" ");

        return { normal, splitted };
    }

    _isLocal(context) {
        let isLocal = false;

        LocalizerData.some(localizerValue => {
            isLocal = context.normal.includes(localizerValue);

            if (isLocal) {
                return true;
            }
        })
        
        return isLocal;
    }

    _isHot(context) {
        let isHot = false;

        HotThemes.some(hotTheme => {
            isHot = context.normal.includes(hotTheme);

            if (isHot) {
                return true;
            }
        })

        if (!isHot) {
            HotThemesWords.some(hotThemeWord => {
                isHot = context.splitted.includes(hotThemeWord);

                if (isHot) {
                    return true;
                }
            })
        }

        return isHot;
    }

    _run(articles, options) {
        const modifiedArticles = [];
        
        articles.forEach((article) => {
            const context = this._extractContext(article);
            const isLocal = this._isLocal(context) || !options.shouldLocalize;
            const isHot = this._isHot(context);

            if (isLocal) {
                article.metaIsHot = isHot;

                modifiedArticles.push(article)
            }
        });

        return modifiedArticles;
    }

    run(sourceUrl, articles) {
        const options = {
            shouldLocalize: this._shouldLocalize(sourceUrl)
        };

        const modifiedArticles = this._run(articles, options);

        return modifiedArticles;
    }

}

module.exports = ArticleContextAnalyzer;