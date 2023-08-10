const UserAgent = require('user-agents');
const iconv = require('iconv-lite');

class Utils {

    cleanUrl(url) {
        const oldUrl = new URL(url);
        const newUrl = oldUrl.origin + oldUrl.pathname;

        return newUrl;
    }

    getUserAgent(source) {
        let device = 'mobile';
        
        if (source.device) {
            device = source.device;
        }

        const userAgent = new UserAgent({
            deviceCategory: device
        }).toString();

        return userAgent;
    }

    decodeResponse(encodedData, source) {
        let decodedData;

        if (source.encoding) {
            decodedData = iconv.decode(encodedData, source.encoding);
        } else {
            decodedData = iconv.decode(encodedData, 'utf8');
        }

        return decodedData;
    }

    logError(error) {
        if (error.response.status === 403) {
            console.error('Error 403: ', source.url);
        } else if (error.response.status === 429) {
            console.error('Error 429: ', source.url);
        } else {
            console.error(error);
        }
    }

}

module.exports = new Utils();