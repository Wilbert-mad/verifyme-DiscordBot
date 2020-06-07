const fs = require("fs");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES", "ADMINISTRATOR") || !message.guild.owner) return message.channel.send("You need permissions");
    if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permissions");

    let channelId = JSON.parse(fs.readFileSync("./src/db/channel.json", "utf8"))
    if (!channelId[message.guild.id]) return;
    let channelI = channelId[message.guild.id].channelID;
    if (!channelI) return;

    let role = message.mentions.roles.first();
    if (!role)
        return message.channel.send("You need a role")
            .then(m => m.delete({timeout: 5000}));

    if (channelI === `${message.channel.id}` && role)
        return message.channel.send("you cant \`setrole\` well you are in the delete channel");

    client.roles[message.guild.id] = {
        role: role.name
    };

    fs.writeFile("./src/db/role.json", JSON.stringify(client.roles, null, 4), err => {
        if (err) throw err;
        message.channel.send("Role Set")
            .then(m => m.delete({timeout: 3000}));
    })
    await message.delete({timeout: 3000}).catch(err => console.log(err))
}

module.exports.help = {
    name: "setrole",
    aliases: ["role"]
}