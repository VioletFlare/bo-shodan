//behind cloudflare, detects puppeteer

class OpenOnlineBologna {
    
    constructor() {
        this.scraper = 'Puppeteer'
        this.url = 'https://www.open.online/?s=bologna'
    }

    _getSearchResults($) {
        console.log($);
    }

    run($) {
        const searchResults = this._getSearchResults($);

        return searchResults;
    }

}

module.exports = new OpenOnlineBologna();