class EmbedProperties {

    constructor() {
        this.knownSites = {
            'bolognatoday.it': {
                color: '#F2463D',
                name: 'BolognaToday'
            },
            'ansa.it': {
                color: '#34b233',
                name: 'Ansa'
            },
            'corriere.it': {
                color: '#0A5278',
                name: 'Corriere della Sera'
            },
            'ilrestodelcarlino.it': {
                color: '#005ac7',
                name: 'il Resto del Carlino'
            },
            'magazine.unibo.it': {
                color: '#EA0C01',
                name: 'UNIBO MAGAZINE'
            }

        }
    }

    getProperty(url) {
        const knownSites = Object.keys(this.knownSites);
        const key = knownSites.find(site => url.includes(site));

        let property;

        if (this.knownSites[key]) {
            property = this.knownSites[key];
        } else {
            property = {
                name: 'Articolo',
                color: '#000000'
            }
        }

        return property;
    }

}

module.exports = new EmbedProperties();