const axios = require('axios');
const cheerio = require('cheerio');
const Utils = require('./Utils');

const DAL = require('./../../../DAL/DAL.js');

class SimpleScraper {


    _getHome(resolve, source) {
        const userAgent = Utils.getUserAgent(source);

        axios
            .get(source.url, {
                headers: { 'User-Agent': userAgent },
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
                Utils.logError(error, source);
                resolve(undefined);
            });
    }

    _getArticle(resolve, source, articleData) {
        const userAgent = Utils.getUserAgent(source);

        DAL.checkIfArticleExists(articleData.url).then((articleExists) => {
            if (!articleExists) {
                axios
                    .get(source.url, {
                        headers: { 'User-Agent': userAgent },
                        responseType: 'arraybuffer',
                        responseEncoding: 'binary'
                    })
                    .then((response) => {
                        const unparsedData = Utils.decodeResponse(response.data, source);
        
                        const $ = cheerio.load(unparsedData);
                        const data = source.run($);
        
                        const newData = { ...data, ...articleData };
        
                        resolve(newData);
                    })
                    .catch((error) => {
                        Utils.logError(error, source);
                        resolve(undefined)
                    });
            } else {
                articleData.metaExistsInDb = true;
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
