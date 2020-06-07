const PREFIX = '?';
const fs = require("fs")

module.exports = async (client, message) => {
	let channelId = JSON.parse(fs.readFileSync("./src/db/channel.json", "utf8"))
	if (!channelId[message.guild.id]) return;
	let channelI = channelId[message.guild.id].channelID;
	if (!channelI) return;

	if (message.channel.id === `${channelI}`) {
		if (message.author.bot) {
			await message.delete({ timeout: 10000 }).catch()
		} else {
			try {
				await message.delete({ timeout: 9 }).catch()
			} catch (err) {}
		}
	}
	if (message.author.bot || message.channel.type === "dm") return;
	let prefixs = JSON.parse(fs.readFileSync("./src/db/prefixs.json", "utf8"))
	if (!prefixs[message.guild.id]) {
		prefixs[message.guild.id] = {
			prefixs: PREFIX
		};
	}
	let prefix = prefixs[message.guild.id].prefixs;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	if (!cmd.startsWith(prefix)) return;
	let cdm = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
	if (cdm) cdm.run(client, message, args);
}