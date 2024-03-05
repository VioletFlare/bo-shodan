class Localizer {

    constructor() {
        this.sites = [
            'ansa.it'
        ]
    }

    isEnabledFor(url) {
        const key = this.sites.find(site => url.includes(site));
        const isEnabled = key ? true : false;

        return isEnabled;
    }

}