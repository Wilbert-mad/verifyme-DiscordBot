const PREFIX = '?';
const { readFileSync } = require('fs')
module.exports = async (client, message) => {
	if (message.author.bot || message.channel.type === 'dm') return;
	const { guild } = message;
	let prefixs = JSON.parse(readFileSync('./src/db/prefixs.json', 'utf8'));
	if (!prefixs[guild.id]) { prefixs[guild.id] = { prefixs: PREFIX }; };
	let prefix = prefixs[guild.id].prefixs;
	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);

	if (command.startsWith(prefix)) {
		let cmd = client.commands.get(command.slice(prefix.length)) ||
			client.commands.get(client.aliases.get(command.slice(prefix.length)));
		if (cmd) cmd.run(client, message, args);
	};

	let channelId = JSON.parse(readFileSync('./src/db/channel.json', 'utf8'));
	if (!channelId[guild.id]) return;
	let channelI = channelId[guild.id].channelID;
	if (!channelI) return;

	if (message.channel.id === channelI) {
		if (message.author.bot) await message.delete({ timeout: 10000 });
		else {
			try { if (message.deletable) await message.delete({ timeout: 10 }); }
			catch (err) { console.error(err) }
		}
	}
}