require("dotenv").config();
const { Client, Collection } = require("discord.js");
const client = new Client();
const { commands, events } = require("./utils/regestry");
client.commands = new Collection();
client.aliases = new Collection();
client.logger = require('./utils/logger');
client.channel = require("./db/channel.json");
client.roles = require("./db/role.json");
(async () => {
	await events(client);
	await commands(client);
	await client.login(process.env.BOT_TOKEN);
})();
