const { InteractionType} = require("discord.js");
const { readdirSync } = require("fs");

const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

//////////////////////////////////////////////////////////////////////////////////

 module.exports = {
	name: 'interactionCreate',

  run: async(interaction) => {

//////////////////////////////////////////////////////////////////////////////////

	for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        if(interaction.commandName.toLowerCase() === command.data.name.toLowerCase()) {
        command.run(client, interaction)
    }
	}
  }}

//////////////////////////////////////////////////////////////////////////////////