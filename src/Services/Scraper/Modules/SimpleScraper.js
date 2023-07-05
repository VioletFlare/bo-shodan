const axios = require('axios');
const cheerio = require('cheerio');
const UserAgent = require('user-agents');
const iconv = require('iconv-lite');

class SimpleScraper {
    _getHome(resolve, source) {
        const userAgent = new UserAgent({
            deviceCategory: 'mobile'
        }).toString();

        axios
            .get(source.url, {
                headers: { 'User-Agent': userAgent },
                responseType: 'arraybuffer',
                responseEncoding: 'binary'
            })
            .then((response) => {
				let unparsedData;

				if (source.encoding) {
					unparsedData = iconv.decode(response.data, source.encoding);
				} else {
					unparsedData = iconv.decode(response.data, 'utf8');
				}

                const $ = cheerio.load(unparsedData);
                const data = source.run($);

                resolve(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _getArticle(resolve, source, articleData) {
        const userAgent = new UserAgent({
            deviceCategory: 'mobile'
        }).toString();

        axios
            .get(source.url, {
                headers: { 'User-Agent': userAgent },
                responseType: 'arraybuffer',
                responseEncoding: 'binary'
            })
            .then((response) => {
				let unparsedData;

				if (source.encoding) {
					unparsedData = iconv.decode(response.data, source.encoding);
				} else {
					unparsedData = iconv.decode(response.data, 'utf8');
				}

                const $ = cheerio.load(unparsedData);
                const data = source.run($);

                const newData = { ...data, ...articleData };

                resolve(newData);
            })
            .catch((error) => {
                console.error(error);
            });
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
