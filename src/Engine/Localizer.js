class Localizer {

    constructor() {
        this.sites = [
            'ansa.it'
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
            ///code for selecting articles
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