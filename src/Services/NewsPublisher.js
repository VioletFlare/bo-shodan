const NewsEmbed = require('../Embeds/NewsEmbed');

class NewsPublisher {
    
    constructor(channelFinder, $B) {
        this.channelFinder = channelFinder;
        this.$B = $B;
    }

    start() {
        this.defaultChannel = this.channelFinder.find(this.channelFinder.config.NewsConfig.channel);
        this.hotChannel = this.channelFinder.find(this.channelFinder.config.HotConfig.channel);

        if (!this.defaultChannel) {
            console.error("NewsPublisher couldn't find the default channel.")
        } else if (!this.hotChannel) {
            console.error("NewsPublisher couldn't find the hot channel.")
        } else {
            this.$B.on("Engine::PublishArticle", (article) => {
                this._sendNewsEmbed(article);
            })
        }

    }

    _sendNewsEmbed(article) {
        let channel = this.defaultChannel;

        if (article.metaIsHot) {
            channel = this.hotChannel;
        }

        const model = {
            channel: channel,
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