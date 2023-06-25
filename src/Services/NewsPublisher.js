class NewsPublisher {
    
    constructor(config, channel, $B) {
        this.config = config;
        this.channel = channel;
        this.$B = $B;
    }

    start() {
        this.$B.on("Engine::SendArticle", () => {
            this._sendNewsEmbed();
        })
    }

    _sendNewsEmbed() {
        const model = {
            channel: this.channel
        };

        NewsEmbed.send(model);
    }

}

module.exports = NewsPublisher;