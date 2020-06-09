const fs = require("fs");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]) || !message.guild.owner) return message.channel.send("You don't have permissions");
    if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permissions");

    let channel = message.mentions.channels.first();

    if (!channel) return message.channel.send("You need a channel")
    .then(m => m.delete({timeout: 5000}));
    
    let channelhere = message.channel.id;
    if (channel.id === `${channelhere}`) return message.channel.send("You cant \`setchannel\` well you are in the channel");


    client.channel[message.guild.id] = {
        channelID: channel.id
    };

    fs.writeFile("./src/db/channel.json", JSON.stringify(client.channel, null, 4), err => {
        if (err) throw err;
        message.channel.send("channel Set").then(m => m.delete({timeout: 3000}));
    })
    await message.delete({timeout: 3000}).catch(err => console.log(err))
}

module.exports.help = {
    name: "setchannel",
    aliases: ["channel"]
}