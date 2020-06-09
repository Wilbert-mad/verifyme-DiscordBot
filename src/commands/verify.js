const fs = require("fs");

module.exports.run = async (client, message, args) => {
    if (!message.guild.me.hasPermission("MANAGE_ROLES", "ADMINISTRATOR")) return message.channel.send("I don't have permissions to give roles");
    const { guild } = message;

    let channelId = JSON.parse(fs.readFileSync("./src/db/channel.json"))
    if (!channelId[guild.id])
        return message.channel.send("Looks like you havent setup a **Channel**");
    let channelI = channelId[guild.id].channelID;
    if (!channelI) return;

    let rolex = JSON.parse(fs.readFileSync("./src/db/role.json", "utf8"))
    if (!rolex[guild.id])
        return message.channel.send("looks like you dident setup a **role**");
    let rolename = rolex[guild.id].role;
    if (!rolename) return;

    if (message.member.roles.cache.find(r => r.name === `${rolename}`)) return; 

    if (message.channel.id === `${channelI}`) {
        const role = guild.roles.cache.find(r => r.name === `${rolename}`);
        if (role) {
            try {
                await message.member.roles.add(role);
            } catch (err) {}
        }
        message.member.send(`Role \`${rolename}\` has been given to you on \`${guild.name}\` server.`)
    }
}

module.exports.help = {
    name: "verify",
    aliases: ['accept']
}