const LocalizerData = require('../Data/LocalizerData');

class Localizer {

    constructor() {
        this.sites = [
            'ansa.it',
            'rainews.it'
        ]
    }

    _isEnabledFor(url) {
        const key = this.sites.find(site => url.includes(site));
        const isEnabled = key ? true : false;

        return isEnabled;
    }

    _run(articles) {
        const localizedArticles = [];

        articles.forEach((article) => {
            let isValid = false;

            ///code for selecting articles
            const splittedTitle = article.title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(" ");
            const splittedDescription = article.description.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(" ");
            let splittedTags = [];

            article.tags.forEach(tag => {
                const splittedTag = tag.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(" ");

                splittedTags = splittedTags.concat(splittedTag);
            });

            const sum = splittedTitle.concat(splittedDescription).concat(splittedTags);

            isValid = sum.some(value => {
                const found = LocalizerData.find((localizerValue) => value.toLowerCase().includes(localizerValue));

                if (found) {
                    return true;
                }
            })

            if (isValid) {
                localizedArticles.push(article);
            }
        });

        return localizedArticles;
    }

    run(sourceUrl, articles) {
        const isEnabledFor = this._isEnabledFor(sourceUrl);

        if (isEnabledFor) {
            const localizedArticles = this._run(articles);

            return localizedArticles;
        } else {
            return articles;
        }
    }

}

module.exports = new Localizer();