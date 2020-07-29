const { MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD" || "ADMINISTRATOR") || !message.guild.owner)
        return message.channel.send("You don't have permissions");
    if (!args[0]) return message.channel.send(`Usage: setprefix \`<NewPrefix>\`\n Exampal: \`>setprefix ?\``);

    const prefixs = JSON.parse(fs.readFileSync("./src/db/prefixs.json", "utf8"));
    prefixs[message.guild.id] = { prefixs: args[0] };

    fs.writeFile("./src/db/prefixs.json", JSON.stringify(prefixs, null, 4), (err) => {
        if (err) throw err;
    });

    const embed = new MessageEmbed()
        .setAuthor("Prefix set!", message.guild.iconURL())
        .setDescription(`Prefix is now \`${args[0]}\``);

    message.channel.send(embed);
}

module.exports.help = {
    name: "setprefix",
    aliases: ["setp"]
}