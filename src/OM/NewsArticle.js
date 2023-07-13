const client = require('./Client');
const { Schema, Entity } = require('redis-om');

class NewsArticle extends Entity {};

const newsArticleSchema = new Schema(NewsArticle, {
    url: { type: 'string' }, 
    img: { type: 'string' }, 
    title: { type: 'text' },
    description: { type: 'text' },
    content: { type: 'text' },
    metaScrapedAtTimestamp: { type: 'date' },
    metaPublishedOnDiscord: { type: 'boolean' }
});

module.exports = client.then(c => {
    const newsArticleRepository = c.fetchRepository(newsArticleSchema);
    newsArticleRepository.createIndex();
    return newsArticleRepository;
});