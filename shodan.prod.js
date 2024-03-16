const SourcesIndex = require('./src/Services/Scraper/SourcesIndex');

module.exports = {
    NewsConfig: {
        channel: "┋📰・notizie",
        sources: [
            SourcesIndex.MagazineUniboITHome,
            SourcesIndex.AnsaITEmiliaRomagna,
            SourcesIndex.BolognaTodayITHome,
            SourcesIndex.IlRestoDelCarlinoITBologna,
            SourcesIndex.CorriereITSiteSearchBologna,
            SourcesIndex.BolognaInDirettaIT,
            SourcesIndex.BolognaRepubblicaIT,
            SourcesIndex.NotizieVirgilioITBologna,
            SourcesIndex.GazzettaDiBolognaITViewAll,
            SourcesIndex.MetroNewsITAjaxHTMLBologna,
            SourcesIndex.BolognaNotizieCOM,
            SourcesIndex.Bologna24OreIT,
            SourcesIndex.ComuneBolognaITAjaxJson,
            SourcesIndex.RainewsITHome
        ],
        plugins: {
            localizer: {
                sites: [
                    'ansa.it',
                    'rainews.it'
                ]
            },
        },
        skipSchedule: false
    },
    HotConfig: {
        channel: "┋🔥・hot"
    }
};