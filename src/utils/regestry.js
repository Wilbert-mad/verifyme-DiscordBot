async function commands(client) {
    let fs = require("fs");
    fs.readdir("./src/commands/", (err, files) => {
        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if (jsfiles.length <= 0) {
            return console.log("[logs] no commands to load!");
        }

        jsfiles.forEach((f, i) => {
            let pull = require(`../commands/${f}`);
            console.log(`${i + 1}: ${f} loaded`)
            client.commands.set(pull.help.name, pull);
            pull.help.aliases.forEach(alias => {
                client.aliases.set(alias, pull.help.name)
            });
        });
    });
}
async function events(client) {
    let fs = require("fs").promises;
    const evtFiles = await fs.readdir('./src/events');
	evtFiles.forEach(f => {
		const evtName = f.split('.')[0];
		client.logger.log(`Loading Event: ${evtName}`);
		const event = require(`../events/${f}`);
		client.on(evtName, event.bind(null, client));
	});
	client.logger.log(`Loading a total of ${evtFiles.length} events.`);
}

module.exports = {
    commands,
    events
}