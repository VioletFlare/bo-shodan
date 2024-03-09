const NewsEmbed = require('../Embeds/NewsEmbed');

class NewsPublisher {
    
    constructor(config, channel, $B) {
        this.config = config;
        this.channel = channel;
        this.$B = $B;
    }

    start() {
        this.$B.on("Engine::PublishArticle", (article) => {
            this._sendNewsEmbed(article);
        })
    }

    _sendNewsEmbed(article) {
        const model = {
            channel: this.channel,
            url: article.url,
            description: article.description,
            img: article.img,
            title: article.title,
            tags: article.tags
        };

        NewsEmbed.send(model).catch(err => {
            console.error(err)
        }).then(url => {
            this.$B.emit("NewsPublisher::ArticlePublished", url);
        }).catch(err => {
            console.error(err)
        });
    }

}

module.exports = NewsPublisher;