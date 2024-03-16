const SourcesIndex = require('./src/Services/Scraper/SourcesIndex');

module.exports = {
    NewsConfig: {
        channel: "┋📰・notizie",
        sources: [
            SourcesIndex.AnsaITEmiliaRomagna,
        ],
        plugins: {
            localizer: {
                sites: [
                    'ansa.it',
                    'rainews.it'
                ]
            },
        },
        skipSchedule: true
    },
    HotConfig: {
        channel: "┋🔥・hot"
    }
};