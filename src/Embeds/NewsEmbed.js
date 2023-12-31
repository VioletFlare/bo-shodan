const { EmbedBuilder } = require('discord.js');
const NewsEmbedProperties = require('./NewsEmbedProperties');

class NewsEmbed {

    send(model) {
        const embed = new EmbedBuilder();

        if (model.title && model.url) {
            const property = NewsEmbedProperties.getProperty(model.url);

            embed.setAuthor({ name: property.name })
                 .setTitle(model.title)
                 .setURL(model.url)
                 .setColor(property.color)
        }

        if (model.description) {
            try {
                embed.setDescription(model.description)
            } catch (e) {
                console.error('Setting Description Error: ', e);
            }
        }
        
        if (model.img) {
            embed.setImage(model.img)
        }
        
        const embedContainer = { 
            embeds: [embed],
        };

        return model.channel.send(embedContainer).catch(
            error => console.error(error)
        ).then(() => {
            return model.url;
        }).catch(err => {
            console.error(err);
        });
    }

}

module.exports = new NewsEmbed();