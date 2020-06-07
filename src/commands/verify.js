const fs = require("fs");

module.exports.run = async (client, message, args) => {
    if (!message.guild.me.hasPermission("MANAGE_ROLES", "ADMINISTRATOR")) return message.channel.send("I don't have permissions to give roles");

    let channelId = JSON.parse(fs.readFileSync("./src/db/channel.json"))
    if (!channelId[message.guild.id])
        return message.channel.send("Looks like you havent setup a **Channel**");
    let channelI = channelId[message.guild.id].channelID;
    if (!channelI) return;

    let rolex = JSON.parse(fs.readFileSync("./src/db/role.json", "utf8"))
    if (!rolex[message.guild.id])
        return message.channel.send("looks like you dident setup a **role**");
    let rolename = rolex[message.guild.id].role;
    if (!rolename) return;

    if (message.channel.id === `${channelI}`) {
        const role = message.guild.roles.cache.find(r => r.name === `${rolename}`);
        if (role) {
            try {
                await message.member.roles.add(role);
            } catch (err) {}
        }
        if(message.deletable) {
            await message.delete().catch(err => console.log(err))
        }
    }
}

module.exports.help = {
    name: "verify",
    aliases: ['accept', 'yes']
}