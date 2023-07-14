const path = require('path');
const fs = require('fs');
const Discord = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

class CommandsInitializer {

    constructor(config, client, isDev) {
        this.Discord = Discord;
        this.config = config;
        this.client = client;
        this.client.commands = new Discord.Collection();
        this.isDev = isDev;
        this.token = "";
        this.clientId = "";
    }

    registerCommands(guildId) {
        const commands = [];
        // Grab all the command files from the commands directory you created earlier
        const commandsPath = path.join(__dirname, 'Commands');

        if (fs.existsSync([commandsPath])) {
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

            // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
    
                commands.push(command.data.toJSON());
            }
    
            // Construct and prepare an instance of the REST module
            const rest = new REST({ version: '10' }).setToken(this.token);
    
            // and deploy your commands!
            try {
                console.log(`Started refreshing ${commands.length} application (/) commands.`);
    
                // The put method is used to fully refresh all commands in the guild with the current set
                rest.put(
                    Routes.applicationGuildCommands(this.clientId, guildId),
                    { body: commands },
                ).then(data => {
                    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
                });
    
            } catch (error) {
                // And of course, make sure you catch and log any errors!
                console.error(error);
            }
        }
    }

    _setup() {
        if (this.isDev) {
            this.token = this.config.TOKEN_DEV;
            this.clientId = this.config.CLIENT_ID_DEV;
        } else {
            this.token = this.config.TOKEN_PROD;
            this.clientId = this.config.CLIENT_ID_PROD;
        }
    }

    _injectCommandsIntoClient() {
        const commandsPath = path.join(__dirname, 'Commands');

        if (fs.existsSync([commandsPath])) {
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                // Set a new item in the Collection with the key as the command name and the value as the exported module
                if ('data' in command && 'execute' in command) {
                    this.client.commands.set(command.data.name, command);
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            }
        }
    }

    init() {
        this._setup();
        this._injectCommandsIntoClient();
    }

}

module.exports = CommandsInitializer;