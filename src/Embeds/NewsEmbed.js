const { EmbedBuilder } = require('discord.js');

class NewsEmbed {

    send(model) {
        const embed = new EmbedBuilder()
            .setColor('#000000')
            .setTitle(model.title)
            .setURL(model.url)

        if (model.description) {
            embed.setDescription(model.description)
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
        });
    }

}

module.exports = new NewsEmbed();