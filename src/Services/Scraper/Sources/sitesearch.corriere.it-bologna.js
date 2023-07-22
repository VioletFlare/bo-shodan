const CorriereITArticle = require('./corriere.it-article.js');

class CorriereITSiteSearchBologna {
    constructor() {
        this.url = 'https://sitesearch.corriere.it/forward.jsp?q=bologna';
		this.article = CorriereITArticle;
		this.encoding = 'latin1' //ISO-8859-1
    }

    _getSearchResults($) {
        const allSearchResults = [];
        const searchResults = $(
            '.ricerca-web > div:not(#ris-ricerca):not(.more-news-search):not(#loadingDiv):not(#pager-ricerca)'
        );

        searchResults.each((i, result) => {
            const url = $('a', result).attr('href').replace(/\?.+/, '');

			allSearchResults.push({
				url: url
			});
        });

        return allSearchResults;
    }

    run($) {
        const searchResults = this._getSearchResults($);

        return searchResults;
    }
}

module.exports = new CorriereITSiteSearchBologna();
