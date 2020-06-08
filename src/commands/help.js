const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    var helps = [
        {
            name: "setchannel",
            aliases: ["channel"],
            discription: "Set the channel that members will verify on"
        },
        {
            name: "setrole",
            aliases: ["role"],
            discription: "Role given to all members"
        },
        {
            name: "setprefix",
            aliases: ["prefix"],
            discription: "Set the prefix for you server/guild"
        },
        {
            name: "verify",
            aliases: ["accept", "yes"],
            discription: "Command used to verify your membeds"
        },
        {
            name: "info",
            aliases: ["botinfo"],
            discription: "Get info on the bot and more..."
        }
    ];
        for(var i = 0;i < helps.length;i++) {
            var fn;
            fn += "\n- **"+helps[i].name;
            fn += "**\nAliases: \`"+helps[i].aliases.join(", ")+"\`";
            fn += "\nDiscription: "+helps[i].discription;
        }
        const embed = new MessageEmbed()
        .addField("Commands", fn)
        .setColor("BLUE")
        message.channel.send(embed)
}

module.exports.help = {
    name: "help",
    aliases: ["h"]
}