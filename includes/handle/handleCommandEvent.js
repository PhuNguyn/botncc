module.exports = function({ api, __GLOBAL, client, models, Users, Threads, Currencies, utils }) {
	const logger = require("../../utils/log.js");
	return async function({ event }) {
		if (client.userBanned.has(event.senderID) || client.threadBanned.has(event.threadID) || __GLOBAL.settings.allowInbox == true && event.senderID == event.threadID) return;
		let commands = client.commandRegister.get("event") || [];
		for (const command of commands) {
			const commandModule = client.commands.get(command);
			try {
				commandModule.event({ event, api, __GLOBAL, client, models, Users, Threads, Currencies, utils });
			}
			catch (error) {
				logger(error + " at event command: " + commandModule.config.name , "error");
			}
		}
	}
}