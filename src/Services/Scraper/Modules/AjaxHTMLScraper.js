const axios = require('axios');
const cheerio = require('cheerio');
const Utils = require('./Utils');

class AjaxHTMLScraper {
    
    _getHome(resolve, source) {
        const userAgent = Utils.getUserAgent(source);

        axios
            .post(source.url, source.formData, {
                headers: { 
                    'User-Agent': userAgent, 
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'arraybuffer',
                responseEncoding: 'binary'
            })
            .then((response) => {
				const unparsedData = Utils.decodeResponse(response.data, source);

                const $ = cheerio.load(unparsedData);
                const data = source.run($);

                resolve(data);
            })
            .catch((error) => {
                console.error(error);
                resolve(undefined);
            });
    }

    scrap(source) {
        return new Promise((resolve) => {
            this._getHome(resolve, source);
        })
    }

}

module.exports = new AjaxHTMLScraper();