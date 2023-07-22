class NotizieVirgilioITBologna {
    constructor() {
        this.url = 'https://notizie.virgilio.it/tag/bologna/';
    }

    _getSearchResults($) {
        const allSearchResults = [];
        const $articles = $('.lista_lanci_wide article')

        $articles.each((i, article) => {
            const url = $('a:first-child', article).attr('href').replace(/\?.+/, '');
            let img = $('img', article).attr('src');

            if (img.includes('ph_lazyload.jpg')) {
                img = $('img', article).attr('data-original');
            }

            const title = $('h2', article).text();
            const description = $('> p', article).text();

			allSearchResults.push({
				url, img, title, description
			});
        });

        return allSearchResults;
    }

    run($) {
        const searchResults = this._getSearchResults($);

        return searchResults;
    }
}

module.exports = new NotizieVirgilioITBologna();
