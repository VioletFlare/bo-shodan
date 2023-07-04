class CorriereITSiteSearchBologna {

    constructor() {
        this.url = 'https://sitesearch.corriere.it/forward.jsp?q=bologna'
    }

    _getSearchResults($) {
       const searchResults = $(".ricerca-web > div:not(#ris-ricerca):not(.more-news-search):not(#loadingDiv):not(#pager-ricerca)");

       searchResults.each((i, result) => {
            const url = $('a', result).attr('href');
       })

       return {
        url: url
       }
    }

    run($) {
        const searchResults = this._getSearchResults($);

        return searchResults;
    }

}

module.exports = new CorriereITSiteSearchBologna();