class ChannelFinder {

    constructor(config, guild) {
        this.config = config;
        this.guild = guild;
    }

    _isAllowedChannel(guildChannel, configChannel) {
        let isAllowedChannel = false;

        if (guildChannel === configChannel) {
            isAllowedChannel = true;
        }

        return isAllowedChannel;
    }

    find(configChannel) {
        const foundChannel = this.guild.channels.cache.find(
            channel => {
                const isAllowedChannel = this._isAllowedChannel(channel.name, configChannel);
                const isCorrectChannel = isAllowedChannel && channel.type === 0;

                return isCorrectChannel;
            }
        );

        if (!foundChannel) {
            console.error(`Couldn\'t find the configured "${configChannel}" channel to write to on the server.`);
        }

        return foundChannel;
    }

}

module.exports = ChannelFinder;