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
            },
            'bolognaindiretta.it': {
                color: '#c9081d',
                name: 'Bolognaindiretta'
            },
            'repubblica.it': {
                color: '#000000',
                name: 'la Repubblica'
            },
            'virgilio.it': {
                color: '#e74b18',
                name: 'Notizie Virgilio'
            },
            'gazzettadibologna.it': {
                color: '#878787',
                name: 'Gazzetta di Bologna'
            },
            'metronews.it': {
                color: '#FFFFFF',
                name: 'Metronews'
            },
            'bolognanotizie.com': {
                color: '#FADA5E',
                name: 'BOLOGNA NOTIZIE'
            },
            'bologna24ore.it': {
                color: '#4ea9ba',
                name: 'BOLOGNA 24 ORE'
            },
            'comune.bologna.it': {
                color: '#b01736',
                name: 'Comune di Bologna'
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
                color: '#FFFFFF'
            }
        }

        return property;
    }

}

module.exports = new EmbedProperties();