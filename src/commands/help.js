const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    function dts(ms) {
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 12)) % 60).toString()
        return `${hrs.padStart(2, '0')}: ${min.padStart(2, '0')} `
    }

    let link = "(server)[https://discord.gg/4rqgZFk]";
    let embed = new MessageEmbed()
        .setAuthor("Help")
        .setColor("RANDOM")
        .addField("Bot's Server", link)
        .addField("commands", "For Commands >help pages [number]")
        .addField("this command is cerrently not working")
        .addtimestamp()

    message.channel.send(embed)

    if (args[0]) {

    }
    else if (args[1] === "pages") {
        message.channel.send("in development")
    }
}

module.exports.help = {
    name: "help",
    aliases: ["h"]
}