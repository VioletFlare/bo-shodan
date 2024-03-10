const SourcesIndex = require('./src/Services/Scraper/SourcesIndex');

module.exports = {
    NewsConfig: {
        channel: "┋📰・notizie",
        sources: [
            SourcesIndex.RainewsITHome,
        ],
        skipSchedule: true
    }
};