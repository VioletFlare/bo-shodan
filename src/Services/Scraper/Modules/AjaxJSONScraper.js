const axios = require('axios');
const Utils = require('./Utils');

class AjaxJSONScraper {
    _getHome(resolve, source) {
        const userAgent = Utils.getUserAgent(source);

        axios
            .post(source.url, source.payload, {
                headers: { 
                    'User-Agent': userAgent, 
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer',
                responseEncoding: 'binary'
            })
            .then((response) => {
				const unparsedData = Utils.decodeResponse(response.data, source);

                const $ = JSON.parse(unparsedData);
                const data = source.run($);

                resolve(data);
            })
            .catch((error) => {
                Utils.logError(error, source);
                resolve(undefined);
            });
    }

    scrap(source) {
        return new Promise((resolve) => {
            this._getHome(resolve, source);
        })
    }
}

module.exports = new AjaxJSONScraper();