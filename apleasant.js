const { props, Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const config = require("./asettings.json");
const İntentler = Object.values(GatewayIntentBits);
const Partialsxd31 = Object.values(Partials);
const client = new Client({
    intents: İntentler,
    allowedMentions: {
        parse: ["users"]
    },
    partials: Partialsxd31,
    retryLimit: 3
});


const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const rest = new REST({ version: '10' }).setToken(config.token);
const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };


////////////////////////////////////////////////////////////////////////////
const { readdirSync } = require("fs");
const commands = [];
client.commands = [];

for(let commandName of readdirSync("./commands")) {
	if(!commandName.endsWith(".js")) return;

	const command = require(`./commands/${commandName}`);	
	client.commands.push({
		name: command.name.toLowerCase(),
		description: command.description.toLowerCase(),
		options: command.options,
		dm_permission: false,
		type: 1
	});

	console.log(`[+] ${commandName} komutu başarıyla yüklendi.`)
}

////////////////////////////////////////////////////////////////////////////

for(let eventName of readdirSync("./events")) {
	if(!eventName.endsWith(".js")) return;

	const event = require(`./events/${eventName}`);	
	const evenet_name = eventName.split(".")[0];

	client.on(event.name, (...args) => {
		event.run(client, ...args)
	});

	console.log(`[+] ${eventName} eventi başarıyla yüklendi.`)
}

////////////////////////////////////////////////////////////////////////////

client.on("ready", async () => {
    try {
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );
    } catch (error) {
        console.error(error);
    }
log(`${client.user.username} Adlı Bot Aktif Edildi!`);
})


client.login(config.token)