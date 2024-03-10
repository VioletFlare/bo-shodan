const NewsEmbed = require('../Embeds/NewsEmbed');

class NewsPublisher {
    
    constructor(channelFinder, $B) {
        this.channelFinder = channelFinder;
        this.$B = $B;
    }

    start() {
        this.channel = this.channelFinder.find(this.channelFinder.config.NewsConfig.channel);

        if (this.channel) {
            this.$B.on("Engine::PublishArticle", (article) => {
                this._sendNewsEmbed(article);
            })
        } else {
            console.error("NewsPublisher couldn't start, channel not found.")
        }
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