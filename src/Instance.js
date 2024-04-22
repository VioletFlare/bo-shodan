const EventEmitter = require('events');
const Engine = require('./Engine/Engine.js');
const NewsPublisher = require('./Services/NewsPublisher.js');
const DAL = require('./DAL/DAL.js');
const ChannelFinder = require('./ChannelFinder.js');

const ConfigDev = require('../shodan.dev.js');
const ConfigProd = require('../shodan.prod.js');

class Instance {

    constructor(guild, DAL) {
        this.guild = guild;
        this.DAL = DAL;
        this.isDev = process.argv.includes("--dev");

        if (this.isDev) {
            this.config = ConfigDev;
        } else {
            this.config = ConfigProd;
        }

        this.$B = new EventEmitter(); 
        this.channelFinder = new ChannelFinder(this.config, this.guild);
    }

    init() {
        this._setup();
    }

    _startServices() {
        new NewsPublisher(this.channelFinder, this.$B).start();
    }

    _setup() {
        this._startServices();

        this.engine = new Engine(this.config, this.$B, DAL);
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