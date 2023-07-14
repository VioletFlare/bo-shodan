const Scraper = require("./Services/Scraper/Scraper.js");
const EventEmitter = require('events');
const Engine = require('./Engine/Engine.js');
const NewsPublisher = require('./Services/NewsPublisher.js');
const DAL = require('./DAL/DAL.js');

class Instance {

    constructor(guild, DAL) {
        this.guild = guild;
        this.DAL = DAL;
        this.config = {
            channels: [
                {
                    name: "┋📰・news",
                },
            ]
        };
        this.$B = new EventEmitter(); 
    }

    init() {
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

    _startServices() {
        new NewsPublisher(this.config, this.channel, this.$B).start();
    }

    _setup() {
        this.channel = this.guild.channels.cache.find(
            channel => {
                const isAllowedChannel = this._isAllowedChannel(channel.name);
                const isCorrectChannel = isAllowedChannel && channel.type === 0;

                return isCorrectChannel;
            }
        );

        this._startServices();

        this.engine = new Engine(this.$B, DAL);
        this.engine.init();
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