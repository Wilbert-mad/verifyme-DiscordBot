const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    function deraton(ms) {
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, `
    }

    let info = "1.0.0";
    let devs = ["Xa_puppet#2393", "GamerCreator1#1466"]
    let embed = new MessageEmbed()
        .setAuthor("VerifyMe", client.user.avatarURL())
        .setColor("#32CD32")
        .addField("Version", `${info}`, true)
        .addField("Creator's", `${devs}`, true)
        .addField("Uptime", `${deraton(client.uptime)}`, true)
        .addField("Guilds", client.guilds.cache.size, true)
        .addField("Library", "discord.js", true)

    message.channel.send(embed);
}

module.exports.help = {
    name: "info",
    aliases: []
}