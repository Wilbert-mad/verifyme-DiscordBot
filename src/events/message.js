const PREFIX = "?";
const { readFileSync } = require("fs")

module.exports = async (client, message) => {
	if (message.channel.type === "dm") return;
	const { guild } = message;
	let prefixs = JSON.parse(readFileSync("./src/db/prefixs.json", "utf8"));
	if (!prefixs[guild.id]) {
		prefixs[guild.id] = {
			prefixs: PREFIX
		};
	}
	let prefix = prefixs[guild.id].prefixs;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	
	if (cmd.startsWith(prefix)) {
		let cdm = client.commands.get(cmd.slice(prefix.length)) || 
		client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
		if (cdm) cdm.run(client, message, args);
	};

	let channelId = JSON.parse(readFileSync("./src/db/channel.json", "utf8"));
	if (!channelId[guild.id]) return;
	let channelI = channelId[guild.id].channelID;
	if (!channelI) return;

	if (message.channel.id === `${channelI}`) {
		if (message.author.bot) {
			await message.delete({ timeout: 10000 });
		} else {
			try {
				if (message.deletable) {
					await message.delete({ timeout: 10 });
				}
			} catch (err) {console.error(err)}
		}
	}
}