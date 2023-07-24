class Utils {

    cleanUrl(url) {
        const oldUrl = new URL(url);
        const newUrl = oldUrl.origin + oldUrl.pathname;

        return newUrl;
    }

}