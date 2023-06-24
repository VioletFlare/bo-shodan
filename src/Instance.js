class Instance {

    constructor(guild, DAL) {
        this.guild = guild;
        this.DAL = DAL;
        this.config = {
            channels: [
                {
                    name: "┋💬・chat",
                },
            ]
        };
    }

    init() {
        //this.DAL.insertGuild(this.guild.id, this.guild.name);
        this._setup();
    }

    _isAllowedChannel(channelname) {
        let isAllowedChannel = false;

        this.config.channels.forEach((channel) => {
            if (channelname.includes(channel.name)) {
                isAllowedChannel = true;
            }
        });

        return isAllowedChannel;
    }

    _setup() {
        this.channel = this.guild.channels.cache.find(
            channel => {
                const isAllowedChannel = this._isAllowedChannel(channel.name);
                const isCorrectChannel = isAllowedChannel && channel.type === "GUILD_TEXT";

                return isCorrectChannel;
            }
        );
    }

    _handleChatInputCommand(interaction) {
        const command = interaction.client.commands.get(interaction.commandName);
    
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
    
        try {
            command.execute(this.DAL, interaction);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
        }
    }

    onInteractionCreate(interaction) {
        if (interaction.type === "APPLICATION_COMMAND") {
            this._handleChatInputCommand(interaction);
        }
    }

    onMessageCreate(msg) {

    }
}

module.exports = Instance;