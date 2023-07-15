const axios = require('axios');
const cheerio = require('cheerio');
const UserAgent = require('user-agents');
const iconv = require('iconv-lite');
const DAL = require('./../../../DAL/DAL.js');

class SimpleScraper {
    _getUserAgent(source) {
        let device = 'mobile';
        
        if (source.device) {
            device = source.device;
        }

        const userAgent = new UserAgent({
            deviceCategory: device
        }).toString();

        return userAgent;
    }

    _decodeResponse(encodedData, source) {
        let decodedData;

        if (source.encoding) {
            decodedData = iconv.decode(encodedData, source.encoding);
        } else {
            decodedData = iconv.decode(encodedData, 'utf8');
        }

        return decodedData;
    }

    _getHome(resolve, source) {
        const userAgent = this._getUserAgent(source);

        axios
            .get(source.url, {
                headers: { 'User-Agent': userAgent },
                responseType: 'arraybuffer',
                responseEncoding: 'binary'
            })
            .then((response) => {
				const unparsedData = this._decodeResponse(response.data, source);

                const $ = cheerio.load(unparsedData);
                const data = source.run($);

                resolve(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _getArticle(resolve, source, articleData) {
        const userAgent = this._getUserAgent(source);

        DAL.checkIfArticleExists(articleData.url).then((articleExists) => {
            if (!articleExists) {
                axios
                    .get(source.url, {
                        headers: { 'User-Agent': userAgent },
                        responseType: 'arraybuffer',
                        responseEncoding: 'binary'
                    })
                    .then((response) => {
                        const unparsedData = this._decodeResponse(response.data, source);
        
                        const $ = cheerio.load(unparsedData);
                        const data = source.run($);
        
                        const newData = { ...data, ...articleData };
        
                        resolve(newData);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                resolve(articleData);
            }
        })

    }

    scrap(source) {
        return new Promise((resolve) => {
            this._getHome(resolve, source);
        }).then((homeData) => {
            if (source.article) {
                const promises = [];

                homeData.forEach((articleData) => {
                    promises.push(
                        new Promise((resolve) => {
                            this._getArticle(
                                resolve,
                                new source.article(articleData.url),
                                articleData
                            );
                        })
                    );
                });

                return Promise.all(promises);
            } else {
                return homeData;
            }
        });
    }
}

module.exports = new SimpleScraper();
